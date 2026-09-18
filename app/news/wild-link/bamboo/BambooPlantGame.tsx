"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const KAKAO_URL = "https://together.kakao.com/fundraisings/139701/story";
const GAME_SECONDS = 30;

type Phase = "intro" | "play" | "rank" | "learn";

type LeaderRow = { player_name:string; score:number; created_at:string };

const LEARN_CARDS = [
  {
    no:"01",
    title:"왜 대나무를 심을까요?",
    body:"기후변화로 인한 집중호우, 하천 범람, 토사 유실로 강변 생태계가 위협받고 있습니다.",
    titleEn:"Why plant bamboo?",
    bodyEn:"Climate-driven heavy rain, river flooding, and soil erosion are putting riverside ecosystems at risk.",
    kind:"why" as const,
  },
  {
    no:"02",
    title:"대나무의 힘",
    body:"대나무는 빠르게 자라고, 뿌리가 강해 토양을 단단히 고정합니다. 또한 탄소를 흡수해 기후변화 대응에 도움이 됩니다.",
    titleEn:"The power of bamboo",
    bodyEn:"Bamboo grows quickly and its strong roots help stabilize soil. It also absorbs carbon, supporting climate action.",
    kind:"power" as const,
  },
  {
    no:"03",
    title:"어떻게 심을까요?",
    body:"강변 환경에 맞는 장소를 선택하고 건강한 대나무 묘목을 심은 뒤, 뿌리가 자리 잡을 수 있도록 꾸준히 관리합니다.",
    titleEn:"How do we plant it?",
    bodyEn:"We choose suitable riverside sites, plant healthy bamboo seedlings, and care for them so their roots can establish.",
    kind:"how" as const,
  },
  {
    no:"04",
    title:"이렇게 변화합니다",
    body:"대나무와 식생이 자리 잡으면 강변이 안정되고, 식물이 돌아오는 건강한 생태계가 다시 만들어집니다.",
    titleEn:"How the site changes",
    bodyEn:"As bamboo and other vegetation establish, the riverbank becomes more stable and a healthier ecosystem can recover.",
    kind:"change" as const,
  },
  {
    no:"05",
    title:"더 큰 변화를 위해",
    body:"당신의 작은 터치가 건강한 강, 안전한 지역사회, 지속가능한 미래로 이어집니다.",
    titleEn:"For greater change",
    bodyEn:"Your small action can connect to healthier rivers, safer communities, and a more sustainable future.",
    kind:"future" as const,
  },
] as const;

const BAMBOO_POSITIONS = [
  [16,55],[24,61],[31,51],[39,59],[47,50],[55,58],[63,49],[71,56],[79,48],[87,55],
  [19,39],[28,44],[37,37],[46,43],[55,36],[64,42],[73,35],[82,40],[91,34],[12,33],
  [22,27],[33,30],[44,25],[57,29],[69,24],[80,28],[89,23],[16,21],[50,20],[75,19]
] as const;

function PixelFarmer({small=false}:{small?:boolean}) {
  const s=small?104:168;
  return <svg width={s} height={s} viewBox="0 0 84 84" aria-hidden="true" className="[image-rendering:pixelated] drop-shadow-[6px_7px_0_rgba(15,35,42,.45)]">
    <g shapeRendering="crispEdges">
      <rect x="16" y="8" width="50" height="8" fill="#efe0a7"/>
      <rect x="22" y="3" width="38" height="7" fill="#f4e5ae"/>
      <rect x="29" y="10" width="22" height="8" fill="#f5e8b6"/>
      <rect x="34" y="6" width="7" height="8" fill="#2f8a48"/>
      <rect x="21" y="18" width="42" height="28" fill="#6c4a35"/>
      <rect x="27" y="20" width="30" height="27" fill="#f0bf8a"/>
      <rect x="29" y="28" width="5" height="5" fill="#1b2630"/>
      <rect x="50" y="28" width="5" height="5" fill="#1b2630"/>
      <rect x="38" y="37" width="10" height="4" fill="#b66458"/>
      <rect x="18" y="44" width="48" height="10" fill="#f4f1e6"/>
      <rect x="20" y="52" width="44" height="18" fill="#2e7848"/>
      <rect x="28" y="48" width="7" height="22" fill="#265f3c"/>
      <rect x="49" y="48" width="7" height="22" fill="#265f3c"/>
      <rect x="23" y="69" width="15" height="9" fill="#245d92"/>
      <rect x="46" y="69" width="15" height="9" fill="#245d92"/>
      <rect x="20" y="77" width="20" height="5" fill="#2e2a29"/>
      <rect x="44" y="77" width="20" height="5" fill="#2e2a29"/>
      <rect x="9" y="51" width="12" height="8" fill="#f0bf8a"/>
      <rect x="63" y="51" width="12" height="8" fill="#f0bf8a"/>
    </g>
  </svg>
}

