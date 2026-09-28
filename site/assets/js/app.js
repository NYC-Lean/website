/* ============================================================
   NYC Lean: events rendering + page motion.
   - renders upcoming events from assets/events.js into the home
     page (next 3) and the calendar page (all upcoming)
   - draws the home masthead rule across on load (the site's only motion)
   Degrades gracefully: no JS or reduced-motion → rule shown in place.
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
  labelTalks();

  if (!window.gsap || reduce) {
    root.classList.remove("js");   // reveal everything, no motion
    return;
  }

  var gsap = window.gsap;
  init();

  function init() {
    /* ---- the only motion on the site: the masthead rule draws across once ---- */
    if (document.querySelector(".hero")) {
      gsap.fromTo(".masthead-rule", { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "power3.inOut", delay: 0.2 });
    }
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
  function linkedTitleHTML(title, url) {
    if (/^\s*tbd\s*$/i.test(title || "")) return '<span class="tbd">Title to be announced</span>';
    return url
      ? '<a href="' + esc(url) + '">' + esc(title) + '</a>'
      : esc(title);
  }
  function talkHTML(t) {
    var people = t.speakers || (t.speaker ? [{ name: t.speaker, url: t.speakerUrl }] : []);
    var names = people.map(function (p) {
      return p.url
        ? '<a href="' + esc(p.url) + '" target="_blank" rel="noopener">' + esc(p.name) + '</a>'
        : esc(p.name);
    });
    var speaker = names.length > 2
      ? names.slice(0, -1).join(', ') + ', and ' + names[names.length - 1]
      : names.join(' and ');
    var abstractMore = t.abstractMore
      ? '<details class="talk-more"><summary>' +
          '<span class="talk-more-open">Show more</span>' +
          '<span class="talk-more-close">Show less</span>' +
        '</summary><p>' + esc(t.abstractMore) + '</p></details>'
      : '';
    return '<div class="talk">' +
      (speaker ? '<p class="talk-speaker">' + speaker + '</p>' : '') +
      (t.abstract ? '<p class="talk-abstract">' + esc(t.abstract) + '</p>' : '') + abstractMore +
    '</div>';
  }
  function scheduleHTML(schedule) {
    if (!schedule || !schedule.length) return '';
    return '<ol class="event-schedule" aria-label="Event schedule">' +
      schedule.map(function (item) {
        return '<li><time>' + esc(item.time) + '</time><span>' + esc(item.label) + '</span></li>';
      }).join('') +
    '</ol>';
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
    var talks = e.talks && e.talks.length ? e.talks : null;
    var title = talks
      ? (compact ? talks.map(function (t) { return linkedTitleHTML(t.title, t.titleUrl); }).join(' &amp; ') : '')
      : e.talk && e.talk.title
        ? linkedTitleHTML(e.talk.title, e.talk.titleUrl)
        : esc(e.title);
    var body = talks
      ? '<div class="talks">' + talks.map(function (t) {
          return '<div class="talks-item">' +
            (t.title ? '<h3>' + linkedTitleHTML(t.title, t.titleUrl) + '</h3>' : '') +
            talkHTML(t) + '</div>';
        }).join('') + '</div>'
      : e.talk ? talkHTML(e.talk)
      : (e.descriptionHtml || e.description) ? '<p>' + (e.descriptionHtml || esc(e.description)) + '</p>' : '';
    return '<div class="row event" data-anim>' +
      '<div class="event-date"><span class="ev-dm">' + dnum + ' ' + esc(mon) + '</span>' +
        (yr ? '<span class="ev-y">' + yr + '</span>' : '') + '</div>' +
      '<div class="row-body">' +
        '<span class="ev-meta">' + meta + '</span>' +
        (title ? '<h3>' + title + '</h3>' : '') +
        (!compact ? body : '') +
        (!compact ? scheduleHTML(e.schedule) : '') +
        (!compact && e.rsvpUrl ? '<div class="ev-rsvp"><a class="btn btn-primary" href="' + esc(e.rsvpUrl) + '" target="_blank" rel="noopener">Register</a></div>' : '') +
      '</div></div>';
  }
  function joinRows(list) {
    return list.join('<span class="rule"></span>');
  }
  function empty(msg) { return '<p class="cal-empty" data-anim>' + esc(msg) + '</p>'; }

  /* blog: "Upcoming talk" / "Past talk" labels follow the talk date */
  function labelTalks() {
    var today = startOfToday();
    document.querySelectorAll("[data-talk-date]").forEach(function (el) {
      var d = parseDate(el.getAttribute("data-talk-date"));
      if (!d) return;
      el.innerHTML = el.innerHTML.replace(/^(Upcoming|Past) talk/, d >= today ? "Upcoming talk" : "Past talk");
    });
  }

  /* home page: long abstracts collapse behind a "Show more" toggle */
  function clampAbstracts(container) {
    container.querySelectorAll(".talk").forEach(function (talk) {
      var abs = talk.querySelector(".talk-abstract");
      if (!abs) return;
      talk.classList.add("is-clamped");
      var hasMore = talk.querySelector(".talk-more");
      if (!hasMore && abs.scrollHeight <= abs.clientHeight + 1) {
        talk.classList.remove("is-clamped");   // short enough to show whole
        return;
      }
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "talk-toggle";
      btn.textContent = "Show more";
      btn.setAttribute("aria-expanded", "false");
      btn.addEventListener("click", function () {
        var open = !talk.classList.toggle("is-clamped");
        btn.textContent = open ? "Show less" : "Show more";
        btn.setAttribute("aria-expanded", String(open));
      });
      talk.appendChild(btn);
    });
  }

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
      clampAbstracts(home);
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
        var batch = past.slice(shown, shown + STEP);
        var leading = shown === 0 ? "" : '<span class="rule"></span>';
        var markup = leading + joinRows(batch.map(function (e) { return rowHTML(e, false, false); }));
        shown += batch.length;
        if (moreBtn) moreBtn.insertAdjacentHTML("beforebegin", markup);
        else calPast.insertAdjacentHTML("beforeend", markup);
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

  var currentPath = window.location.pathname.replace(/\/$/, "") || "/";
  menu.querySelectorAll("a").forEach(function (link) {
    var path = new URL(link.href).pathname.replace(/\/$/, "") || "/";
    if (path === currentPath || (path === "/blog" && currentPath.indexOf("/blog/") === 0)) {
      link.setAttribute("aria-current", "page");
    }
  });

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
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
    if (e.key === "Tab" && toggle.getAttribute("aria-expanded") === "true") {
      var links = menu.querySelectorAll("a");
      var first = links[0];
      var last = links[links.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); toggle.focus(); }
      else if (e.shiftKey && document.activeElement === toggle) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === toggle) { e.preventDefault(); first.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); toggle.focus(); }
    }
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 640) setOpen(false);
  });
  // tapping outside the header closes
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav-wrap")) setOpen(false);
  });
})();
