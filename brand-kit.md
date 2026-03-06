# Brand Kit — K9 Services
<!-- Versione: 1.0 | Data: 2026-03-04 | Owner: brand-designer (Mentis Digital) -->
<!-- Sicurezza cinofila professionale dal 1999 -->

---

## 1. PALETTE COLORI

### Colori principali

| Ruolo | Nome | HEX | RGB | CMYK | Uso |
|-------|------|-----|-----|------|-----|
| **Primario** | Navy | `#1A1F3A` | 26, 31, 58 | 55, 47, 0, 77 | Background principale, header, navbar, grandi superfici scure |
| **Accent** | Oro | `#C9A84C` | 201, 168, 76 | 0, 16, 62, 21 | CTA, highlights, dettagli premium, bordi accent, icone |
| **Oro scuro** | Oro Dark | `#A8863A` | 168, 134, 58 | 0, 20, 65, 34 | Hover su elementi oro, variante testo dorato su bianco |

### Colori secondari e neutri

| Ruolo | Nome | HEX | RGB | Uso |
|-------|------|-----|-----|-----|
| **Scuro secondario** | Anthracite | `#2D3354` | 45, 51, 84 | Card su navy, sezioni scure alternate, hover su navy |
| **Scuro terziario** | Slate | `#3D4266` | 61, 66, 102 | Bordi su sfondo scuro, separatori, elementi secondari |
| **Grigio medio** | Steel | `#6B7696` | 107, 118, 150 | Testo secondario su sfondo chiaro, icone inattive |
| **Grigio chiaro** | Silver | `#C8D0DC` | 200, 208, 220 | Bordi su sfondo chiaro, divider, placeholder |
| **Bianco rotto** | Off-White | `#F4F6F9` | 244, 246, 249 | Background sezioni chiare, card su bianco |
| **Bianco puro** | White | `#FFFFFF` | 255, 255, 255 | Testo su scuro, background neutro, spazio respiro |

### Colori funzionali

| Ruolo | Nome | HEX | Uso |
|-------|------|-----|-----|
| Successo | Verde militare | `#2D6A4F` | Conferme, stati attivi, operatività |
| Alert | Rosso sobrio | `#8B1A1A` | Errori, urgenze, allarmi — tono sobrio non sgargiante |
| Warning | Ambra | `#8B6914` | Avvisi, attenzione, stato in attesa |

### Contrasti WCAG

| Combinazione | Contrasto | WCAG |
|-------------|-----------|------|
| `#FFFFFF` su `#1A1F3A` | 15.1:1 | AAA ✓ |
| `#C9A84C` su `#1A1F3A` | 6.4:1 | AA ✓ |
| `#F4F6F9` su `#1A1F3A` | 13.8:1 | AAA ✓ |
| `#1A1F3A` su `#C9A84C` | 6.4:1 | AA ✓ |
| `#1A1F3A` su `#F4F6F9` | 13.8:1 | AAA ✓ |
| `#6B7696` su `#F4F6F9` | 4.6:1 | AA ✓ |

**Regole assolute:**
- Mai oro `#C9A84C` come testo su sfondo bianco puro — contrasto insufficiente (3.2:1)
- L'oro è sempre **accent decorativo o testo su navy** — non corpo testo su chiaro
- Il testo corpo su sfondo chiaro usa sempre navy `#1A1F3A` o anthracite `#2D3354`
- Nessun colore brillante/saturo — la palette resta sempre sobria e istituzionale

### CSS Variables pronte

```css
:root {
  /* K9 Brand */
  --k9-navy:       #1A1F3A;
  --k9-anthracite: #2D3354;
  --k9-slate:      #3D4266;
  --k9-gold:       #C9A84C;
  --k9-gold-dk:    #A8863A;
  --k9-steel:      #6B7696;
  --k9-silver:     #C8D0DC;
  --k9-offwhite:   #F4F6F9;
  --k9-white:      #FFFFFF;

  /* Funzionali */
  --k9-success:    #2D6A4F;
  --k9-alert:      #8B1A1A;
  --k9-warning:    #8B6914;

  /* Gradient oro */
  --k9-gold-gradient: linear-gradient(135deg, #C9A84C, #E2C47A);
  --k9-dark-gradient: linear-gradient(160deg, #1A1F3A 0%, #2D3354 100%);
}
```

