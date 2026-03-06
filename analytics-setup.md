# Analytics Setup — K9 Services
<!-- Creato: 2026-03-06 — Analytics Agent -->

---

## 1. SNIPPET PLAUSIBLE ANALYTICS

Già inserito in `index.html`, nel `<head>` (dopo `</style>`):

```html
<!-- Plausible Analytics — privacy-first, no cookie, GDPR compliant by design -->
<script defer data-domain="k9services.it" src="https://plausible.io/js/script.tagged-events.js"></script>
<script>window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }</script>
```

**Perché Plausible per K9 Services:**
- Zero cookie → nessun consenso necessario → il cookie banner del sito non interferisce
- GDPR compliant by design: nessun dato personale raccolto
- I clienti del settore sicurezza si aspettano discrezione — anche sui dati di tracciamento
- Dati ospitati in Europa (conforme GDPR)

---

## 2. EVENTI CUSTOM — 5 EVENTI CONFIGURATI

### Già attivi in `index.html` (script in fondo prima di `</body>`):

| Nome evento | Trigger | Dove scatta |
|-------------|---------|-------------|
| `click_cta_telefono_it` | Click su `+39.338.1371226` | CTA "Contattaci ora", sezione contatti, footer |
| `click_cta_telefono_en` | Click su `+39.338.3530793` | Sezione contatti (International), footer |
| `click_cta_email` | Click su `xplorer.academy@gmail.com` | Sezione contatti, footer |
| `scroll_depth_50` | Scroll oltre il 50% della pagina | Una volta per sessione |
| `form_inviato` | Invio form contatto | ⚠️ **In attesa: form non presente nel sito** |

### Nota su `form_inviato`
Il sito attuale **non ha un form di contatto** — solo link diretti (tel + email).
Il codice è già scritto e commentato nello script, pronto da attivare:
```js
var contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function() {
    plausible('form_inviato');
  });
}
```
Quando il form verrà aggiunto, assegnare `id="contactForm"` al tag `<form>` e decommentare il blocco.

---

## 3. ISTRUZIONI SETUP PLAUSIBLE (ACCOUNT)

**Passo 1 — Creare l'account**
- Vai su [plausible.io](https://plausible.io)
- Clicca "Start free trial" (30 giorni gratis, nessuna carta di credito)
- Dopo il trial: piano Starter da $9/mese fino a 10k visite/mese
  - **Alternativa gratuita permanente**: self-hosting con Plausible Community Edition (richiede un server)

**Passo 2 — Aggiungere il sito**
- Nel pannello → "Add a website"
- Domain: `k9services.it` (esattamente così, senza www)
- Timezone: Europe/Rome

**Passo 3 — Copiare lo snippet**
- Plausible mostrerà uno snippet — **quello nel sito è già corretto**, non serve sostituirlo
- Lo snippet usa già `script.tagged-events.js` che abilita gli eventi custom

**Passo 4 — Verificare il sito**
- Vai su k9services.it → apri Plausible → "Verifica dominio"
- Se la verifica non passa: controlla che il sito sia pubblico su `k9services.it` (non su localhost)

**Passo 5 — Testare gli eventi**
- Apri k9services.it in un browser normale (non in incognito — Plausible filtra alcune anomalie)
- Clicca un numero di telefono
- In Plausible → "Goal Conversions" → aggiungere i 5 eventi come "Custom events"
  - Nome: esattamente come negli script (es. `click_cta_telefono_it`)
- Verifica che l'evento appaia in tempo reale nel pannello "Realtime"

**Passo 6 — Configurare i Goals**
- Plausible → Settings → Goals → "Add goal"
- Tipo: "Custom event"
- Aggiungere uno per uno: `click_cta_telefono_it`, `click_cta_telefono_en`, `click_cta_email`, `scroll_depth_50`, `form_inviato`

**Passo 7 — Condividere il pannello (opzionale)**
- Plausible → Settings → "Shared links" → crea link pubblico senza password
- Invia al cliente il link per il pannello in sola lettura

---

## 4. DASHBOARD KPI MENSILE — TEMPLATE REPORT

```
# Report Analytics Mensile — K9 Services
Periodo: [MESE ANNO] | Generato il: [DATA]

---

## TRAFFICO

| Metrica | Questo mese | Mese precedente | Δ |
|---------|------------|-----------------|---|
| Visitatori unici | — | — | — |
| Sessioni totali | — | — | — |
| Visualizzazioni pagina | — | — | — |
| Bounce rate | — | — | — |
| Durata media visita | — | — | — |

---

## DISPOSITIVI

| Dispositivo | % visitatori |
|-------------|-------------|
| Desktop | — |
| Mobile | — |
| Tablet | — |

---

## TOP SORGENTI TRAFFICO

| Sorgente | Visitatori | % |
|----------|-----------|---|
| Diretto | — | — |
| Google / Organic | — | — |
| Social | — | — |
| Referral | — | — |

---

## CONVERSIONI (EVENTI)

| Evento | Occorrenze | Tasso conversione |
|--------|-----------|------------------|
| click_cta_telefono_it | — | —% |
| click_cta_telefono_en | — | —% |
| click_cta_email | — | —% |
| scroll_depth_50 | — | —% |
| form_inviato | — | —% |

**Conversioni totali (tel + email + form):** —
**Tasso di conversione complessivo:** —%

---

## PAGINE PIÙ VISITATE

| Pagina | Visualizzazioni | Tempo medio |
|--------|----------------|-------------|
| / (home) | — | — |
| #servizi | — | — |
| #contatti | — | — |

---

## INSIGHT DEL MESE

> [Scrivi qui l'insight più importante: es. "Il 70% dei click sul tel avviene da mobile — valutare click-to-call più visibile"]

---

## AZIONE RACCOMANDATA PER IL MESE SUCCESSIVO

> [Una sola azione concreta: es. "Aggiungere form contatto per tracciare lead qualificati"]

---

*Dati: Plausible Analytics — privacy-first, GDPR compliant, no cookie*
```

---

## 5. KPI TARGET E BENCHMARK

### Obiettivi mese 1 (baseline)
| KPI | Obiettivo |
|-----|-----------|
| Visitatori unici/mese | Baseline (nessun target — primo mese) |
| Bounce rate | < 65% |
| Click tel IT | ≥ 5 |
| Click tel EN | ≥ 2 |
| Click email | ≥ 3 |
| Scroll 50% | > 40% dei visitatori |

### Segnali da monitorare
- **Alto bounce rate (>75%)** → revisione hero e messaggio principale
- **Click tel EN > click tel IT** → forte interesse internazionale, considerare sezione EN dedicata
- **Pochi scroll_depth_50** → pagina troppo lunga o contenuto non coinvolgente nella prima sezione
- **Picchi di traffico** → identificare sorgente e replicare

---

## NOTE TECNICHE

- Plausible non usa cookie → **il cookie banner esistente non è necessario per Plausible** (i cookie tecnici citati nel banner sono del sito stesso, non di Plausible)
- Lo script usa `defer` → non rallenta il caricamento della pagina
- Il tracking funziona anche su HTTPS e GitHub Pages
- Plausible **non traccia** IP, User Agent in modo persistente, dati personali
- Dati aggregati e anonimi → conformità GDPR senza consenso esplicito
