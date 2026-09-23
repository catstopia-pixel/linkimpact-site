import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../../../../chatgpt-auth";

export const dynamic="force-dynamic";

async function authorized(){return Boolean(await getChatGPTUser())}

export async function GET(){
  if(!(await authorized())) return Response.json({error:"로그인이 필요합니다."},{status:401});
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS form_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    form_slug TEXT NOT NULL,
    lang TEXT NOT NULL DEFAULT 'ko',
    answers_json TEXT NOT NULL,
    submitted_at TEXT NOT NULL
  )`).run();
  const rows=await env.DB.prepare("SELECT id,form_slug,lang,answers_json,submitted_at FROM form_submissions ORDER BY submitted_at DESC LIMIT 500").all<{id:number;form_slug:string;lang:string;answers_json:string;submitted_at:string}>();
  return Response.json({submissions:rows.results.map(row=>({...row,answers:safeParse(row.answers_json)}))});
}

function safeParse(value:string){try{return JSON.parse(value)}catch{return {}}}