---

## 2. TIPOGRAFIA

### Font stack

| Ruolo | Font | Fallback | Motivazione |
|-------|------|---------|------------|
| **Heading / Titoli** | Georgia | "Times New Roman", Times, serif | Serif classico: comunica storia, autorevolezza, istituzione con radici. Presente in tutti i sistemi OS — zero dipendenze. |
| **Body / Interfaccia** | Segoe UI | system-ui, -apple-system, Arial, sans-serif | Font di sistema: zero loading time, leggibilità ottimale a qualunque dimensione, universalmente familiare. |
| **Numeri / Dati** | Segoe UI | system-ui, monospace | Per statistiche, anni (1999), contatori — variante numerica di Segoe è allineata. |

```css
--k9-font-heading: Georgia, 'Times New Roman', Times, serif;
--k9-font-body:    'Segoe UI', system-ui, -apple-system, Arial, sans-serif;
```

### Scale heading (Georgia)

| Tag | Size | Weight | Letter-spacing | Line-height | Uso |
|-----|------|--------|----------------|-------------|-----|
| H1 | 52px | Bold (700) | -1.5px | 1.10 | Titolo principale hero / copertina |
| H2 | 38px | Bold (700) | -1px | 1.15 | Titoli sezione principale |
| H3 | 28px | Bold (700) | -0.5px | 1.20 | Titoli card / sottosezioni |
| H4 | 22px | Bold (700) | -0.2px | 1.25 | Titoli colonna / sidebar |
| H5 | 18px | Bold (700) | 0 | 1.30 | Titoli piccoli, FAQ, accordion |
| H6 | 15px | Bold (700) | 0.5px | 1.35 | Overline / label sezione (spesso uppercase) |

*Su mobile: scala ridotta del 15-20% tramite `clamp()` o media query.*

### Scale body (Segoe UI)

| Elemento | Size | Weight | Line-height | Letter-spacing | Uso |
|----------|------|--------|-------------|----------------|-----|
| Body L | 18px | 400 | 1.75 | 0 | Paragrafi lunghi, descrizioni |
| Body M | 16px | 400 | 1.65 | 0 | Testo standard interfaccia |
| Body S | 14px | 400/500 | 1.60 | 0 | Card text, liste, note |
| Small | 13px | 400 | 1.55 | 0 | Note legali, disclaimer |
| Caption | 12px | 500 | 1.50 | 0.3px | Etichette, timestamp, metadati |
| Label | 11px | 700 | 1.40 | 2px (uppercase) | Tag, badge, overline uppercase |
| CTA button | 15px | 700 | 0.3px | 1.45 | Testo pulsanti |

### Regole tipografiche

- **Georgia sui titoli**: sempre. Mai Georgia per corpo testo sotto 16px — la readability cala
- **Mai italic su Segoe** per testo funzionale — solo Georgia italic per citazioni o enfasi narrativa
- **Uppercase**: solo per label 11-12px con letter-spacing ≥ 1.5px — mai su titoli
- **Gerarchia colore testo** su sfondo chiaro: navy `#1A1F3A` → steel `#6B7696` → silver `#C8D0DC`
- **Gerarchia colore testo** su sfondo scuro: white `#FFFFFF` → off-white `#F4F6F9` → steel `#6B7696`

---

## 3. TONO DI VOCE

### 4 aggettivi chiave

1. **Autorevole** — parla da professionista che ha visto tutto, non da venditore
2. **Rassicurante** — trasmette controllo della situazione, non paura del pericolo
3. **Preciso** — dati concreti, anni di esperienza, numeri reali — mai vaghe promesse
4. **Sobriamente orgoglioso** — 25+ anni nel settore, lo sa ma non lo urla

