(() => {
  "use strict";
  const storageKey = "bhutan-theme";
  const names = { bhutan: "Bhutan", aurora: "Aurora", forest: "Forest", rose: "Rose", ocean: "Ocean", graphite: "Graphite" };
  const chrome = { bhutan:"#0a0f14", aurora:"#031517", forest:"#041309", rose:"#160912", ocean:"#03101b", graphite:"#0c0e11" };

  function initThemePicker() {
    const picker = document.getElementById("themePicker");
    const toggle = document.getElementById("themeToggle");
    const menu = document.getElementById("themeMenu");
    const label = document.getElementById("themeLabel");
    if (!picker || !toggle || !menu || !label) return;

    function applyTheme(theme, persist = true) {
      if (!Object.prototype.hasOwnProperty.call(names, theme)) theme = "bhutan";
      document.documentElement.dataset.theme = theme;
      label.textContent = names[theme];
      document.querySelectorAll(".theme-option").forEach(option => {
        option.setAttribute("aria-pressed", String(option.dataset.theme === theme));
      });
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", chrome[theme]);
      if (persist) {
        try { localStorage.setItem(storageKey, theme); } catch (error) { /* storage may be disabled */ }
      }
    }

    function closeMenu() {
      menu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
    }

    let selected = "bhutan";
    try { selected = localStorage.getItem(storageKey) || "bhutan"; } catch (error) { /* use default */ }
    applyTheme(selected, false);

    toggle.addEventListener("click", () => {
      menu.hidden = !menu.hidden;
      toggle.setAttribute("aria-expanded", String(!menu.hidden));
    });
    document.querySelectorAll(".theme-option").forEach(option => {
      option.addEventListener("click", () => {
        applyTheme(option.dataset.theme);
        closeMenu();
        toggle.focus();
      });
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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThemePicker, { once: true });
  } else {
    initThemePicker();
  }
})();