function PixelBird() {
  return <svg width="74" height="58" viewBox="0 0 74 58" aria-hidden="true" className="[image-rendering:pixelated]">
    <g shapeRendering="crispEdges">
      <rect x="18" y="22" width="34" height="22" fill="#9b642e"/>
      <rect x="12" y="27" width="12" height="12" fill="#c68a42"/>
      <rect x="46" y="16" width="16" height="19" fill="#b87a37"/>
      <rect x="56" y="20" width="6" height="6" fill="#171f25"/>
      <rect x="62" y="24" width="8" height="4" fill="#d9a53e"/>
      <rect x="24" y="42" width="5" height="10" fill="#694622"/>
      <rect x="42" y="42" width="5" height="10" fill="#694622"/>
    </g>
  </svg>
}

function PixelBamboo({index}:{index:number}) {
  const [left,bottom]=BAMBOO_POSITIONS[index % BAMBOO_POSITIONS.length];
  const h=62+(index%5)*11;
  return <div className="pointer-events-none absolute z-30 origin-bottom animate-[bambooGrow_.32s_steps(5,end)_both]" style={{left:`${left}%`,bottom:`${bottom}%`,transform:"translateX(-50%)"}}>
    <div className="relative" style={{width:28,height:h}}>
      <div className="absolute bottom-0 left-1/2 h-full w-[9px] -translate-x-1/2 border-x-[2px] border-[#1a612d] bg-[#62c94f] shadow-[4px_0_0_#174424]"/>
      {[18,39,61,81].map((y,n)=><span key={n} className="absolute left-1/2 h-[4px] w-[14px] -translate-x-1/2 bg-[#194f28]" style={{bottom:`${y}%`}} />)}
      <span className="absolute left-[-1px] top-[16%] h-[11px] w-[17px] rotate-[-29deg] bg-[#7ddd58] shadow-[3px_3px_0_#2d7a3b]"/>
      <span className="absolute right-[-2px] top-[36%] h-[11px] w-[18px] rotate-[28deg] bg-[#7ddd58] shadow-[3px_3px_0_#2d7a3b]"/>
      <span className="absolute left-[-4px] top-[56%] h-[10px] w-[16px] rotate-[-28deg] bg-[#62c94f] shadow-[3px_3px_0_#2d7a3b]"/>
    </div>
  </div>
}

