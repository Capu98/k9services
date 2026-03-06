/**
 * patch-motion.js — K9 Services
 * 6 animazioni premium. Vanilla JS, zero dipendenze, IIFE.
 * Include i propri stili via <style> injettato nel <head>.
 */
(function () {
  'use strict';

  /* ─── SHARED TOKENS ───────────────────────────────────────────── */
  var GOLD = '#C9A84C';
  var NAVY = '#10132a';

  /* ─── UTILITY: inject CSS ─────────────────────────────────────── */
  function addStyle(css) {
    var s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }

  /* ══════════════════════════════════════════════════════════════════
     1. LOADING SCREEN
     ── Overlay navy con logo Georgia oro + barra caricamento dorata.
        Dura 1.5s poi opacity → 0, poi rimosso dal DOM.
  ══════════════════════════════════════════════════════════════════ */
  function initLoadingScreen() {
    addStyle([
      '#k9-loading {',
      '  position:fixed;inset:0;z-index:9999;',
      '  background:' + NAVY + ';',
      '  display:flex;align-items:center;justify-content:center;',
      '  transition:opacity 0.5s ease;',
      '}',
      '#k9-loading .ls-title {',
      '  font-family:Georgia,"Times New Roman",serif;',
      '  font-size:clamp(2.4rem,8vw,5rem);',
      '  font-weight:700;',
      '  color:#f4f6f9;',
      '  letter-spacing:0.2em;',
      '  text-align:center;',
      '  margin-bottom:36px;',
      '}',
      '#k9-loading .ls-title span { color:' + GOLD + '; }',
      '#k9-loading .ls-bar-wrap {',
      '  width:min(320px,80vw);height:3px;',
      '  background:rgba(255,255,255,0.07);',
      '  border-radius:2px;overflow:hidden;',
      '  margin:0 auto 18px;',
      '}',
      '#k9-loading .ls-bar {',
      '  height:100%;width:0%;',
      '  background:linear-gradient(90deg,' + GOLD + ',#e8c97a);',
      '  border-radius:2px;',
      '  box-shadow:0 0 12px rgba(201,168,76,0.5);',
      '  transition:width 1.2s cubic-bezier(0.4,0,0.2,1);',
      '}',
      '#k9-loading .ls-sub {',
      '  font-size:0.68rem;letter-spacing:0.16em;',
      '  text-transform:uppercase;',
      '  color:rgba(138,146,166,0.6);',
      '  text-align:center;',
      '}'
    ].join(''));

    var el = document.createElement('div');
    el.id = 'k9-loading';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = [
      '<div>',
      '  <div class="ls-title"><span>K9</span> SERVICES</div>',
      '  <div class="ls-bar-wrap"><div class="ls-bar" id="k9-ls-bar"></div></div>',
      '  <div class="ls-sub">Sicurezza cinofila professionale dal 1999</div>',
      '</div>'
    ].join('');

    document.body.insertBefore(el, document.body.firstChild);
    document.body.style.overflow = 'hidden';

    /* avvia la barra al prossimo frame (forza il reflow) */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        var bar = document.getElementById('k9-ls-bar');
        if (bar) bar.style.width = '100%';
      });
    });

    /* dissolvi dopo 1.5s, rimuovi dopo la transizione */
    setTimeout(function () {
      el.style.opacity = '0';
      document.body.style.overflow = '';
      setTimeout(function () {
        el.parentNode && el.parentNode.removeChild(el);
      }, 520);
    }, 1500);
  }

  /* ══════════════════════════════════════════════════════════════════
     2. TYPEWRITER HERO
     ── Scrive/cancella frasi nel .hero-eyebrow con cursore |.
        80ms/char scrittura · 50ms/char cancellazione · pausa 2s.
  ══════════════════════════════════════════════════════════════════ */
  function initTypewriter() {
    var el = document.querySelector('.hero-eyebrow');
    if (!el) return;

    var PHRASES = [
      'Sicurezza senza compromessi.',
      'Operativi dal 1999.',
      'Disponibili H24.',
      'In Italia e all\u2019estero.'
    ];
    var WRITE_MS  = 80;
    var DELETE_MS = 50;
    var PAUSE_MS  = 2000;

    addStyle([
      '.tw-cursor {',
      '  display:inline-block;',
      '  color:' + GOLD + ';',
      '  font-weight:300;',
      '  margin-left:1px;',
      '  animation:tw-blink 0.75s step-end infinite;',
      '}',
      '@keyframes tw-blink { 0%,100%{opacity:1} 50%{opacity:0} }'
    ].join(''));

    var cursor   = document.createElement('span');
    cursor.className = 'tw-cursor';
    cursor.textContent = '|';

    var textNode = document.createTextNode('');
    el.textContent = '';
    el.appendChild(textNode);
    el.appendChild(cursor);

    var phraseIdx = 0;
    var charIdx   = 0;
    var deleting  = false;

    function tick() {
      var phrase = PHRASES[phraseIdx];
      if (deleting) {
        charIdx--;
        textNode.data = phrase.slice(0, charIdx);
        if (charIdx === 0) {
          deleting  = false;
          phraseIdx = (phraseIdx + 1) % PHRASES.length;
          setTimeout(tick, 300);
          return;
        }
        setTimeout(tick, DELETE_MS);
      } else {
        charIdx++;
        textNode.data = phrase.slice(0, charIdx);
        if (charIdx === phrase.length) {
          setTimeout(function () { deleting = true; tick(); }, PAUSE_MS);
          return;
        }
        setTimeout(tick, WRITE_MS);
      }
    }

    tick();
  }

  /* ══════════════════════════════════════════════════════════════════
     3. SCROLL REVEAL (IntersectionObserver threshold 0.15)
     ── Classi applicate via JS: pm-fade-up / pm-slide-left /
        pm-slide-right / pm-scale. Aggiunge pm-visible quando visibile.
  ══════════════════════════════════════════════════════════════════ */
  function initScrollReveal() {
    addStyle([
      '.pm-fade-up     { opacity:0!important; transform:translateY(30px)!important; }',
      '.pm-slide-left  { opacity:0!important; transform:translateX(-40px)!important; }',
      '.pm-slide-right { opacity:0!important; transform:translateX(40px)!important; }',
      '.pm-scale       { opacity:0!important; transform:scale(0.95)!important; }',
      '.pm-visible {',
      '  opacity:1!important;',
      '  transform:none!important;',
      '  transition:',
      '    opacity  0.65s cubic-bezier(0.22,0.68,0,1.2),',
      '    transform 0.65s cubic-bezier(0.22,0.68,0,1.2);',
      '}'
    ].join(''));

    /* Fallback: se IntersectionObserver non è disponibile mostra tutto */
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll(
        '.trust-bar,.trust-item,.servizio-card,.service-card,' +
        '.perche-item,.valore-card,.numero-item,.testimonial,' +
        '.testimonianza,.faq-item,.faq'
      ).forEach(function (el) { el.classList.add('pm-visible'); });
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('pm-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

    function watch(el, cls, delayMs) {
      if (!el) return;
      el.classList.add(cls);
      if (delayMs) el.style.transitionDelay = delayMs + 'ms';
      obs.observe(el);
    }

    /* trust-bar: slide da sinistra */
    watch(document.querySelector('.trust-bar'), 'pm-slide-left');

    /* trust items: stagger fadeUp */
    document.querySelectorAll('.trust-item').forEach(function (el, i) {
      watch(el, 'pm-fade-up', i * 90);
    });

    /* chi-siamo: colonna sx slideLeft, colonna dx slideRight */
    var chiGrid = document.querySelector('.chi-grid');
    if (chiGrid) {
      var cols = chiGrid.children;
      if (cols[0]) watch(cols[0], 'pm-slide-left');
      if (cols[1]) watch(cols[1], 'pm-slide-right', 150);
    }

    /* numeri-grid: fadeUp stagger */
    document.querySelectorAll('.numero-item').forEach(function (el, i) {
      watch(el, 'pm-fade-up', i * 100);
    });

    /* valori cards: fadeUp stagger */
    document.querySelectorAll('.valore-card').forEach(function (el, i) {
      watch(el, 'pm-fade-up', i * 120);
    });

    /* servizio-card / .service-card: fadeUp stagger 80ms */
    document.querySelectorAll('.servizio-card, .service-card').forEach(function (el, i) {
      watch(el, 'pm-fade-up', i * 80);
    });

    /* come-funziona steps: L/R alternati */
    document.querySelectorAll(
      '.come-funziona .step, .step, [data-step]'
    ).forEach(function (el, i) {
      watch(el, i % 2 === 0 ? 'pm-slide-left' : 'pm-slide-right', i * 100);
    });

    /* perche items: scale + opacity */
    document.querySelectorAll('.perche-item').forEach(function (el, i) {
      watch(el, 'pm-scale', i * 100);
    });

    /* testimonianze: fadeUp stagger */
    document.querySelectorAll('.testimonial, .testimonianza').forEach(function (el, i) {
      watch(el, 'pm-fade-up', i * 120);
    });

    /* FAQ: slide da destra */
    document.querySelectorAll('.faq-item, .faq').forEach(function (el, i) {
      watch(el, 'pm-slide-right', i * 80);
    });

    /* form contatti */
    var form = document.querySelector('form, .contact-form');
    if (form) watch(form, 'pm-fade-up');
  }

  /* ══════════════════════════════════════════════════════════════════
     4. COUNTER ANIMATI
     ── Target: [data-target] (nuovo) o [data-count] (HTML esistente).
        Trigger: IntersectionObserver su #chi-siamo.
        Easing: easeOutQuad · durata 2000ms · legge data-suffix.
  ══════════════════════════════════════════════════════════════════ */
  function initCounters() {
    var counters = document.querySelectorAll('[data-target], [data-count]');
    if (!counters.length) return;

    function easeOutQuad(t) { return t * (2 - t); }

    function animate(el) {
      var raw    = el.dataset.target || el.dataset.count;
      var target = parseInt(raw, 10);
      var suffix = el.dataset.suffix || '';
      if (isNaN(target)) return;

      var dur     = 2000;
      var startTs = null;

      (function step(ts) {
        if (!startTs) startTs = ts;
        var prog = Math.min((ts - startTs) / dur, 1);
        var val  = Math.round(easeOutQuad(prog) * target);
        el.textContent = (target >= 1000 ? '+' + val.toLocaleString('it-IT') : val) + suffix;
        if (prog < 1) requestAnimationFrame(step);
      })(performance.now());
    }

    if (!('IntersectionObserver' in window)) {
      counters.forEach(animate);
      return;
    }

    var fired   = false;
    var anchor  = document.querySelector('#chi-siamo, .numeri-grid') || counters[0];
    var obs = new IntersectionObserver(function (entries) {
      if (!fired && entries.some(function (e) { return e.isIntersecting; })) {
        fired = true;
        counters.forEach(animate);
        obs.disconnect();
      }
    }, { threshold: 0.4 });

    obs.observe(anchor);
  }

  /* ══════════════════════════════════════════════════════════════════
     5. NAV SCROLL
     ── Aggiunge .nav--scrolled dopo 80px di scroll (navy 0.98 +
        box-shadow gold). Transizione 0.3s.
  ══════════════════════════════════════════════════════════════════ */
  function initNavScroll() {
    var nav = document.getElementById('mainNav') ||
              document.querySelector('nav.nav, nav');
    if (!nav) return;

    addStyle([
      '.nav--scrolled {',
      '  background:rgba(16,19,42,0.98)!important;',
      '  box-shadow:',
      '    0 4px 32px rgba(0,0,0,0.55),',
      '    0 0 0 1px rgba(201,168,76,0.18)!important;',
      '  transition:background 0.3s ease, box-shadow 0.3s ease;',
      '}'
    ].join(''));

    window.addEventListener('scroll', function () {
      nav.classList[window.scrollY > 80 ? 'add' : 'remove']('nav--scrolled');
    }, { passive: true });
  }

  /* ══════════════════════════════════════════════════════════════════
     6. BUTTON RIPPLE
     ── Su .btn-primary e .btn-ghost: span circolare gold che si
        espande e svanisce al click (esclude link a tel/mailto).
  ══════════════════════════════════════════════════════════════════ */
  function initRipple() {
    addStyle([
      '.btn-primary, .btn-ghost { position:relative!important; overflow:hidden!important; }',
      '.btn-ripple {',
      '  position:absolute;',
      '  border-radius:50%;',
      '  background:rgba(201,168,76,0.32);',
      '  transform:scale(0);',
      '  pointer-events:none;',
      '  animation:k9-ripple 0.55s ease-out forwards;',
      '}',
      '@keyframes k9-ripple {',
      '  to { transform:scale(4); opacity:0; }',
      '}'
    ].join(''));

    document.querySelectorAll('.btn-primary, .btn-ghost').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var r    = btn.getBoundingClientRect();
        var size = Math.max(r.width, r.height);
        var x    = e.clientX - r.left  - size / 2;
        var y    = e.clientY - r.top   - size / 2;
        var rip  = document.createElement('span');
        rip.className = 'btn-ripple';
        rip.style.cssText = 'width:' + size + 'px;height:' + size + 'px;' +
                            'left:' + x + 'px;top:' + y + 'px;';
        btn.appendChild(rip);
        setTimeout(function () { rip.parentNode && rip.parentNode.removeChild(rip); }, 600);
      });
    });
  }

  /* ══════════════════════════════════════════════════════════════════
     BOOTSTRAP
  ══════════════════════════════════════════════════════════════════ */
  function init() {
    initLoadingScreen();   /* ➊ istantaneo — inietta overlay subito      */
    initScrollReveal();    /* ➋ prepara classi CSS sui target             */
    initCounters();        /* ➌ aggancia observer ai contatori            */
    initNavScroll();       /* ➍ aggancia scroll listener al nav           */
    initRipple();          /* ➎ aggancia click listener ai bottoni        */
    setTimeout(initTypewriter, 1650); /* ➏ inizia dopo loading screen    */
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
