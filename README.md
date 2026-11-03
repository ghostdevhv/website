# Himanshu’s personal site

A dependency-free static site. Source and deployable files live in `dist/`.

## Preview

Run `python3 -m http.server 4173 --directory dist` from this folder, then open http://localhost:4173.

- `dist/index.html`: copy, project details, links, metadata.
- `dist/style.css`: responsive design, accent palette, typography.
- `dist/motion.js`: canvas contour animation, pointer interaction, pause control.

The background respects reduced-motion settings and pauses when the tab is hidden. Fonts are loaded from Google Fonts with system fallbacks. No analytics or tracking.

Content and additional colours are intentionally left for the next design pass. The custom domain is not configured yet.
