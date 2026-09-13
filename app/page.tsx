import { getFrontSettings, getPublishedPosts } from "./lib/content";
import { getChatGPTUser } from "./chatgpt-auth";
import InteractiveFrontClient from "./ui/interactive-front-client";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [notices, activities, front, user] = await Promise.all([
    getPublishedPosts("notice", 5),
    getPublishedPosts("activity", 20),
    getFrontSettings(),
    getChatGPTUser(),
  ]);

  return (
    <InteractiveFrontClient
      posts={[...notices, ...activities]}
      front={front}
      showAdmin={Boolean(user)}
    />
  );
}
