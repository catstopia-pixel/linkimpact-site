import { env } from "cloudflare:workers";
import Link from "next/link";
import { requireChatGPTUser } from "../../chatgpt-auth";
export const dynamic="force-dynamic";
export default async function Donations(){
 await requireChatGPTUser('/admin/donations');
 const rows=await env.DB.prepare("SELECT id,answers_json,submitted_at FROM form_submissions WHERE form_slug='donation-receipt' ORDER BY submitted_at DESC LIMIT 500").all<{id:number;answers_json:string;submitted_at:string}>();
 return <main className="min-h-screen bg-slate-50 p-5 text-slate-900 md:p-10"><Link href="/admin/forms" className="text-sm underline">← 신청 · 설문 관리</Link><h1 className="my-6 text-3xl font-bold">기부금영수증 검토 신청</h1><p className="mb-6">신청 {rows.results.length}건 · 발급 자격과 실제 입금을 확인한 뒤 신청자에게 안내해주세요.</p><div className="overflow-x-auto"><table className="w-full min-w-[1000px] border-collapse bg-white text-sm"><thead><tr>{['접수일','기부자 / 입금자','구분','입금일 / 금액','연락처','주소 / 사업자번호','신청 ID'].map(h=><th key={h} className="border p-3 text-left">{h}</th>)}</tr></thead><tbody>{rows.results.map(r=>{let a:Record<string,unknown>={};try{a=JSON.parse(r.answers_json)}catch{}return <tr key={r.id}><td className="border p-3">{r.submitted_at}</td><td className="border p-3">{String(a.donorName||'')} / {String(a.depositorName||'')}</td><td className="border p-3">{a.donorType==='business'?'사업자':'개인'}</td><td className="border p-3">{String(a.donatedAt||'')} / {Number(a.amount||0).toLocaleString('ko-KR')}원</td><td className="border p-3">{String(a.email||'')}<br/>{String(a.phone||'')}</td><td className="border p-3">{String(a.address||'')}<br/>{String(a.businessNumber||'')}</td><td className="border p-3">{String(a.requestId||'')}</td></tr>})}</tbody></table></div></main>
}
