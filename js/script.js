(() => {
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  const label = document.querySelector(".theme-label");
  const icon = document.querySelector(".theme-icon");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const savedTheme = localStorage.getItem("portfolio-theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  function applyTheme(theme) {
    root.dataset.theme = theme;
    const isDark = theme === "dark";
    label.textContent = isDark ? "Light mode" : "Dark mode";
    icon.textContent = isDark ? "☼" : "◐";
    toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeColor.setAttribute("content", isDark ? "#08090d" : "#f7f7f5");
  }

  applyTheme(savedTheme || (systemPrefersDark ? "dark" : "light"));

  toggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  // Reveal the single BLIMS architecture image when its file is present.
  document.querySelectorAll(".single-image-gallery .project-slide img").forEach((image) => {
    const slide = image.closest(".project-slide");
    const reveal = () => slide.classList.add("has-image");
    image.addEventListener("load", reveal);
    image.addEventListener("error", () => slide.classList.remove("has-image"));
    if (image.complete && image.naturalWidth > 0) reveal();
  });

  // Initialize swipeable project galleries (touch swipe, arrows, and dots).
  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const slides = [...carousel.querySelectorAll(".project-slide")];
    const prev = carousel.querySelector(".carousel-prev");
    const next = carousel.querySelector(".carousel-next");
    const dots = carousel.querySelector(".carousel-dots");
    const count = carousel.querySelector(".carousel-count");
    let active = 0;

    slides.forEach((slide, index) => {
      const image = slide.querySelector("img");
      const reveal = () => slide.classList.add("has-image");
      image.addEventListener("load", reveal);
      image.addEventListener("error", () => slide.classList.remove("has-image"));
      if (image.complete && image.naturalWidth > 0) reveal();

      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", `Show image ${index + 1}`);
      dot.addEventListener("click", () => track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" }));
      dots.appendChild(dot);
    });

    const update = () => {
      active = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
      active = Math.min(Math.max(active, 0), slides.length - 1);
      [...dots.children].forEach((dot, index) => dot.setAttribute("aria-current", String(index === active)));
      count.textContent = `${active + 1} / ${slides.length}`;
      prev.disabled = active === 0;
      next.disabled = active === slides.length - 1;
    };
    prev.addEventListener("click", () => track.scrollTo({ left: Math.max(0, (active - 1) * track.clientWidth), behavior: "smooth" }));
    next.addEventListener("click", () => track.scrollTo({ left: Math.min((slides.length - 1) * track.clientWidth, (active + 1) * track.clientWidth), behavior: "smooth" }));
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", () => track.scrollTo({ left: active * track.clientWidth }));
    update();
  });
})();