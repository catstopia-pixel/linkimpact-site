import { env } from "cloudflare:workers";
import template from "../../front/template.html?raw";
import locations from "../../front/story-map.json";
import { renderFront } from "../../front/render";
import { defaultFrontSettings, type Post } from "../../lib/content";
export const dynamic="force-dynamic";
export async function GET(request: Request) {
 try {
  if (!env.DB || typeof env.DB.prepare !== 'function') {
   console.error('Front content could not be loaded: LINKIMPACT_DB_BINDING_MISSING');
   return new Response('Unable to load LINKIMPACT. Please try again.', {status:503,headers:{'Retry-After':'30','X-Linkimpact-Error':'missing-db-binding'}});
  }
  const [posts,settings]=await Promise.all([
   env.DB.prepare("SELECT * FROM posts WHERE status='published' ORDER BY is_pinned DESC,created_at DESC").all<Post>(),
   env.DB.prepare("SELECT key,value FROM front_settings").all<{key:string;value:string}>(),
  ]);
  const front={...defaultFrontSettings,...Object.fromEntries(settings.results.map(r=>[r.key,r.value]))};
  let html=renderFront(template,locations,posts.results,front);
  const params=new URL(request.url).searchParams;
  if(params.get("intro")==="skip") {
   html=html.replace(/<section\b[^>]*id="butterfly-intro"[^>]*>[\s\S]*?<\/section>/, "");
  }
  const lang=params.get("lang");
  if(lang==="en"||lang==="ko") {
   html=html.replace("var saved=localStorage.getItem(\'linkimpact-lang\');", `var saved=\'${lang}\';`);
  }
  return new Response(html,{headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Linkimpact-Design":"refinement-2026-10-09","X-Content-Type-Options":"nosniff"}});
 }catch(error){
  console.error("Front content could not be loaded: " + (error instanceof Error ? error.message : String(error)));
  return new Response('Unable to load LINKIMPACT. Please try again.',{status:503,headers:{"Retry-After":"30"}});
 }
}
