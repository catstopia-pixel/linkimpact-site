import { env } from "cloudflare:workers";

export const defaultSettings = {
  hero_title_ko: "LINKED TO\nCONNECT THE WORLD.",
  hero_title_en: "LINKED TO\nCONNECT THE WORLD.",
  hero_lead_ko: "연결이 변화를 만들고, 변화가 미래를 만듭니다.",
  hero_lead_en: "Connection creates change, and change creates the future.",
  hero_body_ko: "LINKIMPACT는 사람, 기술, 데이터, 지역과 세계를 연결하여 지속가능한 지구를 만드는 글로벌 비정부기구입니다.",
  hero_body_en: "LINKIMPACT connects people, technology, data, communities and the world to build a sustainable planet.",
  hero_image_key: null as string | null,
  mission_title_ko: "공익을 지키고,\n연결을 행동으로 만듭니다.",
  mission_title_en: "Protecting the public interest,\nturning connection into action.",
  mission_body_ko: "공익이 권력과 시장의 우선순위에서 밀려나기 쉬운 지금, 독립적인 비정부기구는 현장을 기록하고 책임을 묻는 필수적인 시민 기반입니다. LINKIMPACT는 관찰과 데이터를 공정한 제안으로, 시민의 참여를 국경을 넘는 연대로 연결합니다.",
  mission_body_en: "When public interest is easily pushed aside by power and markets, independent NGOs are essential civic institutions that document reality and demand accountability. LINKIMPACT connects observation and data to fair proposals, and citizen participation to solidarity across borders.",
  platform_title_ko: "시민의 관찰이 지구의 지식이 됩니다.",
  platform_title_en: "Citizen observations become knowledge for the planet.",
  platform_body_ko: "NatureLens는 시민이 자연을 기록하고, AI가 분석하고, 모두가 활용할 수 있는 데이터로 만드는 시민과학 플랫폼입니다.",
  platform_body_en: "NatureLens turns citizen observations into shared knowledge with AI.",
  vision_title_ko: "새로운 글로벌 비정부기구, LINKIMPACT",
  vision_title_en: "A global NGO for a connected world, LINKIMPACT",
  vision_body_ko: "국경을 넘어 사람과 사람을 잇고, 문제와 해결을 연결하여 지속가능한 지구와 공정한 미래를 만들어갑니다.",
  vision_body_en: "Across borders, we connect people, problems and solutions for a sustainable and fair future.",
  donate_url: "https://together.kakao.com/fundraisings/139701/story",
};

export const defaultFrontSettings: Record<string,string> = {
  eyebrow: "PEOPLE CONNECT NATURE · A BRIGHTER TOMORROW",
  title_line1: "LINKED TO",
  title_emphasis: "CHANGE",
  title_line2: "THE WORLD",
  lead: "연결이 변화를 만듭니다.",
  body: "사람과 자원, 행동을 연결해\n지역사회의 지속가능한 변화를 만듭니다.",
  background_image_key: "/assets/earth-network.png",
  people_label: "PEOPLE",
  people_desc: "사람을 연결합니다.",
  people_image_key: "",
  nature_label: "NATURE",
  nature_desc: "자연을 연결합니다.",
  nature_image_key: "",
  community_label: "COMMUNITY",
  community_desc: "지역사회를 연결합니다.",
  community_image_key: "",
  resource_label: "RESOURCE",
  resource_desc: "자원을 연결합니다.",
  resource_image_key: "",
  action_label: "ACTION",
  action_desc: "행동으로 변화를 만듭니다.",
  action_image_key: "",
  work_label: "OUR WORK",
  work_url: "/news?type=activity",
  naturelens_label: "NATURELENS",
  naturelens_url: "https://www.naturelens.kr",
  donate_label: "DONATE",
  donate_url: "https://together.kakao.com/fundraisings/139701/story",
  notice_label: "NEWS",
  notice_url: "/news?type=notice",
};

export const defaultStats = [
  { key: "citizens", label_ko: "시민 참여", label_en: "Citizen participants", value: "250,000+", sort_order: 1 },
  { key: "records", label_ko: "생물 관찰 데이터", label_en: "Nature records", value: "500,000+", sort_order: 2 },
  { key: "countries", label_ko: "협력 국가", label_en: "Partner countries", value: "30+", sort_order: 3 },
  { key: "partners", label_ko: "파트너 기관", label_en: "Partner organizations", value: "120+", sort_order: 4 },
  { key: "projects", label_ko: "진행 프로젝트", label_en: "Projects", value: "80+", sort_order: 5 },
];

