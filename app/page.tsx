import { getPublishedPosts, getSettings } from "./lib/content";
import { getChatGPTUser } from "./chatgpt-auth";
import HomeClient from "./ui/home-client";

export const dynamic = "force-dynamic";
export default async function Home() {
  const [settings, posts, user] = await Promise.all([getSettings(), getPublishedPosts(undefined, 12), getChatGPTUser()]);
  return <HomeClient settings={settings} posts={posts} showAdmin={Boolean(user)} />;
}
