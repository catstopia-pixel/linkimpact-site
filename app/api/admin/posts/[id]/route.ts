import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../../../../chatgpt-auth";
async function auth(){return Boolean(await getChatGPTUser())}
export async function PUT(request:Request,{params}:{params:Promise<{id:string}>}){
 if(!(await auth())) return Response.json({error:"로그인이 필요합니다."},{status:401}); const {id}=await params; const form=await request.formData();
 let imageKey=String(form.get("current_image_key")||"")||null;const file=form.get("image");
 if(file instanceof File&&file.size>0){if(!file.type.startsWith("image/")||file.size>10*1024*1024)return Response.json({error:"10MB 이하 이미지 파일만 업로드할 수 있습니다."},{status:400});imageKey=`posts/${crypto.randomUUID()}.${file.type.split("/")[1]||"jpg"}`;await env.BUCKET.put(imageKey,await file.arrayBuffer(),{httpMetadata:{contentType:file.type}});}
 const values=[String(form.get("type")||"notice"),String(form.get("title_ko")||""),String(form.get("title_en")||""),String(form.get("excerpt_ko")||""),String(form.get("excerpt_en")||""),String(form.get("content_ko")||""),String(form.get("content_en")||""),imageKey,String(form.get("category")||"일반"),String(form.get("status")||"draft"),form.get("is_pinned")?1:0,String(form.get("event_date")||"")||null,new Date().toISOString(),Number(id)];
 await env.DB.prepare("UPDATE posts SET type=?,title_ko=?,title_en=?,excerpt_ko=?,excerpt_en=?,content_ko=?,content_en=?,image_key=?,category=?,status=?,is_pinned=?,event_date=?,updated_at=? WHERE id=?").bind(...values).run();
 return Response.json({ok:true});
}
export async function DELETE(_request:Request,{params}:{params:Promise<{id:string}>}){
 if(!(await auth())) return Response.json({error:"로그인이 필요합니다."},{status:401});const {id}=await params;await env.DB.prepare("DELETE FROM posts WHERE id=?").bind(Number(id)).run();return Response.json({ok:true});
}