function PixelRiverScene({count=0,interactive=false,onTap,showGuide=false,compact=false,lang="ko"}:{count?:number;interactive?:boolean;onTap?:()=>void;showGuide?:boolean;compact?:boolean;lang?:"ko"|"en"}) {
  const bambooCount=Math.min(count,BAMBOO_POSITIONS.length);
  return <button type="button" onPointerDown={interactive?onTap:undefined} className={"relative block w-full touch-manipulation overflow-hidden bg-[#75c8fa] text-left outline-none "+(compact?"min-h-[520px] sm:min-h-[580px]":"min-h-[720px]")}>
    <div className="absolute inset-0 [image-rendering:pixelated]">
      <div className="absolute inset-x-0 top-0 h-[43%] bg-[#69bdf3]"/>
      <div className="absolute left-[4%] top-[8%] h-6 w-14 bg-white shadow-[14px_8px_0_#e6f6ff,30px_0_0_white]"/>
      <div className="absolute right-[10%] top-[10%] h-6 w-14 bg-white shadow-[12px_8px_0_#e6f6ff,28px_0_0_white]"/>
      <div className="absolute left-[45%] top-[8%] h-5 w-12 bg-white shadow-[10px_7px_0_#e6f6ff,24px_0_0_white]"/>
      <div className="absolute inset-x-0 top-[25%] h-[20%] bg-[#458bc5] [clip-path:polygon(0_100%,14%_62%,28%_78%,43%_42%,52%_58%,61%_22%,71%_60%,85%_39%,100%_75%,100%_100%)]"/>
      <div className="absolute left-[60%] top-[19%] h-[14%] w-[2px] bg-[#345978] shadow-[3px_0_0_#d6edf9]"/>
      <div className="absolute left-[59.2%] top-[18%] h-[6px] w-[12px] bg-[#344f69]"/>
      <div className="absolute inset-x-[10%] top-[36%] flex h-[8%] items-end gap-[5px] overflow-hidden">
        {Array.from({length:42}).map((_,i)=><span key={i} className="block w-[10px] bg-[#d8e6ec] shadow-[inset_2px_0_0_#9cb1bf]" style={{height:`${20+(i%6)*7}px`}}/>)}
      </div>
      <div className="absolute inset-x-0 top-[43%] h-[7%] bg-[#52616b]"/>
      <div className="absolute inset-x-[2%] top-[44%] h-[11px] bg-[#d5dde2] shadow-[0_8px_0_#3b4850]"/>
      <div className="absolute inset-x-0 top-[50%] h-[28%] bg-[#4daee1] shadow-[inset_0_8px_0_#8fdbf8]"/>
      {Array.from({length:26}).map((_,i)=><span key={i} className="absolute h-[4px] bg-[#d5f2ff]/85" style={{width:`${22+(i%4)*10}px`,left:`${(i*13)%94}%`,top:`${54+(i%6)*3.4}%`}} />)}
      <div className="absolute inset-x-0 bottom-0 h-[32%] bg-[#779547]"/>
      <div className="absolute inset-x-0 bottom-0 h-[25%] bg-[#9a7a4a] [clip-path:polygon(0_24%,9%_9%,18%_22%,30%_4%,40%_20%,52%_3%,64%_19%,76%_5%,88%_22%,100%_8%,100%_100%,0_100%)]"/>
      <div className="absolute inset-x-0 bottom-[23%] h-[8%] bg-[#7ca64e]"/>
      {Array.from({length:34}).map((_,i)=><span key={i} className="absolute h-3 w-3 bg-[#6f8d42] shadow-[6px_3px_0_#527333]" style={{left:`${(i*19)%96}%`,bottom:`${8+(i%7)*3.2}%`}} />)}
      {Array.from({length:22}).map((_,i)=><span key={i} className="absolute h-3 w-4 bg-[#8b6944] shadow-[4px_4px_0_#6c5237]" style={{left:`${(i*23)%95}%`,bottom:`${2+(i%5)*4}%`}} />)}
    </div>

    {Array.from({length:bambooCount}).map((_,i)=><PixelBamboo key={i} index={i}/>)}

    {showGuide&&<div className="pointer-events-none absolute inset-x-0 bottom-5 z-40 flex items-end gap-3 px-4 sm:px-8">
      <PixelFarmer small/>
      <div className="relative max-w-[310px] border-4 border-[#203744] bg-[#fffdf2] px-5 py-4 text-sm font-black leading-6 text-[#162630] shadow-[6px_6px_0_#203744]">
        {lang==="ko"?<>강변을 여러 번 터치해서<br/>더 푸르게 만들어주세요!</>:<>Tap the riverbank repeatedly<br/>to make it greener!</>}
        <span className="absolute -left-3 bottom-6 h-5 w-5 rotate-45 border-b-4 border-l-4 border-[#203744] bg-[#fffdf2]"/>
      </div>
    </div>}
  </button>
}

