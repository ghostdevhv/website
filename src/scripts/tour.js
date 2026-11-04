(() => {
  const guide = document.querySelector("#journey-guide");
  const dismissButton = document.querySelector("#journey-guide-dismiss");
  const storageKey = "journey-guide-dismissed-v1";
  try {
    if (localStorage.getItem(storageKey) === "yes") return;
  } catch {}
  guide.hidden = false;
  document.body.classList.add("journey-onboarding");
  dismissButton.focus({ preventScroll: true });
  function dismiss(restoreFocus = false) {
    if (guide.hidden) return;
    const hadFocus = guide.contains(document.activeElement);
    guide.hidden = true;
    document.body.classList.remove("journey-onboarding");
    try {
      localStorage.setItem(storageKey, "yes");
    } catch {}
    if (restoreFocus && hadFocus)
      document.querySelector("#traveler").focus({ preventScroll: true });
  }
  dismissButton.addEventListener("click", () => dismiss(true));
  document.addEventListener(
    "keydown",
    (event) => {
      if (guide.hidden) return;
      if (event.key === "Escape") {
        dismiss(true);
        return;
      }
      if (["ArrowLeft", "ArrowRight"].includes(event.key)) dismiss(true);
    },
    true,
  );
  document.querySelector("#home").addEventListener(
    "wheel",
    (event) => {
      if (
        !event.ctrlKey &&
        !event.target.closest(".journey-guide-card") &&
        Math.abs(event.deltaY) >= 2
      )
        dismiss();
    },
    { capture: true, passive: true },
  );
  document.querySelector("#home").addEventListener(
    "touchstart",
    (event) => {
      if (!event.target.closest(".journey-guide-card")) dismiss();
    },
    { capture: true, passive: true },
  );
  document.addEventListener(
    "click",
    (event) => {
      if (event.target.closest(".road-station,#traveler,header a")) dismiss();
    },
    true,
  );
})();
