"use client";

import { useEffect, useRef, useState } from "react";

const KAKAO_URL = "https://together.kakao.com/fundraisings/139701/story";
const GAME_SECONDS = 30;

type Phase = "intro" | "play" | "rank" | "learn";

type LeaderRow = { player_name:string; score:number; created_at:string };

const LEARN_CARD_IMAGES = [
  "/assets/bamboo-card-01.webp",
  "/assets/bamboo-card-02.webp",
  "/assets/bamboo-card-03.webp",
  "/assets/bamboo-card-04.webp",
  "/assets/bamboo-card-05.webp",
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

function PixelRiverScene({count=0,interactive=false,onTap,showGuide=false,compact=false}:{count?:number;interactive?:boolean;onTap?:()=>void;showGuide?:boolean;compact?:boolean}) {
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
        강변을 여러 번 터치해서<br/>더 푸르게 만들어주세요!
        <span className="absolute -left-3 bottom-6 h-5 w-5 rotate-45 border-b-4 border-l-4 border-[#203744] bg-[#fffdf2]"/>
      </div>
    </div>}
  </button>
}

function StatusBar({count,left}:{count:number;left:number}) {
  const m=Math.floor(left/60);
  const s=Math.floor(left%60).toString().padStart(2,"0");
  return <div className="pointer-events-none absolute left-3 right-3 top-3 z-50 flex items-center justify-between gap-2 sm:left-6 sm:right-6 sm:top-5 sm:gap-3">
    <div className="flex min-w-0 items-center gap-2 border-[3px] border-[#18323e] bg-[#0b3650] px-3 py-2 text-base font-black shadow-[4px_4px_0_#18323e] sm:min-w-[150px] sm:border-4 sm:px-4 sm:py-3 sm:text-xl sm:shadow-[5px_5px_0_#18323e]">
      <span className="text-xl sm:text-2xl">🎋</span><span className="truncate">{count}그루</span>
    </div>
    <div className="shrink-0 border-[3px] border-[#18323e] bg-[#0b3650] px-3 py-2 text-base font-black text-[#ffe15b] shadow-[4px_4px_0_#18323e] sm:border-4 sm:px-4 sm:py-3 sm:text-lg sm:shadow-[5px_5px_0_#18323e]">TIME {m}:{s}</div>
  </div>
}

