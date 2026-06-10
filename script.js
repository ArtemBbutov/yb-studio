// === Спотлайт за курсором ===
const root = document.documentElement;
window.addEventListener("pointermove", (e) => {
  root.style.setProperty("--mx", e.clientX + "px");
  root.style.setProperty("--my", e.clientY + "px");
});

// === Кастомный курсор ===
const cursor = document.querySelector(".cursor");
const dot = document.querySelector(".cursor-dot");
if (cursor && dot && window.matchMedia("(pointer:fine)").matches) {
  document.body.classList.add("has-cursor");
  let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  let rx = cx, ry = cy;

  window.addEventListener("pointermove", (e) => {
    cx = e.clientX; cy = e.clientY;
    dot.style.left = cx + "px";
    dot.style.top = cy + "px";
  });

  const loop = () => {
    rx += (cx - rx) * 0.18;
    ry += (cy - ry) * 0.18;
    cursor.style.left = rx + "px";
    cursor.style.top = ry + "px";
    requestAnimationFrame(loop);
  };
  loop();

  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("pointerenter", () => cursor.classList.add("cursor--hover"));
    el.addEventListener("pointerleave", () => cursor.classList.remove("cursor--hover"));
  });
}

// === Счётчик цифр ===
const counters = document.querySelectorAll(".stat__num[data-count]");
const runCount = (el) => {
  const target = +el.dataset.count;
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";
  const dur = 1400;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = prefix + Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) { runCount(en.target); io.unobserve(en.target); }
  });
}, { threshold: 0.6 });
counters.forEach((c) => io.observe(c));

// === Мобильное меню ===
const burger = document.querySelector(".burger");
const links = document.querySelector(".nav__links");
if (burger && links) {
  burger.addEventListener("click", () => links.classList.toggle("nav__links--open"));
}
