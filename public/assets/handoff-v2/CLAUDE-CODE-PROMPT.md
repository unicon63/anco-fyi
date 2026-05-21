# Cloud animation — v2 fix prompt for Claude Code

Paste this verbatim into Claude Code with the two files
(`SkyBackground.tsx`, `globals-css-additions.css`) attached.

---

Two small fixes to the animated sky background I added previously:

1. Replace `components/SkyBackground.tsx` with the attached
   `SkyBackground.tsx`. The only change is the base image source:
   `/assets/sky-bg.png` → `/assets/sky-bg_empty.png` (the previous file
   was the composite with static clouds painted on, which was bleeding
   through).

2. In `app/globals.css`, find the block I added previously starting with
   the `.sky-bg { … }` rule and ending at the
   `@media (prefers-reduced-motion: reduce)` block. Delete that entire
   block and replace it with the contents of the attached
   `globals-css-additions.css`. The new CSS centers the sky reliably
   using flex (the old version used `inset: auto` after `top: 50%`,
   which cancelled the centering).

Do not change cloud sizes, positions, speeds, or any other code.
Do not modify `.phone-frame` rules — they should remain as I last
edited them (no `background-image` declarations).

Verify after applying:
- On mobile (<550px width) the sky + clouds fill the whole viewport
  behind the form.
- On tablet/desktop, the sky + clouds appear ONLY inside the centered
  phone-card area; the navy `#09144C` surround stays everywhere else.
- The clouds keep drifting continuously as the user navigates from `/`
  to `/rsvp` through all 6 form steps to `/confirmation`.
