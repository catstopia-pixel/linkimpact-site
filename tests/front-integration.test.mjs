import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import ts from 'typescript';
const moduleUrl=source=>'data:text/javascript;base64,'+Buffer.from(ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText).toString('base64');
const {renderFront}=await import(moduleUrl(fs.readFileSync('app/front/render.ts','utf8')));
const template=fs.readFileSync('app/front/template.html','utf8');
const locations=JSON.parse(fs.readFileSync('app/front/story-map.json','utf8'));
const post=(id,type='activity')=>({id,type,status:'published',title_ko:`운영 게시물 ${id}`,title_en:`Live post ${id}`,excerpt_ko:'실제 요약',excerpt_en:'Actual excerpt',content_ko:'기존 운영 본문\n두번째 문단',content_en:'Preserved content',image_key:'/cover.webp',gallery_json:'["/gallery.webp"]',category:'환경',is_pinned:0,event_date:null,created_at:'2026-10-09',updated_at:'2026-10-09'});
test('live published content replaces all prototype posts and notices',()=>{
 const html=renderFront(template,locations,[post(43),post(46,'notice'),post(999)],{donate_url:'https://example.org/donate'});
 assert.match(html,/운영 게시물 43/);assert.match(html,/href="\/news\/46\?lang=ko"/);
 assert.match(html,/id="detail-999"/);assert.match(html,/기존 운영 본문<br>두번째 문단/);
 assert.match(html,/https:\/\/example.org\/donate/);assert.doesNotMatch(html,/\{\{[A-Z_0-9]+\}\}|linkimpact-content-v3|FIELD MISSION 참가 신청 구조 예시|data-cms-story/);
 assert.match(html,/"id":43/);assert.doesNotMatch(html,/"id":999/);
 const draft={...post(44),status:'draft'};
 assert.doesNotMatch(renderFront(template,locations,[draft],{}),/운영 게시물 44/);
});
test('database content and URLs cannot inject executable markup',()=>{
 const unsafe={...post(43),title_ko:'<script>alert(1)</script>',content_ko:'<img src=x onerror=alert(1)>',image_key:'javascript:alert(1)'};
 const html=renderFront(template,locations,[unsafe],{donate_url:'javascript:alert(1)'});
 assert.match(html,/&lt;script&gt;alert\(1\)&lt;\/script&gt;/);assert.doesNotMatch(html,/<img src=x onerror|href="javascript:|src="javascript:/);
 assert.match(html,/\\u003cscript>/);
});
test('all local media files exist and prototype CMS is not shipped',()=>{
 for(const match of template.matchAll(/src="(\/assets\/[^"?]+)"/g))assert.ok(fs.existsSync('public'+match[1]),match[1]);
 assert.ok(!fs.existsSync('public/admin.html'));
 assert.match(template,/name="viewport"/);assert.match(template,/prefers-reduced-motion/);
 assert.match(template,/href="\/favicon.ico"/);
});
let saved=[];let count=0;
globalThis.__donationEnv={DB:{prepare:sql=>({bind(...args){return {first:async()=>({count}),run:async()=>{saved.push({sql,args})}}}})}};
const donationSource=fs.readFileSync('app/api/forms/donation-receipt/route.ts','utf8').replace('import { env } from "cloudflare:workers";','const env = globalThis.__donationEnv;');
const {POST}=await import(moduleUrl(donationSource));
const valid={donorType:'individual',donorName:'TEST',depositorName:'TEST',email:'test@example.invalid',phone:'test',address:'TEST',donatedAt:'2026-01-01',amount:1000,consent:true};
const request=(body,origin)=>new Request('https://linkimpact.or.kr/api/forms/donation-receipt',{method:'POST',headers:{'Content-Type':'application/json',...(origin?{Origin:origin}:{})},body:JSON.stringify(body)});
test('donation validation rejects malformed requests without database writes',async()=>{
 for(const b of [{...valid,consent:'true'},{...valid,donatedAt:'2026-02-31'},{...valid,donorType:'business'},{...valid,amount:-1}])assert.equal((await POST(request(b))).status,400);
 assert.equal((await POST(request(valid,'https://attacker.invalid'))).status,403);assert.equal(saved.length,0);
});
test('donation request uses existing submissions table and throttles duplicate requests',async()=>{
 const r=await POST(request(valid,'https://linkimpact.or.kr'));assert.equal(r.status,200);assert.equal((await r.json()).ok,true);assert.equal(saved.length,1);assert.equal(saved[0].args[0],'donation-receipt');assert.ok(!saved[0].sql.includes('CREATE'));count=5;assert.equal((await POST(request(valid))).status,429);assert.equal(saved.length,1);
});
