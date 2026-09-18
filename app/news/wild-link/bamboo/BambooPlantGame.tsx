"use client";

import { useEffect, useMemo, useState } from "react";

const KAKAO_URL = "https://together.kakao.com/fundraisings/139701/story";
const GAME_SECONDS = 10;

type Phase = "intro" | "play" | "bridge" | "story" | "action";

const INTRO_IMAGE =
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1600&q=88";
const RIVER_IMAGE =
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=88";

const slides = [
  {k:"01 · CLIMATE DISASTER",t:"태풍과 홍수는 자연현상으로 끝나지 않습니다.",b:"강한 비와 바람이 취약한 지역을 덮치면 침수와 토양 유실, 농경지와 주거지 피해로 이어지고 결국 지역 주민의 삶과 생계가 흔들립니다.",c:["태풍·집중호우","침수·침식","생활터전 피해","지역사회 위기"]},
  {k:"02 · NATURE'S BUFFER",t:"자연의 완충 기능이 약해지면 피해 위험도 커질 수 있습니다.",b:"건강한 식생과 토양은 빗물을 머금고 토양을 붙잡는 데 기여합니다. 식생이 훼손된 상태에서 강한 기후 충격이 겹치면 토양 유실과 빗물 유출에 더 취약해질 수 있습니다.",c:["식생","토양 보호","물 흐름 완화","회복력"]},
  {k:"03 · WHY BAMBOO?",t:"대나무를 심는 것은 하나의 회복 행동입니다.",b:"적절한 지역과 방식으로 관리되는 대나무 식재는 뿌리와 식생 피복을 통해 토양 보호와 지역 환경 회복에 기여할 수 있습니다. 대나무 자체가 태풍이나 홍수를 막는다는 뜻은 아닙니다.",c:["식재","토양 보호","환경 회복","재해 회복력"]},
  {k:"04 · BEYOND PLANTING",t:"심고 끝내지 않습니다.",b:"대나무를 지속가능하게 재배하고 지역 자원으로 활용하면 가공과 제품, 일자리와 소득으로 연결될 수 있습니다. 환경 회복이 지역사회의 자립과 경제 회복으로 이어지는 구조를 만듭니다.",c:["대나무","지역 자원","일자리·소득","지역경제"]},
  {k:"05 · LINKIMPACT",t:"환경을 지키는 일은 삶의 터전을 지키는 일입니다.",b:"LINKIMPACT는 환경과 사회의 문제로 삶의 터전을 위협받는 지역사회의 문제를 발견하고, 사람과 자원, 행동을 연결해 지속가능한 변화를 만듭니다.",c:["문제 발견","사람·자원","행동 연결","지속가능한 변화"]},
];

const BAMBOO_POSITIONS = [
  [8,68],[15,61],[22,72],[29,58],[36,67],[43,54],[50,65],[57,60],[64,69],[71,55],
  [78,64],[85,57],[91,70],[12,49],[20,43],[32,47],[46,41],[60,46],[74,39],[88,45],
  [6,38],[25,34],[39,31],[54,35],[68,28],[82,32],[94,37],[17,25],[48,22],[77,20]
] as const;

function Bamboo({index}:{index:number}){
  const [left,bottom]=BAMBOO_POSITIONS[index % BAMBOO_POSITIONS.length];
  const scale=.72+(index%5)*.07;
  const delay=(index%7)*35;
  return <div
    className="pointer-events-none absolute origin-bottom animate-[bambooGrow_.42s_cubic-bezier(.2,.9,.25,1.2)_both]"
    style={{left:`${left}%`,bottom:`${bottom}%`,transform:`translateX(-50%) scale(${scale})`,animationDelay:`${delay}ms`}}
  >
    <svg width="42" height="130" viewBox="0 0 42 130" aria-hidden="true" className="drop-shadow-[0_6px_7px_rgba(16,62,32,.35)]">
      <path d="M21 126 C20 96 21 66 20 10" stroke="#285c35" strokeWidth="5" strokeLinecap="round"/>
      <path d="M20 105h7M20 82h7M20 59h7M20 36h7" stroke="#8fb85e" strokeWidth="2"/>
      <path d="M20 24 C8 14 4 23 17 33" fill="#5f9e49"/>
      <path d="M21 43 C36 31 39 42 24 53" fill="#78af54"/>
      <path d="M20 63 C7 52 4 63 17 72" fill="#4f9140"/>
      <path d="M21 83 C36 72 39 82 24 93" fill="#6da84b"/>
      <path d="M20 102 C9 94 6 103 17 112" fill="#4e8b3b"/>
    </svg>
  </div>
}

