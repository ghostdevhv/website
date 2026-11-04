(() => {
  const allowed = new Set(["morning", "afternoon", "evening", "night"]);
  function localScene(hour) {
    if (hour >= 5 && hour < 11) return "morning";
    if (hour >= 11 && hour < 17) return "afternoon";
    if (hour >= 17 && hour < 20) return "evening";
    return "night";
  }
  function update() {
    let stored;
    try {
      stored = localStorage.getItem("time-scene");
    } catch {}
    const override = new URLSearchParams(location.search).get("view") || stored;
    document.body.dataset.scene = allowed.has(override)
      ? override
      : localScene(new Date().getHours());
  }
  const syncChrome = () =>
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute(
        "content",
        getComputedStyle(document.body).getPropertyValue("--sky-top").trim(),
      );
  new MutationObserver(syncChrome).observe(document.body, {
    attributes: true,
    attributeFilter: ["data-scene"],
  });
  window.addEventListener("popstate", update);
  window.addEventListener("scenechange", update);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) update();
  });
  setInterval(update, 60000);
  update();
  syncChrome();
})();