export type Post = {
  id: number; type: "notice" | "activity"; title_ko: string; title_en: string;
  excerpt_ko: string; excerpt_en: string; content_ko: string; content_en: string;
  image_key: string | null; gallery_json: string; category: string; status: "draft" | "published";
  is_pinned: number; event_date: string | null; created_at: string; updated_at: string;
};

type SovacNotice = {
  marker: string;
  titleKo: string;
  titleEn: string;
  excerptKo: string;
  excerptEn: string;
  contentKo: string;
  contentEn: string;
  imageKey: string | null;
};

const SOVAC_CATEGORY = "SOVAC 2026 · INTERACTIVE";
const WILD_LINK_TITLE = "[SOVAC 2026] 수달의 박수 — 생물다양성과 우리의 삶은 어떻게 연결될까요?";
const WILD_LINK_IMAGE = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Male_sea_otter_rubbing_flippers_and_forepaws.png";
const WILD_LINK_MARKER = "[[WILD_LINK_OTTER]]";
const BAMBOO_LINK_TITLE = "[SOVAC 2026] 30초 숲 만들기 — 대나무가 지역사회의 회복과 어떻게 연결될까요?";
const BAMBOO_LINK_MARKER = "[[BAMBOO_LINK_PHILIPPINES]]";
const WILD_FRIENDS_TITLE = "[모집] 야생 친구를 찾습니다 — 추석 도시생태 탐사게임 & 네트워킹";
const WILD_FRIENDS_MARKER = "[[WILD_FRIENDS_2026]]";

async function upsertAndDeduplicateSovacNotice(notice: SovacNotice, now: string) {
  const matches = await env.DB.prepare(
    "SELECT id FROM posts WHERE title_ko = ? OR content_ko LIKE ? OR content_en LIKE ? ORDER BY id ASC"
  ).bind(notice.titleKo, `%${notice.marker}%`, `%${notice.marker}%`).all<{id:number}>();

  const ids = matches.results.map(row => row.id);

  if (ids.length) {
    const keepId = ids[0];
    await env.DB.prepare(
      `UPDATE posts SET
        type='notice', title_ko=?, title_en=?, excerpt_ko=?, excerpt_en=?, content_ko=?, content_en=?,
        image_key=?, gallery_json='[]', category=?, status='published', is_pinned=1, event_date='2026-09-14', updated_at=?
       WHERE id=?`
    ).bind(
      notice.titleKo, notice.titleEn, notice.excerptKo, notice.excerptEn,
      notice.contentKo, notice.contentEn, notice.imageKey, SOVAC_CATEGORY, now, keepId
    ).run();

    for (const duplicateId of ids.slice(1)) {
      await env.DB.prepare("DELETE FROM posts WHERE id=?").bind(duplicateId).run();
    }
    return;
  }

  await env.DB.prepare(
    "INSERT INTO posts(type,title_ko,title_en,excerpt_ko,excerpt_en,content_ko,content_en,image_key,gallery_json,category,status,is_pinned,event_date,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
  ).bind(
    "notice", notice.titleKo, notice.titleEn, notice.excerptKo, notice.excerptEn,
    notice.contentKo, notice.contentEn, notice.imageKey, "[]", SOVAC_CATEGORY,
    "published", 1, "2026-09-14", now, now
  ).run();
}

