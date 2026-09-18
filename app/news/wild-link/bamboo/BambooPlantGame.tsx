"use client";

import { useEffect, useMemo, useState } from "react";

const KAKAO_URL = "https://together.kakao.com/fundraisings/139701/story";
const GAME_SECONDS = 10;

type Phase = "intro" | "play" | "complete" | "learn";

const LEARN_CARD_IMAGES = [
  "/assets/bamboo-card-01.webp",
  "/assets/bamboo-card-02.webp",
  "/assets/bamboo-card-03.webp",
  "/assets/bamboo-card-04.webp",
  "/assets/bamboo-card-05.webp",
] as const;

const BAMBOO_POSITIONS = [
  [15,62],[27,68],[39,58],[52,65],[66,55],[79,66],[88,58],[20,45],[34,50],[47,43],
  [61,49],[75,41],[90,45],[10,35],[30,34],[49,30],[69,31],[85,28]
] as const;

function PixelBamboo({index}:{index:number}){
  const [left,bottom]=BAMBOO_POSITIONS[index % BAMBOO_POSITIONS.length];
  const h=70+(index%4)*12;
  return <div className="absolute z-20 origin-bottom animate-[bambooGrow_.35s_steps(5,end)_both]" style={{left:`${left}%`,bottom:`${bottom}%`,transform:"translateX(-50%)"}}>
    <div className="relative" style={{width:24,height:h}}>
      <div className="absolute bottom-0 left-1/2 h-full w-[7px] -translate-x-1/2 border-x-2 border-[#215f2d] bg-[#53b448] shadow-[3px_0_0_#173f20]"/>
      {[22,44,66].map((y,n)=><span key={n} className="absolute left-1/2 h-[4px] w-[12px] -translate-x-1/2 bg-[#173f20]" style={{bottom:`${y}%`}} />)}
      <span className="absolute left-[-2px] top-[18%] h-[10px] w-[16px] rotate-[-30deg] bg-[#69cb51] shadow-[2px_2px_0_#246c31]"/>
      <span className="absolute right-[-3px] top-[38%] h-[10px] w-[16px] rotate-[28deg] bg-[#69cb51] shadow-[2px_2px_0_#246c31]"/>
      <span className="absolute left-[-4px] top-[58%] h-[9px] w-[14px] rotate-[-25deg] bg-[#56b849] shadow-[2px_2px_0_#246c31]"/>
    </div>
  </div>
}

function PixelRiverScene({count=0,interactive=false,onTap}:{count?:number;interactive?:boolean;onTap?:()=>void}){
  const bambooCount=Math.min(count,BAMBOO_POSITIONS.length);
  return <button type="button" onPointerDown={interactive?onTap:undefined} className="relative block min-h-[620px] w-full overflow-hidden bg-[#7ed0ff] text-left outline-none sm:min-h-[700px]">
    <div className="absolute inset-0 [image-rendering:pixelated]">
      <div className="absolute inset-x-0 top-0 h-[34%] bg-[#68bdf3]"/>
      <div className="absolute left-[6%] top-[10%] h-8 w-16 bg-white shadow-[12px_8px_0_#dff4ff,28px_0_0_white]"/>
      <div className="absolute right-[13%] top-[7%] h-7 w-14 bg-white shadow-[10px_7px_0_#dff4ff,25px_0_0_white]"/>
      <div className="absolute inset-x-0 top-[26%] h-[19%] bg-[#4f95c8] [clip-path:polygon(0_100%,18%_45%,34%_70%,51%_22%,69%_68%,84%_35%,100%_80%,100%_100%)]"/>
      <div className="absolute inset-x-0 top-[36%] h-[14%] bg-[#9aa8b6]"/>
      <div className="absolute inset-x-[4%] top-[39%] h-5 bg-[#4c5963] shadow-[0_8px_0_#bec9d0]"/>
      <div className="absolute inset-x-0 top-[50%] h-[27%] bg-[#4db0df] shadow-[inset_0_8px_0_#8bd4f2]"/>
      {Array.from({length:18}).map((_,i)=><span key={i} className="absolute h-[4px] w-10 bg-[#b8ecff]/80" style={{left:`${(i*11)%94}%`,top:`${54+(i%5)*4}%`}} />)}
      <div className="absolute inset-x-0 bottom-0 h-[32%] bg-[#7a8a45]"/>
      <div className="absolute inset-x-0 bottom-0 h-[24%] bg-[#9b7a45] [clip-path:polygon(0_28%,12%_8%,24%_25%,38%_3%,50%_20%,63%_5%,77%_24%,90%_4%,100%_16%,100%_100%,0_100%)]"/>
      {Array.from({length:20}).map((_,i)=><span key={i} className="absolute h-3 w-3 bg-[#7e623d] shadow-[5px_3px_0_#6e5535]" style={{left:`${(i*17)%96}%`,bottom:`${5+(i%6)*3}%`}} />)}
    </div>
    {Array.from({length:bambooCount}).map((_,i)=><PixelBamboo key={i} index={i}/>)}
    <div className="absolute bottom-6 left-5 z-30 flex items-end gap-3">
      <div className="grid h-20 w-16 place-items-center border-4 border-[#1f2d35] bg-[#f4d6a5] text-4xl shadow-[6px_6px_0_#1f2d35]">🧑🏻‍🌾</div>
      <div className="max-w-[260px] border-4 border-[#1f2d35] bg-[#f7f1dd] px-4 py-3 text-sm font-black leading-6 text-[#18252c] shadow-[6px_6px_0_#1f2d35]">
        강변을 터치해서<br/>대나무를 심어주세요!
      </div>
    </div>
  </button>
}

