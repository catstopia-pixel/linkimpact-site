import type { Metadata } from "next";
import { getPublishedPosts, getSettings } from "../lib/content";
import { getChatGPTUser } from "../chatgpt-auth";
import HomeClient from "../ui/home-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "HOME",
  description: "LINKIMPACT 메인 홈페이지",
  alternates: { canonical: "/home" },
};

export default async function MainHomePage() {
  const [notices, activities, settings, user] = await Promise.all([
    getPublishedPosts("notice", 5),
    getPublishedPosts("activity", 20),
    getSettings(),
    getChatGPTUser(),
  ]);
  return (
    <HomeClient
      settings={settings}
      posts={[...notices, ...activities]}
      showAdmin={Boolean(user)}
    />
  );
}
