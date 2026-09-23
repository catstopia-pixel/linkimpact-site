import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

const copy = {
  ko: {
    navBack:"공지사항", toggle:"EN", eyebrow:"NATURELENS · FIELD MISSION",
    heroTop:"추석에 집에 안 가세요? 그럼 야생으로 갑시다.",
    title:"야생 친구를 찾습니다",
    subtitle:"추석에 서울에 남은 사람들의 도시생태 탐사게임 & 네트워킹",
    intro:"금요일과 토요일 저녁, 스마트폰 하나 들고 도시의 야생을 찾아 나섭니다. 새와 식물, 곤충, 이름 모를 생명과 흔적을 발견하고 NatureLens에 기록하면서 현장에서 주어지는 FIELD MISSION을 수행합니다.",
    heroNote:"그냥 걷는 산책이 아니라 탐험하고, 발견하고, 수집하고, 미션을 깨는 현실세계 생태게임.",
    cta:"FIELD MISSION 참가 신청하기", ctaPending:"",
    weekendTitle:"주말 저녁을 탐험으로.", weekendBody:"해가 조금씩 낮아지는 오후 5시. 낮에 보이던 생물과 저녁이 되면서 움직이기 시작하는 생물을 함께 관찰합니다. 매번 같은 공원을 걷는 것이 아니라 하천과 습지의 새로운 구간을 직접 탐사하며 그날의 발견을 NatureLens에 남깁니다. 누가 무엇을 발견하게 될지는 직접 걸어보기 전까지 알 수 없습니다.",
    howTitle:"현실세계에서 시작되는 WILD QUEST",
    steps:[
      ["01 — MISSION","현장에서 오늘의 탐사 미션이 공개됩니다."],
      ["02 — EXPLORE","홍릉천과 습지 일대를 직접 걸으며 미션을 수행합니다."],
      ["03 — DISCOVER","새 · 식물 · 곤충 · 흔적 · 환경문제까지 도시 속 다양한 야생을 찾아봅니다."],
      ["04 — RECORD","발견한 생물을 NatureLens에 사진과 위치로 기록합니다."],
      ["05 — COMPLETE","미션을 완료하고 탐사 스탬프를 획득합니다."],
      ["06 — REWARD","정해진 미션을 성공하면 현장에서 경품을 받아갈 수 있습니다. 🎁"]
    ],
    questTitle:"오늘의 미션은 현장에서 공개됩니다.",
    questIntro:"정답을 맞히는 게임보다 직접 밖으로 나가 무엇인가를 발견하는 게임에 가깝습니다.",
    missions:[
      ["FIND FIVE","도시에서 서로 다른 생물 5종 발견하기"],
      ["NIGHT EXPLORER","해가 지기 시작한 뒤 나타나는 생명 찾기"],
      ["WETLAND TRAIL","습지 탐사구간 완주하기"],
      ["UNKNOWN FRIEND","이름을 모르는 생물 발견하기"],
      ["BIOBLITZ","제한시간 동안 최대한 다양한 생물 기록하기"]
    ],
    missionNote:"※ 실제 미션과 경품은 행사 당일 공개됩니다.",
    recordTitle:"탐사가 끝나면 기록이 남습니다.",
    recordBody:"오늘 발견한 생물, 내가 걸었던 탐사루트, 완료한 미션, 처음 가본 장소와 기억에 남은 사진. 하루의 경험이 단순한 산책으로 끝나는 것이 아니라 나만의 FIELD RECORD로 쌓입니다.",
    recordStats:"발견 종 수 · 탐사거리 · 방문지역 · 완료 미션 · 탐사루트",
    peopleTitle:"야생을 찾으러 왔다가, 사람도 만납니다.",
    peopleBody:"처음부터 둘러앉아 자기소개하는 네트워킹이 아닙니다. 같은 길을 걷고 서로 다른 생물을 발견하며 대화가 먼저 시작됩니다. 사람보다 발견이 먼저인 네트워킹. 혼자 신청해도 좋습니다.",
    afterTitle:"탐사가 끝난 뒤, 조금 더 이야기해요.",
    afterBody:"FIELD MISSION이 끝난 뒤에는 다과와 함께 AFTER TIME을 갖습니다. 오늘 가장 기억에 남은 발견, 성공한 미션, 재미있었던 순간과 사진을 함께 나눕니다. 다과는 무료로 제공됩니다.",
    infoTitle:"EVENT INFO", date1:"9월 25일(금) 오후 5:00", date2:"9월 26일(토) 오후 5:00", place:"홍릉천 · 습지 일대", free:"참가비 무료", reward:"FIELD MISSION 성공 시 경품 증정", prep:"준비물 · 스마트폰 · 운동화 및 간편한 복장 · 물", target:"추석 연휴를 서울에서 보내는 청년 · 생태탐사 초보 및 혼자 참가 환영",
    whoTitle:"이런 분이라면 더 재미있습니다.",
    who:["탐조를 한번 해보고 싶었던 사람","이름 모르는 식물을 그냥 지나치지 못하는 사람","산책하며 사진 찍는 걸 좋아하는 사람","게임처럼 미션 깨는 걸 좋아하는 사람","주말마다 새로운 곳을 가보고 싶은 사람","도시를 조금 다른 방식으로 보고 싶은 사람","혼자 참여할 수 있는 새로운 모임을 찾는 사람"],
    whoNote:"생물에 대한 지식은 필요하지 않습니다. 잘 알아서 찾는 것이 아니라 찾아보기 때문에 알게 되는 프로그램입니다.",
    finalTitle:"이번 주말, 새로운 곳 하나를 정복해보세요.", finalBody:"누군가는 새를 발견하고, 누군가는 이름 모를 식물을 발견하고, 누군가는 새로운 사람을 발견합니다.", finalLine:"혼자 와서, 같이 발견하는 추석.",
    formTitle:"FIELD MISSION 참가 신청", formBody:"아래 버튼을 누르면 LINKIMPACT 자체 참가 신청 폼으로 이동합니다.",
    accepted:"🌿 FIELD MISSION ACCEPTED", acceptedBody:"참가 신청이 완료되면 준비물과 집결 안내를 전달드립니다. 오늘의 미션은 현장에서 공개됩니다."
  },
  en: {
    navBack:"News", toggle:"KO", eyebrow:"NATURELENS · FIELD MISSION",
    heroTop:"Staying in Seoul for Chuseok? Let's go wild.",
    title:"SEEKING WILD FRIENDS",
    subtitle:"An urban ecology field game & networking night for people spending Chuseok in Seoul",
    intro:"On Friday and Saturday evening, head into the city's wild spaces with just your phone. Find birds, plants, insects and unfamiliar traces of life, record them in NatureLens, and complete FIELD MISSIONS revealed on site.",
    heroNote:"Not just a walk: explore, discover, collect, record and clear missions in a real-world ecology game.",
    cta:"Join the FIELD MISSION", ctaPending:"",
    weekendTitle:"Turn your weekend evening into an expedition.", weekendBody:"At 5 PM, as daylight begins to fade, we look for both daytime wildlife and creatures that become active toward evening. We explore new stretches of streams and wetlands and leave each discovery in NatureLens. You won't know what you'll find until you start walking.",
    howTitle:"WILD QUEST begins in the real world",
    steps:[
      ["01 — MISSION","Today's field mission is revealed on site."],
      ["02 — EXPLORE","Walk the Hongneungcheon stream and wetland area to complete it."],
      ["03 — DISCOVER","Look for birds, plants, insects, traces of life and environmental issues."],
      ["04 — RECORD","Save discoveries in NatureLens with photos and locations."],
      ["05 — COMPLETE","Finish missions and collect field stamps."],
      ["06 — REWARD","Complete designated missions to receive an on-site prize. 🎁"]
    ],
    questTitle:"Today's missions are revealed on site.",
    questIntro:"This is less about getting the right answer and more about going outside and finding something for yourself.",
    missions:[
      ["FIND FIVE","Find five different species in the city"],
      ["NIGHT EXPLORER","Find life that appears as the sun goes down"],
      ["WETLAND TRAIL","Complete the wetland exploration route"],
      ["UNKNOWN FRIEND","Discover a species you cannot name"],
      ["BIOBLITZ","Record as many different species as possible within the time limit"]
    ],
    missionNote:"※ Actual missions and prizes will be revealed on the event day.",
    recordTitle:"Your exploration becomes a FIELD RECORD.",
    recordBody:"Species you found, routes you walked, missions completed, places visited for the first time and memorable photos become more than a walk: they build your own FIELD RECORD.",
    recordStats:"Species found · Distance explored · Areas visited · Missions completed · Routes",
    peopleTitle:"Come looking for wildlife. Meet people along the way.",
    peopleBody:"This is not a networking event that starts with formal introductions. Walk the same path, find different things, and let conversation start from discovery. Discovery comes before networking. Coming alone is welcome.",
    afterTitle:"After the mission, stay for AFTER TIME.",
    afterBody:"After FIELD MISSION, we move into a relaxed AFTER TIME with complimentary refreshments. Share the day's best discoveries, missions, moments and photos.",
    infoTitle:"EVENT INFO", date1:"Fri, Sep 25 · 5:00 PM", date2:"Sat, Sep 26 · 5:00 PM", place:"Hongneungcheon stream & wetland area, Seoul", free:"Free participation", reward:"Prizes for successful FIELD MISSIONS", prep:"Bring · Smartphone · Comfortable shoes/clothes · Water", target:"For young adults spending Chuseok in Seoul · Beginners and solo participants welcome",
    whoTitle:"You'll especially enjoy this if you…",
    who:["Have wanted to try birdwatching","Always stop for plants you don't recognize","Enjoy taking photos on walks","Like completing game-style missions","Want to explore somewhere new on weekends","Want to see the city differently","Are looking for a new activity you can join alone"],
    whoNote:"No biological knowledge is required. You don't find things because you already know them—you learn because you start looking.",
    finalTitle:"Conquer one new place this weekend.", finalBody:"Someone will find a bird, someone an unknown plant, and someone a new person.", finalLine:"Come alone. Discover together.",
    formTitle:"FIELD MISSION REGISTRATION", formBody:"Use the button below to open LINKIMPACT’s own registration form.",
    accepted:"🌿 FIELD MISSION ACCEPTED", acceptedBody:"After registration, we'll send preparation and meeting-point information. Today's mission will be revealed on site."
  }
} as const;

