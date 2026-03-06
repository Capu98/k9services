/**
 * patch-3d.js — K9 Services | Effetti 3D & Visual Premium
 * Palette: navy #1a1f3a | gold #C9A84C | anthracite #1e1e1e
 *
 * Includere alla fine del <body>, dopo tutti gli altri script:
 *   <script src="patch-3d.js"></script>
 *
 * Effetti:
 *   1. Radar militare (Canvas 2D, hero right)
 *   2. Badge H24/365 esagonale flottante (hero bottom-left)
 *   3. Servizio card 3D hover (perspective + glow gold)
 *   4. Scan line divisori tra sezioni
 *   5. Cursor glow ambient (aureola dorata)
 */

(function () {
  'use strict';

  /* ─── Costanti palette ─── */
  var GOLD   = '#C9A84C';
  var GOLD_A = function (a) { return 'rgba(201,168,76,' + a + ')'; };

  /* ─── Utility: inietta <style> una volta sola ─── */
  function injectStyle(id, css) {
    if (document.getElementById(id)) return;
    var s     = document.createElement('style');
    s.id      = id;
    s.textContent = css;
    document.head.appendChild(s);
  }

  /* ─── Boot: esegui al DOMContentLoaded o subito se già pronto ─── */
  function boot() {
    initRadar();
    initBadgeH24();
    initCardTilt();
    initScanDividers();
    initCursorGlow();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  /* ══════════════════════════════════════════════════════════════
     1. RADAR MILITARE — Canvas 2D, hero lato destro
     Cerchi concentrici gold/navy, sweep line rotante,
     dot segnale che appaiono al passaggio della linea.
  ══════════════════════════════════════════════════════════════ */
  function initRadar() {
    var hero = document.getElementById('home');
    if (!hero) return;

    var SIZE = 270;
    var canvas = document.createElement('canvas');
    canvas.id = 'radarCanvas';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.width  = SIZE;
    canvas.height = SIZE;

    /* Posizione: lato destro della hero, centrato verticalmente */
    Object.assign(canvas.style, {
      position:      'absolute',
      right:         'clamp(20px, 6vw, 80px)',
      top:           '50%',
      transform:     'translateY(-45%)',
      width:         SIZE + 'px',
      height:        SIZE + 'px',
      pointerEvents: 'none',
      zIndex:        '4',
      opacity:       '0.72'
    });

    hero.appendChild(canvas);

    /* Nascondi su mobile/tablet (<= 900px) */
    function checkVis() {
      canvas.style.display = window.innerWidth < 900 ? 'none' : 'block';
    }
    checkVis();
    window.addEventListener('resize', checkVis);

    var ctx   = canvas.getContext('2d');
    var cx    = SIZE / 2;
    var cy    = SIZE / 2;
    var R     = cx - 12;       /* raggio massimo */
    var RINGS = 4;
    var SPEED = 0.016;         /* radianti/frame */
    var TRAIL = Math.PI * 0.55; /* ampiezza scia sweep */
    var angle = 0;

    /* --- Blips: punti segnale posizionati casualmente --- */
    var blips = [];
    for (var i = 0; i < 7; i++) blips.push(newBlip());

    function newBlip() {
      var r = R * (0.18 + Math.random() * 0.72);
      var a = Math.random() * Math.PI * 2;
      return {
        x:    cx + Math.cos(a) * r,
        y:    cy + Math.sin(a) * r,
        a:    a,
        size: 1.5 + Math.random() * 2
      };
    }

    /* Rimpiazza un blip casuale ogni ~2.2s */
    setInterval(function () {
      blips[Math.floor(Math.random() * blips.length)] = newBlip();
    }, 2200);

    /* --- Loop di rendering --- */
    function frame() {
      ctx.clearRect(0, 0, SIZE, SIZE);

      /* 1. Clip: disegna tutto dentro il cerchio */
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R + 1, 0, Math.PI * 2);
      ctx.clip();

      /* Sfondo radar: gradiente radiale navy */
      var bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
      bg.addColorStop(0, 'rgba(26,31,58,0.60)');
      bg.addColorStop(1, 'rgba(6,8,18,0.90)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, SIZE, SIZE);

      /* Anelli concentrici */
      for (var r = 1; r <= RINGS; r++) {
        ctx.beginPath();
        ctx.arc(cx, cy, R * r / RINGS, 0, Math.PI * 2);
        ctx.strokeStyle = GOLD_A(r === RINGS ? 0.24 : 0.10);
        ctx.lineWidth   = r === RINGS ? 1.4 : 0.6;
        ctx.stroke();
      }

      /* Cross-hair tratteggiato */
      ctx.save();
      ctx.strokeStyle = GOLD_A(0.12);
      ctx.lineWidth   = 0.6;
      ctx.setLineDash([3, 6]);
      [0, Math.PI / 2, Math.PI, Math.PI * 1.5].forEach(function (a) {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
        ctx.stroke();
      });
      ctx.setLineDash([]);
      ctx.restore();

      /* Scia sweep (settore riempito) */
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, R, -TRAIL, 0, false);
      ctx.closePath();
      var scia = ctx.createRadialGradient(0, 0, 0, 0, 0, R);
      scia.addColorStop(0,   GOLD_A(0.20));
      scia.addColorStop(0.5, GOLD_A(0.07));
      scia.addColorStop(1,   GOLD_A(0.01));
      ctx.fillStyle = scia;
      ctx.fill();
      ctx.restore();

      /* Linea sweep */
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(R, 0);
      var lg = ctx.createLinearGradient(0, 0, R, 0);
      lg.addColorStop(0, GOLD_A(0.95));
      lg.addColorStop(1, GOLD_A(0.12));
      ctx.strokeStyle = lg;
      ctx.lineWidth   = 1.8;
      ctx.shadowColor = GOLD;
      ctx.shadowBlur  = 8;
      ctx.stroke();
      ctx.restore();

      ctx.restore(); /* fine clip */

      /* Anello esterno (sopra il clip) */
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = GOLD_A(0.40);
      ctx.lineWidth   = 1.4;
      ctx.stroke();

      /* Dot centrale */
      ctx.beginPath();
      ctx.arc(cx, cy, 2.8, 0, Math.PI * 2);
      ctx.fillStyle   = GOLD;
      ctx.shadowColor = GOLD;
      ctx.shadowBlur  = 12;
      ctx.fill();
      ctx.shadowBlur  = 0;

      /* Blips: si rivelano al passaggio della sweep, poi svaniscono */
      blips.forEach(function (b) {
        var diff = ((angle - b.a) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        var fade = Math.max(0, 1 - diff / (Math.PI * 1.7));
        if (fade < 0.01) return;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size + fade * 2, 0, Math.PI * 2);
        ctx.fillStyle   = GOLD_A(0.88 * fade);
        ctx.shadowColor = GOLD;
        ctx.shadowBlur  = 10 * fade;
        ctx.fill();
        ctx.shadowBlur  = 0;
      });

      /* Label */
      ctx.font         = '8px "Courier New", Courier, monospace';
      ctx.fillStyle    = GOLD_A(0.32);
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText('K9 · TACTICAL RADAR', cx, SIZE - 4);

      angle = (angle + SPEED) % (Math.PI * 2);
      requestAnimationFrame(frame);
    }

    frame();
  }

  /* ══════════════════════════════════════════════════════════════
     2. BADGE H24/365 — scudo esagonale flottante, hero bottom-left
     Forma esagonale SVG dorata, contenuto H24 · 365 giorni,
     animazione float + leggera rotazione.
  ══════════════════════════════════════════════════════════════ */
  function initBadgeH24() {
    var hero = document.getElementById('home');
    if (!hero) return;

    injectStyle('k9BadgeStyle', [
      '#k9BadgeH24 {',
      '  position: absolute;',
      '  bottom: clamp(24px, 4vw, 56px);',
      '  left: clamp(20px, 5vw, 64px);',
      '  z-index: 5;',
      '  pointer-events: none;',
      '  animation: k9BadgeFloat 5s ease-in-out infinite;',
      '}',

      '@keyframes k9BadgeFloat {',
      '  0%,100% { transform: translateY(0px)  rotate(0deg); }',
      '  30%     { transform: translateY(-7px) rotate(3deg); }',
      '  70%     { transform: translateY(5px)  rotate(-2deg); }',
      '}',

      '.k9badge-wrap {',
      '  position: relative;',
      '  width: 86px; height: 98px;',
      '  display: flex; flex-direction: column;',
      '  align-items: center; justify-content: center;',
      '  gap: 2px;',
      '}',

      '.k9badge-svg {',
      '  position: absolute; inset: 0;',
      '  width: 100%; height: 100%;',
      '}',

      '.k9badge-svg polygon {',
      '  fill: rgba(16,19,42,0.88);',
      '  stroke: ' + GOLD + ';',
      '  stroke-width: 1.8;',
      '  filter: drop-shadow(0 0 10px rgba(201,168,76,0.45));',
      '}',

      '.k9badge-body {',
      '  position: relative; z-index: 2;',
      '  text-align: center;',
      '}',

      '.k9badge-pulse {',
      '  width: 5px; height: 5px;',
      '  border-radius: 50%;',
      '  background: ' + GOLD + ';',
      '  box-shadow: 0 0 8px rgba(201,168,76,0.9);',
      '  margin: 0 auto 3px;',
      '  animation: k9BadgePulse 2s ease-in-out infinite;',
      '}',

      '@keyframes k9BadgePulse {',
      '  0%,100% { box-shadow: 0 0 4px rgba(201,168,76,0.5); transform: scale(1); }',
      '  50%     { box-shadow: 0 0 14px rgba(201,168,76,0.9); transform: scale(1.35); }',
      '}',

      '.k9badge-main {',
      '  font-family: Georgia, serif;',
      '  font-size: 1.35rem;',
      '  font-weight: 700;',
      '  color: ' + GOLD + ';',
      '  letter-spacing: 0.03em;',
      '  line-height: 1;',
      '  text-shadow: 0 0 18px rgba(201,168,76,0.55);',
      '}',

      '.k9badge-sub {',
      '  font-size: 0.52rem;',
      '  font-weight: 700;',
      '  letter-spacing: 0.14em;',
      '  text-transform: uppercase;',
      '  color: rgba(201,168,76,0.6);',
      '  margin-top: 2px;',
      '}',

      /* Nascosto sotto 640px */
      '@media (max-width: 640px) { #k9BadgeH24 { display: none; } }'
    ].join('\n'));

    /* Punti esagono pointy-top: cx=43, cy=49, r=39 */
    var pts = hexPoints(43, 49, 39);

    var el = document.createElement('div');
    el.id  = 'k9BadgeH24';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = [
      '<div class="k9badge-wrap">',
      '  <svg class="k9badge-svg" viewBox="0 0 86 98" xmlns="http://www.w3.org/2000/svg">',
      '    <polygon points="' + pts + '"/>',
      '  </svg>',
      '  <div class="k9badge-body">',
      '    <div class="k9badge-pulse"></div>',
      '    <div class="k9badge-main">H24</div>',
      '    <div class="k9badge-sub">365 giorni</div>',
      '  </div>',
      '</div>'
    ].join('');

    hero.appendChild(el);
  }

  /* Calcola i 6 vertici di un esagono pointy-top */
  function hexPoints(cx, cy, r) {
    var pts = [];
    for (var i = 0; i < 6; i++) {
      var a = Math.PI / 180 * (60 * i - 30);
      pts.push(
        (cx + r * Math.cos(a)).toFixed(1) + ',' +
        (cy + r * Math.sin(a)).toFixed(1)
      );
    }
    return pts.join(' ');
  }

  /* ══════════════════════════════════════════════════════════════
     3. CARD SERVIZI — 3D HOVER
     perspective(1000px) rotateX/Y ±5° + box-shadow glow gold.
     Disattivato su dispositivi touch.
  ══════════════════════════════════════════════════════════════ */
  function initCardTilt() {
    if (window.matchMedia('(hover: none)').matches) return;

    injectStyle('k9CardTiltStyle', [
      '.servizio-card {',
      '  transition: transform 0.12s ease, box-shadow 0.3s ease !important;',
      '  will-change: transform;',
      '}'
    ].join('\n'));

    document.querySelectorAll('.servizio-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r  = card.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
        var dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
        /* Intensità glow: maggiore quando cursore è agli angoli */
        var glowStr = (0.12 + (Math.abs(dx) + Math.abs(dy)) * 0.06).toFixed(3);

        card.style.transform = [
          'perspective(1000px)',
          'rotateX(' + (-dy * 5).toFixed(2) + 'deg)',
          'rotateY(' + ( dx * 5).toFixed(2) + 'deg)',
          'translateY(-6px)',
          'scale(1.025)'
        ].join(' ');

        card.style.boxShadow = [
          '0 22px 56px rgba(0,0,0,0.55)',
          '0 0 32px ' + GOLD_A(glowStr)
        ].join(', ');
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    });
  }

  /* ══════════════════════════════════════════════════════════════
     4. SCAN LINE DIVISORI tra sezioni
     Linea gold animata (scan sinistra→destra, 4s, delay sfalsato)
     inserita come <div class="k9-scan-div"> prima di ogni sezione.
  ══════════════════════════════════════════════════════════════ */
  function initScanDividers() {
    injectStyle('k9ScanDivStyle', [
      '.k9-scan-div {',
      '  position: relative;',
      '  height: 2px;',
      '  background: rgba(201,168,76,0.07);',
      '  overflow: hidden;',
      '  margin: 0;',
      '}',

      '.k9-scan-div .k9-scan-line {',
      '  position: absolute;',
      '  top: 0; bottom: 0;',
      '  left: -35%;',
      '  width: 35%;',
      '  background: linear-gradient(',
      '    90deg,',
      '    transparent,',
      '    ' + GOLD_A(0.40) + ' 25%,',
      '    ' + GOLD + ' 50%,',
      '    ' + GOLD_A(0.40) + ' 75%,',
      '    transparent',
      '  );',
      '  animation: k9ScanMove 4s linear infinite;',
      '}',

      '@keyframes k9ScanMove {',
      '  0%   { left: -35%; }',
      '  100% { left: 135%; }',
      '}'
    ].join('\n'));

    /* Inserisci un divisore prima di ognuna di queste sezioni */
    ['#chi-siamo', '#servizi', '#perche', '#contatti'].forEach(function (sel, idx) {
      var target = document.querySelector(sel);
      if (!target) return;

      var div  = document.createElement('div');
      div.className = 'k9-scan-div';
      div.setAttribute('aria-hidden', 'true');

      /* Span che porta l'animazione (con delay sfalsato) */
      var line = document.createElement('span');
      line.className = 'k9-scan-line';
      line.style.animationDelay = (idx * 1.1).toFixed(1) + 's';

      div.appendChild(line);
      target.parentNode.insertBefore(div, target);
    });
  }

  /* ══════════════════════════════════════════════════════════════
     5. CURSOR GLOW — aureola ambient gold che segue il mouse
     22px default, espande a 50px su elementi interattivi.
     Usa lerp per movimento fluido. Disattivato su touch/mobile.
  ══════════════════════════════════════════════════════════════ */
  function initCursorGlow() {
    if (window.matchMedia('(hover: none)').matches) return;

    injectStyle('k9CursorGlowStyle', [
      '#k9CursorGlow {',
      '  position: fixed;',
      '  width: 22px; height: 22px;',
      '  border-radius: 50%;',
      '  background: radial-gradient(',
      '    circle,',
      '    rgba(201,168,76,0.38) 0%,',
      '    rgba(201,168,76,0.10) 55%,',
      '    transparent 100%',
      '  );',
      '  pointer-events: none;',
      '  z-index: 9995;',
      '  transform: translate(-50%,-50%);',
      '  transition: width 0.22s ease, height 0.22s ease, opacity 0.3s ease;',
      '  mix-blend-mode: screen;',
      '  opacity: 0;',
      '}',

      '#k9CursorGlow.k9glow-visible  { opacity: 1; }',
      '#k9CursorGlow.k9glow-expanded { width: 50px; height: 50px; }',

      '@media (max-width: 768px) { #k9CursorGlow { display: none !important; } }'
    ].join('\n'));

    var el = document.createElement('div');
    el.id  = 'k9CursorGlow';
    document.body.appendChild(el);

    var tx = 0, ty = 0;
    var cx = 0, cy = 0;

    document.addEventListener('mousemove', function (e) {
      tx = e.clientX;
      ty = e.clientY;
      el.classList.add('k9glow-visible');
    });

    document.addEventListener('mouseleave', function () {
      el.classList.remove('k9glow-visible');
    });

    /* Expand su elementi interattivi */
    var triggers = document.querySelectorAll(
      'a, button, .servizio-card, .valore-card, .perche-item, .contact-item'
    );
    triggers.forEach(function (node) {
      node.addEventListener('mouseenter', function () { el.classList.add('k9glow-expanded'); });
      node.addEventListener('mouseleave', function () { el.classList.remove('k9glow-expanded'); });
    });

    /* Loop lerp per movimento fluido */
    function tick() {
      cx += (tx - cx) * 0.14;
      cy += (ty - cy) * 0.14;
      el.style.left = cx + 'px';
      el.style.top  = cy + 'px';
      requestAnimationFrame(tick);
    }
    tick();
  }

})();
