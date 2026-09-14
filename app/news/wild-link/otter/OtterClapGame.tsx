"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

type Leader = { player_name: string; score: number };
type Phase = "intro" | "countdown" | "play" | "result" | "story";

const GAME_SECONDS = 10;
const OTTER_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/7/7f/Otter_-_Eurasian_otter_-_Lutra_lutra.jpg";
const OTTER_CREDIT = "Bouke ten Cate · CC BY 4.0 · Wikimedia Commons";

export default function OtterClapGame() {
  const [phase, setPhase] = useState<Phase>("intro");
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
    if (countdown <= 0) {
      setPhase("play");
      return;
    }
    const timer = window.setTimeout(() => setCountdown(v => v - 1), 700);
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

  return (
    <div className="overflow-hidden rounded-[32px] bg-[#062e29] text-white shadow-2xl">
      <div className="relative min-h-[680px] select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#237566_0%,#0b433a_35%,#062e29_72%)]" />
        <div className="relative z-10 flex min-h-[680px] flex-col p-5 sm:p-9">
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
            <p className="mx-auto mt-5 max-w-md text-base leading-7 text-emerald-50/80">10초 동안 화면을 빠르게 터치하세요. 박수가 쌓일수록 수달에게 응원의 파동이 번집니다.</p>
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
            <p className="mt-1 text-xs text-emerald-100/55">5회마다 짧은 진동 · 모바일 지원 기기</p>
          </button>}

          {phase === "result" && <div className="my-auto text-center">
            <div className="mx-auto mb-5 h-36 w-36 overflow-hidden rounded-full border-4 border-[#d7ff58]/50"><img src={OTTER_IMAGE} alt="수달" className="h-full w-full object-cover" /></div>
            <p className="text-sm font-bold tracking-[.2em] text-[#d7ff58]">NICE CLAP!</p>
            <div className="mt-3 text-7xl font-black">{score}</div><p className="mt-1 text-emerald-100">번의 박수</p>
            {rank ? <p className="mt-5 text-2xl font-black">오늘의 순위 #{rank}</p> : null}
            <button onClick={() => setPhase("story")} className="mt-8 rounded-full bg-white px-8 py-4 font-black text-[#062e29]">그런데 수달과 나는 무슨 사이일까요? →</button>
            <Leaderboard leaders={leaders} />
          </div>}

          {phase === "story" && <div className="my-auto">
            <p className="text-sm font-bold tracking-[.18em] text-[#d7ff58]">FOLLOW THE LINK</p>
            <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">수달을 따라갔더니,<br/>결국 우리가 나왔습니다.</h2>
            <div className="mt-8 grid grid-cols-3 gap-2 text-center text-xs font-bold sm:grid-cols-6 sm:text-sm">
              {[['🦦','수달'],['🌊','하천·습지'],['🐟','다양한 생명'],['💧','물환경'],['🏘️','지역사회'],['👤','우리의 삶']].map(([icon,label],i) => <div key={label} className="relative rounded-2xl bg-white/10 p-4"><div className="text-3xl">{icon}</div><div className="mt-2">{label}</div>{i < 5 ? <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 sm:block">→</span> : null}</div>)}
            </div>
            <div className="mt-8 rounded-3xl bg-white p-6 text-[#092a52] sm:p-8"><p className="text-xl font-black">생물다양성은 자연만의 이야기가 아닙니다.</p><p className="mt-3 leading-7 text-slate-600">수달이 살아가는 건강한 하천과 습지는 수많은 생명의 서식지입니다. 자연의 다양한 연결과 기능은 물환경과 지역의 회복력에 관계되고, 그 영향은 결국 우리가 살아가는 삶의 터전으로 이어집니다.</p><div className="mt-6 border-t pt-6"><p className="font-black text-[#287d44]">LINKIMPACT는 이 연결을 발견합니다.</p><p className="mt-2 text-sm leading-6 text-slate-600">환경과 사회의 문제로 삶의 터전을 위협받는 지역사회의 문제를 발견하고, 사람과 자원, 행동을 연결해 지속가능한 변화를 만듭니다.</p></div></div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row"><a href="https://www.naturelens.kr" target="_blank" rel="noreferrer" className="flex-1 rounded-full bg-[#d7ff58] px-6 py-4 text-center font-black text-[#062e29]">NatureLens에서 생명 기록하기</a><Link href="/news" className="flex-1 rounded-full border border-white/30 px-6 py-4 text-center font-bold">LINKIMPACT 활동 더 보기</Link></div>
            <p className="mt-5 text-[10px] leading-4 text-white/45">Otter photo: {OTTER_CREDIT}. Original image used without modification except display cropping.</p>
          </div>}
        </div>
      </div>
    </div>
  );
}

function Leaderboard({ leaders }: { leaders: Leader[] }) {
  if (!leaders.length) return <p className="mt-8 text-sm text-emerald-100/60">오늘의 첫 기록에 도전해보세요.</p>;
  return <div className="mx-auto mt-8 max-w-sm rounded-2xl bg-black/15 p-4 text-left"><p className="mb-3 text-center text-xs font-black tracking-[.16em] text-emerald-200">TODAY TOP 5</p>{leaders.slice(0,5).map((leader,i) => <div key={`${leader.player_name}-${i}`} className="flex justify-between border-b border-white/10 py-2 text-sm last:border-0"><span>{i + 1}. {leader.player_name}</span><b>{leader.score} 👏</b></div>)}</div>;
}
