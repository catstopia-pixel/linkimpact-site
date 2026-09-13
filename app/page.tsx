import { getPublishedPosts } from "./lib/content";
import { getChatGPTUser } from "./chatgpt-auth";
import InteractiveFrontClient from "./ui/interactive-front-client";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [posts, user] = await Promise.all([
    getPublishedPosts(undefined, 12),
    getChatGPTUser(),
  ]);

  return <InteractiveFrontClient posts={posts} showAdmin={Boolean(user)} />;
}