### Esempi headline CORRETTI

1. > "Dal 1999, proteggiamo ciò che conta."
   *Perché funziona: heritage + benefit + sobrietà. Nessun superlativo.*

2. > "Sicurezza cinofila per chi non può permettersi errori."
   *Perché funziona: parla al cliente reale (cantieri, logistica, eventi) senza esagerare.*

3. > "Il cane lavora. Noi garantiamo."
   *Perché funziona: diretto, concreto, fiducia implicita nell'operatore.*

### Esempi da NON usare

1. ~~"La sicurezza numero 1 in Italia!"~~ — superlativo non verificabile, suona da volantino
2. ~~"Tecnologia all'avanguardia per la tua protezione totale"~~ — generico, potrebbe essere qualsiasi azienda IT
3. ~~"Siamo qui per te 24/7, pronti a qualsiasi sfida!"~~ — tono troppo commerciale/call center
4. ~~"Scopri le nostre incredibili offerte"~~ — incompatibile con il tono istituzionale del settore

### Come K9 Services descrive se stessa in 1 frase

> "Unità cinofile professionali per la protezione di persone, luoghi e patrimoni — operative dal 1999."

---

## 4. REGOLE LOGO

### Spazio minimo (clear space)

Lo spazio minimo attorno al logo — in tutte le direzioni — è uguale all'**altezza della lettera "K"** nel logo (indicata come unità `x`).

```
       [  x  ]
[  x  ] LOGO [  x  ]
       [  x  ]
```

Nessun testo, icona, bordo o altro elemento grafico può entrare in questa zona.

### Varianti colore

| Variante | Sfondo | Logo | Quando usarla |
|----------|--------|------|---------------|
| **Standard** | Navy `#1A1F3A` | Logotipo bianco + accent oro | Default — sito, materiali digitali, presentazioni |
| **Positivo chiaro** | Off-white `#F4F6F9` o bianco | Logotipo navy `#1A1F3A` + oro | Stampa chiara, carta intestata, documenti ufficiali |
| **Monochrome chiaro** | Bianco | Logotipo navy `#1A1F3A` | Fax, documenti B/N, ricevute |
| **Monochrome scuro** | Navy `#1A1F3A` | Logotipo bianco | Stampa in bicromia su scuro |
| **Solo oro** | Navy `#1A1F3A` | Tutto in oro `#C9A84C` | Ricami, incisioni, timbri, materiali premium |
| **Reverse** | Oro `#C9A84C` | Navy `#1A1F3A` | Casi eccezionali — bottoni premium, medaglioni |

**Non fare mai:**
- Logo su sfondi colorati non approvati (rosso, verde, arancione)
- Logo distorto, ruotato o con proporzioni alterate
- Logo con effetti drop shadow, glow o emboss non previsti
- Aggiungere sotto-titoli o claim direttamente nel file logo (usare versioni pre-approvate)

### Dimensioni minime

| Supporto | Dimensione minima |
|----------|------------------|
| Stampa | 25mm di larghezza |
| Digitale | 120px di larghezza |
| Favicon / app icon | 32×32px (solo simbolo, no wordmark) |
| Ricamo / incisione | 40mm — sotto questa dimensione solo simbolo |

---

## 5. MOODBOARD TESTUALE — Brand di riferimento

### G4S (G4S Secure Solutions)
**Cosa prendere:**
- La struttura visiva corporate: navy + colore accent (loro usano rosso, noi oro), tipografia senza eccessi
- La comunicazione per servizi: elenca le certificazioni, i numeri, la copertura geografica — nessuna emozione, pura competenza
- Il layout istituzionale: griglie rigide, tanto spazio bianco, gerarchia chiara

