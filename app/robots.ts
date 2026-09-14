import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: "https://linkimpact.or.kr/sitemap.xml",
    host: "https://linkimpact.or.kr",
  };
}