async function ensureSovacNotices() {
  try {
    const now = new Date().toISOString();
    // The Otter Clap notice has been retired. Remove any previously generated
    // copy from D1 so it cannot reappear in the notice list or front popup.
    await env.DB.prepare(
      "DELETE FROM posts WHERE title_ko = ? OR content_ko LIKE ? OR content_en LIKE ?"
    ).bind(WILD_LINK_TITLE, `%${WILD_LINK_MARKER}%`, `%${WILD_LINK_MARKER}%`).run();

    const wildFriends = await env.DB.prepare(
      "SELECT id FROM posts WHERE title_ko = ? OR content_ko LIKE ? OR content_en LIKE ? ORDER BY id ASC"
    ).bind(WILD_FRIENDS_TITLE, `%${WILD_FRIENDS_MARKER}%`, `%${WILD_FRIENDS_MARKER}%`).all<{id:number}>();
    const wildFriendsIds = wildFriends.results.map(row => row.id);
    const wildFriendsKo = `${WILD_FRIENDS_MARKER}
추석 연휴, 서울에 남은 청년들과 함께 도시의 야생을 발견하고 기록하는 NatureLens FIELD MISSION을 진행합니다.

금요일과 토요일 오후 5시, 홍릉천과 습지 일대를 걸으며 새·식물·곤충·이름 모를 생명과 흔적을 발견하고 NatureLens에 기록합니다. 현장에서 공개되는 WILD QUEST 미션을 완료하면 경품도 받을 수 있습니다.

탐사가 끝난 뒤에는 무료 다과와 함께 AFTER TIME 네트워킹이 이어집니다. 생물에 대한 지식은 필요하지 않으며 혼자 참가해도 좋습니다.

일정
- 9월 25일(금) 오후 5:00
- 9월 26일(토) 오후 5:00

장소: 홍릉천 · 습지 일대
참가비: 무료
준비물: 스마트폰, 운동화 및 간편한 복장, 물
FIELD MISSION 성공 시 경품 증정

상세 프로그램과 참가 신청 안내는 랜딩페이지에서 확인할 수 있습니다.
LANDING: /wild-friends
REGISTRATION: 준비 중`;
    const wildFriendsEn = `${WILD_FRIENDS_MARKER}
NatureLens FIELD MISSION is a real-world urban ecology exploration game for young adults spending Chuseok in Seoul.

At 5 PM on Friday and Saturday, we will explore the Hongneungcheon stream and wetland area, discover birds, plants, insects and unfamiliar traces of life, and record them in NatureLens. Complete WILD QUEST missions revealed on site to earn prizes.

After the field mission, stay for AFTER TIME with complimentary refreshments. No biological knowledge is required, and solo participants are welcome.

Dates
- Friday, September 25 · 5:00 PM
- Saturday, September 26 · 5:00 PM

Location: Hongneungcheon stream & wetland area
Fee: Free
Bring: Smartphone, comfortable shoes/clothes, water
Prizes for successful FIELD MISSIONS

See the landing page for the full program and registration information.
LANDING: /wild-friends
REGISTRATION: Coming soon`;
    const wfNow = new Date().toISOString();
    if (wildFriendsIds.length) {
      await env.DB.prepare(
        `UPDATE posts SET type='notice',title_ko=?,title_en=?,excerpt_ko=?,excerpt_en=?,content_ko=?,content_en=?,image_key=?,category=?,status='published',is_pinned=1,event_date='2026-09-25',updated_at=? WHERE id=?`
      ).bind(
        WILD_FRIENDS_TITLE,
        "[Recruiting] Seeking Wild Friends — Chuseok Urban Ecology Field Game & Networking",
        "추석 저녁, NatureLens로 도시의 야생을 발견하고 WILD QUEST 미션을 수행하는 현실세계 생태 탐사게임에 참여하세요.",
        "Join a real-world NatureLens ecology game: explore Seoul's urban wild, complete WILD QUEST missions, and meet people through discovery.",
        wildFriendsKo, wildFriendsEn, "/notices/wild-friends-2026.svg", "모집 · FIELD MISSION", wfNow, wildFriendsIds[0]
      ).run();
      for (const duplicateId of wildFriendsIds.slice(1)) await env.DB.prepare("DELETE FROM posts WHERE id=?").bind(duplicateId).run();
    } else {
      await env.DB.prepare(
        "INSERT INTO posts(type,title_ko,title_en,excerpt_ko,excerpt_en,content_ko,content_en,image_key,gallery_json,category,status,is_pinned,event_date,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
      ).bind(
        "notice", WILD_FRIENDS_TITLE,
        "[Recruiting] Seeking Wild Friends — Chuseok Urban Ecology Field Game & Networking",
        "추석 저녁, NatureLens로 도시의 야생을 발견하고 WILD QUEST 미션을 수행하는 현실세계 생태 탐사게임에 참여하세요.",
        "Join a real-world NatureLens ecology game: explore Seoul's urban wild, complete WILD QUEST missions, and meet people through discovery.",
        wildFriendsKo, wildFriendsEn, "/notices/wild-friends-2026.svg", "[]", "모집 · FIELD MISSION", "published", 1, "2026-09-25", wfNow, wfNow
      ).run();
    }

    const notices: SovacNotice[] = [
      {
        marker: BAMBOO_LINK_MARKER,
        titleKo: BAMBOO_LINK_TITLE,
        titleEn: "[SOVAC 2026] Build a Forest in 30 Seconds — How can bamboo connect climate resilience and community recovery?",
        excerptKo: "30초 동안 가능한 만큼 대나무를 심고 랭킹에 도전하며 태풍·홍수 재난, 토양과 식생, 지역환경, 생계와 지역경제가 어떻게 연결되는지 체험해보세요.",
        excerptEn: "Plant as much bamboo as you can in 30 seconds, enter the ranking, and explore how typhoons, floods, vegetation, soil, livelihoods and local recovery are connected.",
        contentKo: `${BAMBOO_LINK_MARKER}\n게임 속 대나무를 심은 뒤 필리핀 태풍·홍수 피해지역의 환경 회복과 지역사회의 지속가능한 회복으로 이어지는 연결을 따라가 보세요. 마지막에는 카카오같이가치를 통해 댓글·기부 참여로 실제 행동을 이어갈 수 있습니다.`,
        contentEn: `${BAMBOO_LINK_MARKER}\nPlant a virtual bamboo forest, then follow the link to climate resilience, environmental recovery and sustainable livelihoods in Philippine communities.`,
        imageKey: "/notices/sovac-2026-goods.webp",
      },
    ];

    for (const notice of notices) {
      await upsertAndDeduplicateSovacNotice(notice, now);
    }
  } catch {}
}

