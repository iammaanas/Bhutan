(() => {
  "use strict";
  const STORAGE_KEY = "bhutan-theme";
  const THEMES = {
    bhutan: { name: "Bhutan", chrome: "#0a0f14" },
    aurora: { name: "Aurora", chrome: "#031517" },
    forest: { name: "Forest", chrome: "#041309" },
    rose: { name: "Rose", chrome: "#160912" },
    ocean: { name: "Ocean", chrome: "#03101b" },
    graphite: { name: "Graphite", chrome: "#0c0e11" }
  };

  const root = document.documentElement;
  const picker = document.getElementById("themePicker");
  const toggle = document.getElementById("themeToggle");
  const menu = document.getElementById("themeMenu");
  const label = document.getElementById("themeLabel");
  if (!picker || !toggle || !menu || !label) {
    console.warn("Bhutan theme picker: required controls not found.");
    return;
  }

  function applyTheme(requested, persist = true) {
    const theme = Object.prototype.hasOwnProperty.call(THEMES, requested) ? requested : "bhutan";
    root.setAttribute("data-theme", theme);
    label.textContent = THEMES[theme].name;
    document.querySelectorAll(".theme-option[data-theme]").forEach(option => {
      option.setAttribute("aria-pressed", String(option.dataset.theme === theme));
    });
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", THEMES[theme].chrome);
    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, theme); } catch (error) { /* local persistence is optional */ }
    }
  }

  function closeMenu() {
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }

  let savedTheme = "bhutan";
  try { savedTheme = localStorage.getItem(STORAGE_KEY) || "bhutan"; } catch (error) { /* use default */ }
  applyTheme(savedTheme, false);

  toggle.addEventListener("click", event => {
    event.preventDefault();
    const opening = menu.hidden;
    menu.hidden = !opening;
    toggle.setAttribute("aria-expanded", String(opening));
  });

  picker.addEventListener("click", event => {
    const option = event.target.closest(".theme-option[data-theme]");
    if (!option) return;
    event.preventDefault();
    applyTheme(option.dataset.theme);
    closeMenu();
    toggle.focus();
  });

  document.addEventListener("click", event => {
    if (!picker.contains(event.target)) closeMenu();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
      toggle.focus();
    }
  });

  window.addEventListener("storage", event => {
    if (event.key === STORAGE_KEY) applyTheme(event.newValue || "bhutan", false);
  });

  root.dataset.themeReady = "true";
})();