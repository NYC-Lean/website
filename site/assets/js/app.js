/* ============================================================
   NYC Lean: events rendering + page motion.
   - renders upcoming events from assets/events.js into the home
     page (next 3) and the calendar page (all upcoming)
   - hero masthead reveal on load (home only)
   - one gentle grouped fade per content section on scroll
   Degrades gracefully: no JS or reduced-motion → everything visible.
   ============================================================ */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduce = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var WD = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var MO = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Render events first, independent of GSAP, so they always show.
  renderEvents();

  if (!window.gsap || reduce) {
    root.classList.remove("js");   // reveal everything, no motion
    return;
  }

  var gsap = window.gsap;
  if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);
  var ST = window.ScrollTrigger;
  var hasScroll = !!ST;

  init();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { if (ST) ST.refresh(); });
  }

  function init() {
    /* ---- masthead entrance (home page only) ---- */
    if (document.querySelector(".hero")) {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".kicker", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1.2 })
        .fromTo(".hero-wordmark", { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 1.5 }, 0.2)
        .fromTo(".masthead-rule", { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "power3.inOut" }, 0.7)
        .fromTo(".hero-sub", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1.1 }, 1.0);
    }

    /* ---- one gentle, grouped fade per content section ---- */
    var secs = Array.prototype.slice.call(document.querySelectorAll("main > section:not(.hero)"));
    secs.forEach(function (sec) {
      var items = sec.querySelectorAll("[data-anim]");
      if (!items.length) return;
      var a = { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.04 };
      if (hasScroll) a.scrollTrigger = { trigger: sec, start: "top 78%", once: true };
      gsap.fromTo(items, { opacity: 0, y: 16 }, a);
    });

    if (hasScroll) ST.refresh();
  }

  /* ---------- events ---------- */
  function parseDate(s) {
    var p = String(s || "").split("-");
    if (p.length !== 3) return null;
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    return isNaN(d.getTime()) ? null : d;
  }
  function startOfToday() {
    var n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate());
  }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function talkHTML(t) {
    var speaker = t.speakerUrl
      ? '<a href="' + esc(t.speakerUrl) + '" target="_blank" rel="noopener">' + esc(t.speaker) + '</a>'
      : esc(t.speaker);
    var title = t.titleUrl
      ? '<a href="' + esc(t.titleUrl) + '">' + esc(t.title) + '</a>'
      : esc(t.title);
    var abstractMore = t.abstractMore
      ? '<details class="talk-more"><summary>' +
          '<span class="talk-more-open">Show more</span>' +
          '<span class="talk-more-close">Show less</span>' +
        '</summary><p>' + esc(t.abstractMore) + '</p></details>'
      : '';
    return '<div class="talk">' +
      (t.title ? '<p class="talk-title">' + title + '</p>' : '') +
      (t.speaker ? '<p class="talk-speaker">' + speaker + '</p>' : '') +
      (t.abstract ? '<p class="talk-abstract">' + esc(t.abstract) + '</p>' : '') + abstractMore +
    '</div>';
  }
  function rowHTML(e, isNext, compact) {
    var d = e._d;
    var dnum = d ? d.getDate() : "";
    var mon = d ? MO[d.getMonth()] : "";
    var yr = d ? d.getFullYear() : "";
    var wd = d ? WD[d.getDay()] : "";
    var loc = e.location
      ? (e.locationUrl
          ? '<a class="ev-loc" href="' + esc(e.locationUrl) + '" target="_blank" rel="noopener">' + esc(e.location) + '</a>'
          : esc(e.location))
      : '';
    var meta = [[wd, e.time].filter(Boolean).map(esc).join(" · "), loc]
      .filter(Boolean).join(" · ");
    return '<div class="row event" data-anim>' +
      '<div class="event-date"><span class="ev-dm">' + dnum + ' ' + esc(mon) + '</span>' +
        (yr ? '<span class="ev-y">' + yr + '</span>' : '') + '</div>' +
      '<div class="row-body">' +
        '<span class="ev-meta">' + meta + '</span>' +
        '<h3>' + esc(e.title) + '</h3>' +
        (!compact && e.talk ? talkHTML(e.talk) :
          (!compact && (e.descriptionHtml || e.description) ? '<p>' + (e.descriptionHtml || esc(e.description)) + '</p>' : '')) +
        (!compact && e.rsvpUrl ? '<div class="ev-rsvp"><a class="btn btn-primary" href="' + esc(e.rsvpUrl) + '" target="_blank" rel="noopener">RSVP</a></div>' : '') +
      '</div></div>';
  }
  function joinRows(list) {
    return list.join('<span class="rule"></span>');
  }
  function empty(msg) { return '<p class="cal-empty" data-anim>' + esc(msg) + '</p>'; }

  function renderEvents() {
    var home = document.getElementById("home-events");
    var calUp = document.getElementById("calendar-upcoming");
    var calPast = document.getElementById("calendar-past");
    var pastGroup = document.getElementById("past-group");
    if (!home && !calUp && !calPast) return;

    var today = startOfToday();
    var all = (window.NYC_LEAN_EVENTS || [])
      .map(function (e) { return Object.assign({}, e, { _d: parseDate(e.date) }); })
      .filter(function (e) { return e._d; });
    var upcoming = all.filter(function (e) { return e._d >= today; })
      .sort(function (a, b) { return a._d - b._d; });
    var past = all.filter(function (e) { return e._d < today; })
      .sort(function (a, b) { return b._d - a._d; });   // most recent first

    if (home) {
      home.innerHTML = upcoming.length
        ? joinRows(upcoming.slice(0, 3).map(function (e, i) { return rowHTML(e, i === 0, false); }))
        : empty("No meetups on the calendar right now.");
    }
    if (calUp) {
      calUp.innerHTML = upcoming.length
        ? joinRows(upcoming.map(function (e, i) { return rowHTML(e, i === 0, false); }))
        : empty("Nothing scheduled yet.");
    }
    if (calPast) {
      var STEP = 10;
      var shown = 0;
      calPast.innerHTML = "";
      var moreBtn = null;
      if (past.length > STEP) {
        moreBtn = document.createElement("button");
        moreBtn.type = "button";
        moreBtn.className = "btn btn-ghost show-more";
        calPast.appendChild(moreBtn);
        moreBtn.addEventListener("click", showBatch);
      }
      showBatch();   // first 10

      function showBatch() {
        var prev = calPast.querySelectorAll(".row.event").length;
        var batch = past.slice(shown, shown + STEP);
        var leading = shown === 0 ? "" : '<span class="rule"></span>';
        var markup = leading + joinRows(batch.map(function (e) { return rowHTML(e, false, false); }));
        var firstBatch = shown === 0;
        shown += batch.length;
        if (moreBtn) moreBtn.insertAdjacentHTML("beforebegin", markup);
        else calPast.insertAdjacentHTML("beforeend", markup);
        if (!firstBatch && window.gsap) {
          var rows = Array.prototype.slice.call(calPast.querySelectorAll(".row.event")).slice(prev);
          window.gsap.fromTo(rows, { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.03, ease: "power2.out" });
        }
        var remaining = past.length - shown;
        if (moreBtn) {
          if (remaining > 0) moreBtn.textContent = "Show " + Math.min(STEP, remaining) + " more";
          else moreBtn.remove();
        }
      }
    }
    if (pastGroup) {
      if (past.length) pastGroup.removeAttribute("hidden");
      else pastGroup.setAttribute("hidden", "");
    }
  }
})();

/* fixed navbar: gains a paper bar + ink underline once scrolled */
(function () {
  var nav = document.getElementById("nav");
  if (!nav) return;
  function onScroll() {
    if (window.scrollY > 24) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

/* mobile nav: hamburger toggles the menu panel (independent of motion) */
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("site-nav");
  if (!toggle || !menu) return;

  // mark the page nav-ready so the CSS collapses the nav into a hamburger
  document.documentElement.classList.add("nav-ready");

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    menu.classList.toggle("open", open);
    document.body.classList.toggle("nav-open", open);   // lock scroll behind overlay
  }

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });
  // a chosen link closes the menu
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });
  // Escape closes
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });
  // tapping outside the header closes
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav-wrap")) setOpen(false);
  });
})();