function LearnIllustration({kind,lang}:{kind:(typeof LEARN_CARDS)[number]["kind"];lang:"ko"|"en"}) {
  if(kind==="why") return <div className="relative h-full min-h-[210px] overflow-hidden bg-[#80cef6] sm:min-h-[280px]">
    <div className="absolute inset-x-0 top-[52%] h-[48%] bg-[#4ca8d4]"/>
    <div className="absolute inset-x-0 bottom-0 h-[35%] bg-[#947448] [clip-path:polygon(0_25%,12%_4%,24%_22%,37%_5%,50%_24%,64%_8%,78%_26%,90%_9%,100%_22%,100%_100%,0_100%)]"/>
    <div className="absolute inset-x-0 top-[34%] h-[9%] bg-[#d8e2e7] shadow-[0_8px_0_#56656e]"/>
    <div className="absolute inset-x-[8%] top-[26%] flex h-[9%] items-end gap-1">{Array.from({length:30}).map((_,i)=><span key={i} className="w-2 bg-[#d8e6ec] shadow-[inset_1px_0_0_#9cb1bf]" style={{height:`${16+(i%5)*7}px`}}/>)}</div>
    <div className="absolute left-[13%] top-[18%] h-[28%] w-[40%] bg-[#4c8dc0] [clip-path:polygon(0_100%,18%_55%,35%_78%,52%_35%,67%_62%,82%_42%,100%_78%,100%_100%)]"/>
    <div className="absolute bottom-[9%] left-[8%] h-[12%] w-[84%] bg-[#6f8d42]/70"/>
  </div>;

  if(kind==="power") return <div className="relative h-full min-h-[210px] overflow-hidden bg-[#b7e6f6] sm:min-h-[280px]">
    <div className="absolute inset-x-0 bottom-0 h-[46%] bg-[#7d5a35]"/>
    <div className="absolute left-1/2 top-[4%] h-[72%] w-7 -translate-x-1/2 border-x-4 border-[#245c2f] bg-[#5fbd46] shadow-[7px_0_0_#347d37]"/>
    <div className="absolute left-1/2 top-[52%] h-[5px] w-[78%] -translate-x-1/2 bg-[#b99954]"/>
    {[[-34,63,-20],[-18,72,-6],[0,74,0],[18,72,6],[34,63,20]].map(([x,y,r],i)=><span key={i} className="absolute left-1/2 top-[55%] h-[38%] w-[7px] origin-top bg-[#d1ae5f]" style={{transform:`translateX(${x}px) rotate(${r}deg)`}}/>)}
    <div className="absolute left-[6%] top-[18%] rounded-lg border-4 border-[#17343d] bg-[#17343d] px-3 py-2 text-center text-xs font-black text-white sm:text-sm">{lang==="ko"?<>빠른 성장<br/>(연 3~5m)</>:<>Fast growth<br/>(3–5m/year)</>}</div>
    <div className="absolute right-[4%] top-[14%] rounded-lg border-4 border-[#17343d] bg-[#17343d] px-3 py-2 text-center text-xs font-black text-white sm:text-sm">{lang==="ko"?<>강한 뿌리<br/>(토양 고정)</>:<>Strong roots<br/>(soil stability)</>}</div>
    <div className="absolute right-[5%] bottom-[8%] rounded-lg border-4 border-[#17343d] bg-[#17343d] px-3 py-2 text-center text-xs font-black text-white sm:text-sm">{lang==="ko"?<>탄소 흡수<br/>(CO₂ 저장)</>:<>Carbon uptake<br/>(CO₂ storage)</>}</div>
  </div>;

  if(kind==="how") return <div className="relative h-full min-h-[210px] overflow-hidden bg-[#9edcf7] sm:min-h-[280px]">
    <div className="absolute inset-x-0 bottom-0 h-[38%] bg-[#8d6740]"/>
    <div className="absolute bottom-[18%] left-[14%] scale-[.72] sm:scale-100"><PixelFarmer small/></div>
    <div className="absolute bottom-[18%] left-[57%] h-[48%] w-[14px] border-x-4 border-[#245c2f] bg-[#5fbd46]"/>
    <div className="absolute bottom-[38%] left-[52%] h-4 w-12 -rotate-[28deg] bg-[#78cf58] shadow-[4px_4px_0_#347d37]"/>
    <div className="absolute bottom-[48%] left-[61%] h-4 w-12 rotate-[28deg] bg-[#78cf58] shadow-[4px_4px_0_#347d37]"/>
    <div className="absolute bottom-[10%] right-[8%] h-12 w-14 rounded bg-[#47a6c9] shadow-[4px_4px_0_#2b718d]"/>
  </div>;

  if(kind==="change") return <div className="grid h-full min-h-[210px] grid-cols-2 overflow-hidden sm:min-h-[280px]">
    <div className="relative bg-[#cfa873]">
      <div className="absolute inset-x-0 top-0 bg-[#83cef5] h-[35%]"/>
      <div className="absolute inset-x-0 bottom-0 h-[58%] bg-[#9a7447]"/>
      <div className="absolute left-3 top-3 rounded bg-[#17343d] px-3 py-1 text-xs font-black text-white sm:text-sm">BEFORE</div>
      {Array.from({length:9}).map((_,i)=><span key={i} className="absolute h-3 w-4 bg-[#70583f]" style={{left:`${8+(i*19)%85}%`,bottom:`${8+(i%4)*10}%`}}/>)}
    </div>
    <div className="relative bg-[#7fbf54]">
      <div className="absolute inset-x-0 top-0 bg-[#83cef5] h-[35%]"/>
      <div className="absolute inset-x-0 bottom-0 h-[58%] bg-[#79a34b]"/>
      <div className="absolute left-3 top-3 rounded bg-[#497a28] px-3 py-1 text-xs font-black text-white sm:text-sm">AFTER</div>
      {Array.from({length:10}).map((_,i)=><span key={i} className="absolute bottom-[12%] w-2 border-x-2 border-[#245c2f] bg-[#55b945]" style={{left:`${7+i*9}%`,height:`${70+(i%4)*18}px`}}/>)}
    </div>
  </div>;

  return <div className="relative h-full min-h-[210px] overflow-hidden bg-[#d8f1fb] sm:min-h-[280px]">
    <div className="absolute left-1/2 top-[16%] h-[130px] w-[130px] -translate-x-1/2 rounded-full bg-[#2b8bd0] shadow-[inset_-18px_-12px_0_#1b6fae] sm:h-[170px] sm:w-[170px]">
      <span className="absolute left-[18%] top-[24%] h-[22%] w-[40%] rounded-full bg-[#62c85c]"/>
      <span className="absolute right-[10%] top-[42%] h-[30%] w-[35%] rounded-full bg-[#62c85c]"/>
      <span className="absolute bottom-[10%] left-[30%] h-[24%] w-[30%] rounded-full bg-[#62c85c]"/>
    </div>
    {[[10,18],[78,16],[8,68],[80,68]].map(([x,y],i)=><span key={i} className="absolute h-16 w-12" style={{left:`${x}%`,top:`${y}%`}}><span className="absolute bottom-0 left-1/2 h-8 w-2 -translate-x-1/2 bg-[#6c4b2f]"/><span className="absolute left-0 top-0 h-11 w-12 rounded-full bg-[#3c913e] shadow-[inset_-6px_-5px_0_#2c7131]"/></span>)}
  </div>;
}

