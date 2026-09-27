(function () {
  "use strict";

  /*
    This file no longer stores any content (no project lists, skills, education
    data, etc). Everything you see on the page lives directly in index.html now.
    This script only handles behaviour: menu, scroll, typing effect, the
    writeups filter, auto-disabling placeholder links, and the contact form.
    You should not need to edit anything below to add content to the site.
  */

  function isPlaceholderHref(href) {
    return !!href && href.indexOf("[ADD_") === 0;
  }

  // ---------------- EmailJS setup (one-time technical config, not content) ----------------
  // Fill these in from your EmailJS account (emailjs.com -> Email Services / Email
  // Templates / Account -> API Keys). The public key is meant to be visible
  // client-side — that's how EmailJS is designed to work.
  var EMAILJS_CONFIG = {
    serviceId: "[ADD_EMAILJS_SERVICE_ID]",
    templateId: "[ADD_EMAILJS_TEMPLATE_ID]",
    publicKey: "[ADD_EMAILJS_PUBLIC_KEY]"
  };
  var emailjsConfigured =
    !isPlaceholderHref(EMAILJS_CONFIG.serviceId) &&
    !isPlaceholderHref(EMAILJS_CONFIG.templateId) &&
    !isPlaceholderHref(EMAILJS_CONFIG.publicKey);
  if (emailjsConfigured && window.emailjs) {
    window.emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
  }

  var ownerEmail = document.body.getAttribute("data-owner-email") || "";

  /* ---------------- Auto-disable any link still using an [ADD_...] placeholder ---------------- */
  (function disablePlaceholderLinks() {
    document.querySelectorAll("a[href]").forEach(function (a) {
      if (!isPlaceholderHref(a.getAttribute("href"))) return;
      a.classList.add("disabled");
      a.setAttribute("aria-disabled", "true");
      a.removeAttribute("href");
      a.removeAttribute("target");
      if (!a.title) a.title = "Link coming soon";
    });
  })();

  /* ---------------- Mobile menu + smooth scroll ---------------- */
  var menuToggle = document.getElementById("menuToggle");
  var mobileNav = document.getElementById("mobileNav");
  var menuIconOpen = document.getElementById("menuIconOpen");
  var menuIconClose = document.getElementById("menuIconClose");

  function closeMobileMenu() {
    mobileNav.classList.remove("open");
    menuIconOpen.style.display = "";
    menuIconClose.style.display = "none";
    menuToggle.setAttribute("aria-expanded", "false");
  }

  menuToggle.addEventListener("click", function () {
    var open = mobileNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    menuIconOpen.style.display = open ? "none" : "";
    menuIconClose.style.display = open ? "" : "none";
  });

  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-nav]");
    if (!a) return;
    e.preventDefault();
    closeMobileMenu();
    var el = document.querySelector(a.getAttribute("href"));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* ---------------- Header shrink + scroll spy ---------------- */
  var header = document.getElementById("siteHeader");
  function onScrollHeader() {
    if (window.scrollY > 24) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  var navAnchors = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));
  var sectionIds = navAnchors
    .map(function (a) { return a.getAttribute("href"); })
    .filter(function (h, i, arr) { return h && h.charAt(0) === "#" && arr.indexOf(h) === i; })
    .map(function (h) { return h.slice(1); });

  function scrollSpy() {
    var offset = 120, current = sectionIds[0];
    for (var i = 0; i < sectionIds.length; i++) {
      var el = document.getElementById(sectionIds[i]);
      if (!el) continue;
      if (el.getBoundingClientRect().top - offset <= 0) current = sectionIds[i];
    }
    navAnchors.forEach(function (a) {
      var href = a.getAttribute("href") || "";
      a.classList.toggle("active", href === "#" + current);
    });
  }
  scrollSpy();
  window.addEventListener("scroll", scrollSpy, { passive: true });

  /* ---------------- Hero typing effect (words come from data-roles in HTML) ---------------- */
  (function typeLoop() {
    var roleEl = document.querySelector(".hero-role");
    var target = document.getElementById("typedRole");
    if (!roleEl || !target) return;
    var roles = (roleEl.getAttribute("data-roles") || "").split("|").map(function (s) { return s.trim(); }).filter(Boolean);
    if (!roles.length) return;

    var roleIndex = 0, text = "", deleting = false;
    function step() {
      var full = roles[roleIndex];
      var speed = deleting ? 35 : 55;
      if (!deleting) {
        if (text.length < full.length) { text = full.slice(0, text.length + 1); }
        else { setTimeout(function () { deleting = true; step(); }, 1400); target.textContent = text; return; }
      } else {
        if (text.length > 0) { text = text.slice(0, text.length - 1); }
        else { deleting = false; roleIndex = (roleIndex + 1) % roles.length; }
      }
      target.textContent = text;
      setTimeout(step, speed);
    }
    step();
  })();

  /* ---------------- Writeups filter (reads data-filter / data-category straight from HTML) ---------------- */
  (function initWriteupFilter() {
    var filterRow = document.querySelector("#writeups .filter-row");
    var cards = document.querySelectorAll("#writeups .writeup-card");
    if (!filterRow) return;

    filterRow.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      filterRow.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var filter = btn.getAttribute("data-filter") || "All";
      cards.forEach(function (card) {
        var show = filter === "All" || card.getAttribute("data-category") === filter;
        card.style.display = show ? "" : "none";
      });
    });
  })();

  /* ---------------- Footer year ---------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Contact form ---------------- */
  (function initForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;
    var fields = {
      name: document.getElementById("c-name"),
      email: document.getElementById("c-email"),
      subject: document.getElementById("c-subject"),
      message: document.getElementById("c-message")
    };
    var errs = {
      name: document.getElementById("err-name"),
      email: document.getElementById("err-email"),
      subject: document.getElementById("err-subject"),
      message: document.getElementById("err-message")
    };
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var status = document.getElementById("formStatus");
    var submitBtn = document.getElementById("submitBtn");
    var submitLabel = document.getElementById("submitLabel");

    function validate(v) {
      var next = {};
      if (!v.name.trim()) next.name = "Name is required.";
      else if (v.name.trim().length > 100) next.name = "Keep it under 100 characters.";

      if (!v.email.trim()) next.email = "Email is required.";
      else if (!EMAIL_RE.test(v.email.trim())) next.email = "Enter a valid email address.";

      if (!v.subject.trim()) next.subject = "Subject is required.";
      else if (v.subject.trim().length > 150) next.subject = "Keep it under 150 characters.";

      if (!v.message.trim()) next.message = "Message is required.";
      else if (v.message.trim().length < 10) next.message = "Say a little more (10+ characters).";
      else if (v.message.trim().length > 2000) next.message = "Keep it under 2000 characters.";

      return next;
    }

    function clearErrors() {
      Object.keys(errs).forEach(function (k) { errs[k].style.display = "none"; errs[k].textContent = ""; });
    }

    function setStatus(kind, text) {
      status.className = "form-status " + kind;
      status.style.display = "block";
      status.textContent = text;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var sanitized = {
        name: fields.name.value.trim().slice(0, 100),
        email: fields.email.value.trim().slice(0, 254),
        subject: fields.subject.value.trim().slice(0, 150),
        message: fields.message.value.trim().slice(0, 2000)
      };
      clearErrors();
      status.style.display = "none";
      var validationErrors = validate(sanitized);
      var hasErrors = Object.keys(validationErrors).length > 0;
      Object.keys(validationErrors).forEach(function (k) {
        errs[k].textContent = validationErrors[k];
        errs[k].style.display = "block";
      });
      if (hasErrors) return;

      if (!emailjsConfigured || !window.emailjs) {
        setStatus("warn", "Contact form isn't connected yet — email " + ownerEmail + " directly for now.");
        return;
      }

      submitBtn.disabled = true;
      submitLabel.textContent = "Sending…";

      window.emailjs
        .send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
          from_name: sanitized.name,
          from_email: sanitized.email,
          subject: sanitized.subject,
          message: sanitized.message
        })
        .then(function () {
          setStatus("ok", "Message sent — thanks, I'll reply soon.");
          form.reset();
        })
        .catch(function () {
          setStatus("err", "Something went wrong sending that. Try again or email " + ownerEmail + ".");
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitLabel.textContent = "Send Message";
        });
    });
  })();

})();
