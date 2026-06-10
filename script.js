// === Спотлайт за курсором ===
const root = document.documentElement;
window.addEventListener("pointermove", (e) => {
  root.style.setProperty("--mx", e.clientX + "px");
  root.style.setProperty("--my", e.clientY + "px");
});

// === 3D-наклон фото-карточки ===
const tilt = document.getElementById("tilt");
if (tilt && window.matchMedia("(pointer:fine)").matches) {
  const wrap = tilt.parentElement;
  const MAX = 9;
  wrap.addEventListener("pointermove", (e) => {
    const r = wrap.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tilt.style.transform = `rotateY(${px * MAX}deg) rotateX(${-py * MAX}deg)`;
  });
  wrap.addEventListener("pointerleave", () => {
    tilt.style.transform = "rotateY(0) rotateX(0)";
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