export default function BambooPlantGame() {
  const [phase,setPhase]=useState<Phase>("intro");
  const [count,setCount]=useState(0);
  const [left,setLeft]=useState(GAME_SECONDS);
  const [learnIndex,setLearnIndex]=useState(0);
  const [leaderboard,setLeaderboard]=useState<LeaderRow[]>([]);
  const [rank,setRank]=useState<number|null>(null);
  const [playerName,setPlayerName]=useState("");
  const [rankLoading,setRankLoading]=useState(false);
  const countRef=useRef(0);
  const submittedRef=useRef(false);

  useEffect(()=>{
    if(phase!=="play") return;
    const started=Date.now();
    const id=window.setInterval(()=>{
      const next=Math.max(0,GAME_SECONDS-(Date.now()-started)/1000);
      setLeft(next);
      if(next<=0){clearInterval(id);void finishGame(countRef.current);}
    },100);
    return()=>clearInterval(id);
  },[phase]);

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

  async function finishGame(finalScore:number){
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
  }

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
    {phase==="intro"&&<div className="relative min-h-[500px] overflow-hidden sm:min-h-[580px] lg:min-h-[640px]">
      <PixelRiverScene count={2} compact/>
      <div className="absolute inset-0 z-40 bg-gradient-to-b from-[#12344b]/10 via-transparent to-[#19333f]/20"/>
      <div className="absolute inset-x-0 top-7 z-50 text-center">
        <p className="text-sm font-black tracking-[.12em] text-white">LINKIMPACT</p>
        <p className="mt-4 text-sm font-bold text-white/90">작은 행동이<br/>더 건강한 자연을 만듭니다.</p>
        <div className="mx-auto mt-5 w-fit border-4 border-[#162d37] bg-[#ddff62] px-6 py-4 text-[clamp(2.1rem,7vw,4.9rem)] font-black leading-[.86] text-[#17343d] shadow-[7px_7px_0_#162d37] [text-shadow:3px_3px_0_#fff]">
          BAMBOO<br/>FOR TOMORROW
        </div>
        <p className="mt-4 font-black">함께 만드는 더 푸른 강변</p>
      </div>
      <div className="pointer-events-none absolute bottom-16 left-5 z-50 sm:left-10"><PixelFarmer/></div>
      <div className="pointer-events-none absolute bottom-20 left-[42%] z-50 hidden sm:block"><PixelBird/></div>
      <button onClick={start} className="absolute bottom-4 left-1/2 z-[60] w-[calc(100%-24px)] max-w-md -translate-x-1/2 border-[3px] border-[#17343d] bg-[#28b95b] px-4 py-3 text-base font-black shadow-[4px_4px_0_#17343d] active:translate-y-1 active:shadow-[2px_2px_0_#17343d] sm:bottom-5 sm:w-[calc(100%-32px)] sm:border-4 sm:px-8 sm:py-4 sm:text-lg sm:shadow-[6px_6px_0_#17343d]">
        터치해서 대나무를 심어주세요
      </button>
    </div>}

    {phase==="play"&&<div className="relative min-h-[560px] sm:min-h-[640px] lg:min-h-[720px]">
      <PixelRiverScene count={count} interactive onTap={plant} showGuide/>
      <StatusBar count={count} left={left}/>
      {count<2&&<div className="pointer-events-none absolute left-1/2 top-[34%] z-50 w-[calc(100%-40px)] max-w-xs -translate-x-1/2 border-[3px] border-[#203744] bg-[#0b3650]/95 px-4 py-3 text-center text-sm font-black shadow-[4px_4px_0_#203744] sm:w-auto sm:max-w-none sm:border-4 sm:px-6 sm:py-4 sm:text-base sm:shadow-[6px_6px_0_#203744]">
        강변을 터치해서<br/>대나무를 심어주세요!
        <span className="mx-auto mt-3 block text-4xl">☝</span>
      </div>}
      {count>0&&count%8===0&&<div className="pointer-events-none absolute left-1/2 top-[32%] z-50 -translate-x-1/2 animate-pulse rounded-full bg-[#fff38a]/90 px-5 py-2 text-sm font-black text-[#17343d]">✨ 강변이 점점 푸르게 변하고 있어요!</div>}
    </div>}

    {phase==="rank"&&<div className="relative min-h-[720px] overflow-hidden bg-[#06243a]">
      <PixelRiverScene count={30}/>
      <div className="absolute inset-0 z-40 bg-[#051d31]/82"/>
      <div className="absolute inset-x-0 top-8 z-[60] mx-auto max-w-xl px-5 text-center">
        <div className="text-[clamp(2.4rem,9vw,5rem)] font-black leading-[.88] text-[#ffea4e] [text-shadow:5px_5px_0_#5e4b13]">MISSION<br/>COMPLETE!</div>
        <div className="mx-auto mt-4 w-fit border-4 border-[#17343d] bg-[#0b3650] px-6 py-3 text-xl font-black shadow-[5px_5px_0_#17343d]">🎋 {count}그루</div>
        <div className="mx-auto mt-5 max-w-md border-4 border-[#17343d] bg-[#fffdf2] p-4 text-[#172a34] shadow-[7px_7px_0_#17343d]">
          <p className="text-xs font-black tracking-[.18em] text-[#2f7a43]">TODAY&apos;S RANKING</p>
          {rankLoading?<div className="py-8 font-black">랭킹을 불러오는 중...</div>:<>
            <div className="mt-2 text-2xl font-black">{playerName||"대나무 친구"} · {rank?("오늘 "+rank+"위"):"랭킹 집계 완료"}</div>
            <div className="mt-4 space-y-2 text-left">
              {leaderboard.slice(0,5).map((row,i)=><div key={row.player_name+"-"+i} className={"flex items-center justify-between border-2 border-[#203744] px-3 py-2 text-sm font-black "+(row.player_name===playerName?"bg-[#dff77b]":"bg-white")}>
                <span>{i+1}. {row.player_name}</span><span>🎋 {row.score}</span>
              </div>)}
              {leaderboard.length===0&&<div className="py-5 text-center text-sm font-bold text-slate-500">첫 번째 기록입니다.</div>}
            </div>
          </>}
        </div>
        <div className="mx-auto mt-5 flex w-full max-w-md flex-col gap-3">
          <button onClick={()=>{setLearnIndex(0);setPhase("learn")}} className="w-full border-[3px] border-[#17343d] bg-[#28b95b] px-4 py-3 text-sm font-black shadow-[4px_4px_0_#17343d] sm:border-4 sm:px-6 sm:py-4 sm:text-base sm:shadow-[5px_5px_0_#17343d]">대나무 이야기를 알아보기 →</button>
          <button onClick={start} className="w-full border-[3px] border-white/45 bg-[#172f3c] px-4 py-3 text-sm font-black shadow-[4px_4px_0_#081821] sm:border-4 sm:px-6 sm:text-base sm:shadow-[5px_5px_0_#081821]">↻ 다시 심기</button>
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
            <img key={LEARN_CARD_IMAGES[learnIndex]} src={LEARN_CARD_IMAGES[learnIndex]} alt={`대나무 식재 설명 카드 ${learnIndex+1}`} className="max-h-[70vh] w-auto max-w-full object-contain [image-rendering:auto]"/>
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
  </div>;
}
