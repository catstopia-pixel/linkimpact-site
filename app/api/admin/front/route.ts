import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../../../chatgpt-auth";
import { defaultFrontSettings } from "../../../lib/content";

const textFields=["eyebrow","title_line1","title_emphasis","title_line2","lead","body","people_label","people_desc","nature_label","nature_desc","community_label","community_desc","resource_label","resource_desc","action_label","action_desc","work_label","work_url","naturelens_label","naturelens_url","donate_label","donate_url","notice_label","notice_url"] as const;
const imageFields=["background","people","nature","community","resource","action"] as const;

async function ready(){await env.DB.prepare("CREATE TABLE IF NOT EXISTS front_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL DEFAULT '')").run();}
async function put(key:string,value:string){await env.DB.prepare("INSERT INTO front_settings(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").bind(key,value).run();}

export async function POST(request:Request){
 if(!(await getChatGPTUser()))return Response.json({error:"로그인이 필요합니다."},{status:401});
 await ready();
 const form=await request.formData();
 for(const key of textFields)await put(key,String(form.get(key)??defaultFrontSettings[key]??""));
 for(const field of imageFields){
  const settingKey=`${field}_image_key`;
  let value=String(form.get(`current_${settingKey}`)||defaultFrontSettings[settingKey]||"");
  const file=form.get(`${field}_image`);
  if(file instanceof File&&file.size>0){
   if(!file.type.startsWith("image/")||file.size>10*1024*1024)return Response.json({error:`${field}: 10MB 이하 이미지 파일만 업로드할 수 있습니다.`},{status:400});
   const ext=file.type.split("/")[1]||"jpg";value=`site/front-${field}-${crypto.randomUUID()}.${ext}`;
   await env.BUCKET.put(value,await file.arrayBuffer(),{httpMetadata:{contentType:file.type}});
  }
  await put(settingKey,value);
 }
 return Response.json({ok:true});
}
