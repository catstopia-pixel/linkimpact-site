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
const SOVAC_ACTIVITY_MARKER = "[[SOVAC_2026_ACTIVITY]]";
const SOVAC_ACTIVITY_TITLE = "LINKIMPACT, SOVAC 2026 참가";

async function ensureSovacActivity(now: string) {
  const contentKo = `${SOVAC_ACTIVITY_MARKER}
LINKIMPACT가 SOVAC 2026에 참가해 시민의 발견과 기록을 실제 환경 행동으로 연결하는 활동을 소개했습니다.

이번 팝업에서는 LINKIMPACT가 환경·사회문제를 다루는 과정을 ‘발견(Discover) → 기록(Record) → 연결(Connect) → 활동(Act) → 임팩트(Impact)’의 5단계로 구성해 선보였습니다.

환경과 사회의 변화는 문제를 ‘발견’하는 것에서 시작합니다. 지역에서 발견한 생물과 자연환경의 변화를 시민이 직접 관찰하고, 이를 사진과 위치정보 등의 데이터로 남기는 과정에는 LINKIMPACT의 시민 환경 기록 플랫폼 ‘NatureLens(네이처렌즈)’가 활용됩니다.

NatureLens는 현장에서 발견한 생물과 환경 변화를 기록하고, AI 기반 종 추정과 커뮤니티·전문가 검증을 통해 시민의 관찰을 축적할 수 있도록 설계된 플랫폼입니다.

LINKIMPACT는 이러한 ‘기록’이 데이터에 머무르지 않고 사람과 전문가, 지역사회 그리고 실제 행동으로 ‘연결’되어야 한다고 생각합니다.

이번 SOVAC에서는 그 연결이 실제 환경복원 활동으로 확장되는 사례로 필리핀 Nueva Vizcaya 지역의 대나무 식재 프로젝트를 소개했습니다.

Nueva Vizcaya는 태풍과 홍수로 지역사회와 자연환경이 피해를 입은 지역입니다. LINKIMPACT는 피해지역의 환경 회복과 지속가능한 복원에 기여하기 위해 하천 주변에 대나무를 식재하고, 향후 현지에서 묘목을 지속적으로 생산·관리할 수 있는 기반을 만드는 프로젝트를 추진하고 있습니다.

대나무는 빠른 생장과 촘촘하게 발달하는 뿌리 구조를 가진 식물입니다. 이러한 특성은 적절한 지역과 관리 조건에서 하천변의 토양을 붙잡고 토양 유실을 줄이는 데 활용될 수 있습니다. 또한 식재에서 끝나는 것이 아니라 현지 묘목장 조성과 보식, 관리로 이어지는 구조를 구축하면 환경복원과 지역의 지속적인 참여를 함께 만들어갈 수 있습니다.

이번 팝업에서는 이러한 복원 원리를 설명만으로 전달하는 대신 RPG 형식의 체험 게임으로 구현했습니다. 참여자는 게임 속 재난 피해지역에서 직접 대나무를 심고 복원 진행도를 높여가며, 왜 대나무를 심는지, 식재가 환경 회복에 어떻게 활용될 수 있는지, 지속적인 관리가 왜 필요한지를 자연스럽게 경험할 수 있었습니다.

이를 통해 다소 어렵게 느껴질 수 있는 기후재난과 환경복원의 이야기를 참여형 콘텐츠로 전환하고, 관람객의 관심과 이해를 실제 ‘활동(Act)’으로 이어지도록 구성했습니다.

게임을 마친 뒤에는 필리핀 Nueva Vizcaya의 실제 대나무 식재를 지원하는 카카오 같이가치 모금 캠페인으로 연결했습니다. 현장에서 문제를 이해하고 게임으로 복원 과정을 경험한 뒤, 실제 프로젝트를 확인하고 참여할 수 있도록 한 것입니다.

결국 이번 SOVAC 팝업에서 LINKIMPACT가 보여준 것은 각각 분리된 플랫폼과 캠페인이 아니라 하나의 연결된 과정입니다.

발견하고, NatureLens로 기록하고, 사람과 전문성을 연결하고, 필요한 행동을 만들고, 그 행동을 지속가능한 임팩트로 확장하는 것.

DISCOVER → RECORD → CONNECT → ACT → IMPACT.

다양한 기업과 소셜벤처, 비영리조직, 사회혁신 주체들이 각자의 방식으로 사회문제 해결을 제시하는 SOVAC에서 LINKIMPACT가 참가 조직으로 함께했다는 점에서도 이번 활동은 의미가 있습니다.

하나의 발견이 기록이 되고, 기록이 연결을 만들며, 연결이 행동으로 이어지고, 그 행동이 쌓여 임팩트가 됩니다.

LINKIMPACT는 앞으로도 사람과 자원, 행동을 연결하며 지역사회가 마주한 환경과 사회문제를 지속가능한 변화로 이어가겠습니다.`;

  const contentEn = `${SOVAC_ACTIVITY_MARKER}
LINKIMPACT participated in SOVAC 2026, presenting how citizen observation and environmental records can be connected to real-world action.

At our pop-up, we introduced LINKIMPACT’s five-stage approach to creating change:

DISCOVER → RECORD → CONNECT → ACT → IMPACT.

Change begins with discovery. Citizens observe changes in local ecosystems and turn what they find into meaningful records through NatureLens, LINKIMPACT’s citizen environmental recording platform.

NatureLens enables people to document species and environmental changes using photographs, location data and field observations, supported by AI-assisted identification and community or expert verification.

But records become more meaningful when they create connections. LINKIMPACT aims to connect citizen-generated records with communities, experts, organizations and the actions needed to respond to environmental challenges.

At SOVAC 2026, we demonstrated how this process can extend into real-world restoration through our bamboo planting project in Nueva Vizcaya, the Philippines.

Nueva Vizcaya is one of the areas affected by typhoons and flooding. LINKIMPACT is developing a project to plant bamboo along affected riverside areas while building a longer-term system for local seedling production, replanting and environmental management.

Bamboo grows rapidly and develops dense root systems. Under appropriate site and management conditions, these characteristics can help stabilize riverside soil and reduce erosion. By connecting planting with local nurseries, replacement planting and continued management, restoration can become an ongoing process rather than a one-time activity.

Instead of explaining this only through panels, LINKIMPACT transformed the restoration process into an interactive RPG-style game. Participants entered a disaster-affected environment, planted bamboo and watched the restoration progress as they played. The experience helped visitors understand why bamboo is being planted, how vegetation can contribute to environmental recovery and why long-term management matters.

The experience then moved from learning to action. After the game, visitors were connected to LINKIMPACT’s Kakao Together fundraising campaign supporting the actual bamboo planting project in Nueva Vizcaya.

What LINKIMPACT presented at SOVAC was therefore not a collection of separate projects, but one connected process:

DISCOVER → RECORD → CONNECT → ACT → IMPACT.

Participating in SOVAC 2026 alongside companies, social ventures, nonprofits and other social innovation organizations was also a meaningful opportunity for LINKIMPACT to present its own approach to social and environmental change.

A discovery becomes a record. A record creates a connection. A connection leads to action. And accumulated actions create impact.

LINKIMPACT will continue connecting people, resources and action to turn environmental and social challenges into sustainable change.`;

  const gallery = JSON.stringify([
    "/sovac/2026/IMG_8646.jpg",
    "/sovac/2026/IMG_8647.jpg",
    "/sovac/2026/IMG_8648.jpg",
    "/sovac/2026/IMG_8649.jpg",
    "/sovac/2026/IMG_8571.jpg",
    "/sovac/2026/IMG_8556.jpg"
  ]);
  const matches = await env.DB.prepare(
    "SELECT id FROM posts WHERE title_ko=? OR content_ko LIKE ? OR content_en LIKE ? ORDER BY id ASC"
  ).bind(SOVAC_ACTIVITY_TITLE, `%${SOVAC_ACTIVITY_MARKER}%`, `%${SOVAC_ACTIVITY_MARKER}%`).all<{id:number}>();
  const ids = matches.results.map(row => row.id);
  const values = [
    SOVAC_ACTIVITY_TITLE,
    "LINKIMPACT at SOVAC 2026",
    "SOVAC 2026 팝업에서 발견·기록·연결·활동·임팩트의 5단계 활동 모델과 NatureLens, 필리핀 Nueva Vizcaya 대나무 복원 프로젝트를 소개했습니다.",
    "At SOVAC 2026, LINKIMPACT presented its five-stage impact model, NatureLens, and the Nueva Vizcaya bamboo restoration project through an interactive experience.",
    contentKo, contentEn, "/sovac/2026/IMG_8650.jpg", gallery
  ];
  if (ids.length) {
    await env.DB.prepare(
      "UPDATE posts SET type='activity',title_ko=?,title_en=?,excerpt_ko=?,excerpt_en=?,content_ko=?,content_en=?,image_key=?,gallery_json=?,category='SOVAC 2026',status='published',is_pinned=0,event_date='2026-09-21',updated_at=? WHERE id=?"
    ).bind(...values, now, ids[0]).run();
    for (const duplicateId of ids.slice(1)) await env.DB.prepare("DELETE FROM posts WHERE id=?").bind(duplicateId).run();
  } else {
    await env.DB.prepare(
      "INSERT INTO posts(type,title_ko,title_en,excerpt_ko,excerpt_en,content_ko,content_en,image_key,gallery_json,category,status,is_pinned,event_date,created_at,updated_at) VALUES('activity',?,?,?,?,?,?,?,?,?,'published',0,'2026-09-21',?,?)"
    ).bind(...values, "SOVAC 2026", now, now).run();
  }
}

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
    await ensureSovacActivity(now);
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
