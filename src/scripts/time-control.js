(() => {
  const button = document.querySelector("#time-toggle"),
    panel = document.querySelector("#time-panel"),
    slider = document.querySelector("#time-range"),
    label = document.querySelector("#time-label");
  const names = ["morning", "afternoon", "evening", "night"];
  function sync() {
    const scene = document.body.dataset.scene;
    slider.value = String(names.indexOf(scene));
    label.textContent = scene[0].toUpperCase() + scene.slice(1);
    slider.setAttribute("aria-valuetext", label.textContent);
  }
  button.addEventListener("click", () => {
    const open = panel.hidden;
    panel.hidden = !open;
    button.setAttribute("aria-expanded", String(open));
    sync();
    if (open) slider.focus();
  });
  slider.addEventListener("input", () => {
    const scene = names[Number(slider.value)];
    try {
      localStorage.setItem("time-scene", scene);
    } catch {}
    const url = new URL(location.href);
    url.searchParams.delete("view");
    history.replaceState(null, "", url);
    window.dispatchEvent(new Event("scenechange"));
    sync();
  });
  document.querySelector("#time-auto").addEventListener("click", () => {
    try {
      localStorage.removeItem("time-scene");
    } catch {}
    const url = new URL(location.href);
    url.searchParams.delete("view");
    history.replaceState(null, "", url);
    window.dispatchEvent(new Event("scenechange"));
    sync();
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".time-control")) {
      panel.hidden = true;
      button.setAttribute("aria-expanded", "false");
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.hidden) {
      panel.hidden = true;
      button.setAttribute("aria-expanded", "false");
      button.focus();
    }
  });
  new MutationObserver(sync).observe(document.body, {
    attributes: true,
    attributeFilter: ["data-scene"],
  });
  sync();
})();
