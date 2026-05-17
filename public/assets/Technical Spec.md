# anco.fyi — Technical Specification

**Project:** Annie & Nico wedding RSVP web app
**Domain:** anco.fyi
**Target:** Mobile-first responsive web app (primary entry: WhatsApp link → mobile browser). Desktop displays a centered iPhone-shaped frame for spec/preview parity.
**Reference iPhone frame:** 402 × 840 px

---

## 1. Design system

### 1.1 Color palette (active palette: "Cream + Cobalt")

| Role | Token | Hex / value | Used for |
|---|---|---|---|
| Page background | `bg` | sky photograph `assets/sky-bg.jpg` (1080 × 2341, 325 KB) | Full-bleed background on EVERY screen — does not change between steps |
| Primary ink | `ink` | `#0F1B47` | All body text, headlines, form labels, input text |
| Primary accent / CTA fill | `accent` | `#09144C` | All primary buttons (RSVP, Continue, Send RSVP, Start over), selected ring on choice cards, focus ring on inputs, progress bar fill |
| Accent ink (on accent) | `accentInk` | `#F7F1E2` (cream) | Text and icons inside primary buttons |
| Floating surface | `paper` | `rgba(247, 241, 226, 0.72)` | All text inputs, textareas, choice cards, note cards, summary card. Sits over the sky bg with reduced opacity so the sky shows through |
| Floating surface stroke | — | `0.5px solid rgba(247, 241, 226, 0.4)` | Hairline edge on the footer note card |
| Divider | `line` | `rgba(15, 27, 71, 0.18)` | Progress bar track, summary card row dividers |
| Disabled button | — | `rgba(15, 27, 71, 0.25)` | Continue button when current step is invalid |
| Disabled button text | — | `rgba(247, 241, 226, 0.7)` | Text inside disabled Continue button |
| Letter chip border (unselected) | — | `rgba(15, 27, 71, 0.2)` | A/B/C/D chips on choice cards before selection |

> All four palettes (`Cream + Cobalt`, `Cobalt + Cream`, `Dusk Blue`, `Wine + Cream`) are defined in `app.jsx`. Cream + Cobalt is the canonical wedding palette; the others are exposed only via the in-page Tweaks panel for design exploration.

### 1.2 Typography

Two Google Fonts only:

| Family | Weights loaded | Used for |
|---|---|---|
| **Instrument Serif** | 400 regular, 400 italic | Display headlines, question titles, location lines. ALWAYS uppercase with `letter-spacing: 0.02em` |
| **Work Sans** | 300, 400, 500, 600 + 400 italic | Body copy, input text, button labels, small uppercase labels, summary values |

