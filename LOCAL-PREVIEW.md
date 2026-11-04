# Astro migration — local review only

The editable site is now in `src/`; static assets and the downloadable résumé are in `public/`. `src/layouts/SiteLayout.astro` owns shared metadata, navigation, typography and time controls. The road illustration is `src/components/RoadScene.astro`. Page routes live in `src/pages/`, with narrowly scoped client interactions in `src/scripts/`.

Use Node 22.23.4 or newer and npm 9.6.5 or newer (`nvm use` reads `.nvmrc`):

```sh
npm ci
npm run dev
npm run check
npm run build
```

Local preview: http://127.0.0.1:4321/

Build output goes to ignored `build/`. The owner approved deployment after local review. GitHub Pages now installs, checks, and builds the Astro source on pushes to main, then publishes `build/`. The previous static source is retained in Git history and an ignored local backup.

The time control persists a visitor's choice across pages; Auto returns to local time. `?view=morning|afternoon|evening|night` remains available for reviewing scenes. No service worker is installed.

Design guidance applied: emilkowalski/skills `emil-design-eng` and `mobile-native`, reviewed locally under `.local-artifacts/emil-skills`. Motion has reduced-motion fallbacks, controls have touch targets, keyboard navigation is immediate, and fonts are self-hosted through bundled fontsource packages. Device emulation does not verify physical iPhone browser behavior.
