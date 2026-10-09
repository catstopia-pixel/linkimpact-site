/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Read-only responsive QA harness, restricted to the isolated preview host.
    if (url.hostname === "refinement-2026-10-09-linkimpact-site.catstopia.workers.dev" && url.pathname === "/__preview-qa") {
      const width = [360,390,768,1440].includes(Number(url.searchParams.get("width"))) ? Number(url.searchParams.get("width")) : 390;
      return new Response(`<!doctype html><html><head><title>LINKIMPACT responsive preview</title></head><body style="margin:0;background:#ddd"><nav style="height:40px">${[360,390,768,1440].map(w=>`<a style="margin:12px" href="?width=${w}">${w}px</a>`).join("")}</nav><iframe title="LINKIMPACT ${width}px" src="/" style="width:${width}px;height:844px;border:0;display:block"></iframe></body></html>`, {headers:{"Content-Type":"text/html; charset=utf-8","X-Robots-Tag":"noindex","Cache-Control":"no-store"}});
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    // Serve the refined document using the same D1/R2 bindings and API router.
    // No runtime schema changes or static content.json override are involved.
    if (url.pathname === "/" && (request.method === "GET" || request.method === "HEAD")) {
      url.pathname = "/api/front";
      const response = await handler.fetch(new Request(url, request), env, ctx);
      return request.method === "HEAD" ? new Response(null, response) : response;
    }
    return handler.fetch(request, env, ctx);
  },
};

export default worker;
