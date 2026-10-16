# Portfolio redesign QA

final result: passed

## Visual truth and evidence

- Approved reference: `/Users/neoble/.codex/generated_images/01a143c1-d279-70b1-a1e7-a28fd1f6b384/exec-647ad93e-979d-4bd5-95d1-078935926712.png` (921 × 1708 pixels).
- Production preview: `http://127.0.0.1:4322/`.
- Evidence directory: `/Users/neoble/.codex/visualizations/2026/10/16/01a143c1-d279-70b1-a1e7-a28fd1f6b384/portfolio-concepts/`.
- Final desktop capture: `implementation-desktop.jpg` (921 × 1725 pixels), dark theme. Browser viewport override 936 × 1708 CSS pixels; screenshot excludes the 15px scrollbar. Device pixel ratio 1. No density resampling was needed for the comparison.
- Final mobile capture: `implementation-mobile.jpg` (375 × 1873 pixels), viewport 390 × 844 CSS pixels including scrollbar. No horizontal overflow: client width and scroll width both 375px.
- Light theme capture: `implementation-light.jpg` (921 × 1725 pixels).
- Full comparison: `qa-comparison-final.jpg`, containing the approved reference and rendered implementation together at their native 921px capture widths.
- Focused comparison: `qa-studio-detail.jpg`, showing reference and implementation studio hierarchy together at 1:1 scale. This checks the parent guide line, product emphasis, indentation, labels, and descriptions.

## Findings and comparison history

### Initial pass

Evidence: `qa-comparison-before.jpg`, reference beside `qa-desktop-before.jpg` (906 × 1851 pixels; 921px browser viewport including scrollbar).

- **[P2, resolved] Vertical spacing drift:** hero, product tree, and experience rows accumulated excess height. Reduced the ASCII strip height, studio group spacing, role row padding, and footer spacing. Post-fix desktop capture is 1725px tall; section rhythm now follows the approved reference.
- **[P2, resolved] Muted accents:** initial dark green and pink were less pronounced than the reference. Adjusted the dark theme accent/link tokens while retaining the original charcoal theme and existing light palette. Verified the computed colors and the final comparison.
- **[P2, resolved] Portrait scale:** the supplied transparent PNG includes substantial internal padding, making its visible face too small. Increased its desktop element to 64px (the visible face stays small); mobile uses 40px. The actual supplied avatar is preserved.
- **[P2, resolved] Mobile headline wrapping:** the desktop type scale split “Founder. Builder.” into two lines. Added a responsive mobile scale that retains that phrase on one line at the tested 390px viewport.

### Final pass

No actionable P0/P1/P2 findings remain after the final combined comparison and focused studio comparison.

Intentional differences authorized by the user:

- “Download résumé” is beside the theme toggle in the header, removed from below experience.
- The landscape is live ASCII text with a centered dinosaur, alternating footsteps, and moving scenery. Its precise pose and hills vary with time, rather than matching a fixed generated frame.
- Mobile stacks section labels and employment dates for readability. The header keeps résumé and theme controls together on a second row.
- The animation has an unobtrusive pause/play control available on hover, keyboard focus, and touch.

## Required fidelity surfaces

- **Fonts and typography:** native system monospace family throughout; 48px desktop heading, responsive mobile heading, 32px primary product, smaller supporting links and dates. No clipped headings, company names, or dates in the checked viewports.
- **Spacing and layout:** centered narrow page, two-column index, indented studio family, thin experience dividers, and past projects below experience. Full and focused comparisons confirm the studio/product hierarchy. Mobile uses a single column without overflow.
- **Colors and tokens:** charcoal background, emerald accent, dusty pink links, and muted grey supporting copy. Light mode retains the project's pale background, red accent, and muted teal links. Focus outlines are visible.
- **Image and asset fidelity:** original Memoji PNG, without replacement or enlargement into a hero portrait. Existing icon library supplies arrows, theme icons, and playback controls. ASCII is native text as explicitly requested. The original résumé PDF is served locally.
- **Copy and content:** founder identity, FlipFlop Labs parent, biu main product, all three side projects, all five supplied roles/date ranges/company links, Phraze below experience, Contact wording, and no last-updated date. Correct LinkedIn URL recovered from the existing résumé.

## Functional verification

