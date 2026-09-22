const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const navLinks = $("#navLinks");
const menuBtn = $("#menuBtn");
const themeBtn = $("#themeBtn");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuBtn.innerHTML = navLinks.classList.contains("open")
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

$$(".nav-link").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
}));

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") {
  document.body.classList.add("light");
  themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const light = document.body.classList.contains("light");
  localStorage.setItem("portfolio-theme", light ? "light" : "dark");
  themeBtn.innerHTML = light
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
});

const words = ["Web Developer", "Programmer", "CSE Student", "Problem Solver"];
let wi = 0, ci = 0, deleting = false;
const typing = $("#typingText");

function typeLoop() {
  const word = words[wi];
  typing.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
  if (!deleting && ci > word.length) {
    deleting = true;
    setTimeout(typeLoop, 1200);
    return;
  }
  if (deleting && ci < 0) {
    deleting = false;
    ci = 0;
    wi = (wi + 1) % words.length;
  }
  setTimeout(typeLoop, deleting ? 45 : 90);
}
typeLoop();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      if (entry.target.classList.contains("skill-item")) {
        const bar = entry.target.querySelector(".bar span");
        if (bar) bar.style.width = bar.dataset.width;
      }
    }
  });
}, { threshold: 0.14 });

$$(".reveal").forEach(el => observer.observe(el));

const filters = $$(".filter");
const projects = $$(".project-card");
filters.forEach(btn => btn.addEventListener("click", () => {
  filters.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  const filter = btn.dataset.filter;
  projects.forEach(card => {
    card.classList.toggle("hidden", filter !== "all" && card.dataset.category !== filter);
  });
}));

const sections = $$("section[id]");
const navItems = $$(".nav-link");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (scrollY >= section.offsetTop - 180) current = section.id;
  });
  navItems.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));

  $("#backTop").classList.toggle("show", scrollY > 500);
}, { passive: true });

$("#backTop").addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

$("#contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("#name"), email = $("#email"), message = $("#message");
  const status = $("#formStatus");
  let valid = true;

  $$(".field small").forEach(x => x.textContent = "");
  status.textContent = "";

  if (!name.value.trim()) {
    name.parentElement.querySelector("small").textContent = "Please enter your name.";
    valid = false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    email.parentElement.querySelector("small").textContent = "Enter a valid email address.";
    valid = false;
  }
  if (message.value.trim().length < 10) {
    message.parentElement.querySelector("small").textContent = "Message should be at least 10 characters.";
    valid = false;
  }

  if (valid) {
    status.textContent = "Thanks! Your message is ready to send. Connect through the email/LinkedIn buttons for now.";
    e.target.reset();
  }
});

$("#year").textContent = new Date().getFullYear();

const glow = $(".cursor-glow");
window.addEventListener("pointermove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});
