import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../../../chatgpt-auth";
import { defaultFrontSettings, defaultSettings, defaultStats } from "../../../lib/content";

async function authorized() { return Boolean(await getChatGPTUser()); }
export async function GET() {
  if (!(await authorized())) return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS front_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL DEFAULT '')").run();
  const [settings, stats, posts, frontRows] = await Promise.all([
    env.DB.prepare("SELECT * FROM site_settings WHERE id=1").first(),
    env.DB.prepare("SELECT * FROM impact_stats ORDER BY sort_order").all(),
    env.DB.prepare("SELECT * FROM posts ORDER BY is_pinned DESC, created_at DESC").all(),
    env.DB.prepare("SELECT key,value FROM front_settings").all<{key:string;value:string}>(),
  ]);
  const front={...defaultFrontSettings,...Object.fromEntries(frontRows.results.map(row=>[row.key,row.value]))};
  return Response.json({ settings: settings || defaultSettings, front, stats: stats.results.length ? stats.results : defaultStats, posts: posts.results });
}
