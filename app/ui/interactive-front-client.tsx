"use client";
import Link from "next/link";
import { ArrowRight, ExternalLink, X } from "lucide-react";
import { useEffect,useMemo,useState } from "react";
import type { Post } from "../lib/content";

type Props={posts:Post[];front:Record<string,string>;showAdmin:boolean};

function asset(key?:string){if(!key)return "";return key.startsWith("/")||key.startsWith("http")?key:`/api/media/${encodeURIComponent(key)}`;}
function media(post?:Post){return asset(post?.image_key||"")||"/assets/earth-network.png";}

export default function InteractiveFrontClient({posts,front,showAdmin}:Props){
 const [popupOpen,setPopupOpen]=useState(false);
 const [lang,setLang]=useState<"ko"|"en">("ko");
 const [typed,setTyped]=useState("");
 const popupNotice=useMemo(()=>posts.find(p=>p.type==="notice"&&Boolean(p.is_pinned))||posts.find(p=>p.type==="notice")||null,[posts]);

 useEffect(()=>{setPopupOpen(Boolean(popupNotice));},[popupNotice]);
 useEffect(()=>{
   const text="LINKED TO CHANGE THE WORLD";
   setTyped("");
   let i=0;
   const id=window.setInterval(()=>{i++;setTyped(text.slice(0,i));if(i>=text.length)window.clearInterval(id)},48);
   return()=>window.clearInterval(id);
 },[]);

 const bg=asset(front.background_image_key)||"/assets/earth-network.png";

 return <main className="min-h-screen bg-[#030a0e] text-white">
   {popupOpen&&popupNotice?<div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4">
     <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#09171b]">
       <button onClick={()=>setPopupOpen(false)} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/60" aria-label="공지 닫기"><X size={18}/></button>
       <div className="aspect-[16/8] bg-cover bg-center" style={{backgroundImage:`url("${media(popupNotice)}")`}}/>
       <div className="p-6">
         <div className="text-xs font-bold tracking-[.2em] text-emerald-300">NOTICE</div>
         <h2 className="mt-3 text-2xl font-bold">{lang==="ko"?popupNotice.title_ko:(popupNotice.title_en||popupNotice.title_ko)}</h2>
         <p className="mt-3 line-clamp-3 text-sm leading-7 text-white/65">{lang==="ko"?(popupNotice.excerpt_ko||popupNotice.content_ko):(popupNotice.excerpt_en||popupNotice.content_en||popupNotice.excerpt_ko)}</p>
         <div className="mt-6 flex justify-end gap-3">
           <button onClick={()=>setPopupOpen(false)} className="rounded-full border border-white/20 px-5 py-3 text-sm">{lang==="ko"?"닫기":"Close"}</button>
           <Link href={`/news/${popupNotice.id}?lang=${lang}`} className="rounded-full bg-emerald-300 px-5 py-3 text-sm font-bold text-[#061014]">{lang==="ko"?"자세히 보기":"View details"}</Link>
         </div>
       </div>
     </div>
   </div>:null}

   <section className="relative min-h-[100svh] overflow-hidden bg-[#02090d]">
     <div className="absolute inset-0 bg-cover bg-[center_top] md:bg-[center_42%]" style={{backgroundImage:`url("${bg}")`}}/>
     <div className="absolute inset-0 bg-[radial-gradient(circle_at_73%_43%,rgba(21,123,111,.04),rgba(2,9,13,.10)_32%,rgba(2,9,13,.82)_78%),linear-gradient(90deg,rgba(2,8,12,.98)_0%,rgba(2,8,12,.93)_34%,rgba(2,8,12,.28)_62%,rgba(2,8,12,.28)_100%)]"/>

     <header className="relative z-30 mx-auto flex h-24 max-w-[1360px] items-center justify-between px-6 lg:px-10">
       <Link href="/"><img src="/assets/linkimpact-logo.png" alt="LINKIMPACT" className="h-11 w-auto md:h-14"/></Link>
       <div className="flex items-center gap-2">
         {showAdmin?<Link href="/admin" className="hidden text-[11px] font-bold text-white/70 md:block">ADMIN</Link>:null}
         <button onClick={()=>setLang(lang==="ko"?"en":"ko")} className="inline-flex h-8 w-[68px] items-center justify-center rounded-full border border-white/25 bg-black/20 px-3 text-[10px] font-black tracking-[.1em] text-white/85 backdrop-blur">{lang==="ko"?"EN":"KO"}</button>
         <a href={front.donate_url} target="_blank" rel="noreferrer" className="inline-flex h-8 w-[68px] items-center justify-center rounded-full bg-emerald-300 px-3 text-[10px] font-black tracking-[.08em] text-[#05100d]">{front.donate_label}</a>
       </div>
     </header>

     <div className="relative z-20 mx-auto flex min-h-[calc(100svh-6rem)] max-w-[1360px] items-center px-[18px] pb-28 md:px-6 lg:px-10">
       <div className="w-full md:max-w-[58%]">
         <h1 className="min-h-[2.8em] text-center text-[clamp(3.2rem,7.4vw,7.8rem)] font-black leading-[.9] tracking-[-.06em] text-white drop-shadow-[0_12px_35px_rgba(0,0,0,.38)] md:text-left">
           <span className="md:hidden">
             <span>{typed.slice(0,typed.indexOf("CHANGE")>=0?typed.indexOf("CHANGE"):typed.length)}</span>
             {typed.includes("CHANGE")?<><span className="text-emerald-300">CHANGE</span><span>{typed.slice(typed.indexOf("CHANGE")+6)}</span></>:null}
           </span>
           <span className="hidden md:block">
             <span className="block">{typed.slice(0,Math.min(9,typed.length))}</span>
             {typed.length>10?<span className="block text-emerald-300">{typed.slice(10,Math.min(16,typed.length))}</span>:null}
             {typed.length>17?<span className="block">{typed.slice(17)}</span>:null}
           </span>
           <span className="ml-1 inline-block h-[.9em] w-[2px] animate-pulse bg-emerald-300 align-[-.05em]"/>
         </h1>
       </div>
     </div>

     <div className="absolute inset-x-0 bottom-7 z-30 flex justify-center px-6 md:left-1/2 md:right-auto md:w-full md:max-w-[1360px] md:-translate-x-1/2 md:justify-start md:px-6 lg:px-10">
       <div className="flex flex-wrap justify-center gap-3 md:justify-start">
         <a href="#home-main" className="inline-flex h-12 min-w-[148px] items-center justify-center gap-3 rounded-full border border-white/45 bg-white/10 px-6 text-sm font-black text-white backdrop-blur-sm">HOME<ArrowRight size={17}/></a>
         <Link href={front.work_url} className="inline-flex h-12 min-w-[168px] items-center justify-center gap-3 rounded-full bg-emerald-300 px-6 text-sm font-black text-[#04100c]">{front.work_label}<ArrowRight size={17}/></Link>
         <a href={front.naturelens_url} target="_blank" rel="noreferrer" className="inline-flex h-12 min-w-[168px] items-center justify-center gap-3 rounded-full border border-white/50 bg-black/30 px-6 text-sm font-bold backdrop-blur-sm">{front.naturelens_label}<ExternalLink size={15}/></a>
       </div>
     </div>
   </section>
 </main>;
}
