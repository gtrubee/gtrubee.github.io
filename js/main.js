/* ─────────────────────────────────────────────
   Portfolio — Main JavaScript
   Scroll animations, nav behavior, mobile menu
   ───────────────────────────────────────────── */

(() => {
  'use strict';

  // ── DOM references ──
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const heroSection = document.getElementById('hero');

  // ── Scroll-aware navigation ──
  const handleNavScroll = () => {
    const scrolled = window.scrollY > 60;
    nav.classList.toggle('nav--scrolled', scrolled);
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // initial check

  // ── Mobile menu toggle ──
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('nav__links--open');
    navToggle.classList.toggle('nav__toggle--open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('nav__links--open');
      navToggle.classList.remove('nav__toggle--open');
      document.body.style.overflow = '';
    });
  });

  // ── Scroll reveal animations ──
  const revealElements = () => {
    // Elements to animate
    const selectors = [
      '.section__heading',
      '.section__subheading',
      '.about__text',
      '.about__portrait',
      '.project-card',
      '.skill-card',
      '.contact-card',
      '.about__detail',
    ];

    const elements = document.querySelectorAll(selectors.join(','));

    elements.forEach((el) => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
      }
    });

    // Stagger project cards and skill cards
    document.querySelectorAll('.project-card').forEach((card, i) => {
      card.classList.add(`reveal--delay-${(i % 4) + 1}`);
    });

    document.querySelectorAll('.skill-card').forEach((card, i) => {
      card.classList.add(`reveal--delay-${(i % 4) + 1}`);
    });

    document.querySelectorAll('.contact-card').forEach((card, i) => {
      card.classList.add(`reveal--delay-${(i % 4) + 1}`);
    });

    // Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));
  };

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

  // ── Hero parallax ──
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    window.addEventListener(
      'scroll',
      () => {
        const scrollY = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        if (scrollY < heroHeight) {
          const progress = scrollY / heroHeight;
          heroBg.style.transform = `scale(${1 + progress * 0.1}) translateY(${scrollY * 0.3}px)`;
          heroBg.style.opacity = 1 - progress * 0.5;
        }
      },
      { passive: true }
    );
  }

  // ── Active nav link tracking ──
  const sections = document.querySelectorAll('.section');
  const navLinksAll = document.querySelectorAll('.nav__links a');

  const highlightNav = () => {
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - nav.offsetHeight - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinksAll.forEach((link) => {
      link.style.opacity = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.opacity = '1';
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // ── Typing effect for hero subtitle (subtle) ──
  const tagline = document.querySelector('.hero__tagline');
  if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.visibility = 'visible';
    let i = 0;
    const type = () => {
      if (i < text.length) {
        tagline.textContent += text.charAt(i);
        i++;
        setTimeout(type, 35);
      }
    };
    // Start typing after a brief delay
    setTimeout(type, 800);
  }

  // ── Init ──
  window.addEventListener('DOMContentLoaded', revealElements);
  // Also run if DOM already loaded
  if (document.readyState !== 'loading') {
    revealElements();
  }
})();
