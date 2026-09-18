"use client";

import { useEffect, useMemo, useState } from "react";

const KAKAO_URL = "https://together.kakao.com/fundraisings/139701/story";
const GAME_SECONDS = 10;

type Phase = "intro" | "play" | "complete" | "learn";

type LearnCard = {
  no:string;
  title:string;
  subtitle:string;
  body:string;
  kind:"risk"|"roots"|"plant"|"riverbank"|"future";
};

const LEARN_CARDS:LearnCard[] = [
  {no:"01",title:"왜 대나무를 심을까요?",subtitle:"기후변화로 위험에 놓인 강변",body:"집중호우와 하천 범람, 토사 유실이 반복되면 강변의 토양과 식생이 약해지고 지역사회의 생활터전도 더 취약해질 수 있습니다.",kind:"risk"},
  {no:"02",title:"대나무의 힘",subtitle:"빠르게 자라고, 뿌리로 토양을 붙잡습니다",body:"대나무의 촘촘한 뿌리와 지하경은 토양을 단단히 붙잡아 침식과 토사 유실을 줄이는 데 기여할 수 있습니다. 성장 과정에서 탄소를 흡수하는 식생이기도 합니다.",kind:"roots"},
  {no:"03",title:"어떻게 심을까요?",subtitle:"적절한 장소와 꾸준한 관리가 중요합니다",body:"강변 환경과 생태 조건에 맞는 장소를 고르고 건강한 묘목을 심은 뒤, 뿌리가 자리 잡고 안정적으로 자랄 수 있도록 지속적으로 관리합니다.",kind:"plant"},
  {no:"04",title:"이렇게 변화합니다",subtitle:"강변에 대나무를 심고 생태 회복을 이어갑니다",body:"강변 둑에 대나무와 식생이 자리 잡으면 토양을 보호하고, 훼손된 강변이 다시 녹지와 생물의 서식 공간으로 회복되는 과정에 도움을 줄 수 있습니다.",kind:"riverbank"},
  {no:"05",title:"더 큰 변화를 위해",subtitle:"작은 행동을 지역의 지속가능한 변화로",body:"한 번의 식재에서 끝나지 않습니다. 관리, 생물다양성 회복, 지역 자원 활용과 시민 참여가 이어질 때 더 안전하고 지속가능한 지역사회를 만들어갈 수 있습니다.",kind:"future"},
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
  if(kind==="risk") return <svg viewBox="0 0 420 250" className="h-full w-full [image-rendering:pixelated]">
    <rect width="420" height="250" fill="#82cdf7"/><rect y="122" width="420" height="128" fill="#4ea7d3"/>
    <path d="M0 170L45 128L88 154L132 115L178 150L225 104L270 146L318 118L365 152L420 120V250H0Z" fill="#78934d"/>
    <path d="M0 188L72 168L135 188L205 164L285 186L350 160L420 176V250H0Z" fill="#8b6844"/>
    <path d="M15 202h390" stroke="#d8ecf3" strokeWidth="8" strokeDasharray="28 12"/>
    <path d="M20 140C90 112 154 164 220 134S342 119 405 145" stroke="#dff7ff" strokeWidth="9" fill="none"/>
    <path d="M60 190l34-24M98 198l36-28M302 191l31-24" stroke="#5e4936" strokeWidth="8"/>
    <circle cx="346" cy="60" r="25" fill="#5b6a78"/><path d="M325 82l18 16 20-18 18 17" stroke="#6caee6" strokeWidth="6" fill="none"/>
  </svg>;
  if(kind==="roots") return <svg viewBox="0 0 420 250" className="h-full w-full [image-rendering:pixelated]">
    <rect width="420" height="250" fill="#9bdcff"/><rect y="110" width="420" height="140" fill="#8a623d"/>
    <rect x="195" y="18" width="26" height="118" fill="#3b8a39"/><rect x="202" y="28" width="8" height="100" fill="#78c95b"/>
    <path d="M208 130L130 210M208 130L165 242M208 130L214 246M208 132L265 240M210 132L320 212" stroke="#d8c06c" strokeWidth="11"/>
    <path d="M195 62l-62-34M220 84l66-40M195 101l-55 22M220 47l52-28" stroke="#65b84c" strokeWidth="15"/>
    <rect x="35" y="150" width="105" height="42" rx="6" fill="#17343d"/><text x="52" y="176" fill="white" fontSize="19" fontWeight="800">강한 뿌리</text>
    <rect x="275" y="157" width="110" height="42" rx="6" fill="#17343d"/><text x="294" y="183" fill="white" fontSize="18" fontWeight="800">토양 고정</text>
  </svg>;
  if(kind==="plant") return <svg viewBox="0 0 420 250" className="h-full w-full [image-rendering:pixelated]">
    <rect width="420" height="250" fill="#8ed4fa"/><rect y="150" width="420" height="100" fill="#936c42"/>
    <path d="M0 150L65 100L130 138L192 91L255 136L320 105L420 145V170H0Z" fill="#6b9547"/>
    <rect x="246" y="76" width="16" height="106" fill="#438e3a"/><path d="M254 92l-38-24M255 118l44-30M254 140l-37 18" stroke="#64bb4e" strokeWidth="13"/>
    <circle cx="162" cy="116" r="33" fill="#f0c592"/><rect x="132" y="144" width="62" height="56" fill="#285f35"/>
    <path d="M146 174l-43 26M181 174l40 23" stroke="#f0c592" strokeWidth="16"/>
    <rect x="310" y="160" width="38" height="48" rx="4" fill="#48a9cf"/><path d="M348 174h25v18" stroke="#48a9cf" strokeWidth="10" fill="none"/>
    <circle cx="70" cy="205" r="22" fill="#5d402a"/><circle cx="70" cy="205" r="12" fill="#30261f"/>
  </svg>;
  if(kind==="riverbank") return <svg viewBox="0 0 420 250" className="h-full w-full [image-rendering:pixelated]">
    <rect width="420" height="250" fill="#85d1fa"/><rect y="118" width="420" height="132" fill="#4da8d4"/>
    <path d="M0 185L45 142L88 167L132 129L178 163L225 126L270 161L318 135L365 166L420 132V250H0Z" fill="#7e6945"/>
    <path d="M0 205L70 184L135 201L205 178L285 199L350 176L420 190V250H0Z" fill="#719447"/>
    <rect x="40" y="110" width="10" height="78" fill="#3e8e3b"/><path d="M45 128l-20-16M45 148l22-17" stroke="#67bd50" stroke-width="9"/><rect x="82" y="98" width="10" height="90" fill="#3e8e3b"/><path d="M87 116l-20-16M87 136l22-17" stroke="#67bd50" stroke-width="9"/><rect x="126" y="86" width="10" height="102" fill="#3e8e3b"/><path d="M131 104l-20-16M131 124l22-17" stroke="#67bd50" stroke-width="9"/><rect x="175" y="110" width="10" height="78" fill="#3e8e3b"/><path d="M180 128l-20-16M180 148l22-17" stroke="#67bd50" stroke-width="9"/><rect x="220" y="98" width="10" height="90" fill="#3e8e3b"/><path d="M225 116l-20-16M225 136l22-17" stroke="#67bd50" stroke-width="9"/><rect x="268" y="86" width="10" height="102" fill="#3e8e3b"/><path d="M273 104l-20-16M273 124l22-17" stroke="#67bd50" stroke-width="9"/><rect x="315" y="110" width="10" height="78" fill="#3e8e3b"/><path d="M320 128l-20-16M320 148l22-17" stroke="#67bd50" stroke-width="9"/><rect x="360" y="98" width="10" height="90" fill="#3e8e3b"/><path d="M365 116l-20-16M365 136l22-17" stroke="#67bd50" stroke-width="9"/>
    <path d="M16 148C90 126 154 164 220 140S342 128 405 150" stroke="#dff7ff" strokeWidth="8" fill="none"/>
  </svg>;
  return <svg viewBox="0 0 420 250" className="h-full w-full [image-rendering:pixelated]">
    <rect width="420" height="250" fill="#9bdcff"/><circle cx="210" cy="120" r="75" fill="#4ca86b"/><path d="M160 88c28-34 72-31 97 2-19 13-28 31-32 55-28-7-51-20-65-57z" fill="#4c8fda"/><path d="M175 161c27-3 48 6 66 25-29 11-60 5-78-12z" fill="#4c8fda"/>
    <circle cx="70" cy="80" r="25" fill="#3e8f3d"/><rect x="64" y="100" width="12" height="34" fill="#6a4d2c"/><circle cx="338" cy="78" r="25" fill="#3e8f3d"/><rect x="332" y="98" width="12" height="34" fill="#6a4d2c"/><circle cx="67" cy="185" r="25" fill="#3e8f3d"/><rect x="61" y="205" width="12" height="34" fill="#6a4d2c"/><circle cx="344" cy="182" r="25" fill="#3e8f3d"/><rect x="338" y="202" width="12" height="34" fill="#6a4d2c"/>
    <circle cx="118" cy="205" r="16" fill="#efbf89"/><rect x="105" y="218" width="26" height="25" fill="#285f35"/><circle cx="157" cy="210" r="16" fill="#98664e"/><rect x="144" y="223" width="26" height="25" fill="#285f35"/><circle cx="265" cy="207" r="16" fill="#d8a67a"/><rect x="252" y="220" width="26" height="25" fill="#285f35"/><circle cx="305" cy="202" r="16" fill="#7d5746"/><rect x="292" y="215" width="26" height="25" fill="#285f35"/>
  </svg>;
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
    const card=LEARN_CARDS[learnIndex];
    const isLast=learnIndex===LEARN_CARDS.length-1;
    const next=()=>{if(!isLast)setLearnIndex(v=>Math.min(LEARN_CARDS.length-1,v+1));};
    return <div className="relative min-h-[700px] bg-[#dff3ff] p-4 text-[#14303a] sm:p-7">
      <div className="mx-auto flex min-h-[650px] max-w-3xl flex-col">
        <div className="flex items-center justify-between text-xs font-black tracking-[.15em] text-[#2f7a43]">
          <span>LINKIMPACT · BAMBOO STORY</span>
          <span>{learnIndex+1} / {LEARN_CARDS.length}</span>
        </div>

        <button type="button" onClick={next} className="mt-5 flex flex-1 flex-col overflow-hidden border-4 border-[#17343d] bg-[#fffdf6] text-left shadow-[8px_8px_0_#17343d] active:translate-y-1 active:shadow-[3px_3px_0_#17343d]">
          <div className="flex items-start gap-4 border-b-4 border-[#17343d] bg-white p-5 sm:p-7">
            <span className="shrink-0 rounded-lg bg-[#17343d] px-3 py-2 text-lg font-black text-white">{card.no}</span>
            <div>
              <h2 className="text-2xl font-black leading-tight sm:text-4xl">{card.title}</h2>
              <p className="mt-2 text-sm font-black text-[#3f7d55] sm:text-base">{card.subtitle}</p>
            </div>
          </div>
          <div className="min-h-[280px] flex-1 bg-[#8fd6fb] sm:min-h-[340px]"><PixelIllustration kind={card.kind}/></div>
          <div className="bg-[#fffdf6] p-5 sm:p-7">
            <p className="text-base font-semibold leading-7 text-[#3d535c] sm:text-lg sm:leading-8">{card.body}</p>
            <div className="mt-5 flex items-center justify-between">
              <div className="flex gap-2">
                {LEARN_CARDS.map((_,i)=><span key={i} className={`h-2.5 w-2.5 rounded-full ${i===learnIndex?"bg-[#28a94f]":"bg-[#c4c6c0]"}`}/>)}
              </div>
              {!isLast?<span className="font-black text-[#1b6a37]">화면을 눌러 다음으로 →</span>:<span className="font-black text-[#1b6a37]">마지막 카드</span>}
            </div>
          </div>
        </button>

        <div className="mt-5 flex items-center justify-between gap-3">
          <button disabled={learnIndex===0} onClick={()=>setLearnIndex(v=>Math.max(0,v-1))} className="border-4 border-[#17343d] bg-white px-5 py-3 font-black shadow-[4px_4px_0_#17343d] disabled:opacity-30">← 이전</button>
          {isLast?<div className="flex gap-3">
            <a href={KAKAO_URL} target="_blank" rel="noreferrer" className="border-4 border-[#17343d] bg-[#fee500] px-5 py-3 font-black shadow-[4px_4px_0_#17343d]">실제 행동으로 →</a>
            <button onClick={start} className="border-4 border-[#17343d] bg-[#28b95b] px-5 py-3 font-black text-white shadow-[4px_4px_0_#17343d]">다시 심기</button>
          </div>:<button onClick={next} className="border-4 border-[#17343d] bg-[#28b95b] px-6 py-3 font-black text-white shadow-[4px_4px_0_#17343d]">다음 →</button>}
        </div>
      </div>
    </div>;
  })()}
 </div>
}
