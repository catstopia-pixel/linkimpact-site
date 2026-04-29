// assets/js/activities.js
// data/activities.json 기반 활동 렌더링 + data/notices.json 기반 공지 팝업

(function () {
  const STORAGE_KEY = "li_lang";
  const NOTICE_KEY_PREFIX = "li_notice_hide_today_";

  const getLang = () => (localStorage.getItem(STORAGE_KEY) === "ko" ? "ko" : "en");
  const lang = () => getLang();

  const grid = document.getElementById("activityGrid");
  const list = document.getElementById("activityList");
  const btnMore = document.getElementById("btnMore");

  const modal = document.getElementById("modal");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalClose = document.getElementById("modalClose");
  const modalTag = document.getElementById("modalTag");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  const btnNotice = document.getElementById("btnNotice");
  const noticeModal = document.getElementById("noticeModal");
  const noticeBackdrop = document.getElementById("noticeBackdrop");
  const noticeClose = document.getElementById("noticeClose");
  const noticeTodayClose = document.getElementById("noticeTodayClose");
  const noticeTitle = document.getElementById("noticeTitle");
  const noticeDate = document.getElementById("noticeDate");
  const noticeContent = document.getElementById("noticeContent");
  const noticePrev = document.getElementById("noticePrev");
  const noticeNext = document.getElementById("noticeNext");
  const noticeCount = document.getElementById("noticeCount");

  let DATA = [];
  let visibleCount = 6;

  let NOTICES = [];
  let noticeIndex = 0;

  const categoryLabel = {
    world: { en: "World", ko: "세계" },
    generation: { en: "Generation", ko: "세대" },
    nation: { en: "Nation", ko: "국가" },
    solidarity: { en: "Solidarity", ko: "연대" },
    climate: { en: "Climate", ko: "기후" },
    partnership: { en: "Partnership", ko: "파트너십" },
    biodiversity: { en: "Biodiversity", ko: "생물다양성" }
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

  function todayKey() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  function render() {
    if (!grid || !list) return;

    const shown = DATA.slice(0, visibleCount);

    grid.innerHTML = shown
      .map((item) => {
        const badge = t(categoryLabel[item.category] || { en: item.category || "" });
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
      btnMore.disabled = visibleCount >= DATA.length;
      btnMore.style.opacity = btnMore.disabled ? ".55" : "1";
    }
  }

  function openModal(item) {
    if (!modal) return;

    const cat = t(categoryLabel[item.category] || { en: item.category || "" });
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

  function renderNotice() {
    if (!NOTICES.length || !noticeTitle || !noticeContent) return;

    const item = NOTICES[noticeIndex];
    const title = t(item.title);
    const content = item.content?.[lang()] || item.content?.en || [];

    noticeTitle.textContent = title;
    noticeDate.textContent = item.date || "";

    noticeContent.innerHTML = content
      .map((p) => `<p>${esc(p)}</p>`)
      .join("");

    if (noticeCount) {
      noticeCount.textContent = `${noticeIndex + 1} / ${NOTICES.length}`;
    }

    const hasMultiple = NOTICES.length > 1;
    if (noticePrev) noticePrev.style.display = hasMultiple ? "inline-flex" : "none";
    if (noticeNext) noticeNext.style.display = hasMultiple ? "inline-flex" : "none";
    if (noticeCount) noticeCount.style.display = hasMultiple ? "inline-flex" : "none";
  }

  function openNotice(force = false) {
    if (!noticeModal || !NOTICES.length) return;

    const today = todayKey();
    const hiddenToday = localStorage.getItem(`${NOTICE_KEY_PREFIX}${today}`) === "1";

    if (!force && hiddenToday) return;

    noticeIndex = 0;
    renderNotice();

    noticeModal.classList.add("is-open");
    noticeModal.setAttribute("aria-hidden", "false");

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }

  function closeNotice() {
    if (!noticeModal) return;

    noticeModal.classList.remove("is-open");
    noticeModal.setAttribute("aria-hidden", "true");

    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }

  function closeNoticeToday() {
    localStorage.setItem(`${NOTICE_KEY_PREFIX}${todayKey()}`, "1");
    closeNotice();
  }

  function moveNotice(step) {
    if (!NOTICES.length) return;

    noticeIndex = (noticeIndex + step + NOTICES.length) % NOTICES.length;
    renderNotice();
  }

  async function loadActivities() {
    try {
      const res = await fetch("./data/activities.json", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load activities.json");

      const json = await res.json();
      DATA = Array.isArray(json.items) ? json.items : [];

      render();
    } catch (err) {
      console.error(err);

      if (grid) {
        grid.innerHTML = `<div style="padding:16px;color:rgba(10,10,12,.6)">Failed to load data/activities.json</div>`;
      }
    }
  }

  async function loadNotices() {
    try {
      const res = await fetch("./data/notices.json", { cache: "no-store" });
      if (!res.ok) return;

      const json = await res.json();

      NOTICES = Array.isArray(json.items)
        ? json.items
            .filter((x) => x && x.enabled !== false)
            .sort((a, b) => {
              const da = new Date(a.date || "1900-01-01").getTime();
              const db = new Date(b.date || "1900-01-01").getTime();
              return db - da;
            })
        : [];

      if (btnNotice) {
        btnNotice.disabled = NOTICES.length === 0;
        btnNotice.style.opacity = NOTICES.length === 0 ? ".55" : "1";
      }

      if (NOTICES.length) openNotice(false);
    } catch (err) {
      console.warn("No notices loaded.", err);
      NOTICES = [];

      if (btnNotice) {
        btnNotice.disabled = true;
        btnNotice.style.opacity = ".55";
      }
    }
  }

  if (grid) grid.addEventListener("click", onActivate);
  if (list) list.addEventListener("click", onActivate);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      closeNotice();
    }

    if (e.key === "Enter") {
      const a = document.activeElement;

      if (a && a.hasAttribute("data-id")) {
        const id = a.getAttribute("data-id");
        const item = DATA.find((x) => x.id === id);

        if (item) openModal(item);
      }
    }

    if (noticeModal && noticeModal.classList.contains("is-open")) {
      if (e.key === "ArrowLeft") moveNotice(-1);
      if (e.key === "ArrowRight") moveNotice(1);
    }
  });

  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);
  if (modalClose) modalClose.addEventListener("click", closeModal);

  if (btnMore) {
    btnMore.addEventListener(
      "click",
      () => {
        visibleCount += 3;
        render();
      },
      { passive: true }
    );
  }

  if (btnNotice) btnNotice.addEventListener("click", () => openNotice(true));
  if (noticeBackdrop) noticeBackdrop.addEventListener("click", closeNotice);
  if (noticeClose) noticeClose.addEventListener("click", closeNotice);
  if (noticeTodayClose) noticeTodayClose.addEventListener("click", closeNoticeToday);
  if (noticePrev) noticePrev.addEventListener("click", () => moveNotice(-1));
  if (noticeNext) noticeNext.addEventListener("click", () => moveNotice(1));

  const langToggle = document.getElementById("langToggle");

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      setTimeout(() => {
        render();
        renderNotice();
      }, 0);
    });
  }

  loadActivities();
  loadNotices();
})();