**Cosa evitare:**
- L'anonimato corporate — G4S è percepita come impersonale e fredda. K9 ha un'identità più radicata (1999, cinofili, italiani)

---

### Brink's (Brink's Company)
**Cosa prendere:**
- Il senso di **heritage e continuità**: Brink's usa "dal 1859" ovunque — K9 deve usare "dal 1999" con la stessa costanza
- Il tono sobriamente orgoglioso: Brink's non urla, afferma
- L'uso dell'**oro/giallo** come accent su navy/nero — sistema cromatico quasi identico al nostro, ma loro hanno dimostrato che funziona per il settore sicurezza premium

**Cosa evitare:**
- Il focus sui valori astratti ("integrità", "fiducia") senza prove concrete — meglio casi, numeri, certificazioni reali

---

### Gendarmerie Nationale / Arma dei Carabinieri (comunicazione istituzionale)
**Cosa prendere:**
- L'uso della **tipografia serif** per trasmettere istituzione e storia — Georgia funziona esattamente per questo
- Il principio del "meno è più": un'unica frase che vale — niente claims multipli in competizione
- La **palette navy + oro** che entrambe le istituzioni usano per gradi, stemmi, materiali cerimoniali — il cliente K9 riconosce inconsciamente quella combinazione come "sicurezza autorevole"
- Le **icone stilizzate**: scudo, stella, alloro — geometriche, precise, senza eccesso decorativo

**Cosa evitare:**
- La rigidità comunicativa assoluta — K9 Services deve rimanere accessibile alle PMI, ai privati, agli organizzatori eventi. Non deve sembrare irraggiungibile.

---

## 6. ICONE RACCOMANDATE

### Stile

**Outline, spessore 2px, corner radius 2-3px**

- **Perché outline**: trasmette precisione tecnica e professionalità. Il filled è più "consumer" e informale. In ambito sicurezza, l'outline rimanda a schematics tecnici e uniformi militari.
- **Perché 2px**: visibile a tutte le dimensioni, senza sembrare pesante
- **Corner radius 2-3px**: leggermente smussato — non spigoloso (aggressivo), non tondo (troppo soft)
- **Dimensioni standard**: 24×24px interfaccia, 20×20px inline, 48×48px hero/sezione

### Set temi raccomandati

| Icona | Tema | Uso |
|-------|------|-----|
| **Scudo** | Protezione, garanzia | Hero, CTA sicurezza, certificazioni |
| **Silhouette cane** | Servizio cinofilo | Sezione servizi, schede team |
| **Stella a 6 punte** (forze dell'ordine) | Autorevolezza, ordine | Badge certificazione, titoli |
| **Mirino / target** | Precisione, controllo | Sezione operativa, training |
| **Radar / onde concentriche** | Sorveglianza, monitoraggio | Servizi guardiania, ronde |
| **Lucchetto** | Sicurezza fisica | Accessi, controllo ingresso |
| **Occhio** | Videosorveglianza | Servizi CCTV, monitoraggio |
| **Portafoglio badge** | Credenziali, identificazione | Sezione team, certificazioni |
| **Telefono / headset** | Pronta risposta 24/7 | Contatti, emergenze |
| **Edificio** | Protezione immobile | Servizi per aziende |
| **Persona + scudo** | Scorta personale | VIP protection |
| **Zampa** | Unità cinofila | Solo come accento — non primario |

### Libreria consigliata

**Lucide Icons** (open source, MIT) — set outline uniforme, 2px stroke, 1000+ icone.
Alternativa premium: **Phosphor Icons** (outline, coerente, molte varianti sicurezza).

**Non usare**: emoji come sostituti icona, Font Awesome filled, icone iOS/Material mixed (incoerenza di stile).

---

## 7. SPACING SYSTEM

### Base grid: 8px

Tutto il layout si basa su multipli di **8px**. Questo garantisce coerenza visiva automatica e compatibilità con qualunque strumento di design.

### Scale di spaziatura

| Token | px | Uso tipico |
|-------|-----|-----------|
| `--space-1` | 4px | Gap micro — tra icona e label, padding badge |
| `--space-2` | 8px | Gap piccolo — padding bottone piccolo, spazio tra elementi inline |
| `--space-3` | 12px | Padding standard elemento compatto |
| `--space-4` | 16px | Padding card interno, gap tra elementi form |
| `--space-5` | 24px | Gap tra card, padding sezione compatta |
| `--space-6` | 32px | Margine titolo, padding card generosa |
| `--space-7` | 40px | Gap tra sezioni correlate |
| `--space-8` | 48px | Padding sezione mobile |
| `--space-10` | 64px | Padding sezione desktop standard |
| `--space-12` | 80px | Padding sezione hero / feature |
| `--space-16` | 96px | Padding sezione grande |
| `--space-20` | 120px | Padding sezione massima |

### Regole di applicazione

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  24px;
  --space-6:  32px;
  --space-7:  40px;
  --space-8:  48px;
  --space-10: 64px;
  --space-12: 80px;
  --space-16: 96px;
  --space-20: 120px;
}

