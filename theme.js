(()=>{
"use strict";

const KEY = "bhutan-theme";
const THEMES = {
  bhutan: { name: "Bhutan", chrome: "#101915" },
  aurora: { name: "Aurora", chrome: "#031517" },
  forest: { name: "Forest", chrome: "#041309" },
  rose: { name: "Rose", chrome: "#160912" },
  ocean: { name: "Ocean", chrome: "#03101b" },
  graphite: { name: "Graphite", chrome: "#0c0e11" }
};

const navHTML = \`
<nav class="site-nav" aria-label="Primary navigation">
  <a class="brand" href="index.html" aria-label="Bhutan Field Journal home">
    <strong>BHUTAN</strong>
    <span>FIELD JOURNAL <i>/ 26–27</i></span>
  </a>

  <div id="primary-navigation" class="navlinks" aria-label="Site sections">
    <a href="index.html">Overview</a>
    <details class="nav-group">
      <summary>Journey <span aria-hidden="true">⌄</span></summary>
      <div class="nav-menu">
        <a href="itinerary.html">Itinerary<small>Day by day</small></a>
        <a href="route.html">Route &amp; map<small>Places and road links</small></a>
      </div>
    </details>
    <details class="nav-group">
      <summary>Essentials <span aria-hidden="true">⌄</span></summary>
      <div class="nav-menu">
        <a href="budget.html">Budget<small>Known costs</small></a>
        <a href="stays.html">Stays<small>Where we sleep</small></a>
        <a href="permits.html">Entry<small>Border notes</small></a>
        <a href="packing.html">Packing<small>What to carry</small></a>
        <a href="food.html">Food<small>Things to taste</small></a>
      </div>
    </details>
    <details class="nav-group">
      <summary>Fieldwork <span aria-hidden="true">⌄</span></summary>
      <div class="nav-menu">
        <a href="gear.html">Gear desk<small>Kit and backups</small></a>
        <a href="film.html">The film<small>Shots and reels</small></a>
        <a href="journal.html">Trip journal<small>Notes and memories</small></a>
      </div>
    </details>
  </div>

  <div class="nav-actions">
    <details id="themePicker" class="theme-picker">
      <summary id="themeToggle" class="theme-toggle" aria-label="Choose colour theme" title="Choose colour theme" aria-expanded="false" aria-controls="themeMenu">
        <span class="theme-dot" aria-hidden="true"></span>
        <span id="themeLabel" class="nav-sr-only">Bhutan</span>
      </summary>
      <div id="themeMenu" class="theme-menu">
        <button class="theme-option" type="button" data-theme="bhutan" aria-pressed="true"><span class="theme-colors"><i style="background:#101915"></i><i style="background:#18231f"></i><i style="background:#d9b579"></i><i style="background:#d7d0c2"></i></span><span class="theme-option-copy"><b>Bhutan</b><small>Field green · warm parchment</small></span></button>
        <button class="theme-option" type="button" data-theme="aurora" aria-pressed="false"><span class="theme-colors"><i style="background:#031517"></i><i style="background:#073b3a"></i><i style="background:#42f5d0"></i><i style="background:#78ffe2"></i></span><span class="theme-option-copy"><b>Aurora</b><small>Electric mint · luminous cyan</small></span></button>
        <button class="theme-option" type="button" data-theme="forest" aria-pressed="false"><span class="theme-colors"><i style="background:#041309"></i><i style="background:#0a321c"></i><i style="background:#31ed8c"></i><i style="background:#71ffb2"></i></span><span class="theme-option-copy"><b>Forest</b><small>Emerald · vivid jade</small></span></button>
        <button class="theme-option" type="button" data-theme="rose" aria-pressed="false"><span class="theme-colors"><i style="background:#160912"></i><i style="background:#321326"></i><i style="background:#ff78ad"></i><i style="background:#ff9fc5"></i></span><span class="theme-option-copy"><b>Rose</b><small>Deep plum · vibrant rose</small></span></button>
        <button class="theme-option" type="button" data-theme="ocean" aria-pressed="false"><span class="theme-colors"><i style="background:#03101b"></i><i style="background:#07304a"></i><i style="background:#24d9ff"></i><i style="background:#5fe8ff"></i></span><span class="theme-option-copy"><b>Ocean</b><small>Deep blue · electric aqua</small></span></button>
        <button class="theme-option" type="button" data-theme="graphite" aria-pressed="false"><span class="theme-colors"><i style="background:#0c0e11"></i><i style="background:#20242a"></i><i style="background:#e1e6ed"></i><i style="background:#aeb8c4"></i></span><span class="theme-option-copy"><b>Graphite</b><small>Silver monochrome · crisp</small></span></button>
      </div>
    </details>
    <button id="navMenuToggle" class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="primary-navigation">
      <span class="menu-toggle-bars" aria-hidden="true"><i></i><i></i><i></i></span>
    </button>
  </div>
</nav>\`;

const host = document.querySelector("nav");
if (host) host.outerHTML = navHTML;

const siteNav = document.querySelector(".site-nav");
const navLinks = document.getElementById("primary-navigation");
const navToggle = document.getElementById("navMenuToggle");
const picker = document.getElementById("themePicker");
const themeSummary = document.getElementById("themeToggle");
const themeLabel = document.getElementById("themeLabel");
const root = document.documentElement;
const navGroups = [...document.querySelectorAll(".nav-group")];

function syncNavHeight() {
  if (siteNav) {
    root.style.setProperty("--field-nav-height", Math.ceil(siteNav.getBoundingClientRect().height) + "px");
  }
}

function setMobileMenu(open) {
  if (!navLinks || !navToggle) return;
  navLinks.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  syncNavHeight();
}

syncNavHeight();
window.addEventListener("resize", () => {
  syncNavHeight();
  if (window.innerWidth > 900) setMobileMenu(false);
}, { passive: true });

if (typeof ResizeObserver !== "undefined" && siteNav) {
  new ResizeObserver(syncNavHeight).observe(siteNav);
}

navToggle?.addEventListener("click", () => {
  setMobileMenu(!navLinks?.classList.contains("is-open"));
});

navGroups.forEach(group => {
  group.addEventListener("toggle", () => {
    const summary = group.querySelector("summary");
    if (summary) summary.setAttribute("aria-expanded", String(group.open));
    if (!group.open) return;
    navGroups.forEach(other => {
      if (other !== group) {
        other.open = false;
        other.querySelector("summary")?.setAttribute("aria-expanded", "false");
      }
    });
    if (picker) picker.open = false;
  });
});

const here = location.pathname.endsWith("/")
  ? "index.html"
  : location.pathname.split("/").pop() || "index.html";

navLinks?.querySelectorAll("a[href]").forEach(link => {
  if (link.getAttribute("href") === here) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
    link.closest(".nav-group")?.querySelector("summary")?.classList.add("active");
  }
  link.addEventListener("click", () => setMobileMenu(false));
});

function applyTheme(value, save = true) {
  const key = Object.prototype.hasOwnProperty.call(THEMES, value) ? value : "bhutan";
  root.dataset.theme = key;
  if (themeLabel) themeLabel.textContent = THEMES[key].name;
  document.querySelectorAll(".theme-option[data-theme]").forEach(option => {
    option.setAttribute("aria-pressed", String(option.dataset.theme === key));
  });
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = THEMES[key].chrome;
  if (save) {
    try { localStorage.setItem(KEY, key); } catch { /* Theme remains active for this page. */ }
  }
}

try {
  applyTheme(localStorage.getItem(KEY) || "bhutan", false);
} catch {
  applyTheme("bhutan", false);
}

if (picker && themeSummary) {
  picker.addEventListener("toggle", () => {
    themeSummary.setAttribute("aria-expanded", String(picker.open));
    if (picker.open) {
      navGroups.forEach(group => {
        group.open = false;
        group.querySelector("summary")?.setAttribute("aria-expanded", "false");
      });
    }
  });

  picker.addEventListener("click", event => {
    const option = event.target.closest(".theme-option[data-theme]");
    if (!option) return;
    event.preventDefault();
    applyTheme(option.dataset.theme);
    picker.open = false;
    themeSummary.setAttribute("aria-expanded", "false");
    themeSummary.focus();
  });
}

document.addEventListener("click", event => {
  if (siteNav && !siteNav.contains(event.target)) {
    navGroups.forEach(group => {
      group.open = false;
      group.querySelector("summary")?.setAttribute("aria-expanded", "false");
    });
    if (picker) picker.open = false;
    setMobileMenu(false);
  }
});

document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  const menuWasOpen = Boolean(navLinks?.classList.contains("is-open"));
  navGroups.forEach(group => {
    group.open = false;
    group.querySelector("summary")?.setAttribute("aria-expanded", "false");
  });
  if (picker) picker.open = false;
  if (menuWasOpen) {
    setMobileMenu(false);
    navToggle?.focus();
  }
});

window.addEventListener("storage", event => {
  if (event.key === KEY) applyTheme(event.newValue || "bhutan", false);
});

document.querySelectorAll("[data-home-mode]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-home-mode]").forEach(item => {
      item.setAttribute("aria-selected", String(item === button));
    });
    document.querySelectorAll("[data-mode-panel]").forEach(panel => {
      panel.hidden = panel.dataset.modePanel !== button.dataset.homeMode;
    });
  });
});
})();