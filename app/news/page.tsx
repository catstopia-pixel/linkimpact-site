import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { getPublishedPosts, mediaUrl } from "../lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "공지사항과 활동 소식",
  description: "LINKIMPACT의 공지사항과 지역사회·환경·시민참여 활동 소식을 확인하세요.",
  alternates: {
    canonical: "/news",
  },
};

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ type?: string; lang?: string }> }) {
  const { type, lang: rawLang } = await searchParams;
  const lang = rawLang === "en" ? "en" : "ko";
  const selectedType = type === "activity" ? "activity" : "notice";
  const posts = await getPublishedPosts(selectedType, 50);
  const labels = lang === "ko"
    ? { home: "메인으로", title: "공지사항과 활동 소식", notice: "공지사항", activity: "활동 소식", empty: "등록된 게시글이 없습니다." }
    : { home: "Home", title: "News & Stories", notice: "Notices", activity: "Activities", empty: "No posts are available." };
  const opposite = lang === "ko" ? "en" : "ko";

  return <main className="min-h-screen bg-slate-50 text-[#092a52]">
    <header className="bg-[#071f35] px-5 py-7 text-white"><div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4">
      <Link href="/" className="font-bold">◎ LINKIMPACT</Link>
      <div className="flex items-center gap-3"><Link href={type ? `/news?type=${type}&lang=${opposite}` : `/news?lang=${opposite}`} className="rounded-full border border-white/30 px-4 py-2 text-xs font-bold">{lang === "ko" ? "EN" : "KO"}</Link><Link href="/" className="flex items-center gap-2 text-sm"><ArrowLeft size={16} /> {labels.home}</Link></div>
    </div></header>
    <section className="mx-auto max-w-[1100px] px-5 py-16">
      <div className="text-xs font-bold text-[#287d44]">NEWS & STORIES</div><h1 className="mt-3 text-4xl font-bold">{labels.title}</h1>
      <div className="mt-8 flex gap-2" role="tablist" aria-label={labels.title}>{[["notice", labels.notice], ["activity", labels.activity]].map(([value, label]) => <Link role="tab" aria-selected={selectedType===value} key={value} href={`/news?type=${value}&lang=${lang}`} className={`rounded-full px-5 py-2 text-sm font-bold ${selectedType === value ? "bg-[#062c59] text-white" : "bg-white"}`}>{label}</Link>)}</div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.map(post => <Link href={`/news/${post.id}?lang=${lang}`} key={post.id} className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        <div className="aspect-[16/9] bg-slate-200 bg-cover bg-center" style={{ backgroundImage: `url("${mediaUrl(post.image_key) || "/assets/earth-network.png"}")` }} />
        <div className="p-6"><span className="text-xs font-bold text-[#287d44]">{post.type === "notice" ? labels.notice : labels.activity} · {post.category}</span><h2 className="mt-3 text-xl font-bold">{lang === "ko" ? post.title_ko : (post.title_en || post.title_ko)}</h2><p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">{lang === "ko" ? post.excerpt_ko : (post.excerpt_en || post.excerpt_ko)}</p><span className="mt-5 flex items-center gap-2 text-xs text-slate-400"><CalendarDays size={14} />{(post.event_date || post.created_at).slice(0, 10)}</span></div>
      </Link>)}</div>
      {posts.length === 0 ? <div className="mt-10 rounded-2xl border border-dashed bg-white p-16 text-center text-slate-500">{labels.empty}</div> : null}
    </section>
  </main>;
}
