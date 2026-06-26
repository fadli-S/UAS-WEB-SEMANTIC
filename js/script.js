/* ============================================================
   SEMANTIC WEB PROFILE — script.js
   ============================================================ */

'use strict';

/* ── 1. Hamburger nav ── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
  navToggle.textContent = isOpen ? '✕' : '☰';
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.textContent = '☰';
  });
});

/* ── 2. JSON-LD toggle ── */
document.querySelectorAll('.jsonld-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const target   = document.getElementById(btn.dataset.target);
    const isHidden = target.hasAttribute('hidden');

    if (isHidden) {
      target.removeAttribute('hidden');
      btn.textContent = 'Sembunyikan JSON-LD ↑';
    } else {
      target.setAttribute('hidden', '');
      btn.textContent = 'Lihat JSON-LD ↓';
    }
  });
});

/* ── 3. Active nav link saat scroll ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = '';
        a.style.background = '';
        if (a.getAttribute('href') === '#' + entry.target.id) {
          a.style.color = 'var(--ink)';
          a.style.background = 'var(--surface)';
        }
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach(s => observer.observe(s));

/* ── 4. Animasi node SVG (pulse on hover) ── */
document.querySelectorAll('.node').forEach(node => {
  const circle = node.querySelector('circle');
  if (!circle) return;
  const originalR = parseFloat(circle.getAttribute('r'));

  node.addEventListener('mouseenter', () => {
    circle.style.transition = 'r .2s ease, filter .2s ease';
    circle.setAttribute('r', originalR + 3);
    circle.style.filter = 'brightness(1.25)';
  });
  node.addEventListener('mouseleave', () => {
    circle.setAttribute('r', originalR);
    circle.style.filter = '';
  });
});

/* ── 5. Smooth reveal pakai IntersectionObserver ── */
const revealStyle = document.createElement('style');
revealStyle.textContent = `
  .reveal {
    opacity: 0;
    transform: translateY(18px);
    transition: opacity .5s ease, transform .5s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: none;
  }
`;
document.head.appendChild(revealStyle);

const revealEls = document.querySelectorAll('.card, .table-wrap');
revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 60}ms`;
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

/* ── 6. Copy ke clipboard untuk JSON-LD block ── */
document.querySelectorAll('.jsonld-block').forEach(block => {
  block.style.position = 'relative';
  block.style.cursor   = 'pointer';
  block.title          = 'Klik untuk copy';

  block.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(block.textContent);
      const old = block.style.outline;
      block.style.outline = '1.5px solid var(--org)';
      setTimeout(() => { block.style.outline = old; }, 800);
    } catch (_) {}
  });
});
