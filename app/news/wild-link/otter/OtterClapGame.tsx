"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

type Leader = { player_name: string; score: number };
type Phase = "intro" | "countdown" | "play" | "result" | "story" | "ranking";

const GAME_SECONDS = 10;
const OTTER_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/7/7f/Otter_-_Eurasian_otter_-_Lutra_lutra.jpg";
const OTTER_CREDIT = "Bouke ten Cate · CC BY 4.0 · Wikimedia Commons";

const storySlides = [
  {
    kicker: "WHY RECORD NATURE?",
    title: "우리가 자연을 기록하는 이유",
    icon: "📍",
    body: "자연을 기록하는 일은 단순히 생물의 이름을 남기는 일이 아닙니다. 어디에 어떤 생물이 살고 있는지, 무엇이 늘고 줄었는지 기록하면 생태계의 변화를 더 일찍 발견할 수 있습니다.",
    chain: ["발견", "기록", "변화 감지", "보전 행동"],
  },
  {
    kicker: "OTTER AS A SIGNAL",
    title: "수달이 사라진다는 건 무엇을 뜻할까요?",
    icon: "🦦",
    body: "수달은 먹이와 은신처, 연결된 하천 공간이 필요한 야생동물입니다. 수달 자체가 재해를 막는 것은 아니지만, 수달이 살아가기 어려워진다는 것은 하천·습지 생태계의 건강성이 약해지고 있다는 신호일 수 있습니다.",
    chain: ["수달", "하천·습지", "다양한 생명", "생태계 건강성"],
  },
  {
    kicker: "BIODIVERSITY = RESILIENCE",
    title: "생물다양성이 무너지면 자연의 방어력도 약해집니다.",
    icon: "🌿",
    body: "다양한 생물이 살아가는 숲·하천·습지와 건강한 토양은 물을 저장하고 흐름을 늦추며, 토양 유실을 줄이고 물환경을 유지하는 데 기여합니다. 이런 생태계 기능이 약해진 상태에서 집중호우·폭염·가뭄 같은 기후 충격이 겹치면 지역사회의 피해 위험은 더 커질 수 있습니다.",
    chain: ["생물다양성 감소", "생태계 기능 약화", "기후 충격", "재해 피해 위험 증가"],
  },
  {
    kicker: "BACK TO US",
    title: "결국 직격타를 받는 건 우리의 삶입니다.",
    icon: "🏘️",
    body: "침수와 토사유출, 수질 악화, 농업 피해, 폭염과 같은 문제는 환경에서 끝나지 않습니다. 집과 도로, 먹거리, 건강, 지역경제까지 이어집니다. 그래서 환경문제는 동시에 사회문제이고, 생물다양성은 우리의 삶의 터전과 연결된 문제입니다.",
    chain: ["자연환경", "재해·생활환경", "지역사회", "우리의 삶"],
  },
  {
    kicker: "LINKIMPACT",
    title: "기록에서 행동으로, 연결을 만듭니다.",
    icon: "🔗",
    body: "LINKIMPACT는 환경과 사회의 문제로 삶의 터전을 위협받는 지역사회의 문제를 발견하고, 시민의 기록과 데이터, 사람과 자원, 행동을 연결해 지속가능한 변화를 만듭니다.",
    chain: ["시민 기록", "데이터", "사람·자원", "행동과 변화"],
  },
];

