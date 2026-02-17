(() => {
  const buttons = [...document.querySelectorAll(".nav-btn")];
  const views = [...document.querySelectorAll(".view")];

  function setRoute(route){
    views.forEach(v => v.classList.toggle("is-active", v.dataset.view === route));
    buttons.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.route === route)));
    history.replaceState(null, "", `#${route}`);
  }

  buttons.forEach(b => b.addEventListener("click", () => setRoute(b.dataset.route)));

  // Link-style route jump (optional)
  document.querySelectorAll("[data-route-link]").forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      setRoute(a.getAttribute("data-route-link"));
    });
  });

  const initial = (location.hash || "#intro").replace("#","");
  setRoute(initial === "works" ? "works" : "intro");
})();
