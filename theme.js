(() => {
  "use strict";
  const KEY = "bhutan-theme";
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
  const summary = document.getElementById("themeToggle");
  const label = document.getElementById("themeLabel");
  if (!picker || !summary || !label) {
    console.error("Bhutan theme picker controls are missing.");
    return;
  }

  function applyTheme(value, save = true) {
    const theme = Object.hasOwn(THEMES, value) ? value : "bhutan";
    root.dataset.theme = theme;
    label.textContent = THEMES[theme].name;
    document.querySelectorAll(".theme-option[data-theme]").forEach(option => {
      option.setAttribute("aria-pressed", String(option.dataset.theme === theme));
    });
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = THEMES[theme].chrome;
    if (save) {
      try { localStorage.setItem(KEY, theme); } catch (error) { /* Browser storage can be disabled. */ }
    }
  }

  try { applyTheme(localStorage.getItem(KEY) || "bhutan", false); }
  catch (error) { applyTheme("bhutan", false); }

  // HTML <details> handles opening/closing, so the menu still opens if this
  // script fails to initialize. JavaScript only applies the selected palette.
  picker.addEventListener("toggle", () => {
    summary.setAttribute("aria-expanded", String(picker.open));
  });
  picker.addEventListener("click", event => {
    const option = event.target.closest(".theme-option[data-theme]");
    if (!option) return;
    event.preventDefault();
    applyTheme(option.dataset.theme);
    picker.open = false;
    summary.setAttribute("aria-expanded", "false");
    summary.focus();
  });
  document.addEventListener("click", event => {
    if (!picker.contains(event.target)) picker.open = false;
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      picker.open = false;
      summary.setAttribute("aria-expanded", "false");
      summary.focus();
    }
  });
  window.addEventListener("storage", event => {
    if (event.key === KEY) applyTheme(event.newValue || "bhutan", false);
  });
})();