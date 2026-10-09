-- TEST DATABASE ONLY. Contains public archive fixtures, no applicant or donor data.
CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT,type TEXT NOT NULL,title_ko TEXT NOT NULL,title_en TEXT NOT NULL DEFAULT '',excerpt_ko TEXT NOT NULL DEFAULT '',excerpt_en TEXT NOT NULL DEFAULT '',content_ko TEXT NOT NULL,content_en TEXT NOT NULL DEFAULT '',image_key TEXT,gallery_json TEXT NOT NULL DEFAULT '[]',category TEXT NOT NULL DEFAULT '일반',status TEXT NOT NULL DEFAULT 'draft',is_pinned INTEGER NOT NULL DEFAULT 0,event_date TEXT,created_at TEXT NOT NULL,updated_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS front_settings (key TEXT PRIMARY KEY,value TEXT NOT NULL DEFAULT '');
CREATE TABLE IF NOT EXISTS form_submissions (id INTEGER PRIMARY KEY AUTOINCREMENT,form_slug TEXT NOT NULL,lang TEXT NOT NULL DEFAULT 'ko',answers_json TEXT NOT NULL,submitted_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS impact_stats (key TEXT PRIMARY KEY,label_ko TEXT NOT NULL,label_en TEXT NOT NULL,value TEXT NOT NULL,sort_order INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS wild_link_scores (id INTEGER PRIMARY KEY AUTOINCREMENT,game_key TEXT NOT NULL,player_name TEXT NOT NULL,score INTEGER NOT NULL,created_at TEXT NOT NULL DEFAULT (datetime('now')));
CREATE TABLE IF NOT EXISTS site_settings (id INTEGER PRIMARY KEY,hero_title_ko TEXT NOT NULL DEFAULT '',hero_title_en TEXT NOT NULL DEFAULT '',hero_lead_ko TEXT NOT NULL DEFAULT '',hero_lead_en TEXT NOT NULL DEFAULT '',hero_body_ko TEXT NOT NULL DEFAULT '',hero_body_en TEXT NOT NULL DEFAULT '',hero_image_key TEXT,mission_title_ko TEXT NOT NULL DEFAULT '',mission_title_en TEXT NOT NULL DEFAULT '',mission_body_ko TEXT NOT NULL DEFAULT '',mission_body_en TEXT NOT NULL DEFAULT '',platform_title_ko TEXT NOT NULL DEFAULT '',platform_title_en TEXT NOT NULL DEFAULT '',platform_body_ko TEXT NOT NULL DEFAULT '',platform_body_en TEXT NOT NULL DEFAULT '',vision_title_ko TEXT NOT NULL DEFAULT '',vision_title_en TEXT NOT NULL DEFAULT '',vision_body_ko TEXT NOT NULL DEFAULT '',vision_body_en TEXT NOT NULL DEFAULT '',donate_url TEXT NOT NULL DEFAULT '',updated_at TEXT NOT NULL DEFAULT '');
INSERT OR IGNORE INTO posts VALUES ('43','activity','발견에서 임팩트까지, 하나의 흐름으로','From Discovery to Impact, as One Flow','SOVAC 2026에서 NatureLens의 시민 기록과 필리핀 Nueva Vizcaya 대나무 복원 프로젝트를 하나의 참여 경험으로 연결했습니다.','At SOVAC 2026, LINKIMPACT connected citizen observations through NatureLens with its bamboo restoration work in Nueva Vizcaya, Philippines, as one participatory journey.','SOVAC 2026 현장에서 LINKIMPACT가 보여주고 싶었던 것은 하나의 서비스나 캠페인이 아니었습니다. 지역의 문제를 어떻게 바라보고, 시민의 참여를 어떻게 실제 변화까지 이어갈 것인지에 대한 하나의 흐름이었습니다. 팝업 공간에는 ‘발견(Discover) → 기록(Record) → 연결(Connect) → 활동(Act) → 임팩트(Impact)’라는 다섯 단계가 펼쳐졌습니다.

변화의 출발점은 발견입니다. LINKIMPACT는 NatureLens를 통해 사진과 위치, 탐사 경로와 관찰정보를 기록하고 AI 기반 종 추정과 커뮤니티·전문가 검증을 더해 개인의 관찰을 함께 활용할 수 있는 데이터로 축적합니다.

이번 SOVAC에서는 이 연결의 실제 사례로 필리핀 Nueva Vizcaya의 대나무 식재 프로젝트를 소개했습니다. 태풍과 홍수 피해지역에서 자연환경의 회복과 지역사회의 지속가능한 회복을 함께 고민하는 프로젝트입니다.

관람객은 RPG 형식의 게임으로 재난지역에 대나무를 심고 복원 진행도를 높이며 식재와 회복의 의미를 경험했습니다. 체험 이후에는 실제 대나무 식재를 지원하는 카카오 같이가치 모금으로 이어질 수 있도록 연결했습니다.

하나의 발견이 기록이 되고, 기록이 사람을 연결하며, 연결이 행동을 만들고, 행동의 결과가 다시 다음 기록으로 남는 것. LINKIMPACT는 앞으로도 NatureLens의 시민 기록과 현장의 활동을 연결해 환경과 사회문제를 지속가능한 변화의 과정으로 만들어가겠습니다.','At SOVAC 2026, LINKIMPACT did not present a single service or campaign. It presented a flow for how local problems are discovered, how citizens participate, and how that participation can lead to tangible change: Discover → Record → Connect → Act → Impact.

Change begins with discovery. Through NatureLens, LINKIMPACT records photographs, locations, exploration routes and observations, then combines AI-assisted identification with community and expert verification so individual observations can become shared environmental data.

The Nueva Vizcaya bamboo planting project in the Philippines was introduced as a concrete example of this connection. In communities affected by typhoons and floods, the project explores ecological restoration together with long-term local resilience.

Visitors experienced the restoration process through an RPG-style game, planting bamboo in a simulated disaster area and increasing restoration progress. The experience then connected to a Kakao Together Value fundraiser supporting real planting in Nueva Vizcaya.

A discovery becomes a record; a record connects people; connection produces action; and the result of action becomes the next record. LINKIMPACT will continue to connect citizen observations in NatureLens with action in the field.','https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/sovac/2026/IMG_8556.jpg','["https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/sovac/2026/IMG_8571.jpg", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/sovac/2026/IMG_8646.jpg", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/sovac/2026/IMG_8647.jpg", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/sovac/2026/IMG_8648.jpg", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/sovac/2026/IMG_8649.jpg", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/sovac/2026/IMG_8650.jpg"]','LINKIMPACT','published','0',NULL,'2026-10-09','2026-10-09');
INSERT OR IGNORE INTO posts VALUES ('22','activity','라이프 로그 — 도시를 기록하다','Life Log — Recording the City','사진과 위치를 남기는 간단한 행동이 도시의 생태를 함께 이해하는 데이터가 될 수 있음을 현장에서 체험했습니다.','Participants experienced how a simple photo and location record can become shared data for understanding urban ecology.','LINKIMPACT는 볼런축제 현장에서 참여형 생태 기록 프로그램 ‘라이프 로그–도시를 기록하다’를 운영했습니다. 참가자들은 자신이 발견한 생물과 도시환경의 모습을 지도 위에 직접 표시하고 서로의 기록을 선으로 연결했습니다.

국내외 생물 사진을 활용한 세계 지도 활동을 통해 지역의 작은 기록도 국경을 넘어 연결될 수 있다는 점을 함께 확인했습니다. 현장에서는 “나의 기록이 사회문제의 해결책이 될 수 있을까?”라는 질문을 중심으로 유해식물 발견, 야생동물 관찰, 환경 위험지역 제보 등 시민 기록이 실제 환경 행동으로 이어지는 방법을 소개했습니다.

이번 활동은 시민의 관찰을 데이터로, 데이터를 공동체의 실천으로 연결하는 LINKIMPACT의 방향을 현장에서 공유한 자리였습니다.','LINKIMPACT operated the participatory ecological recording program “Life Log — Recording the City” at the Volunteer Festival. Participants marked organisms and urban environments they discovered on a map and connected their records to one another.

Using biodiversity photographs from Korea and abroad, participants explored how a small local record can connect across borders. The program asked whether an individual observation could contribute to solving social and environmental problems, introducing examples such as invasive plant reports, wildlife observations, and environmental risk reporting.

The activity shared LINKIMPACT’s approach of turning citizen observation into data and data into collective action.','https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/activities/volunteer-festival/cover.webp','["https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/activities/volunteer-festival/01.webp", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/activities/volunteer-festival/02.webp", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/activities/volunteer-festival/03.webp", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/activities/volunteer-festival/04.webp", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/activities/volunteer-festival/05.webp"]','LINKIMPACT','published','0',NULL,'2026-10-09','2026-10-09');
INSERT OR IGNORE INTO posts VALUES ('23','activity','지역과 지역을 직접 연결하는 협력의 출발','A Starting Point for Direct Regional Cooperation','단발성 방문을 넘어 지속적으로 소통하고 공동사업을 구체화하기 위한 공식 협력 구조를 만들었습니다.','The agreement created a formal structure for continued dialogue and joint projects beyond one-time visits.','LINKIMPACT는 필리핀 누에바 비즈카야 주정부 관계자들과 공식 회담을 갖고 지속가능한 국제협력 기반을 마련하기 위한 업무협약(MOU)을 체결했습니다.

양측은 각 지역이 가진 경험과 자원을 공유하고 환경·교육·문화·인적 교류를 비롯한 다양한 분야에서 공동사업을 발굴하기로 뜻을 모았습니다. 지역 공동체가 주도하는 지속가능한 발전, 기후와 생물다양성에 대응하는 현장 기반 활동, 청년과 시민의 국제 교류 확대 가능성도 함께 논의했습니다.

LINKIMPACT는 이번 MOU를 바탕으로 한국과 필리핀의 지역사회가 서로의 지식과 경험을 나누고, 현장의 기록이 공동의 정책과 행동으로 연결될 수 있도록 국제협력 네트워크를 확장해 나가겠습니다.','LINKIMPACT held an official meeting with the Provincial Government of Nueva Vizcaya and signed an MOU to establish a foundation for sustainable international cooperation.

Both sides agreed to share regional experience and resources and to identify joint initiatives in environment, education, culture, and human exchange. Discussions also covered community-led development, field-based responses to climate and biodiversity challenges, and expanded youth and citizen exchange.

Building on the MOU, LINKIMPACT aims to expand a network through which communities in Korea and the Philippines can exchange knowledge and connect field records to joint policy and action.','https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/activities/nueva-vizcaya-mou/cover.webp','["https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/activities/nueva-vizcaya-mou/01.webp", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/activities/nueva-vizcaya-mou/02.webp", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/activities/nueva-vizcaya-mou/03.webp"]','LINKIMPACT','published','0',NULL,'2026-10-09','2026-10-09');
INSERT OR IGNORE INTO posts VALUES ('3','activity','국경을 넘어 세계를 연결하는 생명','Lives that Connect the World Across Borders','세계 철새의 날을 맞아 철새의 이동과 위기를 기록한 LINKIMPACT의 첫 다큐멘터리 전시입니다.','LINKIMPACT’s first documentary exhibition used migratory birds to illuminate ecological interdependence and crisis.','세계 철새의 날을 맞아 LINKIMPACT는 철새 위기를 조명하는 첫 다큐멘터리 전시를 개최했습니다.

국경을 넘어 세계를 연결하는 철새를 ‘글로벌 앰배서더’로 정의하며 생태계 상호연결성을 상징적으로 표현했습니다. 한국, 중국, 캐나다를 오가던 철새들은 기후 변화와 서식지 파괴로 더 이상 머물 공간을 찾기 어려운 상황에 놓여 있습니다.

전시는 철새의 멸종 위기가 곧 인류가 직면한 기후 위기의 단면임을 강조했습니다.','To mark World Migratory Bird Day, LINKIMPACT held its first documentary exhibition focused on the crisis facing migratory birds.

The exhibition defined migratory birds as “global ambassadors,” symbolizing how ecosystems are connected across borders. Birds traveling between Korea, China, and Canada increasingly struggle to find suitable habitats as climate change and habitat destruction accelerate.

The exhibition framed the decline of migratory birds as a visible reflection of the wider climate crisis confronting humanity.','https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/global-ambassador-birds/cover.png','["https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/global-ambassador-birds/01.png", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/global-ambassador-birds/02.png", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/global-ambassador-birds/03.png", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/global-ambassador-birds/04.png"]','LINKIMPACT','published','0',NULL,'2026-10-09','2026-10-09');
INSERT OR IGNORE INTO posts VALUES ('20','activity','자연을 매개로 만나는 지역 공동체','Building Community Through Nature','서로 다른 언어와 문화적 배경을 가진 사람들이 흙과 식물을 함께 돌보며 생태와 공동체를 동시에 경험했습니다.','People from different linguistic and cultural backgrounds cared for soil and plants together, experiencing ecology and community at the same time.','LINKIMPACT는 중랑천 일대에서 필리핀, 독일 등 다양한 국적의 외국인과 다문화 가족이 함께 참여하는 생태 체험 활동을 진행했습니다.

참여자들은 텃밭을 정리하고 작물을 돌보며 생물다양성, 지속가능한 생활 방식, 도시 생태계의 중요성을 직접 경험했습니다. 서로 다른 언어와 문화적 배경을 가진 이들이 협력하는 과정은 생태체험이 문화 간 이해와 공동체 형성의 장이 될 수 있음을 보여주었습니다.

중랑천이라는 열린 공간은 서로 다른 배경을 가진 사람들이 지역사회 구성원으로 연결되는 장소가 되었고, LINKIMPACT는 앞으로도 도시 생태 공간을 활용한 환경 교육과 지역 연대 프로그램을 확대할 계획입니다.','LINKIMPACT organized an ecological experience around Jungnangcheon with foreign residents and multicultural families from the Philippines, Germany, and other backgrounds.

Participants worked in a community garden, cared for crops, and experienced biodiversity, sustainable living, and the value of urban ecosystems firsthand. Working together across languages and cultures showed how ecological activities can also create intercultural understanding and community.

Jungnangcheon became an open space where people from different backgrounds could connect as local community members. LINKIMPACT plans to continue expanding inclusive environmental education and community programs in urban ecological spaces.','https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/05/001/cover.png','["https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/05/001/01.png"]','LINKIMPACT','published','0',NULL,'2026-10-09','2026-10-09');
INSERT OR IGNORE INTO posts VALUES ('21','activity','같은 풍경을 바라보는 공동의 경험','A Shared Experience of Watching the Same Landscape','철새의 이동과 서식 환경을 관찰하며 기후위기와 생물다양성 보전을 현장에서 이해했습니다.','Participants observed bird movement and habitat conditions to understand climate change and biodiversity conservation in the field.','LINKIMPACT는 국내 거주 1인 가구, 외국인, 다문화 가족과 함께 철새 도래지를 탐방하며 탐조활동과 생태체험을 진행했습니다.

참여자들은 쌍안경과 관찰 기록을 활용해 철새의 움직임, 먹이 활동, 서식 환경을 살펴보았습니다. 철새의 이동 경로는 기후변화, 습지 감소, 도시 개발, 수질 변화 등 다양한 환경 요인과 밀접하게 연결되어 있습니다.

탐조활동은 언어와 문화의 차이를 넘어 같은 생명을 관찰하는 공동의 경험을 제공했습니다. LINKIMPACT는 생태체험, 다문화 교류, 정서적 연대, 환경보존이 하나의 지역 기반 프로그램 안에서 연결될 수 있음을 확인했습니다.','LINKIMPACT explored a migratory bird habitat with foreign residents, multicultural families, and people living alone in Korea.

Using binoculars and observation records, participants examined bird movement, feeding behavior, and habitat conditions. Migratory routes are closely linked to climate change, wetland loss, urban development, and water quality.

Bird watching created a shared experience that crossed language and cultural differences. The program demonstrated how ecology, multicultural exchange, social connection, and conservation can be integrated into a local activity.','https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/05/002/cover.png','["https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/05/002/01.png", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/05/002/02.png", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/05/002/03.png"]','LINKIMPACT','published','0',NULL,'2026-10-09','2026-10-09');
INSERT OR IGNORE INTO posts VALUES ('4','activity','생태적 거대 담론과 구체적 현안을 한 자리에서','Connecting Ecological Systems with Concrete Local Issues','두 연사는 생물다양성과 문화적 다양성의 연결, 그리고 불법 소규모 채굴로 인한 수질·산림 파괴를 각각 다뤘습니다.','Two speakers addressed the relationship between biodiversity and cultural diversity, and the water and forest damage caused by illegal small-scale mining.','ICLEE ‘Green Transformation to New Horizons’ 컨퍼런스에서 LINKIMPACT 소속 두 연사가 가나가 직면한 환경적 파괴와 이를 극복하기 위한 인류학적·생태적 대안을 발표했습니다.

첫 발표는 생물다양성과 다문화주의의 연결을 강조하며 현지 공동체의 전통 지식과 생태계 보전 방식이 현대 과학과 결합할 때 더 강력한 해법이 될 수 있음을 제시했습니다.

두 번째 발표는 가나의 불법 소규모 채굴 ‘가람세(Galamsey)’로 인한 수질 오염과 산림 파괴를 다뤘습니다. LINKIMPACT는 생태계 복원과 지역사회의 지속가능한 경제 구조를 함께 고려하는 정책 가이드라인의 필요성을 제시했습니다.','At the ICLEE “Green Transformation to New Horizons” conference, two LINKIMPACT speakers presented on environmental destruction in Ghana and ecological and anthropological approaches to responding to it.

The first presentation linked biodiversity with multiculturalism, arguing that traditional knowledge and local conservation practices can become more effective when combined with modern science.

The second addressed illegal small-scale mining, known as Galamsey, and its impacts on water systems and forests. LINKIMPACT emphasized the need for policy approaches that combine ecosystem restoration with sustainable local livelihoods.','https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/001/cover.png','["https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/001/01.png", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/001/02.png"]','LINKIMPACT','published','0',NULL,'2026-10-09','2026-10-09');
INSERT OR IGNORE INTO posts VALUES ('5','activity','환경을 지키고 문화를 나누다','Protecting the Environment, Sharing Cultures','환경 보호라는 공통의 가치 아래 서로 다른 문화적 배경의 참여자들이 지역을 함께 걸었습니다.','Participants from different cultural backgrounds walked their neighborhood together around a shared value: protecting the environment.','LINKIMPACT는 서울 동대문구 회기동 일대에서 외국인 유학생 및 지역 주민들과 함께 다문화 플로깅 행사를 진행했습니다.

참가자들은 각국의 환경 보호 방식과 문화적 차이를 공유하고 골목을 걸으며 쓰레기를 수거했습니다. 동시에 무분별한 투기 지점을 파악하고 분리배출 안내의 다국어화 필요성 등 구체적인 개선 방안을 논의했습니다.

LINKIMPACT는 현장에서 도출된 외국인 거주 지역의 환경 관리 피드백을 향후 지자체와 협력할 수 있는 다문화 환경 가이드라인의 기초 자료로 활용할 계획입니다.','LINKIMPACT organized a multicultural plogging event with international students and local residents in Hoegi-dong, Dongdaemun-gu, Seoul.

Participants exchanged environmental practices from their home countries while walking local streets and collecting litter. They also identified dumping hotspots and discussed practical improvements such as multilingual waste-separation guidance.

LINKIMPACT plans to use feedback from the field as foundational material for multicultural environmental guidelines that can support future cooperation with local governments.','https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/002/cover.png','["https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/002/01.png", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/002/02.png", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/002/03.png"]','LINKIMPACT','published','0',NULL,'2026-10-09','2026-10-09');
INSERT OR IGNORE INTO posts VALUES ('6','activity','현장에서 정책으로 이어지는 생태복원','Ecological Restoration from Field to Policy','생태복원을 단순한 기술적 복구가 아니라 지역 공동체·문화·경제 구조까지 함께 회복하는 사회-생태 시스템 재설계로 바라봅니다.','Ecological restoration is framed not simply as technical repair, but as redesigning socio-ecological systems together with communities, culture, and local economies.','LINKIMPACT는 그린포엘 김미후 대표의 초청으로 개최된 생태복원 사업 컨퍼런스에 참석해 글로벌 환경 문제 해결을 위한 협력 기반을 강화했습니다.

컨퍼런스에서는 불법 채광과 같은 개발 압력, 데이터 기반 복원 전략, 위성 데이터·GIS·AI 기반 생태 모니터링, 지역 주민 참여 부족 등 실제 복원 현장의 구조적 문제를 논의했습니다.

LINKIMPACT는 현장의 문제를 데이터화하고 이를 정책 언어로 전환하는 ‘Field to Policy’ 전략을 구체화하며, 향후 국제 복원 프로젝트로의 확장 가능성을 모색할 계획입니다.','LINKIMPACT participated in an ecological restoration conference hosted by Green4L CEO Kim Mi-hoo to strengthen cooperation around global environmental challenges.

Discussion focused on structural barriers in restoration work, including development pressure such as illegal mining, the need for data-driven strategy, satellite and GIS analysis, AI-based monitoring, and insufficient local participation.

LINKIMPACT is developing a “Field to Policy” approach that turns field problems into structured data and translates that data into policy language, with the aim of expanding into international restoration projects.','https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/003/cover.png','["https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/003/01.png", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/003/02.png", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/003/03.png"]','LINKIMPACT','published','0',NULL,'2026-10-09','2026-10-09');
INSERT OR IGNORE INTO posts VALUES ('7','activity','함께, 연결, 변화','Togetherness, Link, Change','다양한 국적과 배경의 사람들이 한자리에 모여 사람과 사람, 지역과 지역, 현장과 글로벌 의제를 연결하는 출발점을 만들었습니다.','People from different national and cultural backgrounds gathered to begin connecting people, regions, and local action with global agendas.','2023년 11월 미디어아트센터에서 열린 LINKIMPACT 발대식은 다양한 국적과 배경의 사람들이 한자리에 모여 새로운 연결의 출발을 알리는 자리였습니다.

행사는 ‘함께(Togetherness)’, ‘연결(Link)’, ‘변화(Change)’라는 핵심 가치를 공유하고, 연결을 단순한 네트워크가 아니라 사람과 사람, 지역과 지역, 현장과 글로벌 의제를 잇는 실질적 행동으로 확장하는 계기가 되었습니다.

LINKIMPACT는 발대식을 시작으로 다문화 협력 기반 프로젝트와 사회·환경 문제 해결을 위한 실천적 활동을 지속적으로 확대해 나가고 있습니다.','LINKIMPACT’s launch event in November 2023 brought together people of diverse nationalities and backgrounds to mark the beginning of a new network of connection.

The event shared the values of Togetherness, Link, and Change, expanding the idea of connection beyond networking toward practical action linking people, regions, field activity, and global agendas.

Since its launch, LINKIMPACT has continued to expand multicultural collaboration and practical initiatives addressing environmental and social challenges.','https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/004/cover.png','["https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/004/01.png", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/004/02.png"]','LINKIMPACT','published','0',NULL,'2026-10-09','2026-10-09');
INSERT OR IGNORE INTO posts VALUES ('8','activity','여성의 역량이 지역의 경쟁력이 되는 구조','When Women’s Capacity Becomes Regional Strength','교육, 창업, 지역 기반 비즈니스에서 나타나는 여성 주도의 변화를 국제 네트워크와 연결하는 가능성을 살폈습니다.','The visit explored how women-led change in education, entrepreneurship, and local business can connect to international networks.','LINKIMPACT는 누에바 비즈카야 주에서 열린 여성 리더십 간담회에 참석해 지역 기반 여성 기업가 육성과 글로벌 협력 가능성을 모색했습니다.

현장에서는 교육, 소규모 창업, 지역 기반 비즈니스 등 다양한 영역에서 활동하는 여성 리더들이 경험을 공유했고, 여성의 자립과 사회적 역할 확대가 지역 발전과 연결되는 과정을 확인했습니다.

LINKIMPACT는 이러한 현장 사례를 국제 네트워크와 연결해 여성 리더십 강화와 지속가능한 지역 발전을 함께 이끌 수 있는 협력 구조를 구축해 나갈 계획입니다.','LINKIMPACT participated in a women’s leadership roundtable in Nueva Vizcaya to explore local women’s entrepreneurship and opportunities for global cooperation.

Women leaders from education, small business, and community-based enterprise shared their experiences, showing how women’s independence and expanded social roles can contribute directly to regional development.

LINKIMPACT aims to connect these field-based examples to international networks and build cooperation models that strengthen women’s leadership alongside sustainable local development.','https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/005/cover.png','["https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/005/01.png"]','LINKIMPACT','published','0',NULL,'2026-10-09','2026-10-09');
INSERT OR IGNORE INTO posts VALUES ('9','activity','미래 세대가 말하는 변화 대응력','How the Next Generation Thinks About Change','학생 인터뷰를 통해 적응력, 다양한 경험, 글로벌 환경에 대한 이해가 미래 리더십의 중요한 요소임을 확인했습니다.','Student interviews highlighted adaptability, diverse experience, and global awareness as central elements of future leadership.','LINKIMPACT는 필리핀 솔라노 고등학교를 방문해 학생들과 미래 세대의 리더십과 진로 인식에 대해 인터뷰를 진행했습니다.

학생들은 단순한 학업 성취를 넘어 변화에 대응하는 적응력, 다양한 분야의 경험, 글로벌 환경에 대한 이해가 중요하다고 강조했습니다.

LINKIMPACT는 현장의 목소리를 바탕으로 청소년 리더십 강화와 교육 콘텐츠 개발을 지속적으로 확대할 계획입니다.','LINKIMPACT visited Solano High School in the Philippines and interviewed students about leadership and career awareness for the next generation.

Students emphasized that future leadership requires more than academic performance: adaptability, exposure to different fields, and an understanding of a changing global environment are equally important.

LINKIMPACT plans to continue developing youth leadership and educational content grounded in voices from the field.','https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/006/cover.png','["https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/006/01.png"]','LINKIMPACT','published','0',NULL,'2026-10-09','2026-10-09');
INSERT OR IGNORE INTO posts VALUES ('10','activity','지역과 지역을 잇는 국제협력','International Cooperation, Region to Region','중앙정부 중심의 협력을 보완하는 지역 단위의 직접적 연결과 교육·문화·청년 교류 가능성을 확인했습니다.','The meeting explored direct regional cooperation in education, culture, and youth exchange as a complement to national-level diplomacy.','LINKIMPACT는 누에바 비즈카야 주 관계자들과 공식 만남을 통해 한국과 필리핀 간 우호 증진과 교류 확대를 위한 협력 의지를 확인했습니다.

지역 단위에서의 교류 확대를 통해 양국 간 이해를 높이고 장기적으로 자매결연으로 이어질 수 있는 기반을 마련하는 데 공감대가 형성되었습니다.

LINKIMPACT는 다양한 교류 프로그램과 협력 프로젝트를 통해 양국 간 ‘연결(Link)’을 실질적인 ‘변화(Change)’로 이어가는 플랫폼 역할을 강화할 계획입니다.','LINKIMPACT met officials from Nueva Vizcaya to confirm shared interest in strengthening friendship and exchange between Korea and the Philippines.

Participants agreed on the value of direct regional exchange and explored a pathway toward longer-term sister-city relationships.

LINKIMPACT plans to strengthen its role as a platform that turns international connection into practical change through exchange programs and collaborative projects.','https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/007/cover.png','[]','LINKIMPACT','published','0',NULL,'2026-10-09','2026-10-09');
INSERT OR IGNORE INTO posts VALUES ('11','activity','기술과 현장 경험을 연결하는 농업 협력','Connecting Agricultural Technology with Field Experience','생산성 향상과 환경 보전을 동시에 달성하기 위한 기술적·정책적 접근을 살폈습니다.','The discussion focused on technical and policy approaches that can improve productivity while conserving the environment.','농업 분야 실무 교류 확대를 위한 미팅에서 기후변화에 대응하는 농업 기술, 지역 맞춤형 농업 정책, 글로벌 협력 사례를 논의했습니다.

누에바 비즈카야는 농업 기술과 식품 가공 전문성을 공유하며 안정적인 생산 체계를 구축했고, 가공·유통까지 연결되는 농업 가치사슬의 확장 가능성을 보여주었습니다.

LINKIMPACT는 농업 기술과 현장 경험을 연결하는 협력 플랫폼 역할을 강화하며 지속가능한 글로벌 농업 생태계 구축에 기여할 계획입니다.','A working-level meeting on agricultural cooperation covered climate-resilient technology, locally adapted policy, and international cooperation models.

Nueva Vizcaya has developed stable production systems and food-processing expertise, showing potential to expand agricultural value chains from production to processing and distribution.

LINKIMPACT plans to strengthen its role as a platform connecting agricultural technology and field experience for more sustainable food systems.','https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/008/cover.png','[]','LINKIMPACT','published','0',NULL,'2026-10-09','2026-10-09');
INSERT OR IGNORE INTO posts VALUES ('12','activity','사람의 건강과 지역 경제를 함께 보는 협력','Linking Human Health with Local Economic Resilience','안정적인 소득 기반과 건강한 노동 환경이 서로를 강화하는 선순환 구조를 논의했습니다.','The discussion examined how stable livelihoods and healthy working conditions can reinforce one another.','BITE Family Planning & Birth Control Center와 지역 농부들이 함께하는 회담을 통해 모자보건과 지속가능한 농업을 연결하는 협력 방안을 논의했습니다.

지속가능한 커피 농장은 지역 경제 활성화와 생태 보전을 동시에 달성할 수 있는 전략으로 주목받았습니다. 토양 보전, 생물다양성 유지, 친환경 생산 방식은 장기적인 농업 경쟁력과도 연결됩니다.

LINKIMPACT는 보건과 농업을 통합적으로 바라보는 협력 모델의 가능성을 확인하고 지역 기반 발전 전략을 구체화할 계획입니다.','LINKIMPACT met with BITE Family Planning & Birth Control Center and local farmers to discuss cooperation connecting maternal health with sustainable agriculture.

Sustainable coffee farming was highlighted as a strategy that can support both local economic development and ecological conservation through soil protection, biodiversity, and environmentally responsible production.

The meeting confirmed the potential for cooperation models that view health and agriculture as interconnected components of community resilience.','https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/009/cover.png','["https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/009/01.png", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/009/02.png", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/009/03.png"]','LINKIMPACT','published','0',NULL,'2026-10-09','2026-10-09');
INSERT OR IGNORE INTO posts VALUES ('13','activity','친환경 농업과 공동체 중심 발전','Eco-friendly Agriculture and Community-led Development','농업 기술의 발전과 사람 간 신뢰가 결합될 때 지속가능한 지역 성장이 가능하다는 점에 공감했습니다.','The meeting emphasized that sustainable regional growth depends on both agricultural innovation and trust between people.','LINKIMPACT는 누에바 비즈카야 주 아리타오 시와 공식 미팅을 갖고 농업 기술과 인적 교류 확대 방안을 논의했습니다.

친환경 농업과 지역 공동체 중심의 발전 전략이 주요 의제로 다뤄졌으며, 자연환경을 고려한 생산 방식과 주민 협력이 지속가능한 농업 생태계를 만드는 핵심이라는 점을 공유했습니다.

LINKIMPACT는 향후 인적 교류와 기술 협력을 기반으로 국제 협력 구조를 확대해 나갈 계획입니다.','LINKIMPACT held an official meeting with the municipality of Aritao in Nueva Vizcaya to discuss agricultural technology and expanded human exchange.

Eco-friendly farming and community-led development were central themes, with shared recognition that environmentally responsible production and community cooperation are essential to sustainable agricultural systems.

LINKIMPACT plans to expand international cooperation through both technical collaboration and people-to-people exchange.','https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/010/cover.png','["https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/010/01.png"]','LINKIMPACT','published','0',NULL,'2026-10-09','2026-10-09');
INSERT OR IGNORE INTO posts VALUES ('14','activity','지속가능한 농업의 실제 현장','Sustainable Agriculture in Practice','친환경 농법, 작물 품질, 농촌 인구 감소와 시장 구조를 함께 살피며 농업의 지속가능성을 현장에서 확인했습니다.','The visit examined farming methods, crop quality, rural population decline, and market structures as interconnected sustainability issues.','LINKIMPACT는 필리핀 현지 친환경 농장을 방문해 기후변화 속에서 적용되는 농업 대응 전략과 미래 가능성을 살폈습니다.

농부들과 작물 상태를 살펴보고 친환경 농법으로 생산된 작물의 품질과 시장 경쟁력을 확인했습니다. 아리타오는 유기농 작물이 집결하는 농산물 시장 거점으로도 기능하고 있습니다.

한편 급격한 도시화로 농촌 인구가 감소하는 현실도 확인했습니다. LINKIMPACT는 현장 경험과 데이터를 바탕으로 지속가능한 농업 모델을 국제 협력과 연결해 나갈 계획입니다.','LINKIMPACT visited eco-friendly farms in the Philippines to examine climate adaptation strategies and the future potential of sustainable agriculture.

The team met farmers, reviewed crop conditions, and examined the quality and market competitiveness of produce grown with environmentally responsible methods. Aritao also functions as an important market hub for organic produce.

The visit also highlighted rural population decline linked to urbanization. LINKIMPACT plans to connect field experience and data to broader models of international cooperation in sustainable agriculture.','https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/011/cover.png','["https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/011/01.png", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/011/02.png"]','LINKIMPACT','published','0',NULL,'2026-10-09','2026-10-09');
INSERT OR IGNORE INTO posts VALUES ('15','activity','해양도시와 만드는 지속가능한 국제협력','Building Sustainable Cooperation with a Coastal City','해양 생태계 보전과 지역 경제 활성화를 동시에 달성하는 협력 구조를 모색했습니다.','The meeting explored cooperation that supports both marine conservation and local economic development.','LINKIMPACT는 필리핀 어업 도시 링가옌과 공식 미팅을 갖고 인력자원 교류와 친환경 기술 협력 확대 방안을 논의했습니다.

어업 도시의 특성을 반영한 친환경 기술 도입, 지속가능한 해양 자원 관리, 인력자원 교류 확대가 주요 의제로 다뤄졌습니다.

LINKIMPACT는 해양 도시와의 협력 범위를 확대하고 인적 자원과 친환경 기술을 연결하는 국제 협력 플랫폼 역할을 강화할 계획입니다.','LINKIMPACT held an official meeting with the fishing city of Lingayen to discuss expanded human-resource exchange and cooperation on green technology.

Key topics included environmentally responsible technology suited to a coastal economy, sustainable marine resource management, and expanded exchange between people and institutions.

LINKIMPACT plans to broaden cooperation with coastal cities and strengthen its role as a platform linking people and green technology.','https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/012/cover.png','["https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/012/01.png"]','LINKIMPACT','published','0',NULL,'2026-10-09','2026-10-09');
INSERT OR IGNORE INTO posts VALUES ('16','activity','농업을 생태계의 일부로 바라보다','Viewing Agriculture as Part of an Ecosystem','농업 생물다양성을 생산성, 토양 건강, 병해충 관리, 정책 데이터와 연결해 살폈습니다.','Agricultural biodiversity was examined in relation to productivity, soil health, pest management, and policy data.','LINKIMPACT는 지역 딸기 농장에서 농업 환경과 생물다양성 연구를 위한 현장 탐사를 진행했습니다.

유기농 딸기 재배를 중심으로 물 사용, 토양 관리, 농장 내 다양한 생물종의 공존 구조를 관찰하고, 생물다양성이 지속가능한 생산 체계를 유지하는 핵심 기반임을 확인했습니다.

수집된 현장 데이터와 관찰 결과는 향후 지속가능한 농업 정책 설계와 지역 맞춤형 적용 방안 도출에 활용될 예정입니다.','LINKIMPACT conducted field research at a local strawberry farm to examine the relationship between agriculture and biodiversity.

The visit observed water use, soil management, and coexistence among species in organic strawberry production, reinforcing that biodiversity is a core foundation of resilient agricultural systems.

Field observations and data are intended to support future sustainable agriculture policy design and locally adapted approaches.','https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/013/cover.png','["https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/013/01.png", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/013/02.png"]','LINKIMPACT','published','0',NULL,'2026-10-09','2026-10-09');
INSERT OR IGNORE INTO posts VALUES ('17','activity','농업 도시의 자원과 사람을 연결하다','Connecting People with the Assets of an Agricultural City','농업과 관광이 결합된 지역 구조, 환경 보호와 교육 발전 정책을 국제 교류와 연결할 가능성을 확인했습니다.','The discussion explored how agriculture, tourism, environmental protection, and education can support international exchange.','LINKIMPACT는 바기오 인근 라 트리니다드 지역과 만나 인적 자원 교류 확대를 위한 협력 필요성을 논의했습니다.

라 트리니다드는 딸기 생산지로 알려진 농업 중심 도시로, 환경 보호와 교육 발전을 핵심 정책으로 추진하고 있습니다.

LINKIMPACT는 지역이 보유한 농업 자원과 교육·환경 정책의 잠재력에 주목하며 인적 자원 교류를 중심으로 한 협력 구조를 구체화해 나갈 계획입니다.','LINKIMPACT met representatives in La Trinidad, near Baguio, to discuss the need for expanded people-to-people exchange.

La Trinidad is an agricultural city known for strawberry production and has made environmental protection and educational development key policy priorities.

LINKIMPACT plans to develop cooperation centered on human exchange while drawing on the area’s agricultural resources and education and environmental policies.','https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/014/cover.png','["https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/014/01.png", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/014/02.png"]','LINKIMPACT','published','0',NULL,'2026-10-09','2026-10-09');
INSERT OR IGNORE INTO posts VALUES ('18','activity','멸종위기종 보호와 지역 생계를 함께 보다','Conservation and Local Livelihoods Together','듀공 보호를 단순한 생물종 보전이 아니라 지역 어업과 생계가 함께 고려되어야 하는 과제로 바라봤습니다.','Dugong conservation was approached not as species protection alone, but as an issue intertwined with fishing practices and local livelihoods.','필리핀 환경부 주관 듀공 보호 교육에 지역 주민과 어민, LINKIMPACT가 함께 참여했습니다.

교육에서는 듀공의 생태적 역할, 서식지 파괴와 해양 오염, 어업 활동의 영향, 서식 환경을 교란하지 않는 어업 방식과 해양 생태계 보전 실천을 다뤘습니다.

LINKIMPACT는 멸종위기종 보호가 지역 생계와 직결된 과제임을 확인하고 해양 생태 보전과 지역사회 협력을 결합한 보호 모델을 확대해 나갈 계획입니다.','LINKIMPACT joined local residents and fishers in a dugong conservation education program led by the Philippine environmental authorities.

The program covered the ecological role of dugongs, threats from habitat loss and marine pollution, impacts of fishing activity, and practical approaches to fishing without disturbing dugong habitats.

LINKIMPACT sees endangered-species conservation as closely linked with local livelihoods and aims to expand conservation models that combine marine ecology with community cooperation.','https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/015/cover.png','["https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/015/01.png"]','LINKIMPACT','published','0',NULL,'2026-10-09','2026-10-09');
INSERT OR IGNORE INTO posts VALUES ('19','activity','감정과 상상으로 환경을 이해하다','Understanding the Environment Through Emotion and Imagination','누구나 쉽게 참여할 수 있는 체험을 통해 생물다양성과 지속가능한 행동을 일상의 언어로 풀었습니다.','Accessible hands-on activities translated biodiversity and sustainable action into everyday language.','여의도공원에서 열린 지구의 날 행사에서 LINKIMPACT는 누구나 쉽게 참여할 수 있는 체험형 환경 교육 프로그램을 운영했습니다.

환경 타로 카드 체험은 지구의 과거, 현재, 미래를 상징적으로 해석하며 생물다양성과 환경 위기를 감성적으로 이해하도록 구성했습니다. 이어 이끼 테라리움 만들기를 통해 작은 생태계를 직접 구성하며 자연과 생물다양성을 체험했습니다.

LINKIMPACT는 시민 참여 기반 환경 교육이 일상의 작은 행동을 지속가능한 실천으로 이어가는 힘을 가진다는 점을 다시 확인했습니다.','At an Earth Day event in Yeouido Park, LINKIMPACT ran an accessible, hands-on environmental education program for citizens.

Environmental tarot cards invited participants to interpret the Earth’s past, present, and future symbolically, while moss terrarium making allowed them to build and observe a small ecosystem directly.

The event reaffirmed the role of citizen-centered environmental education in turning small everyday choices into sustainable action.','https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/016/cover.png','["https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/016/01.png", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/016/02.png", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/016/03.png", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/2026/04/016/04.png"]','LINKIMPACT','published','0',NULL,'2026-10-09','2026-10-09');
INSERT OR IGNORE INTO posts VALUES ('2','activity','해양 보호와 기후 대응을 정책의 언어로','Marine Protection and Climate Response in Policy Terms','DENR 관계자와 해양 보호구역, 환경 교육, 지속가능 어업과 친환경 관광 모델의 방향을 논의했습니다.','LINKIMPACT and DENR discussed marine protected areas, environmental education, sustainable fisheries, and eco-friendly tourism.','LINKIMPACT는 필리핀 환경자원부(DENR) 관계자와 국가 차원의 기후 대응 전략을 논의하는 인터뷰를 진행했습니다.

대화에서는 산호 백화, 해수면 상승, 해안 침식 등 해양 생태계와 관광 산업에 영향을 미치는 주요 환경 문제를 다뤘습니다. DENR은 해양 보호구역 확대, 환경 교육 강화, 지속가능 어업 촉진 등의 정책을 추진하고 있음을 밝혔습니다.

양 기관은 지속가능 발전과 친환경 관광 모델 구축을 위한 협력 의지를 재확인했습니다.','LINKIMPACT interviewed officials from the Philippine Department of Environment and Natural Resources (DENR) about national climate-response strategies.

The discussion covered coral bleaching, sea-level rise, and coastal erosion, all of which affect marine ecosystems and tourism. DENR outlined efforts to expand marine protected areas, strengthen environmental education, and promote sustainable fisheries.

Both sides reaffirmed their interest in cooperation around sustainable development and environmentally responsible tourism.','https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/denr-interview/cover.png','[]','LINKIMPACT','published','0',NULL,'2026-10-09','2026-10-09');
INSERT OR IGNORE INTO posts VALUES ('1','activity','바다의 변화가 보내는 메시지','Messages Carried by a Changing Ocean','‘물결(currents)’을 매개로 서로 떨어진 바다 생태계가 실제로 연결되어 있음을 보여준 두 번째 사진전입니다.','The second LINKIMPACT photo exhibition used “currents” to show how distant marine ecosystems are deeply connected.','LINKIMPACT는 두 번째 사진전 ‘물결의 메시지’를 개최하며 기후 변화의 영향을 받는 필리핀과 한국 해양 생물의 이야기를 조명했습니다.

전시는 멸종, 이동, 적응 과정을 겪는 해양 생물의 현실을 기록하며 급변하는 해양 환경을 보여줍니다. ‘물결(currents)’이라는 상징적 키워드를 통해 전 세계 바다 생태계가 서로 연결되어 있음을 전달했습니다.

전시는 해양 보전의 중요성을 환기하고 기후 행동을 위한 국제 협력의 필요성을 강조했습니다.','LINKIMPACT held its second photo exhibition, “Messages from the Currents,” focusing on marine species in the Philippines and Korea affected by climate change.

The exhibition documented extinction, migration, and adaptation, using “currents” as a metaphor for the interconnection of marine ecosystems across the world.

It emphasized the importance of marine conservation and the need for international cooperation on climate action.','https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/message-of-currents/cover.png','["https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/message-of-currents/01.png", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/message-of-currents/02.png", "https://raw.githubusercontent.com/catstopia-pixel/linkimpact-site/cloudflare-dashboard/public/imported/assets/img/activities/message-of-currents/03.png"]','LINKIMPACT','published','0',NULL,'2026-10-09','2026-10-09');
INSERT OR IGNORE INTO posts VALUES ('46','notice','네이처렌즈 미션 기능 안내','NatureLens Missions','미리보기 검증용 공지입니다.','A notice for preview testing.','네이처렌즈에서 미션을 확인해주세요.','Explore missions on NatureLens.',NULL,'[]','공지','published','1',NULL,'2026-10-09','2026-10-09');