export async function getSettings() {
  try {
    const row = await env.DB.prepare("SELECT * FROM site_settings WHERE id = 1").first<Record<string, string | null>>();
    return row ? { ...defaultSettings, ...row } : defaultSettings;
  } catch { return defaultSettings; }
}

export async function getFrontSettings() {
  try {
    await env.DB.prepare("CREATE TABLE IF NOT EXISTS front_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL DEFAULT '')").run();
    const rows=await env.DB.prepare("SELECT key,value FROM front_settings").all<{key:string;value:string}>();
    const values=Object.fromEntries(rows.results.map(row=>[row.key,row.value]));
    return {...defaultFrontSettings,...values};
  } catch { return defaultFrontSettings; }
}

export async function getStats() {
  try {
    const rows = await env.DB.prepare("SELECT * FROM impact_stats ORDER BY sort_order").all();
    return rows.results.length ? rows.results as typeof defaultStats : defaultStats;
  } catch { return defaultStats; }
}

export async function getPublishedPosts(type?: string, limit = 12) {
  try {
    await ensureSovacNotices();
    const query = type
      ? env.DB.prepare("SELECT * FROM posts WHERE status = 'published' AND type = ? ORDER BY is_pinned DESC, created_at DESC LIMIT ?").bind(type, limit)
      : env.DB.prepare("SELECT * FROM posts WHERE status = 'published' ORDER BY is_pinned DESC, created_at DESC LIMIT ?").bind(limit);
    return (await query.all()).results as Post[];
  } catch { return []; }
}

export function isWildLinkOtterPost(post: Pick<Post,"content_ko"|"content_en">) {
  return post.content_ko.includes(WILD_LINK_MARKER) || post.content_en.includes(WILD_LINK_MARKER);
}

export function isBambooLinkPost(post: Pick<Post,"content_ko"|"content_en">) {
  return post.content_ko.includes(BAMBOO_LINK_MARKER) || post.content_en.includes(BAMBOO_LINK_MARKER);
}

export function mediaUrl(key: string | null) {
  if (!key) return null;
  if (key.startsWith("http://") || key.startsWith("https://")) return key;
  return key.startsWith("/") ? key : `/api/media/${encodeURIComponent(key)}`;
}

export function galleryUrls(value: string | null | undefined) {
  if (!value) return [];
  try {
    const items = JSON.parse(value);
    return Array.isArray(items) ? items.filter((item): item is string => typeof item === "string") : [];
  } catch { return []; }
}
