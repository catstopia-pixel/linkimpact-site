import type { Post } from "../lib/content";
export type Location = {sourceId:number|null;chapter:number;lat:number;lng:number;place_ko:string;place_en:string};
const escape = (v:unknown) => String(v??"").replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
function safeUrl(value:string, fallback="/") {return /^(https?:\/\/|\/(?!\/))/.test(value)?value:fallback;}
function media(key:string|null) {return key ? safeUrl(key.startsWith("/")||/^https?:/.test(key)?key:`/api/media/${encodeURIComponent(key)}`) : "";}
function bilingual(ko:string,en:string) {return `<span class="ko">${escape(ko)}</span><span class="en">${escape(en||ko)}</span>`;}
function text(v:string) {return escape(v.replace(/\[\[[A-Z0-9_]+\]\]/g,"").trim()).replace(/\n/g,"<br>");}
function gallery(v:string) {try{const a=JSON.parse(v);return Array.isArray(a)?a.filter((x:unknown)=>typeof x==='string').map((x:string)=>media(x)).filter(Boolean):[]}catch{return []}}
const responsiveCSS=`.body-copy{overflow-wrap:anywhere}.body-copy p{white-space:normal}.article-media img,.photo-gallery img{max-width:100%;height:auto}.bank-support .en{font-family:inherit}.collection-grid:empty:after{content:'LINKIMPACT · Coming soon';padding:20px;color:#375e4e}@media(max-width:600px){.bank-support h1{font-size:clamp(30px,8vw,48px)}.bank-number{font-size:clamp(22px,6vw,40px)}.bank-copy{width:100%}.article-inner{min-width:0}.notice-card{min-width:0}.notice-card h3{overflow-wrap:anywhere}}@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*:before,*:after{animation:none!important;transition:none!important}}`;
export function renderFront(template:string, locations:Location[], posts:Post[], front:Record<string,string>) {
 const activities=posts.filter(p=>p.type==='activity'&&p.status==='published');
 const notices=posts.filter(p=>p.type==='notice'&&p.status==='published');
 const locate=(p:Post)=>locations.find(l=>l.sourceId===p.id);
 const chapter=(p:Post)=>locate(p)?.chapter??2;
 const slots:Record<string,string>={RESPONSIVE_CSS:responsiveCSS,DONATE_URL:escape(safeUrl(front.donate_url||'', 'https://together.kakao.com/fundraisings/139701/story'))};
 const lead=activities[0];
 slots.HERO=lead?`<div class="chapter-no"><i></i>CHAPTER ${String(chapter(lead)+1).padStart(2,'0')}</div><div class="kicker">${bilingual(lead.category,lead.category)}</div><h1>${bilingual(lead.title_ko,lead.title_en)}</h1><p>${bilingual(lead.excerpt_ko,lead.excerpt_en)}</p><a class="learn" href="#detail-${lead.id}">${bilingual('자세히 보기','LEARN MORE')}<i></i></a>`:`<h1>LINKIMPACT</h1><p>${bilingual('연결은 설계되어야 한다.','Connection must be designed.')}</p>`;
 slots.RIBBON=activities.map(p=>`<a href="#detail-${p.id}" aria-label="${escape(p.title_ko)}"></a>`).join('');
 for(let i=0;i<6;i++) {
  const list=activities.filter(p=>chapter(p)===i);
  slots[`COUNT_${i}`]=String(list.length).padStart(2,'0');
  slots[`CHAPTER_${i}`]=list.map((p,index)=>`<a class="story-link" href="#detail-${p.id}"><span class="story-no">${String(index+1).padStart(2,'0')}</span><div><strong>${bilingual(p.title_ko,p.title_en)}</strong><small>${bilingual(locate(p)?.place_ko||p.category,locate(p)?.place_en||p.category)}</small></div><span class="arr">↗</span></a>`).join('');
 }
 slots.NOTICES=notices.map(p=>`<a class="notice-card" data-post-link href="/news/${p.id}?lang=ko"><span class="notice-state">${bilingual('공지사항','NOTICE')}</span><div><h3>${bilingual(p.title_ko,p.title_en)}</h3><p>${bilingual(p.excerpt_ko,p.excerpt_en)}</p><div class="notice-meta"><span class="notice-chip">${escape(p.category)}</span><span class="notice-chip">${escape((p.event_date||p.created_at).slice(0,10))}</span></div></div><span class="arr">↗</span></a>`).join('')||`<p>${bilingual('등록된 공지사항이 없습니다.','No notices published yet.')}</p>`;
 slots.MAP_DATA=JSON.stringify(activities.flatMap(p=>{const l=locate(p);return l?[{...l,id:p.id,title_ko:p.title_ko,title_en:p.title_en||p.title_ko,image:media(p.image_key)}]:[]})).replace(/</g,'\\u003c');
 slots.DRAWERS=activities.map((p,index)=>{
  const l=locate(p),date=escape((p.event_date||p.created_at).slice(0,10)),title=bilingual(p.title_ko,p.title_en);
  const photos=gallery(p.gallery_json);const next=activities[(index+1)%activities.length];
  return `<section class="drawer" id="detail-${p.id}" data-story-id="${p.id}" aria-labelledby="detail-title-${p.id}"><a class="drawer-close" aria-label="Close" href="#home">×</a><aside class="drawer-map" ${l?`data-lat="${l.lat}" data-lng="${l.lng}" data-place-ko="${escape(l.place_ko)}" data-place-en="${escape(l.place_en)}" data-zoom="11"`:''} style="background:linear-gradient(145deg,#08372f,#176958)">${l?`<div class="chapter-map" id="chapter-map-${p.id}" aria-hidden="true"></div>`:''}<div class="map-pin"><span class="pin-box"></span>${bilingual(l?.place_ko||p.category,l?.place_en||p.category)}</div><div class="map-topline"><div><div class="eyebrow">LINKIMPACT · ACTIVITY</div><div class="place">${bilingual(l?.place_ko||p.category,l?.place_en||p.category)}</div></div><div class="map-zoom-status"></div></div></aside><article class="article"><div class="article-inner"><div class="tags"><span class="tag">${escape(p.category)}</span><span class="tag light">${date}</span></div><h1 id="detail-title-${p.id}">${title}</h1><h2>${bilingual(p.excerpt_ko,p.excerpt_en)}</h2>${p.image_key?`<figure class="article-media actual-media"><img src="${escape(media(p.image_key))}" alt="${escape(p.title_ko)}" loading="lazy"></figure>`:''}<div class="body-copy ko"><p>${text(p.content_ko)}</p></div><div class="body-copy en"><p>${text(p.content_en||p.content_ko)}</p></div>${photos.length?`<div class="photo-gallery">${photos.map(src=>`<img src="${escape(src)}" alt="${escape(p.title_ko)}" loading="lazy">`).join('')}</div>`:''}</div><footer class="article-footer"><div><h2>LINKIMPACT</h2><p>${bilingual('연결은 설계되어야 한다.','Connection must be designed.')}</p></div><div class="footer-nav"><a class="nav-pill" href="#home">← HOME</a><a class="nav-pill" href="#explore">EXPLORE ↗</a><a class="nav-pill" href="#detail-${next.id}">${bilingual('다음','NEXT')} →</a></div></footer></article></section>`;
 }).join('');
 return template.replace(/\{\{([A-Z_0-9]+)\}\}/g,(_,key)=>slots[key]??'');
}
