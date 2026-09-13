"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Post } from "../lib/content";

type NodeKind = "PEOPLE" | "NATURE" | "COMMUNITY" | "RESOURCE" | "ACTION";
type Node = { x:number; y:number; vx:number; vy:number; r:number; kind:NodeKind; active:number; anchor?:boolean };
type Ripple = { x:number; y:number; radius:number; alpha:number };

type Props = { posts: Post[]; showAdmin: boolean };

const LABELS: Record<NodeKind,string> = {
  PEOPLE: "사람과 사람을 연결합니다.",
  NATURE: "사람의 삶과 자연을 연결합니다.",
  COMMUNITY: "지역의 문제와 필요한 자원을 연결합니다.",
  RESOURCE: "필요한 자원을 변화의 현장과 연결합니다.",
  ACTION: "연결을 실제 행동으로 전환합니다.",
};

function todayKey(){
  const d=new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

export default function InteractiveFrontClient({posts,showAdmin}:Props){
  const canvasRef=useRef<HTMLCanvasElement|null>(null);
  const wrapRef=useRef<HTMLDivElement|null>(null);
  const [hovered,setHovered]=useState<{kind:NodeKind;x:number;y:number}|null>(null);
  const [popupOpen,setPopupOpen]=useState(false);
  const popupNotice=useMemo(()=>posts.find(post=>post.type==="notice"&&Boolean(post.is_pinned))||null,[posts]);

  useEffect(()=>{
    if(!popupNotice) return;
    const key=`linkimpact-notice-popup-${popupNotice.id}`;
    if(localStorage.getItem(key)!==todayKey()) setPopupOpen(true);
  },[popupNotice]);

  const hidePopupToday=()=>{
    if(popupNotice) localStorage.setItem(`linkimpact-notice-popup-${popupNotice.id}`,todayKey());
    setPopupOpen(false);
  };

  useEffect(()=>{
    const canvas=canvasRef.current;
    const wrap=wrapRef.current;
    if(!canvas||!wrap) return;
    const ctx=canvas.getContext("2d");
    if(!ctx) return;

    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile=window.matchMedia("(max-width: 767px)").matches;
    let dpr=Math.min(window.devicePixelRatio||1,1.75);
    let width=0,height=0,raf=0,start=performance.now();
    let mouse={x:-9999,y:-9999,active:false};
    let ripples:Ripple[]=[];
    const kinds:NodeKind[]=["PEOPLE","NATURE","COMMUNITY","RESOURCE","ACTION"];
    let nodes:Node[]=[];

    const makeNodes=()=>{
      const count=mobile?20:38;
      nodes=Array.from({length:count},(_,i)=>({
        x:Math.random()*width,
        y:Math.random()*height,
        vx:(Math.random()-.5)*(mobile?.18:.24),
        vy:(Math.random()-.5)*(mobile?.18:.24),
        r:i<5?(mobile?3.4:4.3):(1.4+Math.random()*1.8),
        kind:kinds[i%kinds.length],
        active:i<5?.3:0,
        anchor:i<5,
      }));
      const anchors=nodes.filter(n=>n.anchor);
      const positions=mobile
        ? [[.72,.24],[.78,.42],[.70,.60],[.82,.72],[.60,.78]]
        : [[.68,.20],[.81,.34],[.72,.52],[.84,.66],[.63,.75]];
      anchors.forEach((n,i)=>{n.x=positions[i][0]*width;n.y=positions[i][1]*height;});
    };

    const resize=()=>{
      const rect=wrap.getBoundingClientRect(); width=rect.width; height=rect.height;
      dpr=Math.min(window.devicePixelRatio||1,1.75);
      canvas.width=Math.max(1,Math.floor(width*dpr)); canvas.height=Math.max(1,Math.floor(height*dpr));
      canvas.style.width=`${width}px`; canvas.style.height=`${height}px`;
      ctx.setTransform(dpr,0,0,dpr,0,0);
      makeNodes();
    };

    const pointer=(e:PointerEvent)=>{
      const rect=canvas.getBoundingClientRect(); mouse={x:e.clientX-rect.left,y:e.clientY-rect.top,active:true};
      let nearest:Node|null=null; let best=38;
      nodes.forEach(n=>{const dist=Math.hypot(n.x-mouse.x,n.y-mouse.y);if(dist<best){best=dist;nearest=n;}});
      if(nearest&&nearest.anchor) setHovered({kind:nearest.kind,x:nearest.x,y:nearest.y}); else setHovered(null);
    };
    const leave=()=>{mouse.active=false;setHovered(null)};
    const click=(e:PointerEvent)=>{
      const rect=canvas.getBoundingClientRect(); const x=e.clientX-rect.left,y=e.clientY-rect.top;
      ripples.push({x,y,radius:0,alpha:1});
      nodes.forEach(n=>{const d=Math.hypot(n.x-x,n.y-y);if(d<150)n.active=Math.max(n.active,1-d/180)});
    };

    const draw=()=>{
      const now=performance.now(); const elapsed=(now-start)/1000;
      ctx.clearRect(0,0,width,height);
      const grad=ctx.createRadialGradient(width*.72,height*.48,0,width*.72,height*.48,Math.max(width,height)*.72);
      grad.addColorStop(0,"rgba(36,97,83,0.18)"); grad.addColorStop(.5,"rgba(7,35,43,0.05)"); grad.addColorStop(1,"rgba(3,13,18,0)");
      ctx.fillStyle=grad; ctx.fillRect(0,0,width,height);

      if(!reduced){
        nodes.forEach(n=>{
          if(!n.anchor){n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>width)n.vx*=-1;if(n.y<0||n.y>height)n.vy*=-1;}
          n.active*=.992;
          if(mouse.active){const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);if(d<170)n.active=Math.max(n.active,(170-d)/170);}
        });
      }

      const auto=Math.min(1,Math.max(0,(elapsed-1.2)/6));
      const maxDist=mobile?105:145;
      for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++){
        const a=nodes[i],b=nodes[j],dx=a.x-b.x,dy=a.y-b.y,dist=Math.hypot(dx,dy);
        if(dist>maxDist) continue;
        const activity=Math.max(a.active,b.active);
        const threshold=.18+auto*.42+activity*.5;
        if((1-dist/maxDist)>threshold) continue;
        const alpha=Math.min(.34,.03+auto*.08+activity*.22)*(1-dist/maxDist+.2);
        ctx.strokeStyle=`rgba(155,220,196,${alpha})`; ctx.lineWidth=.7+activity*.6;
        ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
        if(activity>.28){const phase=(now*.00022+i*.17+j*.09)%1;const px=a.x+(b.x-a.x)*phase,py=a.y+(b.y-a.y)*phase;ctx.fillStyle=`rgba(214,246,231,${Math.min(.8,activity)})`;ctx.beginPath();ctx.arc(px,py,1.35,0,Math.PI*2);ctx.fill();}
      }

      ripples=ripples.filter(r=>r.alpha>.025);
      ripples.forEach(r=>{r.radius+=reduced?0:2.2;r.alpha*=.965;ctx.strokeStyle=`rgba(116,216,176,${r.alpha*.45})`;ctx.lineWidth=1;ctx.beginPath();ctx.arc(r.x,r.y,r.radius,0,Math.PI*2);ctx.stroke();nodes.forEach(n=>{const d=Math.hypot(n.x-r.x,n.y-r.y);if(Math.abs(d-r.radius)<13)n.active=Math.max(n.active,.7);});});

      nodes.forEach(n=>{
        const glow=n.anchor?10+n.active*12:4+n.active*7;
        ctx.shadowBlur=glow;ctx.shadowColor=n.anchor?"rgba(126,230,185,.65)":"rgba(141,205,190,.35)";
        ctx.fillStyle=n.anchor?`rgba(187,241,214,${.75+n.active*.2})`:`rgba(180,210,205,${.35+n.active*.45})`;
        ctx.beginPath();ctx.arc(n.x,n.y,n.r+n.active*1.8,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
        if(n.anchor&&!mobile){ctx.font="600 11px system-ui";ctx.fillStyle="rgba(226,242,237,.72)";ctx.fillText(n.kind,n.x+10,n.y+4);}
      });
      raf=requestAnimationFrame(draw);
    };

    resize(); window.addEventListener("resize",resize); canvas.addEventListener("pointermove",pointer); canvas.addEventListener("pointerleave",leave); canvas.addEventListener("pointerdown",click); draw();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);canvas.removeEventListener("pointermove",pointer);canvas.removeEventListener("pointerleave",leave);canvas.removeEventListener("pointerdown",click);};
  },[]);

  const popupImage=popupNotice?.image_key?(popupNotice.image_key.startsWith("/")?popupNotice.image_key:`/api/media/${encodeURIComponent(popupNotice.image_key)}`):"/assets/earth-network.png";

  return <main className="min-h-screen bg-[#061014] text-white">
    {popupOpen&&popupNotice?<div className="fixed inset-0 z-[100] grid place-items-center bg-black/60 p-4"><div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#0b171b] shadow-2xl"><button onClick={()=>setPopupOpen(false)} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/45"><X size={18}/></button><div className="aspect-[16/8] bg-cover bg-center" style={{backgroundImage:`url(\"${popupImage}\")`}}/><div className="p-6"><div className="text-xs font-bold tracking-[.2em] text-emerald-300">NOTICE</div><h2 className="mt-3 text-2xl font-bold">{popupNotice.title_ko}</h2><p className="mt-3 line-clamp-3 text-sm leading-7 text-white/65">{popupNotice.excerpt_ko||popupNotice.content_ko}</p><div className="mt-6 flex items-center justify-between gap-3"><button onClick={hidePopupToday} className="text-sm text-white/50">오늘 하루 보지 않기</button><Link href={`/news/${popupNotice.id}`} className="inline-flex items-center gap-2 rounded-full bg-emerald-300 px-5 py-3 text-sm font-bold text-[#061014]">자세히 보기 <ArrowRight size={15}/></Link></div></div></div></div>:null}

    <section ref={wrapRef} className="relative min-h-[100svh] overflow-hidden bg-[radial-gradient(circle_at_75%_45%,rgba(19,63,62,.28),transparent_38%),linear-gradient(135deg,#061014_0%,#08171b_48%,#071115_100%)]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full touch-none" aria-hidden="true"/>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(3,10,14,.96)_0%,rgba(3,10,14,.78)_38%,rgba(3,10,14,.18)_72%,rgba(3,10,14,.48)_100%)]"/>

      <header className="relative z-20 mx-auto flex h-24 max-w-[1240px] items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3"><img src="/assets/linkimpact-logo.png" alt="LINKIMPACT 로고" className="h-10 w-auto md:h-12"/><span className="text-lg font-extrabold tracking-[-.03em] md:text-xl">LINKIMPACT</span></Link>
        <div className="flex items-center gap-3 text-xs font-bold tracking-[.12em] text-white/65"><Link href="/news?type=notice" className="hidden hover:text-white sm:block">NOTICE</Link>{showAdmin?<Link href="/admin" className="hidden hover:text-white md:block">ADMIN</Link>:null}</div>
      </header>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-6rem)] max-w-[1240px] items-center px-6 pb-16 pt-8 lg:px-8">
        <div className="max-w-[680px]">
          <div className="mb-6 text-[11px] font-semibold tracking-[.34em] text-emerald-200/70">PEOPLE · NATURE · COMMUNITY · RESOURCE · ACTION</div>
          <h1 className="text-[clamp(3.8rem,9vw,8.5rem)] font-black leading-[.82] tracking-[-.07em]">LINKED TO<br/><span className="text-emerald-300">CHANGE</span> THE WORLD</h1>
          <h2 className="mt-8 text-2xl font-bold md:text-3xl">연결이 변화를 만듭니다.</h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/64 md:text-lg">사람과 자원, 행동을 연결해<br className="hidden sm:block"/> 지역사회의 지속가능한 변화를 만듭니다.</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/news?type=activity" className="inline-flex items-center gap-3 rounded-full bg-emerald-300 px-6 py-4 text-sm font-extrabold text-[#061014] transition hover:scale-[1.02]">OUR WORK <ArrowRight size={17}/></Link>
            <a href="https://www.naturelens.kr" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full border border-white/22 bg-white/5 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/10">NATURELENS <ExternalLink size={15}/></a>
            <a href="https://together.kakao.com/fundraisings/139701/story" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full border border-emerald-300/55 px-6 py-4 text-sm font-bold text-emerald-200 transition hover:bg-emerald-300/10">DONATE <ExternalLink size={15}/></a>
          </div>
          <Link href="/news?type=notice" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white/45 hover:text-white/80">공지사항 보기 <ArrowRight size={15}/></Link>
        </div>
      </div>

      {hovered?<div className="pointer-events-none absolute z-20 hidden w-56 rounded-2xl border border-white/10 bg-[#0b171b]/95 p-4 shadow-2xl backdrop-blur md:block" style={{left:Math.min(hovered.x+18,window.innerWidth-250),top:Math.max(hovered.y-30,110)}}><div className="text-xs font-black tracking-[.16em] text-emerald-300">{hovered.kind}</div><p className="mt-2 text-sm leading-6 text-white/65">{LABELS[hovered.kind]}</p></div>:null}

      <div className="pointer-events-none absolute bottom-7 left-1/2 z-20 -translate-x-1/2 text-center"><div className="text-[10px] font-semibold tracking-[.32em] text-white/35">MOVE · CONNECT · CLICK</div><div className="mx-auto mt-3 h-8 w-px bg-gradient-to-b from-emerald-300/60 to-transparent"/></div>
    </section>
  </main>;
}
