"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Post } from "../lib/content";

type Props={posts:Post[];showAdmin:boolean};
type Dot={x:number;y:number;vx:number;vy:number;active:number};
type Ripple={x:number;y:number;r:number;a:number};

type Feature={name:string;desc:string;left:string;top:string;keywords:string[]};
const FEATURES:Feature[]=[
  {name:"PEOPLE",desc:"사람을 연결합니다.",left:"66%",top:"18%",keywords:["사람","주민","시민","청년","아동","people","resident","citizen","community"]},
  {name:"NATURE",desc:"자연을 연결합니다.",left:"83%",top:"29%",keywords:["자연","생태","숲","식물","대나무","기후","nature","forest","climate","plant"]},
  {name:"COMMUNITY",desc:"지역사회를 연결합니다.",left:"81%",top:"54%",keywords:["지역","마을","커뮤니티","협력","다문화","community","local","village","network"]},
  {name:"RESOURCE",desc:"자원을 연결합니다.",left:"63%",top:"64%",keywords:["자원","지원","교육","데이터","플랫폼","resource","data","education","platform"]},
  {name:"ACTION",desc:"행동으로 변화를 만듭니다.",left:"75%",top:"78%",keywords:["활동","행동","탐사","복원","식재","봉사","제거","action","restore","volunteer","planting"]},
];

function todayKey(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;}
function media(post?:Post){if(!post?.image_key)return "/assets/earth-network.png";return post.image_key.startsWith("/")?post.image_key:`/api/media/${encodeURIComponent(post.image_key)}`;}
function searchable(post:Post){return `${post.title_ko||""} ${post.title_en||""} ${post.excerpt_ko||""} ${post.excerpt_en||""} ${post.content_ko||""} ${post.content_en||""}`.toLowerCase();}

