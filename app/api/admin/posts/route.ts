import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../../../chatgpt-auth";
export async function POST(request:Request){
 if(!(await getChatGPTUser())) return Response.json({error:"로그인이 필요합니다."},{status:401});
 const form=await request.formData(); let imageKey:null|string=null; const file=form.get("image");
 if(file instanceof File&&file.size>0){if(!file.type.startsWith("image/")||file.size>10*1024*1024)return Response.json({error:"10MB 이하 이미지 파일만 업로드할 수 있습니다."},{status:400});imageKey=`posts/${crypto.randomUUID()}.${file.type.split("/")[1]||"jpg"}`;await env.BUCKET.put(imageKey,await file.arrayBuffer(),{httpMetadata:{contentType:file.type}});}
 const now=new Date().toISOString();
 const values=[String(form.get("type")||"notice"),String(form.get("title_ko")||""),String(form.get("title_en")||""),String(form.get("excerpt_ko")||""),String(form.get("excerpt_en")||""),String(form.get("content_ko")||""),String(form.get("content_en")||""),imageKey,String(form.get("category")||"일반"),String(form.get("status")||"draft"),form.get("is_pinned")?1:0,String(form.get("event_date")||"")||null,now,now];
 if(!values[1]||!values[5]) return Response.json({error:"한글 제목과 본문은 필수입니다."},{status:400});
 const result=await env.DB.prepare("INSERT INTO posts(type,title_ko,title_en,excerpt_ko,excerpt_en,content_ko,content_en,image_key,category,status,is_pinned,event_date,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)").bind(...values).run();
 return Response.json({ok:true,id:result.meta.last_row_id});
}
