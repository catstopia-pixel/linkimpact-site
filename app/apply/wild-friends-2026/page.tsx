import type { Metadata } from "next";
import ApplyFormClient from "./apply-form-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FIELD MISSION 참가 신청 | LINKIMPACT",
  description: "야생 친구를 찾습니다 — NatureLens FIELD MISSION 참가 신청",
  robots: { index: false, follow: false },
  alternates: { canonical: "/apply/wild-friends-2026" },
};

export default async function WildFriendsApplyPage({searchParams}:{searchParams:Promise<{lang?:string}>}){
  const {lang}=await searchParams;
  return <ApplyFormClient initialLang={lang==="en"?"en":"ko"}/>;
}
