# patch-motion.js — Guida all'integrazione

## Come aggiungere il file

Aggiungi **una sola riga** prima del tag `</body>` in `index.html`:

```html
<script src="patch-motion.js"></script>
</body>
```

Il file inietta i propri stili CSS nel `<head>` a runtime — non serve nessun file `.css` separato.

---

## Cosa fa ogni animazione

| # | Effetto | Target HTML |
|---|---------|-------------|
| 1 | Loading screen 1.5s | Creato in JS, nessun target |
| 2 | Typewriter frasi | `.hero-eyebrow` |
| 3 | Scroll reveal con stagger | Classi elencate sotto |
| 4 | Contatori animati | `[data-count]` o `[data-target]` |
| 5 | Nav glass scrolled | `#mainNav` / `nav.nav` |
| 6 | Button ripple al click | `.btn-primary` e `.btn-ghost` |

---

## 1. Loading screen

Nessuna modifica HTML richiesta. Il JS crea il div `#k9-loading` e lo rimuove automaticamente.

---

## 2. Typewriter

Target: **`.hero-eyebrow`** (già presente in `index.html`).

Il testo originale viene sostituito dalla sequenza di frasi. Le frasi scritte sono:
```
Sicurezza senza compromessi.
Operativi dal 1999.
Disponibili H24.
In Italia e all'estero.
```

Per modificare le frasi, cerca il vettore `PHRASES` in `patch-motion.js`:
```js
var PHRASES = [
  'Sicurezza senza compromessi.',
  ...
];
```

---

## 3. Scroll reveal

Il JS rileva automaticamente i seguenti selettori e applica la classe di ingresso:

| Selettore | Animazione |
|-----------|-----------|
| `.trust-bar` | slide da sinistra |
| `.trust-item` | fadeUp stagger 90ms |
| `.chi-grid > :first-child` | slide da sinistra |
| `.chi-grid > :last-child` | slide da destra +150ms |
| `.numero-item` | fadeUp stagger 100ms |
| `.valore-card` | fadeUp stagger 120ms |
| `.servizio-card`, `.service-card` | fadeUp stagger 80ms |
| `.come-funziona .step`, `[data-step]` | slide alternato L/R |
| `.perche-item` | scale 0.95→1 stagger 100ms |
| `.testimonial`, `.testimonianza` | fadeUp stagger 120ms |
| `.faq-item`, `.faq` | slide da destra stagger 80ms |
| `form`, `.contact-form` | fadeUp |

**Nessuna modifica HTML richiesta** per i selettori già presenti in `index.html`.

Per le sezioni non ancora presenti (FAQ, testimonianze, form contatti), basta usare i selettori indicati e l'animazione partirà automaticamente.

---

## 4. Contatori animati

L'HTML esistente usa già `data-count`. Il patch supporta **entrambi** gli attributi:

```html
<!-- formato esistente (già in index.html) -->
<div class="numero-val" data-count="25">25</div>
<div class="numero-val" data-count="1000" data-suffix="+">+1.000</div>

<!-- formato alternativo accettato -->
<div data-target="150" data-suffix="%">150%</div>
```

Attributi disponibili:

| Attributo | Obbligatorio | Descrizione |
|-----------|-------------|-------------|
| `data-count` o `data-target` | sì | Valore finale (intero) |
| `data-suffix` | no | Testo aggiunto dopo il numero (es. `+`, `%`) |

I valori ≥ 1000 vengono formattati con `toLocaleString('it-IT')` e prefisso `+`.

---

## 5. Nav scroll

Funziona automaticamente su `#mainNav` (già in `index.html`).

La classe `.nav--scrolled` viene aggiunta dopo 80px di scroll. Se vuoi stilizzarla ulteriormente, aggiungi regole a questa classe nel tuo CSS — il JS imposta solo background e box-shadow.

---

## 6. Button ripple

Funziona automaticamente su tutti `.btn-primary` e `.btn-ghost` presenti nel DOM.

Il JS aggiunge `position:relative` e `overflow:hidden` via CSS se non già presenti, quindi non servono modifiche HTML.

---

## CSS opzionale per la transizione iniziale degli elementi

Se gli elementi `.servizio-card` o `.perche-item` appaiono senza animazione al caricamento della pagina (perché sono già visibili prima che l'observer li rilevi), puoi aggiungere in `index.html`:

```css
/* opzionale — nasconde gli elementi prima che il JS li animo */
.servizio-card,
.perche-item,
.valore-card,
.trust-item {
  opacity: 0;
}
```

Il JS aggiungerà `opacity: 1` tramite `.pm-visible` al momento giusto.

> **Nota:** se l'utente ha `prefers-reduced-motion: reduce` attivo, le transizioni CSS sono comunque soggette alla media query nativa del browser. Il JS non aggiunge override per questo.

---

## Dipendenze CDN

Nessuna. Il file è vanilla JS puro, nessun import esterno.

---

## Compatibilità browser

| Feature | Requisito minimo |
|---------|-----------------|
| IntersectionObserver | Chrome 58+, Firefox 55+, Safari 12.1+ |
| CSS transitions | Universale |
| `requestAnimationFrame` | IE 10+ |

Su browser senza IntersectionObserver tutti gli elementi appaiono direttamente senza animazione (fallback incluso nel codice).
