import type { Metadata } from "next";
import { getFrontSettings, getPublishedPosts } from "./lib/content";
import { getChatGPTUser } from "./chatgpt-auth";
import InteractiveFrontClient from "./ui/interactive-front-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "링크임팩트",
  description:
    "링크임팩트는 사회와 환경문제로 삶의 터전을 위협받는 지역사회의 문제를 발견하고, 사람과 자원, 행동을 연결해 지속가능한 변화를 만듭니다.",
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const [notices, activities, front, user] = await Promise.all([
    getPublishedPosts("notice", 5),
    getPublishedPosts("activity", 20),
    getFrontSettings(),
    getChatGPTUser(),
  ]);

  const posts=[...notices, ...activities];
  return <InteractiveFrontClient posts={posts} front={front} showAdmin={Boolean(user)} />;
}