export default function BambooPlantGame(){
 const [phase,setPhase]=useState<Phase>("intro");
 const [count,setCount]=useState(0);
 const [left,setLeft]=useState(GAME_SECONDS);
 const [step,setStep]=useState(0);

 useEffect(()=>{if(phase!=="play")return; const started=Date.now(); const id=window.setInterval(()=>{const l=Math.max(0,GAME_SECONDS-(Date.now()-started)/1000);setLeft(l);if(l<=0){clearInterval(id);setPhase("bridge")}},50);return()=>clearInterval(id)},[phase]);

 function start(){setCount(0);setLeft(GAME_SECONDS);setPhase("play")}
 function plant(){if(phase!=="play")return;setCount(v=>Math.min(100,v+1));if(navigator.vibrate&&count%5===0)navigator.vibrate(15)}
 const s=slides[step];
 const visibleBamboo=useMemo(()=>Math.min(count,BAMBOO_POSITIONS.length),[count]);

 return <div className="overflow-hidden rounded-[32px] bg-[#143b24] text-white shadow-2xl">
  <div className="relative min-h-[720px]">
   <div className="absolute left-6 right-6 top-6 z-20 flex justify-between text-xs font-bold tracking-[.16em] text-white/85 sm:left-10 sm:right-10 sm:top-10">
    <span>BAMBOO LINK · SOVAC 2026</span><span>LINKIMPACT</span>
   </div>

   {phase==="intro"&&<div className="relative min-h-[720px] overflow-hidden">
    <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage:`url("${INTRO_IMAGE}")`}}/>
    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/5 to-black/65"/>
    <div className="absolute inset-x-0 top-24 px-7 sm:px-12">
      <h1 className="max-w-lg text-4xl font-black leading-tight sm:text-6xl">작은 행동이<br/>더 푸른 강변을 만듭니다.</h1>
    </div>
    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
      <button onClick={start} className="mx-auto block w-full max-w-md rounded-[32px] bg-white/95 px-7 py-7 text-center text-[#143b24] shadow-2xl backdrop-blur">
        <span className="block text-3xl">☝</span>
        <span className="mt-2 block text-2xl font-black">터치해서<br/>대나무를 심어주세요</span>
        <span className="mt-3 block text-sm font-bold text-[#4b6d52]">함께 만드는 더 푸른 강변</span>
      </button>
    </div>
   </div>}

   {phase==="play"&&<button onPointerDown={plant} className="relative block min-h-[720px] w-full touch-manipulation overflow-hidden text-left outline-none">
    <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage:`url("${RIVER_IMAGE}")`}}/>
    <div className="absolute inset-0 bg-gradient-to-b from-sky-900/10 via-transparent to-[#2d4c31]/35"/>
    <div className="absolute left-6 top-24 z-20 rounded-full bg-black/55 px-4 py-2 text-sm font-black backdrop-blur sm:left-10">
      터치하면 강변에 심어져요
    </div>
    <div className="absolute right-6 top-24 z-20 flex gap-2 sm:right-10">
      <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-black text-[#143b24]">{left.toFixed(1)}초</span>
      <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-black text-[#143b24]">🎋 {count} / 100</span>
    </div>
    <div className="absolute inset-0 z-10">
      {Array.from({length:visibleBamboo}).map((_,i)=><Bamboo key={i} index={i}/>)}
    </div>
    <div className="absolute inset-x-0 bottom-8 z-20 px-6 text-center">
      <div className="mx-auto max-w-md rounded-full bg-white/90 px-5 py-3 text-sm font-black text-[#143b24] shadow-lg">
        화면을 터치할 때마다 대나무가 한 그루씩 자랍니다.
      </div>
    </div>
   </button>}

   {phase==="bridge"&&<div className="min-h-[720px] p-6 pt-28 sm:p-10 sm:pt-32"><div className="mx-auto max-w-xl text-center"><div className="text-7xl">🎋</div><p className="mt-5 font-black text-[#d7ff58]">MISSION COMPLETE</p><h2 className="mt-3 text-5xl font-black">{count}그루를 심었습니다.</h2><div className="mt-8 rounded-3xl border border-[#d7ff58]/30 bg-black/15 p-7"><h3 className="text-3xl font-black text-[#d7ff58]">그런데 잠깐!</h3><p className="mt-4 text-lg leading-8">대나무를 심으면 정말 태풍과 홍수를 막을 수 있을까요?</p></div><button onClick={()=>{setStep(0);setPhase("story")}} className="mt-8 h-16 w-16 rounded-full bg-[#d7ff58] text-3xl font-black text-[#143b24]">→</button><p className="mt-3 text-xs font-bold tracking-widest text-lime-100/60">재난에서 회복까지 · 5개의 연결</p></div></div>}

   {phase==="story"&&<div className="min-h-[720px] p-6 pt-28 sm:p-10 sm:pt-32"><div className="mx-auto max-w-2xl"><div className="flex justify-between text-xs font-black tracking-widest text-[#d7ff58]"><span>{s.k}</span><span>{step+1} / {slides.length}</span></div><div className="mt-5 rounded-[32px] bg-white p-7 text-[#143b24] sm:p-10"><h2 className="text-3xl font-black leading-tight sm:text-5xl">{s.t}</h2><p className="mt-6 text-lg leading-8 text-slate-600">{s.b}</p><div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">{s.c.map((x,i)=><div key={x} className="relative rounded-2xl bg-lime-50 p-4 text-center text-sm font-black">{x}{i<s.c.length-1&&<span className="absolute -right-2 hidden sm:inline">→</span>}</div>)}</div></div><div className="mt-6 flex justify-between"><button disabled={step===0} onClick={()=>setStep(v=>Math.max(0,v-1))} className="rounded-full border border-white/30 px-5 py-3 disabled:opacity-30">← 이전</button>{step<slides.length-1?<button onClick={()=>setStep(v=>v+1)} className="h-14 w-14 rounded-full bg-[#d7ff58] text-2xl font-black text-[#143b24]">→</button>:<button onClick={()=>setPhase("action")} className="rounded-full bg-[#d7ff58] px-7 py-4 font-black text-[#143b24]">실제 행동으로 →</button>}</div></div></div>}

   {phase==="action"&&<div className="min-h-[720px] p-6 pt-28 sm:p-10 sm:pt-32"><div className="mx-auto max-w-xl text-center"><p className="text-sm font-black tracking-[.2em] text-[#d7ff58]">FROM GAME TO ACTION</p><h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">게임 속 대나무를<br/>실제 변화로 연결해 주세요.</h2><div className="mt-8 rounded-[32px] bg-white p-7 text-[#143b24]"><div className="text-6xl">🌱</div><p className="mt-4 text-xl font-black">필리핀 기후재난 지역의 회복을 응원합니다.</p><p className="mt-3 leading-7 text-slate-600">카카오같이가치에서 댓글·응원·공유 또는 직접기부로 참여할 수 있습니다. 참여 방식에 따른 기부 적용 여부는 카카오같이가치 모금함에서 확인해 주세요.</p><a href={KAKAO_URL} target="_blank" rel="noreferrer" className="mt-7 block rounded-full bg-[#fee500] px-6 py-4 font-black text-[#191919]">💬 댓글로 대나무 심기 · 카카오같이가치 →</a></div><button onClick={start} className="mt-5 text-sm font-bold text-lime-100/70 underline">다시 심기</button></div></div>}
  </div>
 </div>
}
