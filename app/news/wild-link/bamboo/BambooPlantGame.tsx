"use client";

import { useEffect, useMemo, useState } from "react";

const KAKAO_URL = "https://together.kakao.com/fundraisings/139701/story";
const GAME_SECONDS = 10;

type Phase = "intro" | "play" | "complete" | "learn";

type LearnCard = {
  no:string;
  title:string;
  body:string;
  kind:"roots"|"water"|"climate"|"community";
};

const LEARN_CARDS:LearnCard[] = [
  {no:"01",title:"흙을 지키는 뿌리",body:"대나무의 촘촘한 뿌리와 지하경은 토양을 붙잡아 침식과 토사 유실을 줄이는 데 기여할 수 있습니다.",kind:"roots"},
  {no:"02",title:"물과 생태계",body:"식생이 자리 잡은 강변은 빗물 흐름을 완화하고 다양한 생물이 머물 수 있는 환경을 만드는 데 도움이 됩니다.",kind:"water"},
  {no:"03",title:"기후위기에 강한 회복력",body:"대나무는 빠르게 자라고 탄소를 흡수합니다. 다만 식재만으로 재난을 막는 것이 아니라 토양·물·생태계 관리와 함께 접근해야 합니다.",kind:"climate"},
  {no:"04",title:"사람과 지역의 지속가능한 미래",body:"복원된 자연은 지역의 안전, 생물다양성, 친환경 일자리와 자원 활용로 이어질 수 있습니다.",kind:"community"},
];

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

function PixelIllustration({kind}:{kind:LearnCard["kind"]}){
  if(kind==="roots") return <svg viewBox="0 0 320 180" className="h-full w-full [image-rendering:pixelated]"><rect width="320" height="180" fill="#9bdcff"/><rect y="92" width="320" height="88" fill="#8a623d"/><rect x="148" y="20" width="18" height="90" fill="#3b8a39"/><path d="M157 105L108 156M158 106L132 174M158 106L183 174M159 108L215 157" stroke="#d8c06c" strokeWidth="8"/><rect x="90" y="78" width="140" height="10" fill="#6fad4d"/></svg>;
  if(kind==="water") return <svg viewBox="0 0 320 180" className="h-full w-full"><rect width="320" height="180" fill="#a8e3ff"/><rect y="90" width="320" height="90" fill="#55b5db"/><rect y="76" width="320" height="18" fill="#5b8a43"/><circle cx="82" cy="112" r="8" fill="#d7f2ff"/><path d="M20 132h90M145 118h120M70 154h170" stroke="#d7f2ff" strokeWidth="6"/><circle cx="238" cy="134" r="12" fill="#d6a45a"/></svg>;
  if(kind==="climate") return <svg viewBox="0 0 320 180" className="h-full w-full"><rect width="320" height="180" fill="#dff5ff"/><rect x="148" y="30" width="20" height="120" fill="#438e3a"/><circle cx="70" cy="55" r="30" fill="#7b8790"/><text x="48" y="63" fontSize="23" fontWeight="900" fill="white">CO₂</text><path d="M104 64h42M126 48l20 16-20 16" stroke="#4c9ddd" strokeWidth="8" fill="none"/><path d="M205 65c24-26 50 0 26 20-16 14-38 4-26-20z" fill="#65b84c"/></svg>;
  return <svg viewBox="0 0 320 180" className="h-full w-full"><rect width="320" height="180" fill="#d6f0ff"/><rect y="110" width="320" height="70" fill="#81a952"/><circle cx="105" cy="86" r="24" fill="#3e8f3d"/><rect x="98" y="85" width="14" height="55" fill="#6a4d2c"/><circle cx="225" cy="92" r="27" fill="#479843"/><rect x="218" y="90" width="14" height="50" fill="#6a4d2c"/><circle cx="145" cy="130" r="22" fill="#f1c28c"/><circle cx="182" cy="130" r="22" fill="#a86d4f"/><rect x="128" y="151" width="75" height="10" fill="#285f35"/></svg>;
}

export default function BambooPlantGame(){
 const [phase,setPhase]=useState<Phase>("intro");
 const [count,setCount]=useState(0);
 const [left,setLeft]=useState(GAME_SECONDS);
 const [learnOpen,setLearnOpen]=useState(false);

 useEffect(()=>{if(phase!=="play")return;const started=Date.now();const id=window.setInterval(()=>{const l=Math.max(0,GAME_SECONDS-(Date.now()-started)/1000);setLeft(l);if(l<=0){clearInterval(id);setPhase("complete")}},50);return()=>clearInterval(id)},[phase]);
 function start(){setCount(0);setLeft(GAME_SECONDS);setLearnOpen(false);setPhase("play")}
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
        <button onClick={()=>{setLearnOpen(true);setPhase("learn")}} className="border-4 border-[#17343d] bg-[#28b95b] px-6 py-4 font-black shadow-[5px_5px_0_#17343d]">자세히 알아보기</button>
        <button onClick={start} className="border-4 border-[#17343d] bg-[#172f3c] px-6 py-4 font-black shadow-[5px_5px_0_#17343d]">다시 심기</button>
      </div>
    </div>
  </div>}

  {phase==="learn"&&<div className="bg-[#f3edda] p-5 text-[#14303a] sm:p-8">
    <div className="text-center"><div className="text-sm font-black tracking-[.22em] text-[#2f7a43]">BAMBOO RESTORATION</div><h2 className="mt-2 text-3xl font-black sm:text-5xl">대나무 한 그루가 만드는 변화</h2><p className="mt-3 text-sm font-bold text-[#4d626a]">게임에서 심은 대나무처럼, 실제 식재는 강과 지역사회의 회복에 여러 방식으로 연결됩니다.</p></div>
    <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {LEARN_CARDS.map(card=><article key={card.no} className="border-4 border-[#17343d] bg-[#fffaf0] p-4 shadow-[6px_6px_0_#17343d]">
        <div className="inline-block bg-[#17343d] px-3 py-1 text-sm font-black text-white">{card.no}</div>
        <h3 className="mt-3 text-xl font-black">{card.title}</h3>
        <div className="mt-3 h-36 overflow-hidden border-2 border-[#17343d] bg-white"><PixelIllustration kind={card.kind}/></div>
        <p className="mt-4 text-sm font-semibold leading-6 text-[#42565d]">{card.body}</p>
      </article>)}
    </div>
    <div className="mt-7 border-4 border-[#17343d] bg-white p-5 text-center shadow-[6px_6px_0_#17343d]">
      <p className="text-xl font-black">“지금의 작은 행동이, 내일의 더 푸른 세상을 만듭니다.”</p>
      <p className="mt-2 text-xs font-black tracking-[.18em]">LINKIMPACT · LINKED TO CHANGE THE WORLD</p>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <a href={KAKAO_URL} target="_blank" rel="noreferrer" className="border-4 border-[#17343d] bg-[#fee500] px-6 py-3 font-black shadow-[4px_4px_0_#17343d]">실제 행동으로 연결하기 →</a>
        <button onClick={start} className="border-4 border-[#17343d] bg-[#28b95b] px-6 py-3 font-black text-white shadow-[4px_4px_0_#17343d]">다시 심기</button>
      </div>
    </div>
  </div>}
 </div>
}