CSS load (in `<head>`):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Work+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
```

### 1.3 Type scale (all sizes in px)

| Style | Family | Size | Weight | Letter-spacing | Transform | Used on |
|---|---|---|---|---|---|---|
| Display XL (hero names) | Instrument Serif | 26 | 400 | 0.01em | UPPERCASE | "ANNIE & NICO" / "JUNE 19—20 2027" |
| Display L (question title) | Instrument Serif | 30 | 400 | 0.02em | UPPERCASE | "NAME", "WILL YOU BE ATTENDING?", etc |
| Display L (success title) | Instrument Serif | 44 | 400 | 0.02em | UPPERCASE | "THANK YOU" |
| Display S (location) | Instrument Serif | 16 | 400 | 0.04em | UPPERCASE | "NEAR LICCIANA NARDI…" + coordinates |
| Tiny mark | Work Sans | 11 | 500 | 0.22em | UPPERCASE | "ANCO.FYI" top mark on hero & success |
| Body L (input text) | Work Sans | 17 | 400 | — | none | Text input value, placeholder |
| Body M (choice card text) | Work Sans | 16 | 400 | — | none | "Yes, both days", etc |
| Body M (note card, summary value) | Work Sans | 14–15 | 400 | — | none | Footer note text, summary values |
| Button label | Work Sans | 13 | 600 | 0.22em | UPPERCASE | "RSVP", "CONTINUE", "SEND RSVP" |
| Button label small (Confirmation actions) | Work Sans | 11 | 600 | 0.22em | UPPERCASE | "EDIT REPLY", "START OVER" |
| Small caps label | Work Sans | 10 | 600 | 0.22em | UPPERCASE | Progress counter "01 / 06", back arrow, summary row labels |
| Address line input | Work Sans | 16 | 400 | — | none | Address fields |

### 1.4 Spacing scale

The layout uses a relaxed 4 / 8 / 12 / 14 / 18 / 24 / 28 / 36 / 44 px scale rather than a strict 8-grid. Key values:

| Token | Value | Used for |
|---|---|---|
| Horizontal screen padding | 24 px (28 px on the hero title block) | Edge inset of all screen content from the frame |
| Inter-card gap | 12 px | Vertical gap between choice cards and address fields |
| Input internal padding | 18 × 20 px (text input), 14 × 16 px (address fields) | Input box inner padding |
| Choice card internal padding | 16 × 18 px | Choice card inner padding |
| Note card padding | 14 × 16 px | Footer note above Continue |
| Button padding | 18 × 36 px (hero), 18 × 24 px (form continue) | Primary button padding |
| Top safe area inset | 56 px (framed desktop view), 0 px (mobile fullbleed) | Reserved space below the device notch |
| Bottom screen padding | 28–44 px | Bottom inset of every screen |

### 1.5 Radii

| Element | Radius |
|---|---|
| Primary pill button | `999px` (fully pill) |
| Text input, choice card, note card, multiline textarea | `14px` |
| Address field input | `12px` |
| Summary card | `18px` |
| Letter chip on choice card | `999px` (circle) |

### 1.6 Shadows (layered)

| State | Shadow |
|---|---|
| Resting cream surface (input, choice card, note card) | `0 1px 2px rgba(15, 27, 71, 0.05), 0 8px 20px rgba(15, 27, 71, 0.10)` |
| Focused / selected cream surface | `0 0 0 1px #09144C, 0 8px 22px rgba(15, 27, 71, 0.14)` |
| Primary button (resting) | `0 2px 6px rgba(15, 27, 71, 0.18), 0 18px 36px rgba(15, 27, 71, 0.22)` |
| Primary button (disabled) | `0 1px 2px rgba(15, 27, 71, 0.08)` |
| Summary card | `0 1px 2px rgba(15, 27, 71, 0.05), 0 12px 28px rgba(15, 27, 71, 0.12)` |
| Rhinestone PNG drop shadow | `drop-shadow(0 1px 2px rgba(15, 27, 71, 0.2))` |

### 1.7 Backdrop blur

All cream surfaces apply `backdrop-filter: blur(4px)` (and the `-webkit-` prefix) so the sky behind them is subtly softened. Required for the "floating glass" feel.

---

## 2. Component breakdown

### 2.1 Hero / landing

Vertical stack inside the 402 × 840 frame, top-to-bottom:

1. **Top safe area** — 56 px reserved (only inside framed desktop view).
2. **ANCO.FYI mark** — Work Sans 11px / 0.22em tracking / opacity 0.7, centered horizontally, 22 px below safe-area top.
3. **Fixed gap** — 14 px (anchors the top edge of the rhinestone).
4. **Rhinestone PNG** — `assets/to-be-wed-transparent.png`, 641 × 907 px source, rendered at `width: 78%; max-width: 400px; height: auto;` with `drop-shadow(0 1px 2px rgba(15, 27, 71, 0.2))`. Centered horizontally.
5. **Flexible spacer** — `flex: 1; min-height: 24px;` absorbs vertical slack to push the title block toward the bottom.
6. **Title block** — left-aligned, 28 px horizontal padding:
   - Line 1: "ANNIE & NICO" (Instrument Serif 26 caps)
   - Line 2: "JUNE 19—20 2027" (same style)
   - 18 px gap
   - Line 3: "NEAR LICCIANA NARDI, TUSCANY, ITALY" (Instrument Serif 16 caps, 0.04em tracking, opacity 0.92)
   - Line 4: "44°15′12.9″N  10°02′25.7″E" (same style)
7. **28 px gap**, then **primary "RSVP" pill button** — centered, navy fill `#09144C`, cream text, 18 × 36 px padding, min-width 150 px.
8. **44 px bottom padding**.

### 2.2 Form step chrome (steps 1–6)

Every form step shares this chrome:

1. **Top safe area** — 56 px (framed) / 0 (mobile).
2. **Top bar** — 22 × 18 px padding; left: `← BACK` (Work Sans 10 caps, opacity 0.7). Right: progress counter `01 / 06` … `06 / 06` (same style).
3. **Progress bar** — 1 px navy 18% line, 2 px navy fill at current progress percent, transitions `width 0.4s ease`.
4. **Question title** — Instrument Serif 30 caps, 0.02em tracking, navy `#0F1B47`. Padding 24 × 8 top, 0 bottom (18 px to first input).
5. **Question body** — varies per step (see §3).
6. **Flex spacer** to push footer to bottom.
7. **Footer** — 24 × 12 / 28 px padding. Optional **note card** above the button (used on step 6). Then the primary "CONTINUE" / "SEND RSVP" pill button.

