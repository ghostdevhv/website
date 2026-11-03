# Himanshu’s personal site

A dependency-free static site. Source and deployable files live in `dist/`.

## Preview

Run `python3 -m http.server 4173 --directory dist` from this folder, then open http://localhost:4173.

- `dist/index.html`: copy, project details, links, metadata.
- `dist/style.css`: responsive design, accent palette, typography.
- `dist/motion.js`: canvas contour animation, pointer interaction, pause control.

The background respects reduced-motion settings and pauses when the tab is hidden. Fonts are loaded from Google Fonts with system fallbacks. No analytics or tracking.

Content and additional colours are intentionally left for the next design pass. The custom domain is not configured yet.

## Background interaction

Two flowing ribbons in blue, violet, teal, and coral use spring-based displacement around the cursor. Strands ease back when the cursor leaves. The canvas runs at up to 30 fps, caps pixel density at 2x, pauses in hidden tabs, and respects reduced motion. Text and links remain above the decorative canvas.

## Next content pass

All work should be described in detail within this page; only social and GitHub links should navigate externally. The existing Quanton link is pending removal during that content pass.
