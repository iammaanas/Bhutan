(() => {
"use strict";

const STORAGE_KEY = "bhutan-theme";
const root = document.documentElement;
const navHost = document.querySelector("nav");

const navHTML = [
  '<nav class="site-nav" aria-label="Primary navigation">',
  '<a class="brand" href="index.html" aria-label="Bhutan Field Journal home"><strong>BHUTAN</strong><span>FIELD JOURNAL <i>/ 26–27</i></span></a>',
  '<div id="primary-navigation" class="navlinks" aria-label="Site sections">',
  '<a href="index.html">Overview</a>',
  '<details class="nav-group"><summary aria-expanded="false">Journey <span aria-hidden="true">⌄</span></summary><div class="nav-menu"><a href="itinerary.html">Itinerary<small>Day by day</small></a><a href="route.html">Route &amp; map<small>Places and road links</small></a></div></details>',
  '<details class="nav-group"><summary aria-expanded="false">Essentials <span aria-hidden="true">⌄</span></summary><div class="nav-menu"><a href="budget.html">Budget<small>Known costs</small></a><a href="stays.html">Stays<small>Where we sleep</small></a><a href="permits.html">Entry<small>Border notes</small></a><a href="packing.html">Packing<small>What to carry</small></a><a href="food.html">Food<small>Things to taste</small></a></div></details>',
  '<details class="nav-group"><summary aria-expanded="false">Fieldwork <span aria-hidden="true">⌄</span></summary><div class="nav-menu"><a href="gear.html">Gear desk<small>Kit and backups</small></a><a href="film.html">The film<small>Shots and reels</small></a><a href="journal.html">Trip journal<small>Notes and memories</small></a></div></details>',
  '</div><div class="nav-actions">',
  '<a class="journal-shortcut" href="journal.html">Journal ↗</a>',
  '<button id="themeToggle" class="theme-toggle" type="button" aria-label="Switch to light mode" aria-pressed="false" title="Switch to light mode"><span id="themeToggleIcon" aria-hidden="true">☼</span></button>',
  '<button id="navMenuToggle" class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="primary-navigation"><span class="menu-toggle-bars" aria-hidden="true"><i></i><i></i><i></i></span></button>',
  '</div></nav>'
].join("");

if (navHost) navHost.outerHTML = navHTML;

const siteNav = document.querySelector(".site-nav");
const navLinks = document.getElementById("primary-navigation");
const navToggle = document.getElementById("navMenuToggle");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeToggleIcon");
const journalShortcut = document.querySelector(".journal-shortcut");
const navGroups = siteNav ? Array.from(siteNav.querySelectorAll(".nav-group")) : [];
let currentMode = "dark";
let lastOpenTrigger = null;

function syncNavHeight() {
  if (siteNav) {
    root.style.setProperty("--field-nav-height", Math.ceil(siteNav.getBoundingClientRect().height) + "px");
  }
}

function closeDropdowns() {
  navGroups.forEach(group => {
    group.open = false;
    const summary = group.querySelector("summary");
    if (summary) summary.setAttribute("aria-expanded", "false");
  });
}

function setMobileMenu(open) {
  if (!navLinks || !navToggle) return;
  navLinks.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  syncNavHeight();
}

function applyMode(value, save = true) {
  currentMode = value === "light" ? "light" : "dark";
  root.dataset.theme = "bhutan-" + currentMode;
  if (themeToggle) {
    const nextLabel = currentMode === "dark" ? "Switch to light mode" : "Switch to dark mode";
    themeToggle.setAttribute("aria-label", nextLabel);
    themeToggle.setAttribute("title", nextLabel);
    themeToggle.setAttribute("aria-pressed", String(currentMode === "light"));
  }
  if (themeIcon) themeIcon.textContent = currentMode === "dark" ? "☼" : "☾";
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = currentMode === "dark" ? "#101915" : "#f3efe5";
  if (save) {
    try { localStorage.setItem(STORAGE_KEY, currentMode); } catch { /* Keep this mode for the current page. */ }
  }
}

navGroups.forEach(group => {
  const summary = group.querySelector("summary");
  if (!summary) return;
  summary.setAttribute("aria-expanded", "false");
  summary.addEventListener("click", event => {
    event.preventDefault();
    const shouldOpen = !group.open;
    closeDropdowns();
    if (shouldOpen) {
      group.open = true;
      summary.setAttribute("aria-expanded", "true");
      lastOpenTrigger = summary;
    }
    syncNavHeight();
  });
});

navToggle?.addEventListener("click", () => {
  const shouldOpen = !navLinks?.classList.contains("is-open");
  closeDropdowns();
  setMobileMenu(shouldOpen);
});

themeToggle?.addEventListener("click", () => {
  closeDropdowns();
  applyMode(currentMode === "dark" ? "light" : "dark");
});

siteNav?.addEventListener("click", event => {
  if (event.target.closest(".nav-group > summary") ||
      event.target.closest("#themeToggle") ||
      event.target.closest("#navMenuToggle")) return;
  closeDropdowns();
  if (event.target.closest("a[href]")) setMobileMenu(false);
});

document.addEventListener("click", event => {
  if (!siteNav || siteNav.contains(event.target)) return;
  closeDropdowns();
  setMobileMenu(false);
});

const here = location.pathname.split("/").filter(Boolean).pop() || "index.html";
siteNav?.querySelectorAll("a[href]").forEach(link => {
  if (link.getAttribute("href") === here) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
    link.closest(".nav-group")?.querySelector("summary")?.classList.add("active");
  }
});
if (journalShortcut && here === "journal.html") {
  journalShortcut.classList.add("active");
  journalShortcut.setAttribute("aria-current", "page");
}

try {
  const savedMode = localStorage.getItem(STORAGE_KEY);
  applyMode(savedMode === "light" ? "light" : "dark", false);
} catch {
  applyMode("dark", false);
}

window.addEventListener("storage", event => {
  if (event.key === STORAGE_KEY) applyMode(event.newValue === "light" ? "light" : "dark", false);
});

window.addEventListener("resize", () => {
  syncNavHeight();
  if (window.innerWidth > 900) setMobileMenu(false);
}, { passive: true });

if (typeof ResizeObserver !== "undefined" && siteNav) {
  new ResizeObserver(syncNavHeight).observe(siteNav);
}
syncNavHeight();

document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  const mobileWasOpen = Boolean(navLinks?.classList.contains("is-open"));
  closeDropdowns();
  if (mobileWasOpen) {
    setMobileMenu(false);
    navToggle?.focus();
  } else {
    lastOpenTrigger?.focus();
  }
});

document.querySelectorAll(".mode-workspace").forEach(workspace => {
  const tabs = Array.from(workspace.querySelectorAll("[data-home-mode]"));
  const panels = Array.from(workspace.querySelectorAll("[data-mode-panel]"));

  function activateMode(value) {
    tabs.forEach(tab => {
      const active = tab.dataset.homeMode === value;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    panels.forEach(panel => {
      const active = panel.dataset.modePanel === value;
      panel.hidden = !active;
      panel.setAttribute("aria-hidden", String(!active));
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => activateMode(tab.dataset.homeMode));
    tab.addEventListener("keydown", event => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const index = tabs.indexOf(tab);
      const offset = event.key === "ArrowRight" ? 1 : tabs.length - 1;
      const next = tabs[(index + offset) % tabs.length];
      activateMode(next.dataset.homeMode);
      next.focus();
    });
  });

  const selected = tabs.find(tab => tab.getAttribute("aria-selected") === "true") || tabs[0];
  if (selected) activateMode(selected.dataset.homeMode);
});
})();