### 2.3 Text input

```
background: rgba(247, 241, 226, 0.72)
border: none
border-radius: 14px
padding: 18px 20px
font: Work Sans 17 / 400
color: #0F1B47
backdrop-filter: blur(4px)
box-shadow: 0 1px 2px rgba(15,27,71,0.05), 0 8px 20px rgba(15,27,71,0.10)
```

**Focus state:** shadow becomes `0 0 0 1px #09144C, 0 8px 22px rgba(15,27,71,0.14)` (single-pixel hairline ring, no border-color change).

**Placeholder:** browser default opacity (~0.4 on `#0F1B47`).

**Address fields** use slightly smaller padding (14 × 16) and font-size (16), with 12 px radius and a slightly lighter shadow.

### 2.4 Textarea (Dietary step)

Same as text input, plus `min-height: 130px; resize: vertical; rows={4}`.

### 2.5 Choice card

```
background: rgba(247, 241, 226, 0.72)
border-radius: 14px
padding: 16px 18px
display: flex; align-items: flex-start; gap: 14px
backdrop-filter: blur(4px)
box-shadow: 0 1px 2px rgba(15,27,71,0.05), 0 8px 20px rgba(15,27,71,0.10)
```

**Left:** 26 × 26 circular **letter chip** with the option letter (A/B/C/D) in Work Sans 11 / 600 / 0.04em tracking.

| State | Letter chip bg | Letter chip border | Card shadow |
|---|---|---|---|
| Unselected | transparent | `1px solid rgba(15,27,71,0.2)` | resting shadow |
| Selected | `#09144C` (filled, cream letter inside) | `1px solid #09144C` | `0 0 0 1px #09144C, 0 1px 2px rgba(15,27,71,0.05), 0 10px 22px rgba(15,27,71,0.14)` |

**Right:** option label (Work Sans 16 / 1.4 / `#0F1B47`).

### 2.6 Primary button (Pill)

```
display: inline-flex; align-items: center; justify-content: center
padding: 18px 36px           /* hero — narrower / centered */
padding: 18px 24px           /* form footer — full-width */
min-width: 150px             /* hero only */
border: none
border-radius: 999px
background: #09144C
color: #F7F1E2
font: Work Sans 13 / 600
letter-spacing: 0.22em
text-transform: uppercase
box-shadow: 0 2px 6px rgba(15,27,71,0.18), 0 18px 36px rgba(15,27,71,0.22)
transition: transform 0.15s ease
```

**Active state (pointer down):** `transform: scale(0.98)` (hero) / `scale(0.99)` (continue). Releases on pointer up / leave.

**Disabled state (Continue when step invalid):**
```
background: rgba(15, 27, 71, 0.25)
color: rgba(247, 241, 226, 0.7)
box-shadow: 0 1px 2px rgba(15,27,71,0.08)
cursor: not-allowed
```

**Secondary outline button** (used for "EDIT REPLY" on success page):
```
background: transparent
color: #0F1B47
border: 1px solid rgba(15,27,71,0.25)
border-radius: 999px
padding: 16px
font: Work Sans 11 / 600 / 0.22em caps
```

### 2.7 Note card (above footer button, step 6)

```
margin-bottom: 14px
padding: 14px 16px
background: rgba(247, 241, 226, 0.72)
border: 1px solid rgba(247, 241, 226, 0.4)
border-radius: 12px
backdrop-filter: blur(4px)
font: Work Sans 14 / 1.5 / #0F1B47
box-shadow: 0 1px 2px rgba(15,27,71,0.04), 0 8px 20px rgba(15,27,71,0.08)
```

Renders only when an option is selected on step 6; copy below.

### 2.8 Summary card (success page)

```
background: rgba(247, 241, 226, 0.72)
border-radius: 18px
padding: 20px 22px
backdrop-filter: blur(4px)
box-shadow: 0 1px 2px rgba(15,27,71,0.05), 0 12px 28px rgba(15,27,71,0.12)
```

