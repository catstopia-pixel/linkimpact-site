import type { Metadata } from "next";
import Link from "next/link";
import OtterClapGame from "./OtterClapGame";

export const metadata: Metadata = {
  title: "수달의 박수 | WILD LINK | LINKIMPACT",
  description: "수달의 박수 게임으로 생물다양성과 우리의 삶이 어떻게 연결되는지 발견하는 LINKIMPACT SOVAC 인터랙티브 교육 콘텐츠입니다.",
};

export default function OtterWildLinkPage() {
  return <main className="min-h-screen bg-[#f5f4ed] text-[#092a52]">
    <header className="border-b border-black/10 bg-white px-5 py-5"><div className="mx-auto flex max-w-[1080px] items-center justify-between"><Link href="/" className="text-lg font-black">◎ LINKIMPACT</Link><Link href="/news" className="text-sm font-bold">공지·활동으로 돌아가기</Link></div></header>

    <section className="mx-auto max-w-[1080px] px-5 pb-10 pt-14 sm:pt-20">
      <div className="max-w-3xl"><p className="text-sm font-black tracking-[.18em] text-[#287d44]">SOVAC 2026 · LINKIMPACT INTERACTIVE</p><h1 className="mt-4 text-5xl font-black leading-[1.05] tracking-tight sm:text-7xl">수달에게 박수를<br/>보내보세요. 👏</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">재미있는 10초 게임에서 시작해 수달, 하천, 생물다양성, 지역사회 그리고 우리의 삶까지 이어지는 연결을 발견해보세요.</p></div>
    </section>

    <section className="mx-auto max-w-[1080px] px-5 pb-20"><OtterClapGame /></section>

    <section className="border-t border-black/10 bg-white"><div className="mx-auto grid max-w-[1080px] gap-10 px-5 py-16 md:grid-cols-2"><div><p className="text-sm font-black text-[#287d44]">WHY THIS MATTERS</p><h2 className="mt-3 text-3xl font-black">환경의 문제는 결국<br/>우리 삶의 문제입니다.</h2></div><div className="space-y-5 text-base leading-8 text-slate-600"><p>생물다양성은 특정 야생동물만의 문제가 아닙니다. 생물들이 살아가는 서식지와 생태계의 기능은 물, 토양, 먹거리와 같은 우리의 생활 기반과 연결되어 있습니다.</p><p>LINKIMPACT는 서로 떨어져 보이는 환경과 사회의 문제 사이에서 연결고리를 발견하고, 사람과 자원, 행동을 이어 지역사회가 지속가능한 변화를 만들어가도록 합니다.</p><p className="font-black text-[#092a52]">작은 생명의 연결을 발견하는 것에서 변화가 시작됩니다.</p></div></div></section>

    <footer className="bg-[#092a52] px-5 py-9 text-white"><div className="mx-auto flex max-w-[1080px] flex-col justify-between gap-4 sm:flex-row"><b>LINKIMPACT</b><span className="text-sm text-white/65">LINKED TO CHANGE THE WORLD.</span></div></footer>
  </main>;
}
