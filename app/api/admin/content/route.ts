import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../../../chatgpt-auth";
import { defaultSettings, defaultStats } from "../../../lib/content";

async function authorized() { return Boolean(await getChatGPTUser()); }
export async function GET() {
  if (!(await authorized())) return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  const [settings, stats, posts] = await Promise.all([
    env.DB.prepare("SELECT * FROM site_settings WHERE id=1").first(),
    env.DB.prepare("SELECT * FROM impact_stats ORDER BY sort_order").all(),
    env.DB.prepare("SELECT * FROM posts ORDER BY is_pinned DESC, created_at DESC").all(),
  ]);
  return Response.json({ settings: settings || defaultSettings, stats: stats.results.length ? stats.results : defaultStats, posts: posts.results });
}
