(function () {
  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  const navLinks = Array.from(document.querySelectorAll('a[href^="#"]'));
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const mobileCallCta = document.querySelector(".mobile-call-cta");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  const setMobileCtaState = () => {
    if (!mobileCallCta) return;
    const contact = document.querySelector("#contact");
    const reviews = document.querySelector("#reviews");
    const contactTop = contact ? contact.getBoundingClientRect().top : Number.POSITIVE_INFINITY;
    const reviewsTop = reviews ? reviews.getBoundingClientRect().top : Number.POSITIVE_INFINITY;
    const beforeReviews = reviewsTop > window.innerHeight - 120;
    const beforeContact = contactTop > window.innerHeight - 120;
    mobileCallCta.classList.toggle("is-visible", window.scrollY > 520 && beforeReviews && beforeContact);
  };

  const closeNav = () => {
    if (!header || !navToggle) return;
    header.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Άνοιγμα μενού");
  };

  const openNav = () => {
    if (!header || !navToggle) return;
    header.classList.add("is-open");
    document.body.classList.add("nav-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Κλείσιμο μενού");
  };

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      closeNav();
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
      history.pushState(null, "", targetId);
    });
  });

  const navSectionLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
  const setActiveLink = (id) => {
    navSectionLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible && visible.target.id !== "hero") {
          setActiveLink(visible.target.id);
        }
      },
      {
        rootMargin: "-32% 0px -55% 0px",
        threshold: [0.15, 0.3, 0.6]
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
  const galleryItems = Array.from(document.querySelectorAll("[data-category]"));
  const galleryStatus = document.querySelector("[data-gallery-status]");

  const galleryLabels = {
    foods: "οι φωτογραφίες φαγητών",
    space: "οι φωτογραφίες χώρου"
  };

  const setGalleryFilter = (filter) => {
    filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === filter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    galleryItems.forEach((item) => {
      item.hidden = item.dataset.category !== filter;
    });

    if (galleryStatus) {
      galleryStatus.textContent = `Εμφανίζονται ${galleryLabels[filter] || "οι φωτογραφίες"}.`;
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setGalleryFilter(button.dataset.filter);
    });
  });

  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxImage = document.querySelector("[data-lightbox-image]");
  const lightboxCaption = document.querySelector("[data-lightbox-caption]");
  const lightboxClose = document.querySelector("[data-lightbox-close]");
  let lastFocusedElement = null;

  const getFocusableElements = () => {
    if (!lightbox) return [];
    return Array.from(
      lightbox.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])')
    ).filter((element) => element.offsetParent !== null);
  };

  const openLightbox = (trigger) => {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;

    const image = trigger.querySelector("img");
    lastFocusedElement = document.activeElement;
    lightboxImage.src = trigger.dataset.full || image?.src || "";
    lightboxImage.alt = image?.alt || "";
    lightboxCaption.textContent = trigger.dataset.caption || image?.alt || "";
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");

    if (lightboxClose) {
      lightboxClose.focus();
    }
  };

  const closeLightbox = () => {
    if (!lightbox || !lightboxImage) return;

    lightbox.hidden = true;
    lightboxImage.removeAttribute("src");
    document.body.classList.remove("lightbox-open");

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  };

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (!item.hidden) {
        openLightbox(item);
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNav();

      if (lightbox && !lightbox.hidden) {
        closeLightbox();
      }
    }

    if (event.key === "Tab" && lightbox && !lightbox.hidden) {
      const focusable = getFocusableElements();
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  window.addEventListener("scroll", () => {
    setHeaderState();
    setMobileCtaState();
  }, { passive: true });
  window.addEventListener("resize", setMobileCtaState);
  window.addEventListener("hashchange", setMobileCtaState);
  setHeaderState();
  setMobileCtaState();
  window.setTimeout(setMobileCtaState, 120);
  setGalleryFilter("foods");
})();
