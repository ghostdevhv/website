(() => {
  const stops = [
    {
      title: "Where it began.",
      place: "IIT Kharagpur · Kharagpur, India",
      date: "2013–2018 · Bachelor’s + Master’s, Computer Science & Engineering",
      copy: "Five years of computer science: learning how systems fit together, from data structures to compilers.",
      detail:
        "I was a teaching assistant for Compilers and Data Structures. This is the foundation I carried into building software professionally.",
      tags: ["Computer science", "Compilers", "Teaching"],
      name: "College",
    },
    {
      title: "Making sense of messy data.",
      place: "Flipkart · Bengaluru, India",
      date: "May–July 2016 · Software Development Intern",
      copy: "My first industry internship took me into unstructured text: customer queries, emails, and the challenge of finding useful meaning in them.",
      detail:
        "I worked with domain-specific chunking grammar, information extraction tools, word2vec embeddings, and hierarchical clustering.",
      tags: ["NLP", "Information extraction", "Clustering"],
      name: "Flipkart",
    },
    {
      title: "Building for everyday people.",
      place: "Adobe · Noida, India",
      date: "Intern: May–July 2017 · Full-time: June 2018–January 2021",
      copy: "I first joined Adobe as an intern, exploring click prediction for sparse bidding keywords. I returned full-time and worked on Acrobat Liquid Mode and Adobe Connect.",
      detail:
        "As Senior Member of Technical Staff, I built adaptive PDF reading, improved model precision, automated checkpoint selection to cut manual effort by 66%, and helped ship Connect on iOS.",
      tags: ["Acrobat", "Adobe Connect", "C++ / Python / React"],
      name: "Adobe",
    },
    {
      title: "Tools for the people who build.",
      place: "GitHub · Hyderabad, India",
      date: "September 2021–October 2022 · Software Engineer II",
      copy: "At GitHub, I worked across npm security, accessibility, data exports, and the infrastructure behind development pipelines.",
      detail:
        "I built captcha integrations and a GDPR-compliant export pipeline, worked on MFA and JWT rotation, and improved Azure pipeline performance by 50% with custom VMSS agents.",
      tags: ["npm", "Platform security", "Developer infrastructure"],
      name: "GitHub",
    },
    {
      title: "From infrastructure to intelligence.",
      place: "Onehouse · Bengaluru, India",
      date: "February–October 2023 · Senior Software Engineer",
      copy: "I built the infrastructure foundation, helped grow the team, and later moved into AI agents for Spark debugging and incident investigation.",
      detail:
        "I built Spark Agent end to end, led the RCA agent initiative, and worked on multi-cloud platforms, Kubernetes orchestration, and workload-aware autoscaling.",
      tags: ["Spark Agent", "AI agents", "Multi-cloud infrastructure"],
      name: "Onehouse",
    },
    {
      title: "The next stretch of road.",
      place: "What I’m exploring now",
      date: "AI agents · Compute infrastructure",
      copy: "I’m interested in useful AI agents and the compute infrastructure that makes them work.",
      detail:
        "Away from the keyboard: music, sunsets, drives, games, good food, and evenings with friends. Usually up for a plan.",
      tags: ["Curiosity", "Good company", "More to build"],
      name: "Now",
    },
  ];
  const hero = document.querySelector("#home"),
    actor = document.querySelector("#traveler"),
    road = document.querySelector("#journey-road");
  const panel = document.querySelector("#journey-panel"),
    title = document.querySelector("#stop-title");
  const prev = document.querySelector("#journey-prev"),
    next = document.querySelector("#journey-next"),
    close = document.querySelector("#journey-close");
  const START_PROGRESS = 0.99;
  let index = -1,
    progress = START_PROGRESS,
    walkFrame = 0,
    walkVersion = 0,
    hoverTimer;
  const leftArrow =
      '<svg class="ui-arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M19 12H5m6-6-6 6 6 6"/></svg>',
    rightArrow =
      '<svg class="ui-arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const positions = [0.91, 0.74, 0.57, 0.4, 0.23, 0.06];
  const compactScene = matchMedia(
    "(max-width:700px) and (orientation:portrait)",
  );
  const roadLength = road.getTotalLength();
  const stations = document.querySelector("#road-stations");
  const marks = ["IIT KGP", "Flipkart", "Adobe", "GitHub", "Onehouse", "→"];
  const brands = ["college", "flipkart", "adobe", "github", "onehouse", "now"];
  const assets = {
    college:
      "data:image/webp;base64,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",
    flipkart:
      "data:image/webp;base64,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",
    adobe:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNy4yIDI0Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzAgLTMwKSI+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBpZD0iUGF0aF85LTIiIGRhdGEtbmFtZT0iUGF0aCA5IiBkPSJNNjg0Ljk3My0xNDMuMzhINjk1djI0WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTYzNy44OCAxNzMuMzgpIiBmaWxsPSIjZmEwZjAwIiAvPgogICAgPHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBpZD0iUGF0aF8xMC0yIiBkYXRhLW5hbWU9IlBhdGggMTAiIGQ9Ik02NTYuMTQtMTQzLjM4SDY0Ni4xMDl2MjRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjE2LjExIDE3My4zOCkiIGZpbGw9IiNmYTBmMDAiIC8+CiAgICA8cGF0aCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJQYXRoXzExLTIiIGRhdGEtbmFtZT0iUGF0aCAxMSIgZD0iTTY3MS4zNjItMTIzLjI3MWw2LjM4NywxNS4xNTRoLTQuMTg2bC0xLjkxMS00LjgyNmgtNC42NzRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjI3LjggMTYyLjEyKSIgZmlsbD0iI2ZhMGYwMCIgLz4KICAgIDwvZz48L3N2Zz4=",
    github:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNiAwQzcuMTYgMCAwIDcuMTYgMCAxNkMwIDIzLjA4IDQuNTggMjkuMDYgMTAuOTQgMzEuMThDMTEuNzQgMzEuMzIgMTIuMDQgMzAuODQgMTIuMDQgMzAuNDJDMTIuMDQgMzAuMDQgMTIuMDIgMjguNzggMTIuMDIgMjcuNDRDOCAyOC4xOCA2Ljk2IDI2LjQ2IDYuNjQgMjUuNTZDNi40NiAyNS4xIDUuNjggMjMuNjggNSAyMy4zQzQuNDQgMjMgMy42NCAyMi4yNiA0Ljk4IDIyLjI0QzYuMjQgMjIuMjIgNy4xNCAyMy40IDcuNDQgMjMuODhDOC44OCAyNi4zIDExLjE4IDI1LjYyIDEyLjEgMjUuMkMxMi4yNCAyNC4xNiAxMi42NiAyMy40NiAxMy4xMiAyMy4wNkM5LjU2IDIyLjY2IDUuODQgMjEuMjggNS44NCAxNS4xNkM1Ljg0IDEzLjQyIDYuNDYgMTEuOTggNy40OCAxMC44NkM3LjMyIDEwLjQ2IDYuNzYgOC44MiA3LjY0IDYuNjJDNy42NCA2LjYyIDguOTggNi4yIDEyLjA0IDguMjZDMTMuMzIgNy45IDE0LjY4IDcuNzIgMTYuMDQgNy43MkMxNy40IDcuNzIgMTguNzYgNy45IDIwLjA0IDguMjZDMjMuMSA2LjE4IDI0LjQ0IDYuNjIgMjQuNDQgNi42MkMyNS4zMiA4LjgyIDI0Ljc2IDEwLjQ2IDI0LjYgMTAuODZDMjUuNjIgMTEuOTggMjYuMjQgMTMuNCAyNi4yNCAxNS4xNkMyNi4yNCAyMS4zIDIyLjUgMjIuNjYgMTguOTQgMjMuMDZDMTkuNTIgMjMuNTYgMjAuMDIgMjQuNTIgMjAuMDIgMjYuMDJDMjAuMDIgMjguMTYgMjAgMjkuODggMjAgMzAuNDJDMjAgMzAuODQgMjAuMyAzMS4zNCAyMS4xIDMxLjE4QzI3LjQyIDI5LjA2IDMyIDIzLjA2IDMyIDE2QzMyIDcuMTYgMjQuODQgMCAxNiAwVjBaIiBmaWxsPSIjMjQyOTJFIi8+Cjwvc3ZnPgo=",
    onehouse:
      "data:image/webp;base64,UklGRqgFAABXRUJQVlA4WAoAAAAQAAAAHwAAHwAAQUxQSA4DAAAFoHBt2xlJXtL7hZVUKmW1zVnbtm3btm3btm3b23bZVUnKVUlVkmHVRMQEQIMc6xBRrs2cW2yJwFq07xLy29iE3O4uhepcPNvUyI23pdoQFqBanaKyYLIkpbrSCLPLuUfy9s5ErYo7mRJdjhL2sKjm18QduMfVrjY50YUxUY+WplvzkQUnisr51TFn9o8Fc4zFXlP7p0aiRuQrGmzTYsdPbG4VtMe27D/jvRRL2IEPbeNzz5YZccYIWW5KVAGg75T+r+dc1Razy9jpL23lD3gqvorOf+f92/2vBkAceNpHlu/X1U0ul0fuLbQlUUbISNp/dbTIyGMALc9O1+dreCcx4Ox1IYTXVTEIsxEhn2bHDSERbsLUnh/qbmdnWx/3+++RMju8yUDUl47G40x4rHvKfpywrfmdNmIDc8/H1xZgtf1XrvcXO5afbf83JqNddnIKv3pcHstl/8Ga0XbnhLGvFbc/Fhs5BYqgBrzWC3LQ8NB5c7w/nSsLw9tIGsGk6g+kocm+U7JCRFJyvvUQIs2217+Gpk93zKQyRVnp5nmbpXxZqSnu/uh4SMop3q1lYJXyzIvNsMd7lFQoK+cz52YTLOlv++lNvSH6wF18VCRcrCT+OXcL/c/aumF87H2pAe8hHRRV+IZXp5fqu2yxyS+kU6jZhS/GpNUYD9iIogts5Wt+3IcKFyNHR5BFWI3AqyGhoFj7zJRC4JquflmKUrPQdsdkV1GnME3HacmUd5FZPm3QgCRiU3+YoiLAFVt+tN9vA0igVbnCh7dcsOarnE5JjPKYqzwFAKbbDRJpC1FkwcuFgjtPVB3usNGp/md82fW7DgCw43GLg7Nsa9YmqdjS1jODPvAWkmbHC+pfNW0V446XvLZP2mepEXLH2DoJCyiC3Rwbn15Si7BabKO7nuobzJQNZDnXrofc7Uo8MPSyX5BhjWj00V9L3a2z1TjjbolbMvXsdnf+pZWgUcdN5VQ3H1swetZXZ8JU2/1BTYPGsZ3b1W25n1DHNqF/+dQrKVibfM+2WGp9zxf/ZBPQIFZQOCB0AgAAEBAAnQEqIAAgAD4VCINBIQYBgAQAUS2AE6ZQjgbyv8GuQM0C7c/sllAnGX+P/KP+S7wz/bPyj3jP9juEA/UTrAPQA/YD0nP1d+Az9jv2c+AT+Rf1X/0XU+uzYTf0Es3zzj7AH6hf8TgK/2AHcZ/jdd72Fb7JQD7v0NUHf4txQ+ftC0oQLAoBUAAA/v9d6XkSwrZAW0Qf/cof9p9at/9kHH1p6tRY8mPw/LudW89q9i3+uS/i+ShUyn3s4Ej0gheBYduz2+ChGBg9WkbtqI6M3+h/EGvyu+7xib+4kC2dk+mf9PxC92M/66X30RscQvziS5iiog0MM8L6yIWZt3F0SEN//6iMf3eBb5nMP+4/sVmnczGzONXRqwAwBLrPnFTNxSrPIYAYD1UzMbZAAj5vD1eJDtg3zALgY5oqI/xKWDtsmzO0yYEL/41EoQ2YREmR6cbqBIe9lieXP15phZMsxX+vpsjNLIpSyCfAIlKmRFHdr+MxovluLUxbZIkbNq1XzFsz/z18lg4l80zZ/RMR58QYo4F/1GyYgVqGFx5QB+nPfPTkRiA82ZQec352lh2n2rtituu+lgaSPLXH7iC1elLhprf+QnOV/Tvs/yWo98PPLJlYyPihbNw7QSOUdf2XhUSBCz8EU8cT/8kaA4sSEtNphIO+vbVe91xhWX8lWnyZdrdmfBFBhTPrepd6I4z6XT3yEdKh2xG/5jdjfCIkWQJid9a2Hv+/ZnvS04+qZgUCihGtDCLRd9tN+HF/t601Pgrz0Qbg2eTmtzaZpyLbSO5yukMdVjKQR3WGduAu6SknY8vvCl5e3Gogsa3lsIAPsKAAAA==",
  };
  const stationButtons = stops.map((stop, i) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "road-station";
    button.dataset.brand = brands[i];
    button.setAttribute("aria-label", `Visit ${stop.name}`);
    const mark = document.createElement("span");
    mark.className = "station-mark";
    if (assets[brands[i]]) {
      const img = document.createElement("img");
      img.src = assets[brands[i]];
      img.decoding = "async";
      img.alt = marks[i];
      img.addEventListener(
        "error",
        () => {
          mark.textContent = marks[i];
        },
        { once: true },
      );
      mark.append(img);
    } else mark.innerHTML = rightArrow;
    button.append(mark);
    button.addEventListener("click", () => show(i));
    button.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "touch" || index >= 0) return;
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => show(i, false), 450);
    });
    button.addEventListener("pointerleave", () => clearTimeout(hoverTimer));
    stations.append(button);
    return button;
  });
  let routeFrameKey = "",
    visibleRouteEnd = 0.91,
    roadStartEnd = 0.99;
  function position() {
    const svg = road.ownerSVGElement;
    const compact = compactScene.matches;
    const viewBox = compact ? "650 160 950 890" : "0 0 1600 1050";
    const aspect = compact ? "none" : "xMidYMid slice";
    if (svg.getAttribute("viewBox") !== viewBox)
      svg.setAttribute("viewBox", viewBox);
    if (svg.getAttribute("preserveAspectRatio") !== aspect)
      svg.setAttribute("preserveAspectRatio", aspect);
    const matrix = road.getScreenCTM();
    if (!matrix) return;
    const r = hero.getBoundingClientRect();
    const frameKey = [
      r.width,
      r.height,
      matrix.a,
      matrix.b,
      matrix.c,
      matrix.d,
      matrix.e,
      matrix.f,
    ].join(":");
    if (frameKey !== routeFrameKey) {
      routeFrameKey = frameKey;
      // Keep the first stop on the visible road, rather than clamping its icon away from it.
      const padX = compact ? 38 : 50,
        padY = 14;
      for (let p = 0.99; p >= 0.1; p -= 0.005) {
        const point = road.getPointAtLength(roadLength * p);
        const q = new DOMPoint(point.x, point.y).matrixTransform(matrix);
        if (
          q.x - r.left >= padX &&
          q.x - r.left <= r.width - padX &&
          q.y - r.top >= 110 &&
          q.y - r.top <= r.height - padY
        ) {
          roadStartEnd = p;
          break;
        }
      }
      const screenScale = Math.sqrt(
        (matrix.a ** 2 + matrix.b ** 2 + matrix.c ** 2 + matrix.d ** 2) / 2,
      );
      const entranceGap = (compact ? 96 : 125) / (roadLength * screenScale);
      visibleRouteEnd = Math.max(0.25, roadStartEnd - entranceGap);
    }
    const routeScale = visibleRouteEnd / positions[0];
    const roadProgress =
      progress > positions[0]
        ? visibleRouteEnd +
          ((roadStartEnd - visibleRouteEnd) * (progress - positions[0])) /
            (START_PROGRESS - positions[0])
        : progress * routeScale;
    const point = road.getPointAtLength(roadLength * Math.min(1, roadProgress));
    const screen = new DOMPoint(point.x, point.y).matrixTransform(matrix);
    stationButtons.forEach((button, i) => {
      const p = road.getPointAtLength(roadLength * positions[i] * routeScale);
      const q = new DOMPoint(p.x, p.y).matrixTransform(matrix);
      button.style.setProperty(
        "--distance-scale",
        `${(compact ? 0.76 : 0.58) + (compact ? 0.24 : 0.42) * positions[i]}`,
      );
      button.style.left = `${q.x - r.left}px`;
      button.style.top = `${q.y - r.top}px`;
    });
    actor.style.setProperty("--traveler-scale", `${0.58 + 0.42 * progress}`);
    actor.style.left = `${Math.max(45, Math.min(r.width - 50, screen.x - r.left))}px`;
    actor.style.top = `${Math.max(150, Math.min(r.height - 12, screen.y - r.top + 4))}px`;
  }
  function anchorPanel() {
    if (index < 0 || panel.hidden) return;
    const r = hero.getBoundingClientRect(),
      b = stationButtons[index].getBoundingClientRect();
    const x = b.left + b.width / 2 - r.left,
      y = b.top + b.height / 2 - r.top;
    const w = panel.offsetWidth,
      h = panel.offsetHeight,
      pad = 16;
    let left = x - w - 40,
      side = "left";
    if (left < pad && x + 40 + w < r.width - pad) {
      left = x + 40;
      side = "right";
    }
    left = Math.max(pad, Math.min(r.width - w - pad, left));
    const top = Math.max(80, Math.min(r.height - h - pad, y - h * 0.55));
    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
    panel.style.setProperty(
      "--arrow-y",
      `${Math.max(24, Math.min(h - 24, y - top))}px`,
    );
    panel.style.setProperty(
      "--origin-y",
      `${Math.max(0, Math.min(h, y - top))}px`,
    );
    panel.dataset.side = side;
  }
  function move(target, arrived = () => {}, instant = false) {
    cancelAnimationFrame(walkFrame);
    const version = ++walkVersion;
    const isEntrance = target === START_PROGRESS || progress > positions[0];
    if (reduced.matches || instant) {
      progress = target;
      position();
      actor.classList.remove("walking");
      arrived();
      return;
    }
    const start = progress,
      begin = performance.now(),
      duration = isEntrance
        ? 1100
        : Math.max(550, Math.min(2300, Math.abs(target - start) * 4000));
    actor.classList.add("walking");
    function step(now) {
      if (version !== walkVersion) return;
      const t = Math.min(1, (now - begin) / duration),
        ease = t * t * (3 - 2 * t);
      progress = start + (target - start) * ease;
      position();
      if (t < 1) walkFrame = requestAnimationFrame(step);
      else {
        actor.classList.remove("walking");
        arrived();
      }
    }
    walkFrame = requestAnimationFrame(step);
  }
  function show(i, focus = true, instant = false) {
    panel.classList.toggle("instant", instant);
    if (i === index) return;
    index = i;
    const stop = stops[i];
    const workLink = document.querySelector(".journey-work-link");
    workLink.hidden = i === 0 || i === 5;
    if (!workLink.hidden)
      workLink.href =
        "/work/#" + ["", "flipkart", "adobe", "github", "onehouse", ""][i];
    workLink.firstChild.textContent =
      i === 0
        ? "Explore education "
        : i === 5
          ? "Explore current interests "
          : "Explore the work in detail ";
    panel.classList.remove("arrived");
    panel.hidden = true;
    hero.classList.add("journey-active");
    actor.setAttribute("aria-expanded", "true");
    actor.setAttribute("aria-label", `Continue journey: ${stop.name}`);
    for (const [selector, key] of [
      ["#stop-place", "place"],
      ["#stop-title", "title"],
      ["#stop-date", "date"],
      ["#stop-copy", "copy"],
      ["#stop-detail", "detail"],
    ])
      document.querySelector(selector).textContent = stop[key];
    prev.disabled = false;
    prev.innerHTML = leftArrow;
    prev.setAttribute(
      "aria-label",
      i === 0 ? "Return to starting position" : "Previous stop",
    );
    next.innerHTML = rightArrow;
    next.setAttribute(
      "aria-label",
      i === stops.length - 1 ? "Return to starting position" : "Next stop",
    );
    stationButtons.forEach((b, n) => {
      if (n === i) b.setAttribute("aria-current", "step");
      else b.removeAttribute("aria-current");
    });
    move(
      positions[i],
      () => {
        panel.hidden = false;
        panel.scrollTop = 0;
        anchorPanel();
        requestAnimationFrame(() => {
          panel.classList.add("arrived");
          if (focus) title.focus({ preventScroll: true });
        });
      },
      instant,
    );
  }
  function exit() {
    clearTimeout(hoverTimer);
    panel.classList.remove("arrived");
    panel.hidden = true;
    hero.classList.remove("journey-active");
    actor.setAttribute("aria-expanded", "false");
    actor.setAttribute("aria-label", "Explore my journey");
    index = -1;
    stationButtons.forEach((b) => b.removeAttribute("aria-current"));
    move(START_PROGRESS);
    actor.blur();
  }
  actor.addEventListener("click", () =>
    show(index < 0 ? 0 : Math.min(index + 1, stops.length - 1)),
  );
  document.addEventListener(
    "click",
    (event) => {
      if (
        index < 0 ||
        event.target.closest("#journey-panel,header,.road-station,#traveler")
      )
        return;
      exit();
      event.preventDefault();
      event.stopPropagation();
    },
    true,
  );
  prev.addEventListener("click", () => {
    if (index === 0) exit();
    else if (index > 0) show(index - 1);
  });
  next.addEventListener("click", () => {
    if (index === stops.length - 1) exit();
    else show(index + 1);
  });
  close.addEventListener("click", exit);
  document.addEventListener("keydown", (e) => {
    if (e.target.closest("input,textarea,select,[contenteditable=true]"))
      return;
    if (e.key === "Escape" && index >= 0) {
      exit();
      return;
    }
    if (!["ArrowLeft", "ArrowRight"].includes(e.key) || e.repeat) return;
    actor.blur();
    e.preventDefault();
    if (index < 0) {
      if (e.key === "ArrowRight") show(0, false, false);
      return;
    }
    if (index === 0 && e.key === "ArrowLeft") {
      exit();
      return;
    }
    show(
      Math.max(
        0,
        Math.min(stops.length - 1, index + (e.key === "ArrowRight" ? 1 : -1)),
      ),
      false,
      false,
    );
  });
  // One chapter per trackpad gesture. Small deltas accumulate; momentum cannot skip stops.
  let wheelTotal = 0,
    lastWheel = 0,
    gestureUsed = false,
    touchY = null;
  hero.addEventListener(
    "wheel",
    (event) => {
      if (
        event.target.closest("#journey-panel,.journey-guide-card") ||
        event.ctrlKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
      )
        return;
      event.preventDefault();
      const now = performance.now();
      if (now - lastWheel > 220) {
        wheelTotal = 0;
        gestureUsed = false;
      }
      lastWheel = now;
      if (gestureUsed) return;
      const delta =
        event.deltaY *
        (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
      if (wheelTotal && Math.sign(delta) !== Math.sign(wheelTotal))
        wheelTotal = 0;
      wheelTotal += delta;
      if (Math.abs(wheelTotal) < 24) return;
      gestureUsed = true;
      const direction = wheelTotal < 0 ? 1 : -1;
      if (index < 0) {
        if (direction > 0) show(0, false);
        return;
      }
      if (index === 0 && direction < 0) {
        exit();
        return;
      }
      const target = Math.max(0, Math.min(stops.length - 1, index + direction));
      show(target, false);
    },
    { passive: false },
  );
  hero.addEventListener(
    "touchstart",
    (event) => {
      touchY = null;
      if (
        !event.target.closest(".journey-panel,.journey-guide-card,header") &&
        event.touches.length === 1
      )
        touchY = event.touches[0].clientY;
    },
    { passive: true },
  );
  hero.addEventListener(
    "touchend",
    (event) => {
      if (touchY === null) return;
      const delta = touchY - event.changedTouches[0].clientY;
      touchY = null;
      if (Math.abs(delta) < 40) return;
      if (index === 0 && delta < 0) {
        exit();
        return;
      }
      if (index < 0 && delta < 0) return;
      show(
        index < 0
          ? 0
          : Math.max(
              0,
              Math.min(stops.length - 1, index + (delta > 0 ? 1 : -1)),
            ),
        false,
      );
    },
    { passive: true },
  );
  hero.addEventListener(
    "touchcancel",
    () => {
      touchY = null;
    },
    { passive: true },
  );
  let layoutFrame = 0;
  function refreshLayout() {
    if (layoutFrame) return;
    layoutFrame = requestAnimationFrame(() => {
      layoutFrame = 0;
      position();
      anchorPanel();
    });
  }
  window.addEventListener("resize", refreshLayout);
  window.addEventListener("orientationchange", refreshLayout);
  window.visualViewport?.addEventListener("resize", refreshLayout);
  compactScene.addEventListener?.("change", refreshLayout);
  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(refreshLayout);
    [
      hero,
      road.ownerSVGElement,
      panel,
      hero.querySelector(".hero-copy"),
    ].forEach((element) => observer.observe(element));
  }
  document.fonts?.ready.then(refreshLayout);
  document.fonts?.addEventListener("loadingdone", refreshLayout);
  position();
  refreshLayout();
})();
