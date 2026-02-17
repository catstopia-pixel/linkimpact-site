// assets/js/activities.js
// 운영형: data/activities.json 기반
// - 카드: thumb + 제목 + 요약
// - 모달: cover + 본문 + 갤러리(images) + 내부 스크롤
// - 필터 / 더보기 / ESC 닫기 / 바깥 클릭 닫기
// - 현재는 영문(en)만 운영. (ko는 추후 추가 가능)

(function () {
  const STORAGE_KEY = "li_lang";
  const getLang = () => (localStorage.getItem(STORAGE_KEY) === "ko" ? "ko" : "en");
  const lang = () => getLang(); // shortcut

  const grid = document.getElementById("activityGrid");
  const list = document.getElementById("activityList");
  const btnMore = document.getElementById("btnMore");
  const chips = Array.from(document.querySelectorAll(".chip"));

  const modal = document.getElementById("modal");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalClose = document.getElementById("modalClose");
  const modalTag = document.getElementById("modalTag");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  let DATA = [];
  let filter = "all";
  let visibleCount = 6;

  const categoryLabel = {
    world: { en: "World", ko: "세계" },
    generation: { en: "Generation", ko: "세대" },
    nation: { en: "Nation", ko: "국가" },
    solidarity: { en: "Solidarity", ko: "연대" }
  };

  function t(obj) {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[lang()] ?? obj.en ?? "";
  }

  function esc(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function itemsFiltered() {
    return DATA.filter((x) => (filter === "all" ? true : x.category === filter));
  }

  function render() {
    if (!grid || !list) return;

    const items = itemsFiltered();
    const shown = items.slice(0, visibleCount);

    grid.innerHTML = shown
      .map((item) => {
        const badge = t(categoryLabel[item.category] || { en: "" });
        const title = t(item.title);
        const summary = t(item.summary);
        const thumb = item.media?.thumb || "";

        return `
          <article class="card" data-id="${esc(item.id)}" tabindex="0" role="button" aria-label="${esc(title)}">
            <div class="thumb" aria-hidden="true" style="background-image:url('${esc(thumb)}')"></div>
            <div class="cardBody">
              <div class="cardTop">
                <span class="badge">${esc(badge)}</span>
              </div>
              <h3 class="cardTitle">${esc(title)}</h3>
              <p class="cardDesc">${esc(summary)}</p>
            </div>
          </article>
        `;
      })
      .join("");

    list.innerHTML = shown
      .map((item) => {
        const title = t(item.title);
        const summary = t(item.summary);
        return `
          <li class="listItem" data-id="${esc(item.id)}" tabindex="0" role="button" aria-label="${esc(title)}">
            <span class="dot" aria-hidden="true"></span>
            <div>
              <h4>${esc(title)}</h4>
              <p>${esc(summary)}</p>
            </div>
          </li>
        `;
      })
      .join("");

    if (btnMore) {
      btnMore.disabled = visibleCount >= items.length;
      btnMore.style.opacity = btnMore.disabled ? ".55" : "1";
    }
  }

  function openModal(item) {
    if (!modal) return;

    const cat = t(categoryLabel[item.category] || { en: "" });
    const title = t(item.title);
    const paragraphs = (item.content?.[lang()] || item.content?.en || [])
      .map((p) => `<p>${esc(p)}</p>`)
      .join("");

    const cover = item.media?.cover || "";
    const images = item.media?.images || [];
    const date = item.date ? esc(item.date) : "";
    const place = item.place ? esc(item.place) : "";
    const meta = [date, place].filter(Boolean).join(" · ");

    const gallery = images.length
      ? `
        <div class="zoomGallery" aria-label="Gallery">
          ${images
            .map(
              (src) => `
            <figure class="zoomFigure">
              <img class="zoomImg" src="${esc(src)}" alt="${esc(title)} image" loading="lazy" />
            </figure>
          `
            )
            .join("")}
        </div>
      `
      : "";

    modalTag.textContent = cat;
    modalTitle.textContent = title;

    modalBody.innerHTML = `
      ${cover ? `<div class="coverWrap"><img class="coverImg" src="${esc(cover)}" alt="${esc(title)} cover" /></div>` : ""}
      ${meta ? `<div class="metaLine">${meta}</div>` : ""}
      <div class="textBlock">${paragraphs}</div>
      ${gallery}
    `;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }

  function onActivate(e) {
    const el = e.target.closest("[data-id]");
    if (!el) return;
    const id = el.getAttribute("data-id");
    const item = DATA.find((x) => x.id === id);
    if (item) openModal(item);
  }

  function setFilter(next) {
    filter = next;
    visibleCount = 6;

    chips.forEach((btn) => {
      const active = btn.getAttribute("data-filter") === filter;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });

    render();
  }

  async function load() {
    try {
      const res = await fetch("./data/activities.json", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load activities.json");
      const json = await res.json();
      DATA = Array.isArray(json.items) ? json.items : [];
      render();
    } catch (err) {
      console.error(err);
      if (grid) grid.innerHTML = `<div style="padding:16px;color:rgba(10,10,12,.6)">Failed to load data/activities.json</div>`;
    }
  }

  // Bind
  if (grid) grid.addEventListener("click", onActivate);
  if (list) list.addEventListener("click", onActivate);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
    if (e.key === "Enter") {
      const a = document.activeElement;
      if (a && a.hasAttribute("data-id")) {
        const id = a.getAttribute("data-id");
        const item = DATA.find((x) => x.id === id);
        if (item) openModal(item);
      }
    }
  });

  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);
  if (modalClose) modalClose.addEventListener("click", closeModal);

  chips.forEach((btn) => {
    btn.addEventListener("click", () => setFilter(btn.getAttribute("data-filter") || "all"), { passive: true });
  });

  if (btnMore) {
    btnMore.addEventListener("click", () => {
      visibleCount += 3;
      render();
    }, { passive: true });
  }

  // When language toggles, just re-render (현재는 en만 채워도 문제 없음)
  const langToggle = document.getElementById("langToggle");
  if (langToggle) langToggle.addEventListener("click", () => setTimeout(render, 0));

  load();
})();

document.addEventListener("languageChange", (e) => {
  renderActivities(e.detail.lang);
});
