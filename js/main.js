/* =============================================
   ONCE — Our Next Chapter Emerges
   main.js
   ============================================= */

(function () {
  'use strict';

  // --- Nav: shadow on scroll ---
  const nav = document.querySelector('.nav');

  function handleNavScroll() {
    if (window.scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // --- Nav: mobile hamburger toggle ---
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileNav = document.querySelector('.nav__mobile');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);

      // Animate hamburger lines
      const lines = hamburger.querySelectorAll('span');
      if (isOpen) {
        lines[0].style.transform = 'translateY(6px) rotate(45deg)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'translateY(-6px) rotate(-45deg)';
      } else {
        lines[0].style.transform = '';
        lines[1].style.opacity = '';
        lines[2].style.transform = '';
      }
    });

    // Close on mobile link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        const lines = hamburger.querySelectorAll('span');
        lines[0].style.transform = '';
        lines[1].style.opacity = '';
        lines[2].style.transform = '';
      });
    });
  }

  // --- Active nav link on scroll (IntersectionObserver) ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a[href^="#"], .nav__mobile a[href^="#"]');

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              link.classList.toggle('active', link.getAttribute('href') === '#' + id);
            });
          }
        });
      },
      {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0,
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // --- Custom trailing cursor on hero (desktop only) ---
  // Elements are always created; CSS hides them on mobile via media query
  const heroSection = document.querySelector('.hero');

  if (heroSection) {
    const ring = document.createElement('div');
    ring.className = 'hero-cursor';
    const dot = document.createElement('div');
    dot.className = 'hero-cursor__dot';
    document.body.appendChild(ring);
    document.body.appendChild(dot);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let rafId = null;

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      rafId = requestAnimationFrame(animateRing);
    }

    heroSection.addEventListener('mouseenter', function () {
      heroSection.classList.add('hero--cursor-active');
      ring.style.opacity = '1';
      dot.style.opacity = '1';
      if (!rafId) rafId = requestAnimationFrame(animateRing);
    });

    heroSection.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    heroSection.addEventListener('mouseleave', function () {
      heroSection.classList.remove('hero--cursor-active');
      ring.style.opacity = '0';
      dot.style.opacity = '0';
      cancelAnimationFrame(rafId);
      rafId = null;
    });
  }

  // --- Contact form: inline success message ---
  const form = document.querySelector('.contact__form');
  const successMsg = document.querySelector('.form__success');

  if (form && successMsg) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const submitBtn = form.querySelector('.form__submit');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      // Simulate async send (replace with real fetch in production)
      setTimeout(function () {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        successMsg.classList.add('visible');

        setTimeout(function () {
          successMsg.classList.remove('visible');
        }, 6000);
      }, 1200);
    });
  }
})();
