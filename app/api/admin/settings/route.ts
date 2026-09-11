import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../../../chatgpt-auth";

const fields=["hero_title_ko","hero_title_en","hero_lead_ko","hero_lead_en","hero_body_ko","hero_body_en","mission_title_ko","mission_title_en","mission_body_ko","mission_body_en","platform_title_ko","platform_title_en","platform_body_ko","platform_body_en","vision_title_ko","vision_title_en","vision_body_ko","vision_body_en","donate_url"] as const;
export async function POST(request: Request) {
  if (!(await getChatGPTUser())) return Response.json({error:"로그인이 필요합니다."},{status:401});
  const form=await request.formData(); let imageKey=String(form.get("current_image_key")||"")||null;
  const file=form.get("hero_image");
  if(file instanceof File && file.size>0){
    if(!file.type.startsWith("image/")||file.size>10*1024*1024) return Response.json({error:"10MB 이하 이미지 파일만 업로드할 수 있습니다."},{status:400});
    imageKey=`site/hero-${crypto.randomUUID()}.${file.type.split("/")[1]||"jpg"}`;
    await env.BUCKET.put(imageKey,await file.arrayBuffer(),{httpMetadata:{contentType:file.type}});
  }
  const values=fields.map(k=>String(form.get(k)||""));
  const placeholders=fields.map(()=>"?").join(",");
  const updates=fields.map(k=>`${k}=excluded.${k}`).join(",");
  await env.DB.prepare(`INSERT INTO site_settings(id,${fields.join(",")},hero_image_key,updated_at) VALUES(1,${placeholders},?,?) ON CONFLICT(id) DO UPDATE SET ${updates},hero_image_key=excluded.hero_image_key,updated_at=excluded.updated_at`).bind(...values,imageKey,new Date().toISOString()).run();
  return Response.json({ok:true,image_key:imageKey});
}