- `pnpm check`: passed, 0 errors, 0 warnings, 0 hints.
- `pnpm build`: passed; static routes and Pagefind generated.
- `pnpm test:ascii`: 4 tests passed. Checks exact tile repetition, fractional motion and loop equivalence, dinosaur scale/footsteps, and bounded responsive sky grids.
- Focused Biome lint: new data module, scene renderer, and animation tests passed.
- Prettier and `git diff --check`: passed.
- Live browser samples: scenery and footsteps change while the dinosaur's body position remains fixed.
- Pause/play: pause state changes, frame stays unchanged while paused, playback can resume.
- Off-screen behavior: scene at top −853px remained unchanged across samples after scrolling away.
- Theme switch: dark/light state, accessible switch state, and theme persistence across reload verified.
- Keyboard: animation control receives focus and a solid visible outline.
- Résumé: header anchor includes a download filename; local PDF returns HTTP 200, `application/pdf`, 267353 bytes.
- Product, company, contact, GitHub, LinkedIn, and X destinations inspected in the rendered page.
- Production browser console: no errors or warnings.
- Reduced motion is handled in both the animation controller and CSS; the browser's OS motion setting was not changed during verification.

## Follow-up polish and limitations

- [P3] Generated type rendering and the live ASCII art are not pixel-identical to the raster mockup. The chosen system monospace keeps the site dependency-free and preserves its existing character.
- External destination availability and screen-reader behavior were not exhaustively tested. No deployment or repository push was requested or performed.

## Implementation checklist

- [x] Implement the approved founder portfolio and studio hierarchy in the existing Astro project.
- [x] Add the centered walking ASCII dinosaur and scrolling scenery, with pause and reduced-motion support.
- [x] Move the résumé download beside the theme control and serve the existing PDF directly.
- [x] Verify production rendering, desktop/mobile layouts, themes, animation, and required checks.


## ASCII refinement after user feedback

The user requested a 40% smaller dinosaur and scenery closer to the approved image. This section supersedes the original scene-renderer notes above.

- Dinosaur font and line height are both exactly 0.6 of their previous values. Browser measurements confirmed a 0.6 ratio and zero horizontal center error on desktop and mobile.
- Replaced quantized full-grid updates with three persistent, repeating ASCII layers. The layers move using fractional `translate3d` positions on animation frames; their text remains unchanged. Far hills, near hills, and foreground move at 4, 10, and 24px/s.
- Removed the rectangular clearance that erased landscape around the dinosaur. Added shaped dotted contours, varied small pines, stable stars, and a moon placed closer to the reference.
- Refined ridge contrast, dot weight, and the main hill positions after comparing native-size crops against the source image.
- Fixed a measured subpixel seam: multiplying a rounded single-character box gave a different width from the actual text tile. The controller now measures all three rendered copies and divides by three, ensuring its repeat distance matches the visible artwork.
- Browser checks confirmed stable sky/scenery text, changing fractional transforms, centered placement, pause behavior, and no mobile overflow. Production console had no errors or warnings.
- `pnpm check`, `pnpm build`, four animation tests, focused lint, Prettier, and whitespace checks passed.

Updated evidence in the same evidence directory:

- `scene-before-polish.jpg`: previous renderer at the user's browser size.
- `scene-refined-desktop.jpg`: final native-size 759 × 128px scene at a 936 × 900px viewport.
- `qa-scene-comparison.jpg`: reference crop (760 × 128px) above final implementation (759 × 128px), both at native size. This focused comparison was inspected after the last visual refinements. The smaller dinosaur is an intentional user-authorized change.
- `implementation-desktop-refined.jpg`: final full page, 936 × 1725px capture.
- `implementation-mobile-refined.jpg`: final mobile full page, 375 × 1873px capture, 390 × 844px viewport including scrollbar.

The page layout, type system, studio hierarchy, original avatar, and content are unchanged by this refinement. No actionable P0/P1/P2 findings remain. The live ASCII glyph shapes intentionally differ from the generated raster artwork; its landscape hierarchy and palette guide the implemented scene.


## Subtle star twinkle

- Four of the 22 stationary stars now fade independently in two groups; the other 18 stay steady.
- The two CSS opacity animations use 9-second and 12-second ease-in-out cycles, with a negative phase offset. Stars gently dim to 0.15 opacity and return to 0.8 without moving or flashing.
- Star fades share the scene's pause, visibility, and reduced-motion behavior.
- The production browser confirmed the two durations, running animation state, and different opacity values for the staggered groups. Build, type check, existing four animation tests, and whitespace validation passed.
- No layout, scenery movement, dinosaur scale, or site content changes were made.
