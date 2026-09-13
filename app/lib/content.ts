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
    const query = type
      ? env.DB.prepare("SELECT * FROM posts WHERE status = 'published' AND type = ? ORDER BY is_pinned DESC, created_at DESC LIMIT ?").bind(type, limit)
      : env.DB.prepare("SELECT * FROM posts WHERE status = 'published' ORDER BY is_pinned DESC, created_at DESC LIMIT ?").bind(limit);
    return (await query.all()).results as Post[];
  } catch { return []; }
}

export function mediaUrl(key: string | null) {
  if (!key) return null;
  return key.startsWith("/") ? key : `/api/media/${encodeURIComponent(key)}`;
}

export function galleryUrls(value: string | null | undefined) {
  if (!value) return [];
  try {
    const items = JSON.parse(value);
    return Array.isArray(items) ? items.filter((item): item is string => typeof item === "string") : [];
  } catch { return []; }
}