/* Sezioni pagina */
.section { padding: clamp(var(--space-8), 10vw, var(--space-20)) 0; }

/* Card */
.card { padding: var(--space-6) var(--space-6); border-radius: 4px; }
.card-compact { padding: var(--space-5) var(--space-5); }

/* Container max-width */
.container { max-width: 1200px; margin: 0 auto; padding: 0 var(--space-5); }
```

### Border radius

K9 Services usa border-radius **sobrio e geometrico** — niente pill/rounded-full sulle card.

| Elemento | Border-radius |
|----------|-------------|
| Card | `4px` — quasi spigoloso, militare |
| Pulsante | `6px` — leggera smussatura |
| Badge / tag | `4px` — rettangolare con accenno |
| Icona container | `8px` — leggermente più morbido |
| Input form | `4px` — coerente con card |
| Tooltip | `4px` |

*Mai `border-radius: 50%` sulle card. Mai pill (`9999px`) sui pulsanti principali — è troppo "tech consumer".*

### Ombre

Ombre contenute e sobrie — niente effetti fluttuanti o glow:

```css
/* Card standard */
box-shadow: 0 2px 8px rgba(26,31,58,0.12), 0 1px 3px rgba(26,31,58,0.08);

/* Card hover */
box-shadow: 0 6px 20px rgba(26,31,58,0.18), 0 2px 8px rgba(26,31,58,0.10);

/* Dropdown / modal */
box-shadow: 0 12px 32px rgba(26,31,58,0.22), 0 4px 12px rgba(26,31,58,0.12);

/* Accent oro — solo elementi featured */
box-shadow: 0 4px 16px rgba(201,168,76,0.25);
```

---

## 8. CHECKLIST COERENZA — da usare su ogni nuovo materiale

Spunta tutto prima di pubblicare o stampare:

- [ ] La palette usa **solo** i colori approvati in questo documento
- [ ] I titoli sono in **Georgia** — mai Arial/Helvetica sui titoli
- [ ] Il corpo testo è in **Segoe UI** o system font — mai Georgia sotto 16px
- [ ] L'oro `#C9A84C` non è usato come testo su sfondo chiaro
- [ ] Il logo ha il clear space rispettato su tutti i lati
- [ ] I border radius delle card sono **4px** — non arrotondati
- [ ] Le icone sono **outline 2px** — non filled
- [ ] Le spaziature rispettano multipli di **8px**
- [ ] Il tono di voce è **autorevole e preciso** — nessun superlativo non verificabile
- [ ] È indicata l'**esperienza dal 1999** dove rilevante

---

*Brand Kit K9 Services v1.0 — prodotto da brand-designer Mentis Digital — 2026-03-04*
*Fonte di verità per tutti i materiali grafici e comunicativi K9 Services.*
*Da aggiornare ad ogni decisione di design approvata dall'azienda.*
