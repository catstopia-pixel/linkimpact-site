import type { MetadataRoute } from "next";
import { getPublishedPosts } from "./lib/content";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://linkimpact.or.kr";
  const [notices, activities] = await Promise.all([
    getPublishedPosts("notice", 200),
    getPublishedPosts("activity", 200),
  ]);
  const posts = [...notices, ...activities];

  return [
    {
      url: `${baseUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/news`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...posts.map((post) => ({
      url: `${baseUrl}/news/${post.id}`,
      lastModified: new Date(post.updated_at || post.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
