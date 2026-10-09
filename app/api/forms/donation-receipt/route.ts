import { env } from "cloudflare:workers";
export const dynamic = "force-dynamic";
const str=(v:unknown,max=200)=>typeof v==='string'?v.trim().slice(0,max):'';
export async function POST(request:Request){
 try {
  const origin=request.headers.get('origin');
  if(origin&&origin!==new URL(request.url).origin)return Response.json({error:'Invalid origin'},{status:403});
  const raw=await request.text();
  if(new TextEncoder().encode(raw).length>10000)return Response.json({error:'Too large'},{status:413});
  let body:Record<string,unknown>;try{body=JSON.parse(raw)}catch{return Response.json({error:'Invalid JSON'},{status:400})}
  if(!body||typeof body!=='object'||Array.isArray(body))return Response.json({error:'Invalid submission'},{status:400});
  if(body.website)return Response.json({error:'Invalid submission'},{status:400});
  const donorType=str(body.donorType,15),donorName=str(body.donorName,100),depositorName=str(body.depositorName,100),email=str(body.email,180),phone=str(body.phone,30),address=str(body.address,250),donatedAt=str(body.donatedAt,10),businessNumber=str(body.businessNumber,12).replace(/-/g,''),amount=Number(body.amount);
  const date=new Date(donatedAt+'T00:00:00Z');
  if(!['individual','business'].includes(donorType)||!donorName||!depositorName||!email||!phone||!address||body.consent!==true||!/^\S+@\S+\.\S+$/.test(email)||!/^\d{4}-\d{2}-\d{2}$/.test(donatedAt)||!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==donatedAt||date.getTime()>Date.now()+86400000||!Number.isSafeInteger(amount)||amount<1||amount>1e9||(donorType==='business'&&!/^\d{10}$/.test(businessNumber)))return Response.json({error:'Invalid submission'},{status:400});
  // Reuse the existing protected submissions store. Do not migrate or replace production tables.
  const recent=await env.DB.prepare("SELECT COUNT(*) AS count FROM form_submissions WHERE form_slug='donation-receipt' AND submitted_at>? AND json_extract(answers_json,'$.phone')=?").bind(new Date(Date.now()-3600000).toISOString(),phone).first<{count:number}>();
  if((recent?.count||0)>=5)return Response.json({error:'Too many requests'},{status:429});
  const id=crypto.randomUUID();
  const answers={requestId:id,donorType,donorName,depositorName,email,phone,address,donatedAt,amount,businessNumber:donorType==='business'?businessNumber:null,consent:true,status:'pending'};
  await env.DB.prepare('INSERT INTO form_submissions(form_slug,lang,answers_json,submitted_at) VALUES(?,?,?,?)').bind('donation-receipt',body.lang==='en'?'en':'ko',JSON.stringify(answers),new Date().toISOString()).run();
  return Response.json({ok:true,id});
 }catch{return Response.json({error:'Unable to save submission'},{status:503})}
}
