"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircle2, ChevronLeft, Leaf, Send, Smartphone, Users } from "lucide-react";

type Lang="ko"|"en";

const copy={
  ko:{
    badge:"NATURELENS · FIELD MISSION",
    title:"야생 친구를 찾습니다",
    subtitle:"FIELD MISSION 참가 신청",
    intro:"추석 저녁, 서울의 도시 야생을 함께 탐험합니다. 아래 정보를 작성하면 참가 신청이 접수됩니다.",
    date:"참가 희망일",name:"이름",age:"나이",gender:"성별",phone:"연락처",device:"휴대폰 기종",interests:"관심사",message:"기대하는 점 또는 하고 싶은 말",consent:"개인정보 수집 및 이용 동의",consentBody:"행사 참가 접수와 안내를 위해 이름, 나이, 연락처, 휴대폰 기종, 관심사 등의 정보를 수집합니다. 수집된 정보는 행사 운영 목적에만 사용하며 목적 달성 후 파기합니다.",
    required:"필수",optional:"선택",submit:"FIELD MISSION 참가 신청",sending:"신청 접수 중…",back:"행사 소개로 돌아가기",
    dates:["9월 25일(금) 오후 5:00","9월 26일(토) 오후 5:00"],
    genders:["여성","남성","기타","응답하지 않음"],
    devices:["Apple / iPhone","Android"],
    interests:["새 / 탐조","식물","곤충","사진","산책 / 트레킹","생물다양성","미션 / 탐험","새로운 사람 만나기","NatureLens","기타"],
    successTitle:"FIELD MISSION ACCEPTED 🌿",successBody:"참가 신청이 완료되었습니다. 준비물과 집결 안내는 입력하신 연락처로 전달드릴 예정입니다. 오늘의 미션은 현장에서 공개됩니다.",home:"랜딩페이지로 돌아가기",
    error:"신청을 저장하지 못했습니다. 잠시 후 다시 시도해주세요."
  },
  en:{
    badge:"NATURELENS · FIELD MISSION",
    title:"SEEKING WILD FRIENDS",
    subtitle:"FIELD MISSION REGISTRATION",
    intro:"Explore Seoul's urban wild with us during Chuseok. Complete the form below to register.",
    date:"Preferred date",name:"Name",age:"Age",gender:"Gender",phone:"Phone number",device:"Phone type",interests:"Interests",message:"What are you hoping to experience?",consent:"Consent to personal data collection",consentBody:"We collect your name, age, contact information, phone type and interests for registration, participant communication and event operation. Data will be deleted after the purpose of collection is fulfilled.",
    required:"Required",optional:"Optional",submit:"Join the FIELD MISSION",sending:"Submitting…",back:"Back to event page",
    dates:["Fri, Sep 25 · 5:00 PM","Sat, Sep 26 · 5:00 PM"],
    genders:["Female","Male","Other","Prefer not to say"],
    devices:["Apple / iPhone","Android"],
    interests:["Birds / Birdwatching","Plants","Insects","Photography","Walking / Trekking","Biodiversity","Missions / Exploration","Meeting new people","NatureLens","Other"],
    successTitle:"FIELD MISSION ACCEPTED 🌿",successBody:"Your registration is complete. Preparation and meeting-point information will be sent to the contact number you provided. Today's mission will be revealed on site.",home:"Back to landing page",
    error:"We couldn't save your registration. Please try again shortly."
  }
} as const;