export default function OtterClapGame() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [storyStep, setStoryStep] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [score, setScore] = useState(0);
  const [rank, setRank] = useState<number | null>(null);
  const [playerName, setPlayerName] = useState("");
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [pulse, setPulse] = useState(false);
  const [burst, setBurst] = useState(0);
  const scoreRef = useRef(0);
  const submittedRef = useRef(false);

  useEffect(() => {
    fetch("/api/wild-link/score").then(r => r.json()).then(d => setLeaders(d.leaderboard ?? [])).catch(() => undefined);
  }, []);

  const submitScore = useCallback(async (finalScore: number) => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    try {
      const response = await fetch("/api/wild-link/score", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ score: finalScore, playerName }),
      });
      const data = await response.json();
      if (response.ok) {
        setRank(data.rank ?? null);
        setPlayerName(data.playerName ?? playerName);
        setLeaders(data.leaderboard ?? []);
      }
    } catch {}
  }, [playerName]);

  useEffect(() => {
    if (phase !== "countdown") return;
    const timer = window.setTimeout(() => {
      if (countdown <= 0) setPhase("play");
      else setCountdown(v => v - 1);
    }, countdown <= 0 ? 0 : 700);
    return () => window.clearTimeout(timer);
  }, [phase, countdown]);

  useEffect(() => {
    if (phase !== "play") return;
    const started = Date.now();
    const timer = window.setInterval(() => {
      const elapsed = (Date.now() - started) / 1000;
      const left = Math.max(0, GAME_SECONDS - elapsed);
      setTimeLeft(left);
      if (left <= 0) {
        window.clearInterval(timer);
        setPhase("result");
        void submitScore(scoreRef.current);
      }
    }, 50);
    return () => window.clearInterval(timer);
  }, [phase, submitScore]);

  function start() {
    scoreRef.current = 0;
    submittedRef.current = false;
    setScore(0);
    setRank(null);
    setTimeLeft(GAME_SECONDS);
    setCountdown(3);
    setStoryStep(0);
    setPhase("countdown");
  }

  function clap() {
    if (phase !== "play") return;
    scoreRef.current += 1;
    setScore(scoreRef.current);
    setBurst(v => v + 1);
    setPulse(true);
    if (navigator.vibrate && scoreRef.current % 5 === 0) navigator.vibrate(20);
    window.setTimeout(() => setPulse(false), 75);
  }

  const slide = storySlides[storyStep];

  return (
    <div className="overflow-hidden rounded-[32px] bg-[#062e29] text-white shadow-2xl">
      <div className="relative min-h-[700px] select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#237566_0%,#0b433a_35%,#062e29_72%)]" />
        <div className="relative z-10 flex min-h-[700px] flex-col p-5 sm:p-9">
          <div className="flex items-center justify-between text-[10px] font-bold tracking-[.16em] text-emerald-100/80 sm:text-xs">
            <span>WILD LINK · SOVAC 2026</span><span>LINKIMPACT</span>
          </div>

          {phase === "intro" && <div className="my-auto text-center">
            <div className="relative mx-auto mb-6 h-52 w-full max-w-md overflow-hidden rounded-[28px] border border-white/20 bg-black/20 shadow-2xl">
              <img src={OTTER_IMAGE} alt="유라시아수달이 물 위를 헤엄치는 모습" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#062e29]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 rounded-full bg-black/45 px-3 py-1 text-xs font-bold backdrop-blur">🦦 EURASIAN OTTER</div>
            </div>
            <p className="text-sm font-bold tracking-[.2em] text-emerald-200">TOUCH · PLAY · FIND THE LINK</p>
            <h2 className="mt-3 text-5xl font-black tracking-tight sm:text-6xl">수달의 박수</h2>
            <p className="mx-auto mt-5 max-w-md text-base leading-7 text-emerald-50/80">10초 동안 화면을 빠르게 터치하세요. 게임 뒤에는 수달에서 시작해 생물다양성, 기후환경, 그리고 우리의 삶으로 이어지는 이야기가 열립니다.</p>
            <input value={playerName} onChange={e => setPlayerName(e.target.value)} maxLength={20} placeholder="닉네임 (선택)" className="mx-auto mt-7 block w-full max-w-xs rounded-full border border-white/20 bg-white/10 px-5 py-3 text-center text-sm outline-none placeholder:text-white/45" />
            <button onClick={start} className="mt-4 rounded-full bg-[#d7ff58] px-10 py-4 text-lg font-black text-[#062e29] transition active:scale-95">게임 시작</button>
            <p className="mx-auto mt-5 max-w-md text-[10px] leading-4 text-white/45">Photo: {OTTER_CREDIT}</p>
          </div>}

          {phase === "countdown" && <div className="my-auto text-center"><p className="text-xl font-bold text-emerald-100">준비!</p><div className="mt-5 text-[9rem] font-black leading-none text-[#d7ff58]">{countdown || "GO!"}</div></div>}

          {phase === "play" && <button onPointerDown={clap} className="my-auto flex flex-1 touch-manipulation flex-col items-center justify-center outline-none">
            <div className="mb-4 flex w-full max-w-md items-center justify-between text-sm font-bold"><span>남은 시간 {timeLeft.toFixed(1)}s</span><span>박수 {score}</span></div>
            <div className="h-2 w-full max-w-md overflow-hidden rounded-full bg-white/15"><div className="h-full bg-[#d7ff58]" style={{ width: `${(timeLeft / GAME_SECONDS) * 100}%` }} /></div>
            <div className={`relative mt-8 h-72 w-full max-w-md overflow-hidden rounded-[32px] border-4 border-white/15 shadow-2xl transition-transform duration-75 ${pulse ? "scale-[1.025]" : "scale-100"}`}>
              <img src={OTTER_IMAGE} alt="수달 박수 게임" draggable={false} className={`pointer-events-none h-full w-full object-cover transition-transform duration-75 ${pulse ? "scale-105" : "scale-100"}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#062e29]/80 via-transparent to-black/10" />
              <div key={burst} className="pointer-events-none absolute inset-0 grid place-items-center"><span className="animate-ping text-7xl opacity-70">👏</span></div>
              <div className="absolute bottom-5 left-0 right-0 text-center"><span className="rounded-full bg-black/45 px-5 py-2 text-4xl font-black backdrop-blur">👏 {score}</span></div>
            </div>
            <p className="mt-5 text-sm font-bold text-emerald-100">사진을 계속 터치하세요!</p>
          </button>}

          {phase === "result" && <div className="my-auto text-center">
            <div className="mx-auto mb-5 h-36 w-36 overflow-hidden rounded-full border-4 border-[#d7ff58]/50"><img src={OTTER_IMAGE} alt="수달" className="h-full w-full object-cover" /></div>
            <p className="text-sm font-bold tracking-[.2em] text-[#d7ff58]">TIME&apos;S UP!</p>
            <div className="mt-3 text-7xl font-black">{score}</div><p className="mt-1 text-emerald-100">번의 박수</p>
            <div className="mx-auto mt-8 max-w-md rounded-3xl border border-[#d7ff58]/35 bg-black/15 p-6">
              <p className="text-3xl font-black leading-tight text-[#d7ff58]">잠깐!!<br/>나의 랭킹이 궁금하다구요?</p>
              <p className="mt-4 text-sm leading-6 text-emerald-50/75">수달에서 시작된 연결을 끝까지 따라가 보세요. 모든 이야기를 확인하면 오늘의 랭킹이 공개됩니다.</p>
            </div>
            <button onClick={() => { setStoryStep(0); setPhase("story"); }} aria-label="이야기 시작하기" className="mx-auto mt-8 grid h-16 w-16 place-items-center rounded-full bg-[#d7ff58] text-3xl font-black text-[#062e29] shadow-lg transition hover:translate-x-1 active:scale-95">→</button>
            <p className="mt-3 text-xs font-bold tracking-[.14em] text-emerald-100/70">START · 랭킹 공개까지 5개의 이야기</p>
          </div>}

          {phase === "story" && <div className="my-auto">
            <div className="mb-6 flex items-center justify-between"><p className="text-xs font-bold tracking-[.18em] text-[#d7ff58]">{slide.kicker}</p><p className="text-xs text-white/50">{storyStep + 1} / {storySlides.length}</p></div>
            <div className="rounded-[32px] bg-white p-6 text-[#092a52] shadow-2xl sm:p-9">
              <div className="text-5xl">{slide.icon}</div>
              <h2 className="mt-5 text-3xl font-black leading-tight sm:text-5xl">{slide.title}</h2>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">{slide.body}</p>
              <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">{slide.chain.map((item, index) => <div key={item} className="relative rounded-2xl bg-[#edf6ef] px-3 py-4 text-center text-sm font-black text-[#17553c]">{item}{index < slide.chain.length - 1 ? <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 sm:block">→</span> : null}</div>)}</div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button onClick={() => setStoryStep(v => Math.max(0, v - 1))} disabled={storyStep === 0} className="rounded-full border border-white/25 px-5 py-3 text-sm font-bold disabled:opacity-30">← 이전</button>
              {storyStep < storySlides.length - 1
                ? <button onClick={() => setStoryStep(v => Math.min(storySlides.length - 1, v + 1))} className="grid h-14 w-14 place-items-center rounded-full bg-[#d7ff58] text-2xl font-black text-[#062e29]">→</button>
                : <button onClick={() => setPhase("ranking")} className="rounded-full bg-[#d7ff58] px-7 py-4 text-sm font-black text-[#062e29]">내 랭킹 공개 →</button>}
            </div>
            <p className="mt-5 text-[10px] leading-4 text-white/45">수달 자체가 홍수 등 자연재해를 막는다는 뜻이 아니라, 수달이 의존하는 하천·습지 생태계의 건강성과 그 생태계가 제공하는 기능이 우리의 안전과 연결되어 있다는 의미입니다. Otter photo: {OTTER_CREDIT}.</p>
          </div>}

          {phase === "ranking" && <div className="my-auto text-center">
            <p className="text-sm font-bold tracking-[.2em] text-[#d7ff58]">RANKING UNLOCKED</p>
            <h2 className="mt-3 text-4xl font-black sm:text-5xl">이제 나의 랭킹을 확인하세요!</h2>
            <div className="mx-auto mt-7 max-w-md rounded-[32px] bg-white p-7 text-[#092a52] shadow-2xl">
              <p className="text-sm font-bold text-[#287d44]">MY RESULT</p>
              <div className="mt-3 text-6xl font-black">#{rank ?? "-"}</div>
              <p className="mt-2 text-slate-500">{score}번의 박수 · {playerName || "수달친구"}</p>
            </div>
            <Leaderboard leaders={leaders} />
            <div className="mx-auto mt-8 grid max-w-md gap-3 sm:grid-cols-2">
              <a href="https://www.naturelens.kr" target="_blank" rel="noreferrer" className="rounded-full bg-[#d7ff58] px-6 py-4 text-center font-black text-[#062e29]">NatureLens로 기록하기</a>
              <Link href="/news" className="rounded-full border border-white/30 px-6 py-4 text-center font-bold">LINKIMPACT 활동보기</Link>
            </div>
            <p className="mt-5 text-sm leading-6 text-emerald-50/70">오늘 발견한 연결을 실제 자연 기록과 행동으로 이어가 보세요.</p>
          </div>}
        </div>
      </div>
    </div>
  );
}

function Leaderboard({ leaders }: { leaders: Leader[] }) {
  if (!leaders.length) return <p className="mt-8 text-sm text-emerald-100/60">오늘의 첫 기록입니다.</p>;
  return <div className="mx-auto mt-8 max-w-sm rounded-2xl bg-black/15 p-4 text-left"><p className="mb-3 text-center text-xs font-black tracking-[.16em] text-emerald-200">TODAY TOP 5</p>{leaders.slice(0,5).map((leader,i) => <div key={`${leader.player_name}-${i}`} className="flex justify-between border-b border-white/10 py-2 text-sm last:border-0"><span>{i + 1}. {leader.player_name}</span><b>{leader.score} 👏</b></div>)}</div>;
}