function LearnCard({index,lang}:{index:number;lang:"ko"|"en"}) {
  const card=LEARN_CARDS[index];
  return <article className="flex h-full w-full flex-col overflow-hidden rounded-[22px] bg-[#f7faf8] text-[#132b36]">
    <div className="flex items-center gap-3 px-4 pb-3 pt-4 sm:gap-4 sm:px-7 sm:pb-4 sm:pt-6">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#17343d] text-sm font-black text-white sm:h-12 sm:w-12 sm:text-base">{card.no}</span>
      <h2 className="text-[clamp(1.45rem,5.3vw,2.25rem)] font-black leading-tight tracking-[-.03em]">>{lang==="ko"?card.title:card.titleEn}</h2>
    </div>
    <div className="mx-4 overflow-hidden rounded-xl border-[3px] border-[#17343d]/15 sm:mx-7"><LearnIllustration kind={card.kind} lang={lang}/></div>
    <div className="flex flex-1 flex-col justify-between px-4 py-4 sm:px-7 sm:py-6">
      <p className="text-[clamp(.98rem,3.7vw,1.2rem)] font-semibold leading-[1.65] text-[#334d56]">>{lang==="ko"?card.body:card.bodyEn}</p>
      {index===4?<div className="mt-4 border-t border-[#17343d]/15 pt-4 text-center">
        <div className="text-[clamp(1.45rem,5vw,2rem)] font-black tracking-[-.03em]">LINKIMPACT</div>
        <div className="mt-1 text-[9px] font-black tracking-[.16em] text-[#55706f] sm:text-[11px]">LINKED TO CHANGE THE WORLD</div>
      </div>:null}
    </div>
  </article>;
}

function StatusBar({count,left,lang}:{count:number;left:number;lang:"ko"|"en"}) {
  const m=Math.floor(left/60);
  const s=Math.floor(left%60).toString().padStart(2,"0");
  return <div className="pointer-events-none absolute left-3 right-3 top-3 z-50 flex items-center justify-between gap-2 sm:left-6 sm:right-6 sm:top-5 sm:gap-3">
    <div className="flex min-w-0 items-center gap-2 border-[3px] border-[#18323e] bg-[#0b3650] px-3 py-2 text-base font-black shadow-[4px_4px_0_#18323e] sm:min-w-[150px] sm:border-4 sm:px-4 sm:py-3 sm:text-xl sm:shadow-[5px_5px_0_#18323e]">
      <span className="text-xl sm:text-2xl">🎋</span><span className="truncate">{count}{lang==="ko"?"그루":" planted"}</span>
    </div>
    <div className="shrink-0 border-[3px] border-[#18323e] bg-[#0b3650] px-3 py-2 text-base font-black text-[#ffe15b] shadow-[4px_4px_0_#18323e] sm:border-4 sm:px-4 sm:py-3 sm:text-lg sm:shadow-[5px_5px_0_#18323e]">TIME {m}:{s}</div>
  </div>
}