Header: "YOUR REPLY" (Work Sans 10 / 600 / 0.22em caps, opacity 0.55, margin-bottom 14).
Rows: 10 px vertical padding, 1 px navy 10% dividers between rows. Left column = 72 px wide uppercase label, right column = Work Sans 15 value.

### 2.9 Typography hierarchy quick-reference

```
LEVEL 1 ── Display L hero/success     Instrument Serif 44 caps   #0F1B47
LEVEL 2 ── Question title             Instrument Serif 30 caps   #0F1B47
LEVEL 3 ── Display XL names           Instrument Serif 26 caps   #0F1B47
LEVEL 4 ── Location                   Instrument Serif 16 caps   #0F1B47 / op 0.92
LEVEL 5 ── Body / input               Work Sans 16–17           #0F1B47
LEVEL 6 ── Button labels              Work Sans 13 / 600 caps   varies
LEVEL 7 ── Small UI                   Work Sans 10–11 / 600 caps op 0.6–0.7
```

---

## 3. Form flow

Eight screens total. Path through is hero → 1 → 2 → 3 → 4 → 5 → 6 → success, with one **conditional skip**: if step 2 answers "Sadly not", "Continue" jumps straight to success and the email/address/dietary/stay summary rows are hidden.

State shape (`useState` in `RSVPApp`):
```js
data = {
  name: string,
  attending: 'both' | 'sat' | 'longer' | 'no' | '',
  email: string,
  address: { line1, line2, city, postcode, country },
  dietary: string,
  stay: 'tent' | 'own' | 'help' | '',
}
```

Validation predicates (`canContinue` per step):
```
step 1: name.trim().length > 1
step 2: !!attending
step 3: /.+@.+\..+/.test(email)
step 4: address.line1 && address.city && address.country
step 5: true (dietary optional)
step 6: !!stay
```

### Screen-by-screen

> The user originally described the flow grouped as "Name + Attendance / Email + Address / Dietary + Accommodation" — the implementation places **one question per screen** (Typeform pattern) so each question gets full focus on mobile. The two views map cleanly: group A = steps 1–2, group B = steps 3–4, group C = steps 5–6.

| # | Title (Instrument Serif 30 caps) | Body | Footer button |
|---|---|---|---|
| **Hero** | (no title — rhinestone + ANNIE & NICO names) | Title block, location, coordinates | "RSVP" (centered pill) |
| **1 — NAME** | NAME | Single text input, placeholder "Your name", autoFocus, Enter submits | "CONTINUE" (disabled if name < 2 chars) |
| **2 — WILL YOU BE ATTENDING?** | WILL YOU BE ATTENDING? | 4 choice cards: A. Yes, both days · B. Just Saturday 19th · C. Yes, both days and likely longer to enjoy the area · D. Sadly not | "CONTINUE". If D selected, advancing jumps to success and skips 3–6 |
| **3 — EMAIL ADDRESS** | EMAIL ADDRESS | Single email input, placeholder "Email address" | "CONTINUE" (disabled until valid email regex) |
| **4 — POSTAL ADDRESS** | POSTAL ADDRESS | 5 inputs stacked: Address line 1, Address line 2 (optional), Town/city (flex 2) + Postcode (flex 1), Country | "CONTINUE" (requires line1, city, country) |
| **5 — DIETARY REQUIREMENTS OR ALLERGIES** | DIETARY REQUIREMENTS OR ALLERGIES | Single textarea, min-height 130 px, blank placeholder | "CONTINUE" (always enabled — optional) |
| **6 — WHERE WILL YOU BE STAYING?** | WHERE WILL YOU BE STAYING? | 3 choice cards: A. tent on site · B. sort own accommodation · C. help finding nearby | Footer **note card** appears above button when an option is selected, then "SEND RSVP" button (no arrow icon, label changes from "CONTINUE" to "SEND RSVP") |
| **Success** | THANK YOU (Instrument Serif 44 caps) | "Your RSVP has been received." + summary card + "EDIT REPLY" / "START OVER" buttons | — |

### 3.1 Step 2 — Attending options (exact copy)

| Letter | Value | Label |
|---|---|---|
| A | `both` | Yes, both days |
| B | `sat` | Just Saturday 19th |
| C | `longer` | Yes, both days and likely longer to enjoy the area |
| D | `no` | Sadly not |

**Conditional skip:** selecting `no` and tapping CONTINUE on step 2 calls `setStep(7)` (jumping straight to success). The success summary then only shows Name + Attending rows.