export const metadata: Metadata = {
  title:"야생 친구를 찾습니다 | NatureLens FIELD MISSION",
  description:"추석 저녁, 서울의 도시 야생을 발견하고 NatureLens에 기록하며 FIELD MISSION을 수행하는 현실세계 생태 탐사게임 & 네트워킹.",
  alternates:{canonical:"/wild-friends"}
};

function Section({children,dark=false}:{children:React.ReactNode;dark?:boolean}) {
  return <section className={dark?"bg-[#092d2a] text-white":"bg-[#f7f5e9] text-[#153a32]"}><div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">{children}</div></section>
}

export default async function WildFriendsPage({searchParams}:{searchParams:Promise<{lang?:string}>}) {
  const {lang:rawLang}=await searchParams; const lang=rawLang==="en"?"en":"ko"; const t=copy[lang]; const opposite=lang==="ko"?"en":"ko";
  return <main className="min-h-screen bg-[#f7f5e9] text-[#153a32]">
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#092d2a]/95 px-5 py-4 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between"><Link href="/" className="font-black tracking-tight">◎ LINKIMPACT</Link><div className="flex items-center gap-3"><Link href={"/wild-friends?lang="+opposite} className="rounded-full border border-white/30 px-4 py-2 text-xs font-black">{t.toggle}</Link><Link href={"/news?type=notice&lang="+lang} className="text-sm font-bold">← {t.navBack}</Link></div></div>
    </header>

    <section className="relative overflow-hidden bg-[#092d2a] text-white">
      <div className="absolute inset-0 opacity-25" style={{backgroundImage:"radial-gradient(circle at 20% 10%,#6fcb7d 0,transparent 28%),radial-gradient(circle at 85% 20%,#f4c968 0,transparent 22%)"}}/>
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[1.05fr_.95fr] md:px-8 md:py-28">
        <div className="flex flex-col justify-center"><p className="text-sm font-black tracking-[.18em] text-[#9ed8a8]">{t.eyebrow}</p><p className="mt-8 text-xl font-bold text-[#f4c968]">{t.heroTop}</p><h1 className="mt-4 text-5xl font-black leading-[1.04] md:text-7xl">{t.title}</h1><p className="mt-5 text-xl font-bold leading-8 text-[#dff2e3]">{t.subtitle}</p><p className="mt-8 max-w-2xl text-base leading-8 text-white/75">{t.intro}</p><p className="mt-4 font-bold leading-7">{t.heroNote}</p><div className="mt-8 text-sm font-black tracking-[.15em] text-[#9ed8a8]">MISSION → EXPLORE → DISCOVER → RECORD → COMPLETE</div><Link href={"/apply/wild-friends-2026?lang="+lang} className="mt-9 inline-flex w-fit rounded-2xl bg-[#f4c968] px-7 py-4 font-black text-[#153a32] shadow-lg transition hover:-translate-y-0.5">{t.cta}</Link></div>
        <div className="mx-auto w-full max-w-[430px] overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 p-3 shadow-2xl"><div className="aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-[#102d29]"><img src="/notices/wild-friends-2026.svg" alt={t.title} className="h-full w-full object-cover"/></div></div>
      </div>
    </section>

    <Section><p className="text-xs font-black tracking-[.2em] text-[#43835a]">FRIDAY & SATURDAY FIELD MISSION</p><h2 className="mt-4 text-4xl font-black md:text-6xl">{t.weekendTitle}</h2><p className="mt-8 max-w-4xl whitespace-pre-line text-lg leading-9 text-[#4b655e]">{t.weekendBody}</p></Section>

    <Section dark><p className="text-xs font-black tracking-[.2em] text-[#9ed8a8]">HOW TO PLAY</p><h2 className="mt-4 text-4xl font-black md:text-5xl">{t.howTitle}</h2><div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{t.steps.map(([a,b])=><div key={a} className="rounded-3xl border border-white/10 bg-white/5 p-7"><div className="text-sm font-black text-[#f4c968]">{a}</div><p className="mt-4 leading-7 text-white/75">{b}</p></div>)}</div></Section>

    <Section><p className="text-xs font-black tracking-[.2em] text-[#43835a]">WILD QUEST</p><h2 className="mt-4 text-4xl font-black md:text-5xl">{t.questTitle}</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-[#4b655e]">{t.questIntro}</p><div className="mt-10 grid gap-3">{t.missions.map(([a,b])=><div key={a} className="grid gap-2 rounded-2xl border border-[#d9dec9] bg-white p-5 md:grid-cols-[190px_1fr]"><b className="text-[#287d44]">{a}</b><span>{b}</span></div>)}</div><p className="mt-5 text-sm text-[#6c7d77]">{t.missionNote}</p></Section>

    <Section dark><div className="grid gap-10 md:grid-cols-2"><div><p className="text-xs font-black tracking-[.2em] text-[#9ed8a8]">YOUR FIELD RECORD</p><h2 className="mt-4 text-4xl font-black">{t.recordTitle}</h2><p className="mt-6 leading-8 text-white/75">{t.recordBody}</p><p className="mt-6 rounded-2xl bg-white/10 p-5 font-black text-[#f4c968]">{t.recordStats}</p></div><div><p className="text-xs font-black tracking-[.2em] text-[#9ed8a8]">FIND SOMETHING MORE</p><h2 className="mt-4 text-4xl font-black">{t.peopleTitle}</h2><p className="mt-6 leading-8 text-white/75">{t.peopleBody}</p></div></div></Section>

    <Section><p className="text-xs font-black tracking-[.2em] text-[#43835a]">AFTER TIME</p><h2 className="mt-4 text-4xl font-black">{t.afterTitle}</h2><p className="mt-6 max-w-4xl text-lg leading-9 text-[#4b655e]">{t.afterBody}</p></Section>

    <Section dark><h2 className="text-4xl font-black">{t.infoTitle}</h2><div className="mt-10 grid gap-4 md:grid-cols-2"><Info icon="📅" text={t.date1}/><Info icon="📅" text={t.date2}/><Info icon="📍" text={t.place}/><Info icon="💚" text={t.free}/><Info icon="🎁" text={t.reward}/><Info icon="🎒" text={t.prep}/><div className="md:col-span-2"><Info icon="🌿" text={t.target}/></div></div></Section>

    <Section><p className="text-xs font-black tracking-[.2em] text-[#43835a]">WHO IS THIS FOR?</p><h2 className="mt-4 text-4xl font-black">{t.whoTitle}</h2><div className="mt-8 grid gap-3 md:grid-cols-2">{t.who.map((x,i)=><div key={x} className="rounded-2xl bg-white p-5 font-bold shadow-sm">{["🐦","🌿","📸","🎮","🚶","🔎","🙋"][i]} &nbsp;{x}</div>)}</div><p className="mt-8 max-w-4xl text-lg font-bold leading-8 text-[#287d44]">{t.whoNote}</p></Section>

    <section className="bg-[#f4c968] text-[#153a32]"><div className="mx-auto max-w-5xl px-5 py-20 text-center md:py-28"><h2 className="text-4xl font-black md:text-6xl">{t.finalTitle}</h2><p className="mx-auto mt-7 max-w-3xl text-lg leading-8">{t.finalBody}</p><p className="mt-5 text-2xl font-black">{t.finalLine}</p><div className="mx-auto mt-10 max-w-xl rounded-[2rem] bg-white p-8 shadow-xl"><div className="text-xs font-black tracking-[.18em] text-[#43835a]">{t.formTitle}</div><p className="mt-4 leading-7 text-[#5d6c64]">{t.formBody}</p><Link href={"/apply/wild-friends-2026?lang="+lang} className="mt-6 block rounded-2xl bg-[#153a32] px-6 py-4 font-black text-white transition hover:-translate-y-0.5">{t.cta}</Link></div><div className="mx-auto mt-8 max-w-xl rounded-2xl border-2 border-[#153a32]/15 p-6"><b>{t.accepted}</b><p className="mt-2 text-sm leading-6">{t.acceptedBody}</p></div></div></section>
  </main>
}

function Info({icon,text}:{icon:string;text:string}){return <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"><span className="text-2xl">{icon}</span><span className="font-bold leading-7 text-white/85">{text}</span></div>}