export default function BambooPlantGame() {
  const [phase,setPhase]=useState<Phase>("intro");
  const [lang,setLang]=useState<"ko"|"en">("ko");
  const [count,setCount]=useState(0);
  const [left,setLeft]=useState(GAME_SECONDS);
  const [learnIndex,setLearnIndex]=useState(0);
  const [leaderboard,setLeaderboard]=useState<LeaderRow[]>([]);
  const [rank,setRank]=useState<number|null>(null);
  const [playerName,setPlayerName]=useState("");
  const [rankLoading,setRankLoading]=useState(false);
  const countRef=useRef(0);
  const submittedRef=useRef(false);

  function start(){
    submittedRef.current=false;
    countRef.current=0;
    setCount(0);
    setLeft(GAME_SECONDS);
    setLearnIndex(0);
    setLeaderboard([]);
    setRank(null);
    setPlayerName("");
    setPhase("play");
  }

  const finishGame=useCallback(async (finalScore:number)=>{
    if(submittedRef.current) return;
    submittedRef.current=true;
    setPhase("rank");
    setRankLoading(true);
    try {
      const response=await fetch("/api/wild-link/bamboo-score",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({score:finalScore}),
      });
      if(response.ok){
        const data=await response.json() as {playerName?:string;rank?:number;leaderboard?:LeaderRow[]};
        setPlayerName(data.playerName??"");
        setRank(typeof data.rank==="number"?data.rank:null);
        setLeaderboard(Array.isArray(data.leaderboard)?data.leaderboard:[]);
      }
    } finally {
      setRankLoading(false);
    }
  },[]);

  useEffect(()=>{
    if(phase!=="play") return;
    const started=Date.now();
    const id=window.setInterval(()=>{
      const next=Math.max(0,GAME_SECONDS-(Date.now()-started)/1000);
      setLeft(next);
      if(next<=0){clearInterval(id);void finishGame(countRef.current);}
    },100);
    return()=>clearInterval(id);
  },[phase,finishGame]);

  function plant(){
    if(phase!=="play") return;
    setCount(v=>{
      const next=v+1;
      countRef.current=next;
      return next;
    });
    if(navigator.vibrate&&countRef.current%4===0) navigator.vibrate(12);
  }

  return <div className="overflow-hidden border-4 border-[#142630] bg-[#0e2732] text-white shadow-[10px_10px_0_#142630]">
    <div className="flex h-12 items-center justify-between border-b-4 border-[#142630] bg-[#0b2530] px-3 sm:px-5">
      <span className="text-[10px] font-black tracking-[.16em] text-white/65 sm:text-xs">BAMBOO FOR TOMORROW</span>
      <div className="flex rounded-full border border-white/25 bg-black/20 p-1 text-[11px] font-black">
        <button type="button" onClick={()=>setLang("ko")} className={"rounded-full px-3 py-1.5 "+(lang==="ko"?"bg-[#67d267] text-[#102a22]":"text-white/65")}>KO</button>
        <button type="button" onClick={()=>setLang("en")} className={"rounded-full px-3 py-1.5 "+(lang==="en"?"bg-[#67d267] text-[#102a22]":"text-white/65")}>EN</button>
      </div>
    </div>
    {phase==="intro"&&<div className="relative min-h-[500px] overflow-hidden sm:min-h-[580px] lg:min-h-[640px]">
      <PixelRiverScene count={2} compact lang={lang}/>
      <div className="absolute inset-0 z-40 bg-gradient-to-b from-[#12344b]/10 via-transparent to-[#19333f]/20"/>
      <div className="absolute inset-x-0 top-7 z-50 text-center">
        <p className="text-sm font-black tracking-[.12em] text-white">LINKIMPACT</p>
        <p className="mt-4 text-sm font-bold text-white/90">{lang==="ko"?<>작은 행동이<br/>더 건강한 자연을 만듭니다.</>:<>Small actions create<br/>a healthier environment.</>}</p>
        <div className="mx-auto mt-5 w-fit border-4 border-[#162d37] bg-[#ddff62] px-6 py-4 text-[clamp(2.1rem,7vw,4.9rem)] font-black leading-[.86] text-[#17343d] shadow-[7px_7px_0_#162d37] [text-shadow:3px_3px_0_#fff]">
          BAMBOO<br/>FOR TOMORROW
        </div>
        <p className="mt-4 font-black">{lang==="ko"?"함께 만드는 더 푸른 강변":"A greener riverbank, together"}</p>
      </div>
      <div className="pointer-events-none absolute bottom-16 left-5 z-50 sm:left-10"><PixelFarmer/></div>
      <div className="pointer-events-none absolute bottom-20 left-[42%] z-50 hidden sm:block"><PixelBird/></div>
      <button onClick={start} className="absolute bottom-4 left-1/2 z-[60] w-[calc(100%-24px)] max-w-md -translate-x-1/2 border-[3px] border-[#17343d] bg-[#28b95b] px-4 py-3 text-base font-black shadow-[4px_4px_0_#17343d] active:translate-y-1 active:shadow-[2px_2px_0_#17343d] sm:bottom-5 sm:w-[calc(100%-32px)] sm:border-4 sm:px-8 sm:py-4 sm:text-lg sm:shadow-[6px_6px_0_#17343d]">
        {lang==="ko"?"터치해서 대나무를 심어주세요":"Tap to plant bamboo"}
      </button>
    </div>}

    {phase==="play"&&<div className="relative min-h-[560px] sm:min-h-[640px] lg:min-h-[720px]">
      <PixelRiverScene count={count} interactive onTap={plant} showGuide lang={lang}/>
      <StatusBar count={count} left={left} lang={lang}/>
      {count<2&&<div className="pointer-events-none absolute left-1/2 top-[34%] z-50 w-[calc(100%-40px)] max-w-xs -translate-x-1/2 border-[3px] border-[#203744] bg-[#0b3650]/95 px-4 py-3 text-center text-sm font-black shadow-[4px_4px_0_#203744] sm:w-auto sm:max-w-none sm:border-4 sm:px-6 sm:py-4 sm:text-base sm:shadow-[6px_6px_0_#203744]">
        {lang==="ko"?<>강변을 터치해서<br/>대나무를 심어주세요!</>:<>Tap the riverbank<br/>to plant bamboo!</>}
        <span className="mx-auto mt-3 block text-4xl">☝</span>
      </div>}
      {count>0&&count%8===0&&<div className="pointer-events-none absolute left-1/2 top-[32%] z-50 -translate-x-1/2 animate-pulse rounded-full bg-[#fff38a]/90 px-5 py-2 text-sm font-black text-[#17343d]">{lang==="ko"?"✨ 강변이 점점 푸르게 변하고 있어요!":"✨ The riverbank is getting greener!"}</div>}
    </div>}

    {phase==="rank"&&<div className="relative min-h-[720px] overflow-hidden bg-[#06243a]">
      <PixelRiverScene count={30} lang={lang}/>
      <div className="absolute inset-0 z-40 bg-[#051d31]/82"/>
      <div className="absolute inset-x-0 top-8 z-[60] mx-auto max-w-xl px-5 text-center">
        <div className="text-[clamp(2.4rem,9vw,5rem)] font-black leading-[.88] text-[#ffea4e] [text-shadow:5px_5px_0_#5e4b13]">MISSION<br/>COMPLETE!</div>
        <div className="mx-auto mt-4 w-fit border-4 border-[#17343d] bg-[#0b3650] px-6 py-3 text-xl font-black shadow-[5px_5px_0_#17343d]">🎋 {count}{lang==="ko"?"그루":" planted"}</div>
        <div className="mx-auto mt-5 max-w-md border-4 border-[#17343d] bg-[#fffdf2] p-4 text-[#172a34] shadow-[7px_7px_0_#17343d]">
          <p className="text-xs font-black tracking-[.18em] text-[#2f7a43]">TODAY&apos;S RANKING</p>
          {rankLoading?<div className="py-8 font-black">{lang==="ko"?"랭킹을 불러오는 중...":"Loading ranking..."}</div>:<>
            <div className="mt-2 text-2xl font-black">{playerName||(lang==="ko"?"대나무 친구":"Bamboo Friend")} · {rank?(lang==="ko"?("오늘 "+rank+"위"):("#"+rank+" today")):(lang==="ko"?"랭킹 집계 완료":"Ranking complete")}</div>
            <div className="mt-4 space-y-2 text-left">
              {leaderboard.slice(0,5).map((row,i)=><div key={row.player_name+"-"+i} className={"flex items-center justify-between border-2 border-[#203744] px-3 py-2 text-sm font-black "+(row.player_name===playerName?"bg-[#dff77b]":"bg-white")}>
                <span>{i+1}. {row.player_name}</span><span>🎋 {row.score}</span>
              </div>)}
              {leaderboard.length===0&&<div className="py-5 text-center text-sm font-bold text-slate-500">{lang==="ko"?"첫 번째 기록입니다.":"This is the first record."}</div>}
            </div>
          </>}
        </div>
        <div className="mx-auto mt-5 flex w-full max-w-md flex-col gap-3">
          <button onClick={()=>{setLearnIndex(0);setPhase("learn")}} className="w-full border-[3px] border-[#17343d] bg-[#28b95b] px-4 py-3 text-sm font-black shadow-[4px_4px_0_#17343d] sm:border-4 sm:px-6 sm:py-4 sm:text-base sm:shadow-[5px_5px_0_#17343d]">{lang==="ko"?"대나무 이야기를 알아보기 →":"Learn the bamboo story →"}</button>
          <button onClick={start} className="w-full border-[3px] border-white/45 bg-[#172f3c] px-4 py-3 text-sm font-black shadow-[4px_4px_0_#081821] sm:border-4 sm:px-6 sm:text-base sm:shadow-[5px_5px_0_#081821]">{lang==="ko"?"↻ 다시 심기":"↻ Plant again"}</button>
        </div>
      </div>
    </div>}
    {phase==="learn"&&(()=>{
      const isLast=learnIndex===LEARN_CARDS.length-1;
      const next=()=>{if(!isLast)setLearnIndex(v=>Math.min(LEARN_CARDS.length-1,v+1));};
      return <div className="relative min-h-[100svh] bg-[#0e2732] px-3 py-3 sm:px-6 sm:py-5">
        <div className="mx-auto flex min-h-[calc(100svh-1.5rem)] w-full max-w-[720px] flex-col sm:min-h-[calc(100svh-2.5rem)]">
          <div className="mb-2.5 flex items-center justify-between px-1 text-[10px] font-black tracking-[.13em] text-white/80 sm:mb-3 sm:text-xs sm:tracking-[.15em]">
            <span>LINKIMPACT · BAMBOO FOR TOMORROW</span>
            <span>{learnIndex+1} / {LEARN_CARDS.length}</span>
          </div>

          <button type="button" onClick={next} aria-label={isLast?"마지막 설명 카드":"다음 설명 카드"} className="group relative flex min-h-0 flex-1 items-stretch overflow-hidden rounded-[24px] bg-[#eef5f7] p-2 shadow-[5px_5px_0_#07171e] sm:p-3 sm:shadow-[8px_8px_0_#07171e]">
            <LearnCard index={learnIndex} lang={lang}/>
            {!isLast?<span className="absolute bottom-4 right-4 rounded-full bg-[#17343d]/95 px-4 py-2 text-xs font-black text-white shadow-lg sm:text-sm">눌러서 다음 →</span>:null}
          </button>

          {isLast?<div className="mt-3 w-full sm:mt-4">
            <a href={KAKAO_URL} target="_blank" rel="noreferrer" className="inline-flex min-h-14 w-full items-center justify-center border-[3px] border-[#17343d] bg-[#fee500] px-5 py-3 text-sm font-black text-[#17343d] shadow-[3px_3px_0_#07171e] sm:border-4 sm:text-base sm:shadow-[4px_4px_0_#07171e]">{lang==="ko"?"카카오 댓글 기부하기 →":"Donate with a Kakao comment →"}</a>
          </div>:<div className="mt-3 flex w-full items-center justify-between gap-2 sm:mt-4 sm:gap-3">
            <button disabled={learnIndex===0} onClick={()=>setLearnIndex(v=>Math.max(0,v-1))} className="inline-flex min-h-11 shrink-0 items-center justify-center border-[3px] border-white/75 bg-[#17343d] px-3 py-2.5 text-xs font-black text-white shadow-[3px_3px_0_#07171e] disabled:opacity-25 sm:border-4 sm:px-5 sm:text-base sm:shadow-[4px_4px_0_#07171e]">{lang==="ko"?"← 이전":"← Back"}</button>
            <div className="flex min-w-0 items-center justify-center gap-1.5 sm:gap-2">
              {LEARN_CARDS.map((_,i)=><button key={i} onClick={()=>setLearnIndex(i)} aria-label={`${i+1}번 카드`} className={`h-2.5 w-2.5 shrink-0 rounded-full sm:h-3 sm:w-3 ${i===learnIndex?"bg-[#67d267]":"bg-white/35"}`}/>)}
            </div>
            <button onClick={next} className="inline-flex min-h-11 shrink-0 items-center justify-center border-[3px] border-white/80 bg-[#28b95b] px-4 py-2.5 text-xs font-black text-white shadow-[3px_3px_0_#07171e] sm:border-4 sm:px-6 sm:text-base sm:shadow-[4px_4px_0_#07171e]">{lang==="ko"?"다음 →":"Next →"}</button>
          </div>}
        </div>
      </div>;
    })()}
  </div>;
}
