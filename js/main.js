document.documentElement.classList.add("js-enabled");

const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");
const themeColor = document.querySelector("#theme-color");
const storedTheme = (() => {
  try { return localStorage.getItem("portfolio-theme"); } catch { return null; }
})();

function applyTheme(theme, persist = false) {
  const isLight = theme === "light";
  root.dataset.theme = isLight ? "light" : "dark";
  if (themeButton) {
    const label = isLight ? "Ativar tema escuro" : "Ativar tema claro";
    themeButton.setAttribute("aria-label", label);
    themeButton.setAttribute("title", label);
  }
  if (themeColor) themeColor.setAttribute("content", isLight ? "#f8f5f0" : "#17131d");
  if (persist) {
    try { localStorage.setItem("portfolio-theme", isLight ? "light" : "dark"); } catch { /* armazenamento opcional */ }
  }
}

applyTheme(storedTheme === "light" || storedTheme === "dark" ? storedTheme : "dark");
if (themeButton) {
  themeButton.addEventListener("click", () => {
    applyTheme(root.dataset.theme === "light" ? "dark" : "light", true);
  });
}

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menu");
      navigation.classList.remove("is-open");
    }
  });
}

const year = document.querySelector("#current-year");
if (year) year.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(
  ".section-heading, .intro-grid, .facts-row, .timeline-item, .projects-heading, .project-card, .mini-project, .project-footnote, .skills-head, .skill-card, .languages, .contact-content"
);

revealItems.forEach((item) => item.setAttribute("data-reveal", ""));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

