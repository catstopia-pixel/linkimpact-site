import { getPublishedPosts } from "./lib/content";
import { getChatGPTUser } from "./chatgpt-auth";
import InteractiveFrontClient from "./ui/interactive-front-client";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [notices, activities, user] = await Promise.all([
    getPublishedPosts("notice", 5),
    getPublishedPosts("activity", 20),
    getChatGPTUser(),
  ]);

  return (
    <InteractiveFrontClient
      posts={[...notices, ...activities]}
      showAdmin={Boolean(user)}
    />
  );
}
