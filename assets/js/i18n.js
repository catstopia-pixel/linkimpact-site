// assets/js/i18n.js
// Simple bilingual switcher (EN default, KO when toggle ON).
// Uses: data-i18n="key" and localStorage key "li_lang" = "en" | "ko"

(function () {
  const STORAGE_KEY = "li_lang";

  const dict = {
    en: {
      "ui.lang.en": "EN",
      "ui.lang.ko": "KO",
      "ui.back": "Back",
      "ui.activities": "View activities",

      "about.eyebrow": "We practice the true function of an NGO.",
      "about.title": "About LINK IMPACT",
      "about.lead":
        "LINK IMPACT monitors power, proposes fair policy, and builds civic literacy—so public interest is never sidelined. " +
        "We connect people across borders with accountability, dignity, and solidarity.",

      "about.p1.k": "Monitoring",
      "about.p1.t": "Independent observation and evidence-based publication for accountability.",
      "about.p2.k": "Policy",
      "about.p2.t": "Turning lived realities into actionable structural proposals and reform.",
      "about.p3.k": "Education",
      "about.p3.t": "Civic education that builds agency across nationality, generation, gender, and origin.",

      "about.c.title": "Our work is “connection” made tangible.",
      "about.c.lead":
        "LINK IMPACT focuses on connecting people—across borders, generations, and social positions—so collaboration becomes a measurable impact.",

      "about.c1.tag": "World",
      "about.c1.t": "Connecting the world through nature and awareness",
      "about.c1.li1": "Bird photo exhibition that links communities through shared habitat stories",
      "about.c1.li2": "Ocean photo exhibition for marine empathy and public engagement",
      "about.c1.li3": "Civic education for dugong protection and coastal stewardship",

      "about.c2.tag": "Generation",
      "about.c2.t": "Connecting generations through everyday capability",
      "about.c2.li1": "Senior digital literacy programs that restore access and confidence",
      "about.c2.li2": "Kimchi-making solidarity programs with socially vulnerable neighbors",

      "about.c3.tag": "Nation",
      "about.c3.t": "Connecting nations through exchange and leadership",
      "about.c3.li1": "International exchange partnerships (sister-city style collaboration)",
      "about.c3.li2": "Global leadership initiatives that translate solidarity into action",

      "about.c4.tag": "Solidarity",
      "about.c4.t": "Connecting society through shared events",
      "about.c4.li1": "Earth Day programs that build climate solidarity",
      "about.c4.li2": "Nature Lens: removing harmful plants as a global connection practice"
    },

    ko: {
      "ui.lang.en": "EN",
      "ui.lang.ko": "KO",
      "ui.back": "뒤로",
      "ui.activities": "활동 보러가기",

      "about.eyebrow": "우리는 NGO의 본질적 기능을 실행합니다.",
      "about.title": "LINK IMPACT 소개",
      "about.lead":
        "LINK IMPACT는 권력을 감시하고, 공정한 정책을 제안하며, 시민 교육을 통해 공익이 밀려나지 않도록 합니다. " +
        "국경을 넘어 사람을 연결하고, 책임·존엄·연대로 변화를 만듭니다.",

      "about.p1.k": "감시",
      "about.p1.t": "독립적인 관찰과 근거 기반 발행으로 책임을 강화합니다.",
      "about.p2.k": "정책",
      "about.p2.t": "현장의 경험을 구조적 제안과 제도 개선으로 전환합니다.",
      "about.p3.k": "교육",
      "about.p3.t": "국가·세대·성별·배경을 넘어 시민의 역량을 키우는 교육을 만듭니다.",

      "about.c.title": "우리의 활동은 ‘연결’을 구체화합니다.",
      "about.c.lead":
        "LINK IMPACT는 사람을 연결하는 데 집중합니다. 국경과 세대를 넘어, 협업이 실제 임팩트로 이어지게 합니다.",

      "about.c1.tag": "세계",
      "about.c1.t": "자연과 인식을 통해 세계를 연결",
      "about.c1.li1": "조류 사진전: 서식지의 이야기를 공유하며 공동체를 잇습니다",
      "about.c1.li2": "해양 사진전: 바다에 대한 공감과 참여를 확장합니다",
      "about.c1.li3": "듀공 보호 시민 교육: 해안 생태를 지키는 실천을 만듭니다",

      "about.c2.tag": "세대",
      "about.c2.t": "일상의 역량으로 세대를 연결",
      "about.c2.li1": "시니어 디지털 리터러시: 접근성과 자신감을 회복합니다",
      "about.c2.li2": "김치 담그기 연대: 사회적 약자 이웃과 함께하는 돌봄을 만듭니다",

      "about.c3.tag": "국가",
      "about.c3.t": "교류와 리더십으로 국가를 연결",
      "about.c3.li1": "국제 교류(자매 결연형 협력): 지속 가능한 파트너십을 구축합니다",
      "about.c3.li2": "글로벌 리더십: 연대를 실행으로 번역합니다",

      "about.c4.tag": "연대",
      "about.c4.t": "공동의 이벤트로 사회를 연결",
      "about.c4.li1": "지구의 날 행사: 환경으로 잇는 연대를 확장합니다",
      "about.c4.li2": "네이처 렌즈: 유해식물 제거로 ‘연결’을 실천합니다"
    }
  };

  function getLang() {
    const v = localStorage.getItem(STORAGE_KEY);
    return (v === "ko" || v === "en") ? v : "en";
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    applyLang(lang);
  }

  function applyLang(lang) {
    const nodes = document.querySelectorAll("[data-i18n]");
    nodes.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = dict[lang]?.[key];
      if (typeof value === "string") el.textContent = value;
    });

    const toggle = document.getElementById("langToggle");
    if (toggle) toggle.classList.toggle("is-ko", lang === "ko");

    document.documentElement.lang = (lang === "ko") ? "ko" : "en";
  }

  // Bind toggle
  const toggle = document.getElementById("langToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = (getLang() === "ko") ? "en" : "ko";
      setLang(next);
    }, { passive: true });
  }

  // Init
  applyLang(getLang());
})();
