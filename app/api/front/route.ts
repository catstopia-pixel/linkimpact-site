import { env } from "cloudflare:workers";
import template from "../../front/template.html?raw";
import locations from "../../front/story-map.json";
import { renderFront } from "../../front/render";
import { defaultFrontSettings, type Post } from "../../lib/content";
export const dynamic="force-dynamic";
export async function GET() {
 try {
  const [posts,settings]=await Promise.all([
   env.DB.prepare("SELECT * FROM posts WHERE status='published' ORDER BY is_pinned DESC,created_at DESC").all<Post>(),
   env.DB.prepare("SELECT key,value FROM front_settings").all<{key:string;value:string}>(),
  ]);
  const front={...defaultFrontSettings,...Object.fromEntries(settings.results.map(r=>[r.key,r.value]))};
  return new Response(renderFront(template,locations,posts.results,front),{headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Linkimpact-Design":"refinement-2026-10-09","X-Content-Type-Options":"nosniff"}});
 }catch(error){
  console.error("Front content could not be loaded",error);
  return new Response('Unable to load LINKIMPACT. Please try again.',{status:503,headers:{"Retry-After":"30"}});
 }
}
