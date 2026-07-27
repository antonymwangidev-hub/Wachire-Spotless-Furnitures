/**
 * Wachira Spotless Furniture — main.js
 * Vanilla JS only. Organized by feature so each block can be lifted
 * into its own hook/component during a future React migration.
 */
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "254711302853";
  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  document.addEventListener("DOMContentLoaded", function () {
    initIcons();
    initWhatsappLinks();
    initMobileNav();
    initStickyNav();
    initActiveNavLink();
    initScrollReveal();
    initCounters();
    initFaqAccordion();
    initGalleryFilter();
    initFooterYear();
  });

  /* ------------------------------------------------------------------ *
   * Lucide icons
   * ------------------------------------------------------------------ */
  function initIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  /* ------------------------------------------------------------------ *
   * WhatsApp link builder
   * Every CTA carries data-whatsapp-msg; we turn it into a real
   * wa.me link here so the message text only lives in one place
   * (this file) and the phone number is never duplicated across markup.
   * ------------------------------------------------------------------ */
  function initWhatsappLinks() {
    var links = document.querySelectorAll("[data-whatsapp-msg]");
    links.forEach(function (link) {
      var message = link.getAttribute("data-whatsapp-msg") || "";
      var url =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(message);
      link.setAttribute("href", url);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });
  }

  /* ------------------------------------------------------------------ *
   * Mobile nav toggle
   * ------------------------------------------------------------------ */
  function initMobileNav() {
    var toggle = document.getElementById("nav-toggle");
    var menu = document.getElementById("mobile-menu");
    var openIcon = document.getElementById("nav-toggle-open-icon");
    var closeIcon = document.getElementById("nav-toggle-close-icon");
    if (!toggle || !menu) return;

    function setOpen(isOpen) {
      menu.classList.toggle("hidden", !isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      if (openIcon) openIcon.classList.toggle("hidden", isOpen);
      if (closeIcon) closeIcon.classList.toggle("hidden", !isOpen);
    }

    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      setOpen(!isOpen);
    });

    // Close menu after tapping a link, so the anchor scroll isn't hidden
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * Sticky nav — shadow + solid background once the page has scrolled
   * ------------------------------------------------------------------ */
  function initStickyNav() {
    var nav = document.getElementById("site-nav");
    if (!nav) return;

    function onScroll() {
      nav.classList.toggle("is-scrolled", window.scrollY > 12);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ------------------------------------------------------------------ *
   * Active nav link highlighting based on section in view
   * ------------------------------------------------------------------ */
  function initActiveNavLink() {
    var sections = document.querySelectorAll("main section[id]");
    var navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
    if (!sections.length || !navLinks.length || !("IntersectionObserver" in window)) {
      return;
    }

    var linkById = {};
    navLinks.forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      linkById[id] = linkById[id] || [];
      linkById[id].push(link);
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (link) {
            link.classList.remove("is-active");
          });
          var active = linkById[entry.target.id];
          if (active) {
            active.forEach(function (link) {
              link.classList.add("is-active");
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ------------------------------------------------------------------ *
   * Scroll reveal — fade + rise elements into view once, on first sight
   * ------------------------------------------------------------------ */
  function initScrollReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (item) {
        item.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry, index) {
          if (entry.isIntersecting) {
            // Small stagger for items revealing together (e.g. a grid row)
            var delay = Math.min(index * 60, 240);
            setTimeout(function () {
              entry.target.classList.add("is-visible");
            }, delay);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  /* ------------------------------------------------------------------ *
   * Animated stat counters (15+ / 1000+ / 5000+)
   * ------------------------------------------------------------------ */
  function initCounters() {
    var counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;

    function animate(el) {
      var target = parseInt(el.getAttribute("data-target"), 10) || 0;
      if (prefersReducedMotion) {
        el.textContent = target.toLocaleString();
        return;
      }
      var duration = 1600;
      var start = null;

      function step(timestamp) {
        if (start === null) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        // Ease-out for a natural deceleration into the final number
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString();
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          el.textContent = target.toLocaleString();
        }
      }

      window.requestAnimationFrame(step);
    }

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animate);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animate(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  /* ------------------------------------------------------------------ *
   * FAQ accordion — one panel open at a time, fully keyboard accessible
   * ------------------------------------------------------------------ */
  function initFaqAccordion() {
    var triggers = document.querySelectorAll(".faq-trigger");
    if (!triggers.length) return;

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var panelId = trigger.getAttribute("aria-controls");
        var panel = document.getElementById(panelId);
        var isOpen = trigger.getAttribute("aria-expanded") === "true";

        // Close any other open panel for a single-open accordion
        triggers.forEach(function (otherTrigger) {
          if (otherTrigger === trigger) return;
          otherTrigger.setAttribute("aria-expanded", "false");
          var otherPanel = document.getElementById(
            otherTrigger.getAttribute("aria-controls")
          );
          if (otherPanel) otherPanel.setAttribute("data-open", "false");
        });

        trigger.setAttribute("aria-expanded", String(!isOpen));
        if (panel) panel.setAttribute("data-open", String(!isOpen));
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * Gallery category filter (All / Homes / Hotels / Offices)
   * ------------------------------------------------------------------ */
  function initGalleryFilter() {
    var buttons = document.querySelectorAll("[data-gallery-filter]");
    var items = document.querySelectorAll(".gallery-item");
    if (!buttons.length || !items.length) return;

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        var filter = button.getAttribute("data-gallery-filter");

        buttons.forEach(function (btn) {
          btn.classList.remove("is-active");
          btn.setAttribute("aria-selected", "false");
        });
        button.classList.add("is-active");
        button.setAttribute("aria-selected", "true");

        items.forEach(function (item) {
          var matches =
            filter === "all" || item.getAttribute("data-category") === filter;
          item.hidden = !matches;
        });
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * Footer year
   * ------------------------------------------------------------------ */
  function initFooterYear() {
    var el = document.getElementById("footer-year");
    if (el) el.textContent = String(new Date().getFullYear());
  }
})();
