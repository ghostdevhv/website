const galleryPhotos = [
  {
    alt: "Sunset above wooded hills and a rocky lookout",
    full: "/assets/photos/full/hilltop.jpg",
    thumb: "/assets/photos/thumbs/hilltop-tile-320.webp",
    width: 4032,
    height: 3024,
    location: "Wayanad, Kerala",
  },
  {
    alt: "Birds flying above the golden sea at sunset",
    full: "/assets/photos/full/golden-sea.jpg",
    thumb: "/assets/photos/thumbs/golden-sea-tile-320.webp",
    width: 3000,
    height: 4000,
    location: "Lagos, Portugal",
  },
  {
    alt: "Sunlight breaking through clouds above the shore",
    full: "/assets/photos/full/sunlit-shore.jpg",
    thumb: "/assets/photos/thumbs/sunlit-shore-tile-320.webp",
    width: 3024,
    height: 4032,
    location: "Goa, India",
  },
  {
    alt: "A peach evening sky over a beach",
    full: "/assets/photos/full/evening-beach.jpg",
    thumb: "/assets/photos/thumbs/evening-beach-tile-320.webp",
    width: 4032,
    height: 3024,
    location: "Mumbai, India",
  },
  {
    alt: "Deep red evening clouds above the city skyline",
    full: "/assets/photos/full/city-dusk.jpg",
    thumb: "/assets/photos/thumbs/city-dusk-tile-320.webp",
    width: 1600,
    height: 1066,
    location: "Toronto, Canada",
  },
  {
    alt: "Dark tree branches against the evening sky",
    full: "/assets/photos/full/branches.jpg",
    thumb: "/assets/photos/thumbs/branches-tile-320.webp",
    width: 3024,
    height: 4032,
    location: "Chiang Mai, Thailand",
  },
];
(() => {
  const dialog = document.querySelector("#photo-viewer");
  const picture = document.querySelector("#full-photo");
  const status = document.querySelector("#photo-status");
  const stage = document.querySelector("#photo-stage");
  const count = document.querySelector("#photo-count");
  const caption = document.querySelector("#photo-caption");
  let index = 0,
    version = 0,
    previousOverflow = "";
  function showPhoto(next) {
    index = (next + galleryPhotos.length) % galleryPhotos.length;
    const photo = galleryPhotos[index],
      request = ++version;
    picture.hidden = true;
    status.hidden = false;
    status.textContent = "Loading photo…";
    count.textContent = `${index + 1} / ${galleryPhotos.length}`;
    caption.textContent = `${photo.location} · ${photo.alt}`;
    picture.alt = `${photo.alt}, ${photo.location}`;
    picture.onload = () => {
      if (request !== version) return;
      picture.hidden = false;
      status.hidden = true;
    };
    picture.onerror = () => {
      if (request !== version) return;
      status.textContent =
        "This photo could not load. Try another photo or reopen it.";
    };
    picture.src = photo.full;
    if (picture.complete && picture.naturalWidth) {
      picture.hidden = false;
      status.hidden = true;
    }
  }
  document.querySelectorAll("[data-photo-index]").forEach((tile) => {
    tile.addEventListener("click", () => {
      previousOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      dialog.showModal();
      showPhoto(Number(tile.dataset.photoIndex));
    });
  });
  document
    .querySelector("#photo-close")
    .addEventListener("click", () => dialog.close());
  document
    .querySelector("#photo-prev")
    .addEventListener("click", () => showPhoto(index - 1));
  document
    .querySelector("#photo-next")
    .addEventListener("click", () => showPhoto(index + 1));
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    )
      dialog.close();
  });
  stage.addEventListener("click", (event) => {
    if (event.target === stage) dialog.close();
  });
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPhoto(index - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      showPhoto(index + 1);
    }
  });
  dialog.addEventListener("close", () => {
    version++;
    picture.onload = null;
    picture.onerror = null;
    picture.removeAttribute("src");
    picture.hidden = true;
    document.documentElement.style.overflow = previousOverflow;
  });
})();

// Warm original photos after the visible gallery and initial page have loaded.
// Only one low-priority transfer runs at a time; no background image decoding.
(() => {
  const gallery = document.querySelector(".photo-tiles");
  const viewer = document.querySelector("#photo-viewer");
  const connection = navigator.connection;
  const previews = [...gallery.querySelectorAll("img")];
  const queue = galleryPhotos.map((photo) => photo.full);
  let inView = false,
    active = null,
    scheduled = false,
    stopped = false;
  function allowed() {
    return (
      !stopped &&
      inView &&
      !document.hidden &&
      !viewer.open &&
      document.readyState === "complete" &&
      previews.every((image) => image.complete && image.naturalWidth > 0) &&
      !connection?.saveData &&
      (!connection?.effectiveType || connection.effectiveType === "4g") &&
      (!connection?.downlink || connection.downlink >= 2)
    );
  }
  function schedule() {
    if (scheduled || active || !queue.length || !allowed()) return;
    scheduled = true;
    const idle =
      window.requestIdleCallback || ((callback) => setTimeout(callback, 1200));
    idle(async () => {
      scheduled = false;
      if (!allowed() || active || !queue.length) return;
      const controller = new AbortController(),
        url = queue[0];
      active = controller;
      try {
        const response = await fetch(url, {
          priority: "low",
          cache: "force-cache",
          signal: controller.signal,
        });
        if (response.ok) await response.arrayBuffer();
        queue.shift();
      } catch (error) {
        if (error.name !== "AbortError") queue.shift();
      } finally {
        active = null;
        schedule();
      }
    });
  }
  function pauseOrResume() {
    if (!allowed()) active?.abort();
    else schedule();
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      inView = entries.some((entry) => entry.isIntersecting);
      pauseOrResume();
    }).observe(gallery);
  } else {
    gallery.addEventListener(
      "pointerenter",
      () => {
        inView = true;
        schedule();
      },
      { once: true },
    );
    gallery.addEventListener(
      "touchstart",
      () => {
        inView = true;
        schedule();
      },
      { once: true, passive: true },
    );
  }
  previews.forEach((image) =>
    image.addEventListener("load", schedule, { once: true }),
  );
  window.addEventListener("load", schedule, { once: true });
  window.addEventListener("pagehide", () => {
    stopped = true;
    active?.abort();
  });
  window.addEventListener("pageshow", () => {
    stopped = false;
    schedule();
  });
  document.addEventListener("visibilitychange", pauseOrResume);
  connection?.addEventListener("change", pauseOrResume);
  viewer.addEventListener("close", schedule);
})();
