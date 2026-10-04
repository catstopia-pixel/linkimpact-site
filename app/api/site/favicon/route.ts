import { env } from "cloudflare:workers";

export async function GET(request: Request) {
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
  return Response.redirect(new URL("/favicon.ico", request.url), 302);
}