### 3.2 Step 6 — Stay options & contextual note card

| Letter | Value | Option label | Footer note (appears above SEND RSVP) |
|---|---|---|---|
| A | `tent` | I'd like to stay in a tent on site with basic amenities | Subject to number, we will let you know. |
| B | `own` | I'll sort my own accommodation | We appreciate this. The location is relatively isolated, so the nearby houses will get booked up so recommend doing this soon! |
| C | `help` | I'd love some help finding somewhere nearby | We have reserved some houses of varying sizes; more information to follow. |

The note card uses the same translucent cream + shadow as other cards; it animates in below the choice list and persists above the SEND RSVP button.

### 3.3 Success page — summary card rows

Rendered as label-on-left / value-on-right rows separated by 1 px navy 10% hairline dividers:

| Label | Value |
|---|---|
| NAME | `data.name` |
| ATTENDING | mapped from value (e.g. "Yes, both days") |
| EMAIL | `data.email` |
| POSTAL | comma-joined: `line1, line2, city postcode, country` |
| DIETARY | `data.dietary` trimmed, or `—` if empty |
| STAY | mapped (e.g. "Tent on site") |

If `attending === 'no'`, only NAME + ATTENDING rows render.

### 3.4 Transitions

Every screen change is wrapped in a key-changing div with the keyframe `fadeSlide`:
```css
@keyframes fadeSlide {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
```
Duration 450 ms with `cubic-bezier(0.2, 0.8, 0.2, 1)`.

---

## 4. Interactive states

### 4.1 Hover (desktop only — no hover spec on mobile)

- **Choice card unselected:** no hover effect (selection is the only visual change).
- **Primary buttons:** no color change on hover — `transform: scale(0.99)` triggers on pointer-down only.

### 4.2 Active / pressed

- **Primary RSVP / Continue / Send RSVP buttons:** `transform: scale(0.98)` on the hero CTA, `scale(0.99)` on form buttons. Returns to `scale(1)` on `mouseup` / `mouseleave`.

### 4.3 Focus

- **Inputs / textareas / address fields:** the inset shadow swaps to `0 0 0 1px #09144C, 0 8px 22px rgba(15,27,71,0.14)`. No border-color change (no border to change).
- **Buttons:** default browser focus ring is suppressed via `outline: none`. Keyboard focus is signalled by `:focus-visible` ring colour `#09144C` (recommended addition for accessibility).

### 4.4 Validation states

Validation is implicit — when a step's required field isn't satisfied, the Continue button is **disabled** (see disabled spec in §2.6). There are no inline error messages; the page does not let an invalid step advance, so error states are unreachable.

Email is validated with the regex `/.+@.+\..+/` (loose-but-good-enough).

### 4.5 Loading state (form submission — to be wired)

The current build is a static prototype. When connected to a backend:

- On "SEND RSVP" tap, immediately set `submitting = true`.
- Button enters a "submitting" state: text "Sending…", same dimensions, `pointer-events: none`, opacity 0.7, with a small spinner (a 14 × 14 SVG circle with `stroke-dasharray: 28; stroke-dashoffset: 18; animation: spin 0.9s linear infinite;`).
- On success: advance to the success page (existing transition).
- On error: revert state, show a small red toast: `font: Work Sans 13`, `background: rgba(248, 220, 220, 0.92)`, `color: #6E1313`, anchored above the button for 4 s.

### 4.6 Success state

See screen 8 above. Includes:
- "THANK YOU" headline
- Brief confirmation paragraph
- Editable summary card
- Two actions: "EDIT REPLY" (jumps back to the last filled step) and "START OVER" (resets data and returns to hero)

If declined, the body copy still reads "Thank you. Your RSVP has been received." — no special declined wording, per the client's preference for minimal copy.

---

## 5. Asset list

All assets live under `assets/`:

| File | Dimensions | Size | Purpose |
|---|---|---|---|
| `assets/sky-bg.jpg` | 1080 × 2341 | 325 KB | Phone-aspect sky background. Applied app-wide via `background-image` on the scroll container with `background-size: cover; background-position: center bottom; background-attachment: local;`. Source is a painterly textured sky (deep blue at top fading to off-white at bottom with a small cloud cluster lower-right). |
| `assets/to-be-wed-transparent.png` | 641 × 907 | 268 KB | Rhinestone "To Be Wed" lettering on transparent background. Used only on the hero screen at 78 % width / 400 px max, `objectFit: contain`. Already cropped to its visible bounding box (no transparent margins). |
| `assets/annie-nico.png` | (legacy) | — | Earlier rhinestone variant; not referenced in current build but retained for fallback. |
| `assets/save-the-date.png`, `assets/to-be-wed.png` | (legacy save-the-dates) | — | Original Illustrator save-the-date PNGs; not used in the app. |
| `assets/mood-table.jpg`, `assets/mood-flowers.jpg`, `assets/mood-portrait.jpg` | (mood) | — | Mood references only; not in production. |

