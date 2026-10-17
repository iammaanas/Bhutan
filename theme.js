(() => {
  const storageKey = "bhutan-theme";
  const names = { bhutan: "Bhutan", aurora: "Aurora", forest: "Forest", rose: "Rose", ocean: "Ocean", graphite: "Graphite" };
  const chrome = { bhutan:"#0a0f14", aurora:"#031517", forest:"#041309", rose:"#160912", ocean:"#03101b", graphite:"#0c0e11" };
  const css = `
    :root{--layer:#0f1620;--card:#131c26;--card2:#111820;--pattern:rgba(255,189,89,.04);--nav-bg:rgba(10,15,20,.92);--heading-muted:#c9d1d9;--node-bg:#0e151d;--on-accent:#0a0f14;--accent-border:rgba(255,189,89,.5);--page-bg:linear-gradient(180deg,#0a0f14 0%,#0c1219 100%)}
    html{background:var(--bg)}body{background:var(--page-bg);color:var(--text)}
    body:before{background-image:repeating-linear-gradient(60deg,var(--pattern) 0,var(--pattern) 1px,transparent 1px,transparent 40px),repeating-linear-gradient(-60deg,var(--pattern) 0,var(--pattern) 1px,transparent 1px,transparent 40px)}
    nav{background:var(--nav-bg);border-bottom-color:var(--line);gap:clamp(10px,1.3vw,20px)}
    .navlinks{margin-left:auto;gap:clamp(10px,1.2vw,18px);flex:0 1 auto;min-width:0}
    .page-head h1 i,.home-hero h1 i,.dash-intro h2 i{color:var(--heading-muted)}
    .hero-card,.dash-card,.story-card,.stay-card,.food-card,.cost-group,.cost-hero>div,.gear-group,.progress-wrap,.item,.notice,.empty{background:linear-gradient(145deg,var(--card),var(--card2));border-color:var(--line);color:var(--text)}
    .story-card.is-open{background:linear-gradient(145deg,var(--card),var(--card2))}
    .hero-card-top,.hero-card-foot,.trip-ribbon{color:var(--muted)}
    .hero-card-foot,.trip-ribbon,.day,.itinerary-day,.page-head,.dash-intro,.home-fact,.route-summary,.stats{border-color:var(--line)}
    .hero-node{background:var(--node-bg);border-color:var(--line);color:var(--muted)}
    .hero-node.active{color:var(--accent);border-color:var(--accent);box-shadow:0 0 0 8px var(--accent-soft),0 0 35px var(--accent-soft)}
    .day-marker{background:var(--card);border-color:var(--line);color:var(--accent)}
    .btn.primary{background:var(--accent);color:var(--on-accent);border-color:var(--accent)}
    .btn:hover{border-color:var(--accent-border);color:var(--accent);box-shadow:0 0 25px var(--accent-soft)}
    .dash-card:hover,.story-card:hover,.story-card.is-open,.stay-card:hover,.food-card:hover{border-color:var(--accent-border);box-shadow:0 0 25px var(--accent-soft)}
    .story-card.is-open h3{color:var(--accent)}.story-type{border-color:var(--line);color:var(--muted)}
    .empty{border-color:var(--accent-border)}.gear-note{border-color:var(--accent-border);background:var(--accent-soft);color:var(--muted)}
    .gear-note strong,.notice strong{color:var(--text)}.progress-fill{background:var(--accent)}
    .map-note,footer{color:var(--muted)}
    .leaflet-popup-content-wrapper,.leaflet-popup-tip{background:var(--card);color:var(--text);border-color:var(--line)}
    .leaflet-popup-content{color:var(--text)}.gear-row input:checked{background:var(--accent);border-color:var(--accent)}.gear-row input:checked:after{color:var(--on-accent)}
    .theme-picker{position:relative;z-index:30;flex:0 0 auto}
    .theme-toggle{display:flex;align-items:center;gap:8px;border:1px solid var(--line);border-radius:99px;padding:9px 12px;background:var(--card);color:var(--text);font:500 .62rem 'DM Mono';letter-spacing:.04em;text-transform:uppercase;cursor:pointer;white-space:nowrap;transition:border-color .2s,background .2s}
    .theme-toggle:hover,.theme-toggle[aria-expanded="true"]{border-color:var(--accent-border);background:var(--card2)}
    .theme-dot{width:9px;height:9px;flex:0 0 auto;border-radius:50%;background:var(--accent);box-shadow:0 0 10px var(--accent-soft)}
    .theme-menu{position:absolute;right:0;top:calc(100% + 9px);z-index:50;width:285px;padding:8px;background:var(--layer);border:1px solid var(--line);border-radius:16px;box-shadow:0 18px 55px rgba(0,0,0,.42)}
    .theme-menu[hidden]{display:none}
    .theme-option{appearance:none;-webkit-appearance:none;width:100%;display:flex;align-items:center;gap:11px;text-align:left;background:transparent;border:0;color:var(--text);padding:10px;border-radius:11px;cursor:pointer;font:inherit;transition:background .2s}
    .theme-option:hover,.theme-option[aria-pressed="true"]{background:var(--card2)}
    .theme-colors{display:flex;gap:4px;flex:0 0 auto}.theme-colors i{width:17px;height:17px;border-radius:5px;display:block}
    .theme-option-copy{display:block;min-width:0}.theme-option b{display:block;font-size:.78rem}.theme-option small{display:block;color:var(--muted);font-size:.65rem;line-height:1.4;margin-top:3px}
    html[data-theme="bhutan"]{--bg:#0a0f14;--layer:#0f1620;--card:#131c26;--card2:#111820;--accent:#ffbd59;--accent-soft:rgba(255,189,89,.12);--text:#e6edf3;--muted:#9aa4af;--line:rgba(255,255,255,.07);--pattern:rgba(255,189,89,.04);--nav-bg:rgba(10,15,20,.92);--heading-muted:#c9d1d9;--node-bg:#0e151d;--on-accent:#0a0f14;--accent-border:rgba(255,189,89,.5);--page-bg:linear-gradient(180deg,#0a0f14 0%,#0c1219 100%)}
    html[data-theme="aurora"]{--bg:#031517;--layer:#062423;--card:#073b3a;--card2:#0a302f;--accent:#42f5d0;--accent-soft:rgba(66,245,208,.13);--text:#effffb;--muted:#8df3dc;--line:rgba(66,245,208,.16);--pattern:rgba(66,245,208,.045);--nav-bg:rgba(3,21,23,.93);--heading-muted:#b9fff2;--node-bg:#052b2a;--on-accent:#03231e;--accent-border:rgba(66,245,208,.55);--page-bg:linear-gradient(180deg,#031517 0%,#061e20 100%)}
    html[data-theme="forest"]{--bg:#041309;--layer:#071e12;--card:#0a321c;--card2:#0b2818;--accent:#31ed8c;--accent-soft:rgba(49,237,140,.13);--text:#edfff5;--muted:#8fe8bb;--line:rgba(113,255,178,.15);--pattern:rgba(113,255,178,.04);--nav-bg:rgba(4,19,9,.94);--heading-muted:#c4f4d5;--node-bg:#062012;--on-accent:#032012;--accent-border:rgba(49,237,140,.52);--page-bg:linear-gradient(180deg,#041309 0%,#091b10 100%)}
    html[data-theme="rose"]{--bg:#160912;--layer:#24101c;--card:#321326;--card2:#28101f;--accent:#ff78ad;--accent-soft:rgba(255,120,173,.13);--text:#fff0f6;--muted:#e8a8c2;--line:rgba(255,120,173,.17);--pattern:rgba(255,120,173,.04);--nav-bg:rgba(22,9,18,.94);--heading-muted:#ffd2e3;--node-bg:#210d19;--on-accent:#300e22;--accent-border:rgba(255,120,173,.52);--page-bg:linear-gradient(180deg,#160912 0%,#21101c 100%)}
    html[data-theme="ocean"]{--bg:#03101b;--layer:#061e2d;--card:#07304a;--card2:#09283d;--accent:#24d9ff;--accent-soft:rgba(36,217,255,.13);--text:#eefcff;--muted:#8fe9f8;--line:rgba(36,217,255,.17);--pattern:rgba(36,217,255,.04);--nav-bg:rgba(3,16,27,.94);--heading-muted:#bfefff;--node-bg:#041a29;--on-accent:#032033;--accent-border:rgba(36,217,255,.52);--page-bg:linear-gradient(180deg,#03101b 0%,#071d2d 100%)}
    html[data-theme="graphite"]{--bg:#0c0e11;--layer:#181b20;--card:#20242a;--card2:#1a1d22;--accent:#e1e6ed;--accent-soft:rgba(225,230,237,.10);--text:#f0f2f5;--muted:#aeb8c4;--line:rgba(225,230,237,.12);--pattern:rgba(225,230,237,.025);--nav-bg:rgba(12,14,17,.95);--heading-muted:#d0d5dc;--node-bg:#15181d;--on-accent:#111419;--accent-border:rgba(225,230,237,.45);--page-bg:linear-gradient(180deg,#0c0e11 0%,#14171c 100%)}
    @media(min-width:761px) and (max-width:1050px){nav{padding-left:3vw;padding-right:3vw;gap:11px}.navlinks{gap:10px;font-size:.58rem}.theme-toggle{padding:8px 9px}}
    @media(max-width:760px){nav{height:auto;min-height:60px;display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-rows:auto auto;align-content:center;gap:10px 12px;padding:11px 5vw}nav .brand{grid-row:1;grid-column:1;align-self:center}nav .theme-picker{grid-row:1;grid-column:2}nav .navlinks{grid-row:2;grid-column:1/-1;display:flex;gap:15px;width:100%;max-width:none;min-width:0;overflow-x:auto;white-space:nowrap;scrollbar-width:none;padding:2px 0 3px;margin:0;font-size:.58rem}nav .navlinks::-webkit-scrollbar{display:none}.theme-toggle{padding:8px 10px;font-size:.58rem}.theme-menu{right:0;width:min(285px,calc(100vw - 28px))}}
    @media(prefers-reduced-motion:reduce){.theme-toggle,.theme-option{transition:none!important}}
  `;
  const style = document.createElement("style");
  style.id = "bhutan-theme-styles";
  style.textContent = css;
  document.head.appendChild(style);

  function initialize() {
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
        try { localStorage.setItem(storageKey, theme); } catch (e) { /* storage can be disabled */ }
      }
    }
    function closeMenu() {
      menu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
    }
    let selected = "bhutan";
    try { selected = localStorage.getItem(storageKey) || "bhutan"; } catch (e) { /* default theme */ }
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
    document.addEventListener("click", event => { if (!picker.contains(event.target)) closeMenu(); });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") { closeMenu(); toggle.focus(); }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, {once:true});
  else initialize();
})();