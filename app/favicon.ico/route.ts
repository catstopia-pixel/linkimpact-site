import { env } from "cloudflare:workers";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await env.DB.prepare("CREATE TABLE IF NOT EXISTS front_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL DEFAULT '')").run();
    const row = await env.DB.prepare("SELECT value FROM front_settings WHERE key='favicon_key'").first<{ value: string }>();
    if (row?.value) {
      const object = await env.BUCKET.get(row.value);
      if (object) {
        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set("etag", object.httpEtag);
        headers.set("cache-control", "public, max-age=300, s-maxage=300");
        headers.set("x-content-type-options", "nosniff");
        return new Response(object.body, { headers });
      }
    }
  } catch {}
  const fallback = await env.ASSETS.fetch(new Request("https://assets.local/favicon.ico"));
  const headers = new Headers(fallback.headers);
  headers.set("cache-control", "public, max-age=300, s-maxage=300");
  return new Response(fallback.body, { status: fallback.status, headers });
}
