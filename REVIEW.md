# SATORP Eid Greeting Card — Project Review

## Summary

Review covers: **bugs**, **errors**, **accessibility**, **UX**, and **enhancement opportunities**. Critical issues are fixed in code; the rest are documented for prioritization.

---

## Bugs & Errors

### 1. ~~Image load failure leaves user stuck~~ (Fixed)
- **Issue:** If the card image failed to load (wrong path, network, CORS), the loading overlay never hid and the user could not continue.
- **Fix applied:** `imageObj.onerror` now hides the loading state and shows a short error message so the user is not stuck.

### 2. ~~Canvas draw before image load~~ (Fixed)
- **Fix applied:** `drawCardWithText` now returns early with `if (!imageObj.complete || !imageObj.naturalWidth) return;` so we never draw an empty or broken image.

### 3. Message count vs documentation
- **Config:** `config.js` has **2** message options per language.
- **Docs:** Memory bank / project brief mention **3** message options.
- **Recommendation:** Either add a third message per language to match the brief or update the docs to say “two message options.”

### 4. Direct visit without `?card=`
- **Behavior:** Visiting `ar.html` or `en.html` without `?card=` defaults to card 1; mirror and canvas use card 1. No crash.
- **UX:** User might expect a chosen card; they didn’t come from the deck. Acceptable as fallback.

---

## Accessibility

### Good
- Step indicator uses `aria-current`, `aria-label`, `role="navigation"`.
- Message deck has `role="listbox"` and `role="option"` with `aria-selected`.
- Form error (name) has `role="alert"` and `id="nameError"`.
- Loading and download success use `aria-live="polite"` / `role="status"`.
- Language switch and buttons have `aria-label` where needed.
- Focus management: name field is focused when entering step 2.

### Improvements
- **Focus after step transition:** When moving to step 3, focus now moves to the Download button for keyboard/screen-reader users (implemented).
- **Skip link:** Consider a “Skip to main content” link for screen readers on card pages.
- **Card images:** Deck card images have alt text (“Eid card design 1/2”); ensure alt text stays meaningful if designs change.

---

## UI/UX

### Good
- Clear 3-step flow (message → name → preview).
- Back/Next and step dots make progress obvious.
- Blur mirror matches selected card on first page and on all steps (ar/en).
- White text on card 2 for contrast; green on card 1.
- Single language-switch CTA in navbar; no double buttons.
- Content (title, description, deck, hint, CTA) order is logical.

### Improvements
- **Loading state:** One loading message for the whole card; consider a light skeleton or “Preparing your card…” so the wait feels intentional.
- **Download feedback:** Success message disappears after 4s; could add a short checkmark animation or keep it visible until next action.
- **Mobile:** Deck “swipe” is click/tap only; no touch swipe. Hint says “Swipe and choose” — consider “Tap to choose” or add actual swipe for next/prev card.
- **Empty name:** Error is shown and focus moved to the field; `aria-invalid` is set on the name input when validation fails and cleared when valid (implemented); input has `aria-describedby="nameError"` so the error is announced.
- **Footer on card pages:** Ensure footer sits above the blur background (z-index) so it’s always visible and clickable — fix applied in CSS.

---

## Code Quality

### Duplication
- Card image URLs and `?card=` parsing are repeated (index.html deck, index.js, en.js, ar.html/en.html inline scripts). Consider one shared config (e.g. `config.js`) for card IDs and image URLs.
- `index.js` and `en.js` are largely duplicated (canvas, steps, messaging); only language and a few layout numbers differ. A single script parameterized by language would reduce drift and bugs.

### Robustness
- **Fixed:** Step and download button listeners in `index.js` and `en.js` now guard with null checks before `addEventListener`, so missing elements no longer cause throws.
- **Fixed:** `deck-select.js` touch handlers now check `e.touches` / `e.changedTouches` length before reading coordinates.
- `wrapCanvasText` splits on `\s+`; for Arabic with no spaces, long lines might not wrap. Consider character-based or RTL-aware wrapping for Arabic-only content.

### Security / best practice
- No user content rendered in raw HTML; `textContent` and canvas `fillText` are used appropriately.
- Filename sanitization in `sanitizeFileName` avoids path traversal in download names.

---

## Performance

- Card images are not preloaded on the first page; only the selected deck image is visible. Preloading both card images could make the mirror switch feel instant.
- Fonts are preloaded on ar/en; good for canvas text.
- Single CSS and a few JS files; no heavy frameworks. Load time should stay low.

---

## Suggested Fixes (Applied in Previous / This Review)

1. **Image load error:** In both `index.js` and `en.js`, `imageObj.onerror` hides the loading overlay and shows a brief, user-friendly error message.
2. **Footer on card pages:** Footer on ar/en uses `footer-lang-page` and same styling as the first page; z-index keeps it above the blur.
3. **Canvas draw guard:** `drawCardWithText` returns early if the image is not loaded.
4. **DOM robustness:** Step and download button listeners in `index.js` and `en.js` only attach when the element exists.
5. **Touch robustness:** `deck-select.js` checks `e.touches` and `e.changedTouches` before reading so empty touch lists do not throw.

---

## Optional Next Steps (Backlog)

| Priority | Item |
|----------|------|
| Medium   | Add a third message per language or update docs to “two message options”. |
| Low      | Centralize card image URLs and card ID logic in `config.js`. |
| Low      | Refactor index.js/en.js into one parameterized script. |
| Done     | Guard `drawCardWithText` with image load check. |
| Done     | Move focus to Download button when entering step 3. |
| Done     | Set `aria-invalid` and `aria-describedby` on name input. |
| Done     | Touch swipe on deck; hint "Swipe and choose" / "اسحب واختر". |
| Done     | Null checks for step/download buttons; touch guard in deck. |

---

## Current Status Summary

- **No known critical bugs.** Image load error, canvas guard, footer styling, and DOM/touch robustness fixes are in place.
- **Flow:** Language + card select → message → name → preview & download. Card and language persist via URL params.
- **Assets:** All referenced images and fonts exist under `assets/`.

---

*Last full review: 2026-03-18*