export default function ApplyFormClient(){
  const[lang,setLang]=useState<Lang>("ko");
  const[busy,setBusy]=useState(false);
  const[done,setDone]=useState(false);
  const[error,setError]=useState("");
  const t=copy[lang];
  const interests=useMemo(()=>t.interests,[t]);

  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault(); setBusy(true); setError("");
    const fd=new FormData(e.currentTarget);
    const payload={
      slug:"wild-friends-2026",lang,
      date:String(fd.get("date")||""),
      name:String(fd.get("name")||""),
      age:String(fd.get("age")||""),
      gender:String(fd.get("gender")||""),
      phone:String(fd.get("phone")||""),
      device:String(fd.get("device")||""),
      interests:fd.getAll("interests").map(String),
      message:String(fd.get("message")||""),
      consent:fd.get("consent")==="on"
    };
    try{
      const r=await fetch("/api/forms/wild-friends-2026",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload)});
      if(!r.ok) throw new Error();
      setDone(true);
    }catch{setError(t.error)}finally{setBusy(false)}
  }

  if(done)return <main className="min-h-screen bg-[#eef3e9] px-5 py-10 text-[#173b32]">
    <div className="mx-auto flex min-h-[80svh] max-w-2xl items-center justify-center">
      <div className="w-full rounded-[2rem] border border-[#d8e2d3] bg-white p-8 text-center shadow-[0_24px_70px_rgba(22,60,50,.12)] md:p-12">
        <img src="/assets/linkimpact-logo.png" alt="LINKIMPACT" className="mx-auto h-14 w-auto"/>
        <div className="mx-auto mt-10 grid h-20 w-20 place-items-center rounded-full bg-[#dff4df] text-[#2c8b53]"><CheckCircle2 size={42}/></div>
        <h1 className="mt-7 text-3xl font-black md:text-4xl">{t.successTitle}</h1>
        <p className="mx-auto mt-5 max-w-lg text-base leading-8 text-[#597168]">{t.successBody}</p>
        <Link href={"/wild-friends?lang="+lang} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#173b32] px-6 py-3 font-black text-white"><ChevronLeft size={18}/>{t.home}</Link>
      </div>
    </div>
  </main>;

  return <main className="min-h-screen bg-[linear-gradient(180deg,#eaf4eb_0%,#f7f1df_42%,#edf5ee_100%)] text-[#173b32]">
    <header className="border-b border-[#d8e2d3]/80 bg-white/80 px-5 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <Link href={"/wild-friends?lang="+lang} className="flex items-center gap-3"><img src="/assets/linkimpact-logo.png" alt="LINKIMPACT" className="h-10 w-auto"/></Link>
        <div className="flex items-center gap-2 rounded-full border border-[#d6dfd1] bg-white p-1 text-xs font-black">
          <button type="button" onClick={()=>setLang("ko")} className={"rounded-full px-3 py-2 "+(lang==="ko"?"bg-[#2d8b55] text-white":"text-[#698077]")}>KO</button>
          <button type="button" onClick={()=>setLang("en")} className={"rounded-full px-3 py-2 "+(lang==="en"?"bg-[#2d8b55] text-white":"text-[#698077]")}>EN</button>
        </div>
      </div>
    </header>

    <section className="mx-auto grid max-w-5xl gap-8 px-5 py-10 md:grid-cols-[.82fr_1.18fr] md:py-16">
      <aside className="md:sticky md:top-8 md:self-start">
        <div className="overflow-hidden rounded-[2rem] bg-[#123d34] text-white shadow-[0_24px_70px_rgba(22,60,50,.18)]">
          <div className="relative h-52 overflow-hidden bg-[radial-gradient(circle_at_75%_20%,#f6d866_0,transparent_18%),linear-gradient(160deg,#1e604e,#0d2e2a)]">
            <div className="absolute inset-0 opacity-20" style={{backgroundImage:"radial-gradient(circle at 20% 70%,#fff 0 2px,transparent 3px)",backgroundSize:"24px 24px"}}/>
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-7 pb-6">
              <div><div className="text-xs font-black tracking-[.18em] text-[#a9d8b6]">{t.badge}</div><h1 className="mt-3 text-3xl font-black leading-tight">{t.title}</h1></div>
              <Leaf className="text-[#9ed8a8]" size={42}/>
            </div>
          </div>
          <div className="p-7">
            <h2 className="text-xl font-black">{t.subtitle}</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">{t.intro}</p>
            <div className="mt-7 space-y-3 text-sm">
              <div className="flex items-center gap-3 rounded-2xl bg-white/7 p-4"><Users size={18} className="text-[#f5d75c]"/><span>{lang==="ko"?"혼자 참가 환영 · 생태탐사 초보 가능":"Solo participants welcome · Beginners are welcome"}</span></div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/7 p-4"><Smartphone size={18} className="text-[#f5d75c]"/><span>{lang==="ko"?"스마트폰으로 NatureLens FIELD MISSION":"NatureLens FIELD MISSION on your phone"}</span></div>
            </div>
            <Link href={"/wild-friends?lang="+lang} className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[#c9e9d1]"><ChevronLeft size={16}/>{t.back}</Link>
          </div>
        </div>
      </aside>

      <form onSubmit={submit} className="rounded-[2rem] border border-[#d9e2d5] bg-white p-6 shadow-[0_24px_70px_rgba(22,60,50,.10)] md:p-9">
        <div className="mb-8"><div className="text-xs font-black tracking-[.18em] text-[#39845a]">APPLICATION FORM</div><h2 className="mt-2 text-3xl font-black">{t.subtitle}</h2></div>

        <Field label={t.date} requiredText={t.required}><div className="grid gap-3">{t.dates.map(x=><label key={x} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#dde5da] p-4 transition hover:border-[#5aa774] has-[:checked]:border-[#2d8b55] has-[:checked]:bg-[#eef8f0]"><input required type="radio" name="date" value={x} className="h-4 w-4 accent-[#2d8b55]"/><span className="font-bold">{x}</span></label>)}</div></Field>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label={t.name} requiredText={t.required}><input name="name" required className="input" /></Field>
          <Field label={t.age} requiredText={t.required}><input name="age" required inputMode="numeric" className="input" /></Field>
        </div>

        <Field label={t.gender} requiredText={t.optional}><div className="grid grid-cols-2 gap-3">{t.genders.map(x=><label key={x} className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#dde5da] p-3 text-sm has-[:checked]:border-[#2d8b55] has-[:checked]:bg-[#eef8f0]"><input type="radio" name="gender" value={x} className="accent-[#2d8b55]"/>{x}</label>)}</div></Field>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label={t.phone} requiredText={t.required}><input name="phone" required inputMode="tel" placeholder="010-0000-0000" className="input"/></Field>
          <Field label={t.device} requiredText={t.required}><select name="device" required className="input bg-white"><option value="">—</option>{t.devices.map(x=><option key={x}>{x}</option>)}</select></Field>
        </div>

        <Field label={t.interests} requiredText={t.required}><div className="grid grid-cols-2 gap-3">{interests.map(x=><label key={x} className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#dde5da] p-3 text-sm has-[:checked]:border-[#2d8b55] has-[:checked]:bg-[#eef8f0]"><input type="checkbox" name="interests" value={x} className="accent-[#2d8b55]"/>{x}</label>)}</div></Field>

        <Field label={t.message} requiredText={t.optional}><textarea name="message" rows={5} className="input min-h-32 resize-y"/></Field>

        <div className="mt-7 rounded-2xl bg-[#f5f7ef] p-5">
          <label className="flex cursor-pointer items-start gap-3"><input required type="checkbox" name="consent" className="mt-1 h-4 w-4 accent-[#2d8b55]"/><span><b>{t.consent}</b><span className="ml-2 text-xs font-black text-[#2d8b55]">{t.required}</span><span className="mt-2 block text-sm leading-6 text-[#62756d]">{t.consentBody}</span></span></label>
        </div>

        {error?<p className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-bold text-red-700">{error}</p>:null}
        <button disabled={busy} className="mt-7 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#173b32] px-6 py-4 text-base font-black text-white shadow-[0_10px_30px_rgba(23,59,50,.18)] transition hover:-translate-y-0.5 disabled:opacity-50"><Send size={18}/>{busy?t.sending:t.submit}</button>
      </form>
    </section>

    <style jsx global>{`.input{width:100%;border:1px solid #dde5da;border-radius:14px;padding:13px 14px;outline:none;transition:.2s}.input:focus{border-color:#2d8b55;box-shadow:0 0 0 3px rgba(45,139,85,.12)}`}</style>
  </main>
}

function Field({label,requiredText,children}:{label:string;requiredText:string;children:React.ReactNode}){
  return <label className="mb-6 block"><span className="mb-2 flex items-center gap-2 text-sm font-black">{label}<span className="rounded-full bg-[#edf5ee] px-2 py-1 text-[10px] text-[#39845a]">{requiredText}</span></span>{children}</label>
}