export default function InteractiveFrontClient({posts}:Props){
 const canvasRef=useRef<HTMLCanvasElement|null>(null);
 const heroRef=useRef<HTMLElement|null>(null);
 const [popupOpen,setPopupOpen]=useState(false);
 const popupNotice=useMemo(()=>posts.find(p=>p.type==="notice"&&Boolean(p.is_pinned))||posts.find(p=>p.type==="notice")||null,[posts]);
 const activityImages=useMemo(()=>posts.filter(p=>p.type==="activity"&&p.image_key),[posts]);
 const featureImages=useMemo(()=>FEATURES.map((feature,index)=>{
   const matched=activityImages.find(post=>feature.keywords.some(keyword=>searchable(post).includes(keyword.toLowerCase())));
   return matched||activityImages[index%Math.max(activityImages.length,1)];
  }),[activityImages]);

 useEffect(()=>{if(!popupNotice)return;const key=`linkimpact-notice-popup-${popupNotice.id}`;if(localStorage.getItem(key)!==todayKey())setPopupOpen(true);},[popupNotice]);
 const hidePopupToday=()=>{if(popupNotice)localStorage.setItem(`linkimpact-notice-popup-${popupNotice.id}`,todayKey());setPopupOpen(false);};

 useEffect(()=>{
  const canvas=canvasRef.current,hero=heroRef.current;if(!canvas||!hero)return;
  const ctx=canvas.getContext("2d");if(!ctx)return;
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile=window.matchMedia("(max-width: 767px)").matches;
  let width=0,height=0,dpr=1,raf=0,mouse={x:-9999,y:-9999,on:false};
  let dots:Dot[]=[];let ripples:Ripple[]=[];
  const anchors=[[.68,.20],[.84,.31],[.81,.54],[.64,.63],[.74,.76]];
  const reset=()=>{
   const r=hero.getBoundingClientRect();width=r.width;height=r.height;dpr=Math.min(window.devicePixelRatio||1,1.6);
   canvas.width=Math.floor(width*dpr);canvas.height=Math.floor(height*dpr);canvas.style.width=`${width}px`;canvas.style.height=`${height}px`;ctx.setTransform(dpr,0,0,dpr,0,0);
   dots=Array.from({length:mobile?18:34},(_,i)=>({x:Math.random()*width,y:Math.random()*height,vx:(Math.random()-.5)*.24,vy:(Math.random()-.5)*.24,active:i<5?.65:0}));
   anchors.forEach((a,i)=>{if(dots[i]){dots[i].x=a[0]*width;dots[i].y=a[1]*height;dots[i].vx=0;dots[i].vy=0;}});
  };
  const point=(e:PointerEvent)=>{const r=canvas.getBoundingClientRect();mouse={x:e.clientX-r.left,y:e.clientY-r.top,on:true};};
  const leave=()=>{mouse.on=false;};
  const pulse=(e:PointerEvent)=>{const r=canvas.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;ripples.push({x,y,r:0,a:1});dots.forEach(d=>{const dist=Math.hypot(d.x-x,d.y-y);if(dist<180)d.active=Math.max(d.active,1-dist/200);});};
  const draw=()=>{
   ctx.clearRect(0,0,width,height);
   if(!reduced)dots.forEach((d,i)=>{if(i>=5){d.x+=d.vx;d.y+=d.vy;if(d.x<0||d.x>width)d.vx*=-1;if(d.y<0||d.y>height)d.vy*=-1;}d.active*=.991;if(mouse.on){const dist=Math.hypot(d.x-mouse.x,d.y-mouse.y);if(dist<190)d.active=Math.max(d.active,(190-dist)/190);}});
   const max=mobile?120:175;
   for(let i=0;i<dots.length;i++)for(let j=i+1;j<dots.length;j++){
    const a=dots[i],b=dots[j],dist=Math.hypot(a.x-b.x,a.y-b.y);if(dist>max)continue;
    const energy=Math.max(a.active,b.active);const alpha=(1-dist/max)*(.08+energy*.38);if(alpha<.035)continue;
    ctx.strokeStyle=`rgba(108,230,198,${alpha})`;ctx.lineWidth=.65+energy*.7;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
    if(energy>.35){const t=(performance.now()*.00018+i*.13+j*.07)%1;ctx.fillStyle=`rgba(219,255,242,${Math.min(.9,energy)})`;ctx.beginPath();ctx.arc(a.x+(b.x-a.x)*t,a.y+(b.y-a.y)*t,1.4,0,Math.PI*2);ctx.fill();}
   }
   ripples=ripples.filter(r=>r.a>.03);ripples.forEach(r=>{r.r+=2.5;r.a*=.965;ctx.strokeStyle=`rgba(74,222,170,${r.a*.55})`;ctx.lineWidth=1.1;ctx.beginPath();ctx.arc(r.x,r.y,r.r,0,Math.PI*2);ctx.stroke();dots.forEach(d=>{const dist=Math.hypot(d.x-r.x,d.y-r.y);if(Math.abs(dist-r.r)<14)d.active=Math.max(d.active,.82);});});
   dots.forEach((d,i)=>{const anchor=i<5,rr=anchor?3.8:1.7+d.active*1.4;ctx.shadowBlur=anchor?16+d.active*8:5+d.active*7;ctx.shadowColor="rgba(72,230,179,.8)";ctx.fillStyle=anchor?"rgba(208,255,237,.95)":`rgba(174,235,216,${.38+d.active*.55})`;ctx.beginPath();ctx.arc(d.x,d.y,rr,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;});
   raf=requestAnimationFrame(draw);
  };
  reset();window.addEventListener("resize",reset);canvas.addEventListener("pointermove",point);canvas.addEventListener("pointerleave",leave);canvas.addEventListener("pointerdown",pulse);draw();
  return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",reset);canvas.removeEventListener("pointermove",point);canvas.removeEventListener("pointerleave",leave);canvas.removeEventListener("pointerdown",pulse);};
 },[]);

 const popupImage=media(popupNotice||undefined);
 return <main className="min-h-screen bg-[#030a0e] text-white">
  {popupOpen&&popupNotice?<div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4"><div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#09171b] shadow-2xl"><button onClick={()=>setPopupOpen(false)} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/50"><X size={18}/></button><div className="aspect-[16/8] bg-cover bg-center" style={{backgroundImage:`url("${popupImage}")`}}/><div className="p-6"><div className="text-xs font-bold tracking-[.2em] text-emerald-300">NOTICE</div><h2 className="mt-3 text-2xl font-bold">{popupNotice.title_ko}</h2><p className="mt-3 line-clamp-3 text-sm leading-7 text-white/65">{popupNotice.excerpt_ko||popupNotice.content_ko}</p><div className="mt-6 flex items-center justify-between gap-3"><button onClick={hidePopupToday} className="text-sm text-white/50">오늘 하루 보지 않기</button><Link href={`/news/${popupNotice.id}`} className="inline-flex items-center gap-2 rounded-full bg-emerald-300 px-5 py-3 text-sm font-bold text-[#061014]">자세히 보기 <ArrowRight size={15}/></Link></div></div></div></div>:null}

  <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden bg-[#02090d]">
   <div className="absolute inset-0 bg-cover bg-[center_top] md:bg-[center_42%]" style={{backgroundImage:"url('/assets/earth-network.png')"}}/>
   <div className="absolute inset-0 bg-[radial-gradient(circle_at_73%_43%,rgba(21,123,111,.05),rgba(2,9,13,.10)_32%,rgba(2,9,13,.82)_78%),linear-gradient(90deg,rgba(2,8,12,.98)_0%,rgba(2,8,12,.93)_34%,rgba(2,8,12,.28)_62%,rgba(2,8,12,.28)_100%)]"/>
   <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#02090d] via-[#02090d]/55 to-transparent"/>
   <canvas ref={canvasRef} className="absolute inset-0 z-[3] h-full w-full touch-none" aria-hidden="true"/>

   <header className="relative z-30 mx-auto flex h-24 max-w-[1360px] items-center justify-between px-6 lg:px-10">
    <Link href="/" className="flex items-center"><img src="/assets/linkimpact-logo.png" alt="LINKIMPACT 로고" className="h-11 w-auto md:h-14"/></Link>
    <a href="https://together.kakao.com/fundraisings/139701/story" target="_blank" rel="noreferrer" className="rounded-full bg-emerald-300 px-5 py-3 text-xs font-black tracking-[.08em] text-[#05100d] transition hover:-translate-y-0.5">DONATE</a>
   </header>

   <div className="relative z-20 mx-auto flex min-h-[calc(100svh-6rem)] max-w-[1360px] items-center px-6 pb-28 pt-4 lg:px-10">
    <div className="max-w-[660px]">
     <div className="mb-6 text-[10px] font-semibold tracking-[.38em] text-white/55 md:text-xs">PEOPLE CONNECT NATURE · A BRIGHTER TOMORROW</div>
     <h1 className="text-[clamp(3.7rem,7.7vw,7.7rem)] font-black leading-[.84] tracking-[-.065em] drop-shadow-[0_12px_35px_rgba(0,0,0,.38)]">LINKED TO<br/><span className="text-emerald-300">CHANGE</span> THE WORLD</h1>
     <h2 className="mt-8 text-2xl font-extrabold md:text-3xl">연결이 변화를 만듭니다.</h2>
     <p className="mt-4 max-w-xl text-base leading-8 text-white/70 md:text-lg">사람과 자원, 행동을 연결해<br className="hidden sm:block"/>지역사회의 지속가능한 변화를 만듭니다.</p>
     <div className="mt-8 flex flex-wrap gap-3">
      <Link href="/news?type=activity" className="inline-flex items-center gap-3 rounded-full bg-emerald-300 px-6 py-4 text-sm font-black text-[#04100c] transition hover:-translate-y-0.5">OUR WORK <ArrowRight size={17}/></Link>
      <a href="https://www.naturelens.kr" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full border border-white/50 bg-black/20 px-6 py-4 text-sm font-bold backdrop-blur-sm transition hover:bg-white/10">NATURELENS <ExternalLink size={15}/></a>
     </div>
    </div>
   </div>

   <div className="pointer-events-none absolute inset-0 z-10 hidden md:block">
    {FEATURES.map((f,i)=><div key={f.name} className="group pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2" style={{left:f.left,top:f.top}}>
      <div className="flex items-center gap-4 transition duration-300 group-hover:scale-105">
       <div className="h-[122px] w-[122px] overflow-hidden rounded-full border-2 border-white/85 bg-black/50 shadow-[0_0_34px_rgba(83,220,181,.42)]"><img src={media(featureImages[i])} alt={`${f.name} 관련 활동`} className="h-full w-full object-cover opacity-95"/></div>
       <div className="whitespace-nowrap drop-shadow-[0_3px_10px_rgba(0,0,0,.95)]"><div className="text-[14px] font-black tracking-[.04em]">{f.name}</div><div className="mt-1 text-[12px] font-medium text-white/78">{f.desc}</div></div>
      </div>
     </div>)}
   </div>
  </section>
 </main>;
}
