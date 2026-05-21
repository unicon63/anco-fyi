# Cloud animation — Claude Code handoff prompt

Copy everything below this line into a Claude Code message, attached to
your local `anco-fyi` folder. The four files referenced (`SkyBackground.tsx`,
`globals-css-additions.css`, `layout.tsx`, `globals-css.patch.md`) are in
this `handoff/` folder — drop them next to the prompt or paste their
contents inline.

---

I'm adding an animated drifting-clouds background to my Next.js wedding RSVP
site (anco-fyi). The static composite background currently used by every
page (`/assets/background-phone-screen.png` via `.phone-frame`) needs to
be replaced with a live CSS animation of three transparent cloud PNGs
drifting across the existing `/assets/sky-bg.png`.

Critical requirement: the cloud animation MUST keep running continuously
as the user navigates between `/`, `/rsvp` (the multi-step form), and
`/confirmation`. To achieve that, the sky element is mounted ONCE in the
root layout, not per-page.

Apply these four changes verbatim — do not modify cloud sizes, positions,
or animation speeds; those are tuned.

1. Create `components/SkyBackground.tsx` with the contents of the file
   `SkyBackground.tsx` provided.

2. Update `app/layout.tsx` to match the file `layout.tsx` provided.
   The diff vs. current is two lines:
     - `import SkyBackground from "@/components/SkyBackground";`
     - `<SkyBackground />` rendered as the first child of `<body>`,
       before `<div className="app-bg">`.

3. Edit `app/globals.css` per the instructions in `globals-css.patch.md`:
   - Remove `background-image: url('/assets/background-phone-screen.png');`
     (plus the adjacent `background-size: cover;` and
     `background-position: center;` lines) from the THREE `.phone-frame`
     rule blocks (base, 550–829px, and 830px+).
   - Append the entire contents of `globals-css-additions.css` to the
     bottom of `globals.css`.

4. Do not touch any other files. The cloud PNGs already live at
   `public/assets/Cloud1.png`, `Cloud2.png`, `Cloud3.png`, and
   `public/assets/sky-bg.png` — the component references them by those
   paths.

Verification:
- `npm run dev` should work without errors.
- On `/`, the gradient sky and three clouds drift slowly.
- Clicking RSVP, advancing through the 6 form steps, and reaching the
  confirmation page should NOT cause the clouds to reset — they keep
  moving across all route changes.
- Mobile (<550px) shows the sky full-viewport. Tablet/desktop shows the
  sky inside the phone-shaped card, matching the existing `.phone-frame`
  size at each breakpoint, with the dark-navy `#09144C` surround
  unchanged.
- The OS-level prefers-reduced-motion setting freezes the clouds.

If text contrast suffers anywhere (e.g. dark form text over the darker
upper sky on screens where the form has moved up), tell me which screen
and I'll provide a follow-up patch — do not invent your own readability
fix unless asked.
