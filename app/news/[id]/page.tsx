import { env } from "cloudflare:workers";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { galleryUrls, isBambooLinkPost, isWildLinkOtterPost, mediaUrl, type Post } from "../../lib/content";

export const dynamic = "force-dynamic";

async function getPost(id: string): Promise<Post | null> {
  try { return await env.DB.prepare("SELECT * FROM posts WHERE id=? AND status='published'").bind(Number(id)).first<Post>(); }
  catch { return null; }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params; const post = await getPost(id);
  if (!post) return { title: "게시글을 찾을 수 없습니다" };
  return { title: post.title_ko, description: post.excerpt_ko || post.content_ko.slice(0,150), alternates:{canonical:`/news/${post.id}`}, openGraph:{type:"article",title:post.title_ko,description:post.excerpt_ko || post.content_ko.slice(0,150),url:`/news/${post.id}`,images:post.image_key?[{url:mediaUrl(post.image_key)!}]:undefined} };
}

export default async function PostPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ lang?: string }> }) {
  const { id }=await params; const {lang:rawLang}=await searchParams; const lang=rawLang==="en"?"en":"ko"; const post=await getPost(id);
  if(!post) notFound();
  if(isWildLinkOtterPost(post)) redirect("/news/wild-link/otter?from=notice");
  if(isBambooLinkPost(post)) redirect("/news/wild-link/bamboo?from=notice");
  if(post.content_ko.includes("[[WILD_FRIENDS_2026]]") || post.content_en.includes("[[WILD_FRIENDS_2026]]")) redirect(`/wild-friends?lang=${lang}`);
  const gallery=galleryUrls(post.gallery_json); const title=lang==="ko"?post.title_ko:(post.title_en||post.title_ko); const content=lang==="ko"?post.content_ko:(post.content_en||post.content_ko); const typeLabel=post.type==="notice"?(lang==="ko"?"공지사항":"Notice"):(lang==="ko"?"활동 소식":"Activity"); const isSovacActivity=post.content_ko.includes("[[SOVAC_2026_ACTIVITY]]")||post.content_en.includes("[[SOVAC_2026_ACTIVITY]]");
  return <main className="min-h-screen bg-white text-[#092a52]"><header className="border-b px-5 py-7"><div className="mx-auto flex max-w-[900px] items-center justify-between gap-4"><Link href="/" className="font-bold">◎ LINKIMPACT</Link><div className="flex items-center gap-3"><Link href={`/news/${post.id}?lang=${lang==="ko"?"en":"ko"}`} className="rounded-full border px-4 py-2 text-xs font-bold">{lang==="ko"?"EN":"KO"}</Link><Link href={`/news?lang=${lang}`} className="flex items-center gap-2 text-sm"><ArrowLeft size={16}/>{lang==="ko"?"목록으로":"Back to news"}</Link></div></div></header><article className="mx-auto max-w-[900px] px-5 py-16"><span className="text-sm font-bold text-[#287d44]">{typeLabel} · {post.category}</span><h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">{title}</h1><div className="mt-5 flex items-center gap-2 text-sm text-slate-400"><CalendarDays size={16}/>{(post.event_date||post.created_at).slice(0,10)}</div>{post.image_key?<img src={mediaUrl(post.image_key)||undefined} alt={title} className="mt-10 aspect-[16/9] w-full rounded-2xl object-cover"/>:null}{isSovacActivity?<SovacColumn text={content} gallery={gallery} title={title}/>:<><div className="mt-12 whitespace-pre-wrap text-lg leading-9 text-slate-700"><LinkedText text={content}/></div>{gallery.length?<section className="mt-14 grid gap-5 sm:grid-cols-2">{gallery.map((src,index)=><img key={src} src={src} alt={`${title} ${index+1}`} className="w-full rounded-2xl object-cover" loading="lazy"/>)}</section>:null}</>}</article></main>;
}

function LinkedText({text}:{text:string}){const parts=text.split(/(https?:\/\/[^\s]+)/g);return <>{parts.map((part,index)=>part.startsWith("http")?<a key={index} href={part} target="_blank" rel="noreferrer" className="font-semibold text-[#12629b] underline decoration-2 underline-offset-4">{part}</a>:part)}</>;}


function SovacColumn({text,gallery,title}:{text:string;gallery:string[];title:string}){
  const clean=text.replace("[[SOVAC_2026_ACTIVITY]]","").trim();
  const paragraphs=clean.split(/\n\s*\n/).map(item=>item.trim()).filter(Boolean);
  return <div className="mt-12">
    {paragraphs.map((paragraph,index)=>{
      const image=index<gallery.length?gallery[index]:null;
      return <div key={index}>
        <div className={`text-lg leading-9 text-slate-700 ${index===0?"font-medium text-slate-800":""}`}><LinkedText text={paragraph}/></div>
        {image?<figure className="my-10 md:my-12"><img src={image} alt={`${title} 활동 현장 ${index+1}`} className="max-h-[680px] w-full rounded-2xl object-cover" loading="lazy"/></figure>:null}
      </div>;
    })}
  </div>;
}
