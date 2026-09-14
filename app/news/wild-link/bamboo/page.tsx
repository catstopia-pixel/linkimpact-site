import type { Metadata } from "next";
import Link from "next/link";
import BambooPlantGame from "./BambooPlantGame";

export const metadata: Metadata = {
 title: "10초 숲 만들기 | BAMBOO LINK | LINKIMPACT",
 description: "대나무를 심으며 기후재난, 생태계 회복력, 지역사회와 우리의 삶이 어떻게 연결되는지 체험합니다.",
};

export default function BambooLinkPage(){
 return <main className="min-h-screen bg-[#f2f6ef] px-4 py-8 text-[#143b24] sm:px-6 sm:py-12">
  <div className="mx-auto max-w-4xl">
   <header className="mb-6 flex items-center justify-between"><Link href="/" className="font-black">◎ LINKIMPACT</Link><Link href="/news" className="text-sm font-bold">NEWS →</Link></header>
   <BambooPlantGame />
   <section className="mx-auto mt-8 max-w-2xl px-2 text-sm leading-7 text-slate-500"><p>이 체험은 대나무 한 종이 태풍이나 홍수를 직접 예방한다는 의미가 아닙니다. 적절한 식생 복원과 토양 관리가 생태계의 완충·회복 기능에 기여할 수 있다는 연결을 게임으로 설명합니다.</p></section>
  </div>
 </main>
}