export default function BambooPlantGame(){
 const [phase,setPhase]=useState<Phase>("intro");
 const [count,setCount]=useState(0);
 const [left,setLeft]=useState(GAME_SECONDS);
 const [learnIndex,setLearnIndex]=useState(0);

 useEffect(()=>{if(phase!=="play")return;const started=Date.now();const id=window.setInterval(()=>{const l=Math.max(0,GAME_SECONDS-(Date.now()-started)/1000);setLeft(l);if(l<=0){clearInterval(id);setPhase("complete")}},50);return()=>clearInterval(id)},[phase]);
 function start(){setCount(0);setLeft(GAME_SECONDS);setLearnIndex(0);setPhase("play")}
 function plant(){if(phase!=="play")return;setCount(v=>Math.min(100,v+1));if(navigator.vibrate&&count%4===0)navigator.vibrate(12)}
 const bambooCount=useMemo(()=>Math.min(count,BAMBOO_POSITIONS.length),[count]);

 return <div className="overflow-hidden border-4 border-[#142630] bg-[#0e2732] text-white shadow-[10px_10px_0_#142630]">
  {phase==="intro"&&<div className="relative min-h-[700px]">
    <PixelRiverScene count={4}/>
    <div className="absolute inset-0 z-40 bg-gradient-to-r from-[#0a2940]/85 via-[#0a2940]/20 to-transparent"/>
    <div className="absolute left-6 top-8 z-50 sm:left-10 sm:top-10"><div className="text-sm font-black tracking-widest">LINKIMPACT</div><div className="mt-14 max-w-md"><div className="text-[clamp(2.4rem,7vw,5.4rem)] font-black leading-[.9] text-[#d6ff5e] [text-shadow:5px_5px_0_#132b34]">BAMBOO<br/>FOR TOMORROW</div><p className="mt-5 text-lg font-black">작은 행동이 더 건강한 자연을 만듭니다.</p></div></div>
    <button onClick={start} className="absolute bottom-8 left-1/2 z-50 -translate-x-1/2 border-4 border-[#17343d] bg-[#26b95b] px-8 py-4 text-lg font-black shadow-[6px_6px_0_#17343d] active:translate-y-1 active:shadow-[2px_2px_0_#17343d]">터치해서 대나무를 심어주세요</button>
  </div>}

  {phase==="play"&&<div className="relative min-h-[700px]">
    <PixelRiverScene count={bambooCount} interactive onTap={plant}/>
    <div className="pointer-events-none absolute left-5 right-5 top-5 z-50 flex justify-end gap-3">
      <div className="border-4 border-[#18323e] bg-[#0b3650]/95 px-5 py-3 font-black shadow-[5px_5px_0_#18323e]">🎋 {count} / 100</div>
      <div className="border-4 border-[#18323e] bg-[#0b3650]/95 px-5 py-3 font-black shadow-[5px_5px_0_#18323e]">TIME {left.toFixed(1)}</div>
    </div>
  </div>}

  {phase==="complete"&&<div className="relative min-h-[700px] overflow-hidden">
    <PixelRiverScene count={18}/>
    <div className="absolute inset-0 z-40 bg-[#061922]/65 backdrop-blur-[2px]"/>
    <div className="absolute inset-x-0 top-20 z-50 text-center">
      <div className="text-[clamp(3rem,8vw,6rem)] font-black leading-none text-[#ffdb43] [text-shadow:5px_5px_0_#473715]">MISSION<br/>COMPLETE!</div>
      <div className="mx-auto mt-5 w-fit border-4 border-[#17343d] bg-[#0b3650] px-6 py-3 text-xl font-black shadow-[5px_5px_0_#17343d]">🎋 {count} / 100</div>
      <p className="mt-5 font-black">당신의 작은 행동이 더 푸른 강변을 만들었습니다.</p>
      <div className="mt-8 flex justify-center gap-3">
        <button onClick={()=>{setLearnIndex(0);setPhase("learn")}} className="border-4 border-[#17343d] bg-[#28b95b] px-6 py-4 font-black shadow-[5px_5px_0_#17343d]">자세히 알아보기</button>
        <button onClick={start} className="border-4 border-[#17343d] bg-[#172f3c] px-6 py-4 font-black shadow-[5px_5px_0_#17343d]">다시 심기</button>
      </div>
    </div>
  </div>}

  {phase==="learn"&&(()=>{
    const isLast=learnIndex===LEARN_CARD_IMAGES.length-1;
    const next=()=>{if(!isLast)setLearnIndex(v=>Math.min(LEARN_CARD_IMAGES.length-1,v+1));};
    return <div className="relative min-h-[700px] bg-[#0e2732] p-4 sm:p-7">
      <div className="mx-auto flex min-h-[650px] max-w-3xl flex-col items-center justify-center">
        <div className="mb-4 flex w-full max-w-[620px] items-center justify-between text-xs font-black tracking-[.15em] text-white/80">
          <span>LINKIMPACT · BAMBOO FOR TOMORROW</span>
          <span>{learnIndex+1} / {LEARN_CARD_IMAGES.length}</span>
        </div>

        <button type="button" onClick={next} aria-label={isLast?"마지막 설명 카드":"다음 설명 카드"} className="group relative flex w-full max-w-[620px] flex-1 items-center justify-center overflow-hidden rounded-2xl bg-[#eef5f7] p-2 shadow-[8px_8px_0_#07171e] sm:p-3">
          <img
            key={LEARN_CARD_IMAGES[learnIndex]}
            src={LEARN_CARD_IMAGES[learnIndex]}
            alt={`대나무 식재 설명 카드 ${learnIndex+1}`}
            className="max-h-[70vh] w-auto max-w-full object-contain [image-rendering:auto]"
          />
          {!isLast&&<span className="absolute bottom-4 right-4 rounded-full bg-[#0e2732]/90 px-4 py-2 text-sm font-black text-white shadow-lg transition group-hover:translate-x-1">눌러서 다음 →</span>}
        </button>

        <div className="mt-5 flex w-full max-w-[620px] items-center justify-between gap-3">
          <button disabled={learnIndex===0} onClick={()=>setLearnIndex(v=>Math.max(0,v-1))} className="border-4 border-white/80 bg-[#17343d] px-5 py-3 font-black text-white shadow-[4px_4px_0_#07171e] disabled:opacity-25">← 이전</button>
          <div className="flex gap-2">
            {LEARN_CARD_IMAGES.map((_,i)=><button key={i} onClick={()=>setLearnIndex(i)} aria-label={`${i+1}번 카드`} className={`h-3 w-3 rounded-full ${i===learnIndex?"bg-[#67d267]":"bg-white/35"}`}/>)}
          </div>
          {isLast?<div className="flex gap-2">
            <a href={KAKAO_URL} target="_blank" rel="noreferrer" className="border-4 border-[#17343d] bg-[#fee500] px-4 py-3 text-sm font-black text-[#17343d] shadow-[4px_4px_0_#07171e]">실제 행동으로 →</a>
            <button onClick={start} className="border-4 border-white/80 bg-[#28b95b] px-4 py-3 text-sm font-black text-white shadow-[4px_4px_0_#07171e]">다시 심기</button>
          </div>:<button onClick={next} className="border-4 border-white/80 bg-[#28b95b] px-6 py-3 font-black text-white shadow-[4px_4px_0_#07171e]">다음 →</button>}
        </div>
      </div>
    </div>;
  })()}
 </div>
}
