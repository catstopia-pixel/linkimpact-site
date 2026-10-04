import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../../../chatgpt-auth";

async function ready() {
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS front_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL DEFAULT '')").run();
}
async function put(key: string, value: string) {
  await env.DB.prepare("INSERT INTO front_settings(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").bind(key,value).run();
}

export async function POST(request: Request) {
  if (!(await getChatGPTUser())) return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  await ready();
  const form = await request.formData();
  const file = form.get("favicon");
  if (!(file instanceof File) || file.size === 0) return Response.json({ error: "파비콘 파일을 선택해주세요." }, { status: 400 });
  const allowed = ["image/png", "image/x-icon", "image/vnd.microsoft.icon"];
  if (!allowed.includes(file.type) || file.size > 2 * 1024 * 1024) {
    return Response.json({ error: "PNG 또는 ICO 파일(최대 2MB)만 업로드할 수 있습니다." }, { status: 400 });
  }
  const ext = file.type === "image/png" ? "png" : "ico";
  const key = `site/favicon-${crypto.randomUUID()}.${ext}`;
  await env.BUCKET.put(key, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type || (ext === "png" ? "image/png" : "image/x-icon") },
  });
  await put("favicon_key", key);
  await put("favicon_updated_at", new Date().toISOString());
  return Response.json({ ok: true, favicon_key: key });
}
