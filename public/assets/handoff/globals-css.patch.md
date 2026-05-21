# globals.css — required edits

You need to make TWO changes to `app/globals.css`:

## 1. Remove the static background-image from `.phone-frame` (3 places)

The static composite background (`background-phone-screen.png`) needs to be removed so the animated sky behind it can show through. Phone-frame becomes a transparent overlay that holds the form content.

**Find and DELETE these three lines** (they appear in three separate media-query blocks: the base rule, the 550–829px block, and the 830px+ block):

```diff
  .phone-frame {
    width: 100%;
    min-height: 100svh;
-   background-image: url('/assets/background-phone-screen.png');
-   background-size: cover;
-   background-position: center;
  }
```

```diff
  @media (min-width: 550px) and (max-width: 829px) {
    ...
    .phone-frame {
      height: calc(620px + (40 * ((100vh - 600px) / 230)));
      ...
      overflow: hidden;
-     background-image: url('/assets/background-phone-screen.png');
-     background-size: cover;
-     background-position: center;
    }
  }
```

```diff
  @media (min-width: 830px) {
    ...
    .phone-frame {
      position: relative;
      width: 500px;
      height: 660px;
      ...
      overflow: hidden;
-     background-image: url('/assets/background-phone-screen.png');
-     background-size: cover;
-     background-position: center;
    }
  }
```

You can leave the file `public/assets/background-phone-screen.png` on disk if you want — it just won't be referenced any more.

## 2. Append the animated-sky CSS

Paste the entire contents of `globals-css-additions.css` at the **bottom** of `app/globals.css`. It defines `.sky-bg`, the cloud tracks, and the matching breakpoint sizing so the sky aligns with the phone-frame card on tablet/desktop.

## 3. (Already handled in `SkyBackground.tsx`)

The component references the cloud PNGs at their existing paths in your repo:

- `/assets/sky-bg.png`
- `/assets/Cloud1.png`
- `/assets/Cloud2.png`
- `/assets/Cloud3.png`

These already exist in `public/assets/`, so no asset moves are required. ✅

## Quick sanity check after applying

1. `npm run dev`
2. Open `/`. You should see the gradient sky and three drifting clouds.
3. Click **RSVP**. Clouds keep moving through all 6 form steps (no reset).
4. Reach the confirmation page. Clouds still moving.
5. Toggle the OS-level "reduce motion" setting. Clouds freeze.

If anything looks off (text contrast, cloud z-order vs. form), tell me and I'll send a follow-up patch.
