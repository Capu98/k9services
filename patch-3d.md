# patch-3d.js — Documentazione Integrazione K9 Services

## Come includere

Aggiungere **una sola riga alla fine del `<body>`**, dopo tutti gli altri script:

```html
<script src="patch-3d.js"></script>
</body>
```

Nessuna dipendenza esterna. Vanilla JS puro, nessuna libreria richiesta.

---

## Effetti inclusi

### 1. Radar Militare (Canvas 2D)

**Dove appare:** hero section (`#home`), lato destro, centrato verticalmente.
**Nascosto su:** viewport ≤ 900px (mobile/tablet).
**Crea:** `<canvas id="radarCanvas">` con:
- Sfondo navy con gradiente radiale
- 4 anelli concentrici gold semitrasparenti
- Cross-hair tratteggiato
- Sweep line rotante con scia ad arco (~72° di trailing glow)
- 7 signal blip che si rivelano al passaggio della sweep e svaniscono lentamente
- Label `K9 · TACTICAL RADAR` in monospace
- Refresh random dei blip ogni 2.2s

**Selettore richiesto:** `<section id="home">` nell'HTML.

---

### 2. Badge H24/365 (esagonale flottante)

**Dove appare:** hero section (`#home`), angolo bottom-left.
**Nascosto su:** viewport ≤ 640px.
**Crea:** `<div id="k9BadgeH24">` con:
- SVG esagono pointy-top stroke gold, fill navy semitrasparente
- Drop-shadow gold
- Dot pulsante gold (keyframe `k9BadgePulse`)
- Label `H24` in Georgia serif + sottotitolo `365 giorni`
- Animazione float + leggera rotazione ±3° (keyframe `k9BadgeFloat`)

**Selettore richiesto:** `<section id="home">` nell'HTML.

---

### 3. Card Servizi — 3D Hover

**Dove agisce:** su tutti gli elementi `.servizio-card`.
**Disattivato su:** dispositivi touch (`hover: none` media query).
**Effetto:**
- `perspective(1000px) rotateX/Y(±5deg)` in base alla posizione del cursore
- `translateY(-6px) scale(1.025)` per sollevamento
- `box-shadow` con glow gold dinamico (intensità proporzionale all'angolo di tilt)
- Reset fluido a `mouseleave` con `transition: 0.12s ease`

**Selettore richiesto:** `.servizio-card` (già presente in index.html).

---

### 4. Scan Line Divisori tra sezioni

**Dove:** inserisce `<div class="k9-scan-div">` come elemento separatore **prima** di:
- `#chi-siamo`
- `#servizi`
- `#perche`
- `#contatti`

**Effetto:** linea gold luminosa (larghezza 35% del viewport) che scorre da sinistra a destra ogni 4s, con delay sfalsato di 1.1s tra sezione e sezione.

**Struttura HTML generata:**
```html
<div class="k9-scan-div" aria-hidden="true">
  <span class="k9-scan-line" style="animation-delay: 0s"></span>
</div>
<section id="chi-siamo"> ... </section>
```

---

### 5. Cursor Glow (aureola ambient gold)

**Dove:** overlay fixed globale.
**Disattivato su:** dispositivi touch + viewport ≤ 768px.
**Crea:** `<div id="k9CursorGlow">` con:
- `radial-gradient` gold semitrasparente
- Movimento lerp (coeff. 0.14) per smoothness
- Default: 22px diameter
- Espanso: 50px su `a`, `button`, `.servizio-card`, `.valore-card`, `.perche-item`, `.contact-item`
- `mix-blend-mode: screen` → coesiste con il custom cursor `#cursor`/`#cursor-ring` già in `index.html`

**Nota:** il glow (z-index 9995) si posiziona sotto il cursore custom esistente (9997/9998). Nessun conflitto visivo.

---

## CSS iniettato dinamicamente

Tutti gli stili vengono iniettati nel `<head>` via `<style id="...">`. Guard anti-duplicazione inclusa.

| `<style id>`        | Contenuto                          |
|---------------------|------------------------------------|
| `k9BadgeStyle`      | Badge H24: layout, animazioni      |
| `k9CardTiltStyle`   | Override transition `.servizio-card` |
| `k9ScanDivStyle`    | Scan dividers + `@keyframes`       |
| `k9CursorGlowStyle` | Cursor glow: sizing, transizioni   |

Il radar non usa `<style>` separato — tutti i suoi stili sono inline su `canvas.style`.

---

## ID e classi che il JS cerca

| Selettore                         | Effetto utilizzato          |
|-----------------------------------|-----------------------------|
| `#home`                           | Radar (1) + Badge H24 (2)   |
| `.servizio-card`                  | Card tilt 3D (3)            |
| `#chi-siamo, #servizi, #perche, #contatti` | Scan dividers (4) |
| `a, button`                       | Cursor glow expand (5)      |
| `.servizio-card, .valore-card, .perche-item, .contact-item` | Cursor glow expand (5) |

Se un selettore non viene trovato, l'effetto corrispondente è silenziosamente saltato (nessun errore).

---

## Note performance

- **Radar**: loop `requestAnimationFrame`, ~2ms/frame su desktop. Su mobile è nascosto via `display:none` ma il loop rAF continua. Se serve risparmio batteria aggiungere: `document.addEventListener('visibilitychange', ...)` per sospendere il loop quando la tab è in background.
- **Cursor glow lerp**: RAF indipendente, overhead < 0.1ms.
- **Scan dividers**: CSS animation pura dopo inserimento iniziale. Zero JS in loop.
- **Card tilt**: event listener `mousemove` su ciascuna card (10 cards). Overhead trascurabile.

---

## Compatibilità browser

Richiede: Canvas 2D API, CSS `animation`, `requestAnimationFrame`, `IntersectionObserver` non usato.
Supporto: Chrome 60+, Firefox 60+, Safari 12+, Edge 80+.
IE: non supportato (ma nessun errore bloccante — gli IIFE sono ES5 standard).
