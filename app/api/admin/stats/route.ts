import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../../../chatgpt-auth";
export async function POST(request:Request){
 if(!(await getChatGPTUser())) return Response.json({error:"로그인이 필요합니다."},{status:401});
 const items=await request.json() as Array<{key:string;label_ko:string;label_en:string;value:string;sort_order:number}>;
 const statements=items.map(x=>env.DB.prepare("INSERT INTO impact_stats(key,label_ko,label_en,value,sort_order) VALUES(?,?,?,?,?) ON CONFLICT(key) DO UPDATE SET label_ko=excluded.label_ko,label_en=excluded.label_en,value=excluded.value,sort_order=excluded.sort_order").bind(x.key,x.label_ko,x.label_en,x.value,x.sort_order));
 if(statements.length) await env.DB.batch(statements);
 return Response.json({ok:true});
}