### 5.1 Background placement specifics

```css
.app-root {
  width: 100%;
  height: 100%;
  overflow: auto;
  background-image: url(assets/sky-bg.jpg);
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  background-attachment: local;
}
```

### 5.2 Rhinestone placement specifics

```jsx
<img
  src="assets/to-be-wed-transparent.png"
  alt="To Be Wed"
  style={{
    width: '78%',
    maxWidth: 400,
    height: 'auto',
    objectFit: 'contain',
    filter: 'drop-shadow(0 1px 2px rgba(15, 27, 71, 0.2))',
  }}
/>
```

Top edge anchored 14 px below the "ANCO.FYI" mark. Horizontally centered. Below it, a `flex: 1` spacer absorbs vertical slack so the title block stays anchored to the bottom regardless of phone height.

---

## 6. Tech notes (for Claude Code handoff)

- **Stack:** React 18.3.1 (UMD) + Babel Standalone for inline JSX. Production handoff should migrate to a Vite/Next build with proper bundling.
- **No backend wired.** "SEND RSVP" currently just navigates to the success page. To make it real, POST the `data` object to a Google Sheets webhook / Airtable / Resend / Formspark endpoint inside the `setStep(7)` handler. Recommended: a single serverless function on Cloudflare Pages or Vercel that writes to a Google Sheet via Sheets API.
- **Email confirmations** could be sent via Resend with the same data payload. Template: same copy as the on-screen confirmation.
- **The Tweaks panel** (palette / fonts / graphics language) is a design tool only — strip it from the production build by removing the `<TweaksPanel>` element and the surrounding `useTweaks` hook.
- **Edit reply** on the success page returns to step 6 (or step 2 if declined). The user can re-traverse and re-submit. This is desired.
- **Accessibility:**
  - All inputs have semantic types (`type="email"` etc).
  - Buttons use real `<button>` elements.
  - Recommended additions: `aria-label` on the back button, `aria-current="step"` on the progress counter, `:focus-visible` ring on buttons for keyboard nav.
- **Responsive:** below 720 px viewport the iPhone device chrome is hidden (`.phone .ios-bezel { display: contents; }`) and the app fills the viewport. The hero / form layouts are already mobile-first.

---

## 7. Outstanding decisions

These are open questions for the client / dev:

1. **Submission endpoint** — Google Sheet, Airtable, or custom backend?
2. **Confirmation email** — send one? From what address (e.g. `hello@anco.fyi`)? Plain text or styled?
3. **Reply deadline** — should the hero or success page surface "RSVP by X date"? Currently absent.
4. **Multiple guests / plus-ones** — current build is one RSVP per link. If you need partner / kids fields, add to step 1 as a "Plus one name" optional input and a small "Bringing children?" toggle on step 2.
5. **Edit access after submission** — should the link remain editable after they submit, or should it lock?

---

Document version: 1.0
Generated from the live source files `app.jsx` and `RSVP Site.html`.

---

## Appendix — Capturing screenshots for handoff

Step-by-step screenshots aren't embedded here (capture failed in the build environment). To produce them yourself:

1. Open `RSVP Site.html` in the preview.
2. For each screen, use your OS screenshot tool to capture the 402×840 iPhone frame:
   - Hero (initial state)
   - Step 1: Name
   - Step 2: Attending (with one option selected to show selected state)
   - Step 3: Email
   - Step 4: Postal address (with a few fields filled)
   - Step 5: Dietary
   - Step 6: Where staying — and a variant with option C selected to show the contextual note card
   - Success — Attending variant
   - Success — Declined variant (answer "Sadly not" on step 2 and submit)
3. Save into `assets/spec/01-hero.png` through `assets/spec/10-success-declined.png`.
4. Optionally also capture: focus state on a text input, disabled Continue button, hero on a narrow mobile viewport (≤ 720 px) without the device chrome.

Alternatively, run a Playwright / Puppeteer script over the deployed URL to automate this once the site is live.
