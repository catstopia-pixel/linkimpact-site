import { env } from "cloudflare:workers";

export const dynamic = "force-dynamic";

type Submission={
  slug?:string;lang?:string;date?:string;name?:string;age?:string;gender?:string;
  phone?:string;device?:string;interests?:string[];message?:string;consent?:boolean;
};

function clean(v:unknown,max=500){return String(v??"").trim().slice(0,max)}

export async function POST(request:Request){
  try{
    const body=await request.json() as Submission;
    const date=clean(body.date,100), name=clean(body.name,100), age=clean(body.age,20), phone=clean(body.phone,50), device=clean(body.device,80);
    if(!date||!name||!age||!phone||!device||!body.consent) return Response.json({error:"Missing required fields"},{status:400});
    if(!["20대","30대","20s","30s"].includes(age)) return Response.json({error:"Invalid age range"},{status:400});
    const interests=Array.isArray(body.interests)?body.interests.map(x=>clean(x,80)).filter(Boolean).slice(0,20):[];
    if(!interests.length) return Response.json({error:"Select at least one interest"},{status:400});

    await env.DB.prepare(`CREATE TABLE IF NOT EXISTS form_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      form_slug TEXT NOT NULL,
      lang TEXT NOT NULL DEFAULT 'ko',
      answers_json TEXT NOT NULL,
      submitted_at TEXT NOT NULL
    )`).run();

    const answers={
      date,name,age,gender:clean(body.gender,50),phone,device,interests,
      message:clean(body.message,2000),consent:true
    };
    await env.DB.prepare("INSERT INTO form_submissions(form_slug,lang,answers_json,submitted_at) VALUES(?,?,?,?)")
      .bind("wild-friends-2026",body.lang==="en"?"en":"ko",JSON.stringify(answers),new Date().toISOString()).run();

    // Email is best-effort: a notification failure must never lose a valid application.
    const emailBinding=(env as unknown as {EMAIL?:{send:(message:{to:string;from:string;subject:string;text:string;html?:string})=>Promise<unknown>}}).EMAIL;
    if(emailBinding){
      const interestText=interests.join(", ");
      const text=[
        "[LINKIMPACT] 새로운 FIELD MISSION 신청이 접수되었습니다.",
        "",
        `이름: ${name}`,
        `연령: ${age}`,
        `희망일: ${date}`,
        `연락처: ${phone}`,
        `휴대폰: ${device}`,
        `관심사: ${interestText}`,
        `기대사항: ${clean(body.message,2000)||"-"}`,
        "",
        "전체 응답은 LINKIMPACT 관리자 대시보드 > 신청 · 설문 관리에서 확인하세요."
      ].join("\n");
      try{
        await emailBinding.send({
          to:"catstopia@gmail.com",
          from:"forms@linkimpact.or.kr",
          subject:`[LINKIMPACT] FIELD MISSION 참가 신청 - ${name}`,
          text
        });
      }catch(error){
        console.error("Form notification email failed",error);
      }
    }

    return Response.json({ok:true});
  }catch{
    return Response.json({error:"Unable to save submission"},{status:500});
  }
}
