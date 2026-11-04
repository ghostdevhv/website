# Himanshu Verma — personal website

Astro 7 + Tailwind CSS 4, built as four static pages. Production: https://ghostdevhv.me/

## Development

Use Node **22.23.4+** and npm **9.6.5+**. `.nvmrc` pins the supported Node version.

```sh
nvm use
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

The dev server uses http://127.0.0.1:4321/. Build output is `build/` (ignored by Git).

## Source

- `src/pages/`: Home, About, Work and Contact routes.
- `src/layouts/SiteLayout.astro`: shared metadata, styles and scripts.
- `src/components/`: navigation, time selector and inline SVG road illustration.
- `src/scripts/`: journey, regional greetings, local-time scenes, gallery and playlist behavior.
- `src/styles/global.css`: current typography, interaction and design tokens.
- `src/styles/landscape.css`: retained scene and page layout rules.
- `public/assets/`: original gallery photos, responsive previews and logos.

The résumé button links directly to `Himanshu_Resume.pdf` on the `main` branch of the public [resume repository](https://github.com/ghostdevhv/resume). Update the PDF there; no website rebuild is required. Résumé source and PDF are maintained only in that repository.

## Interactions

The traveller starts on the road, a noticeable distance before the college checkpoint. Right arrow / upward swipe or trackpad movement advances; left arrow / downward movement returns. Going back from college returns to that starting position. Reduced motion skips movement. Company checkpoints link to the matching Work sections.

The header time selector persists a chosen morning, afternoon, evening or night scene; Auto uses the visitor’s local time. `?view=morning|afternoon|evening|night` provides a temporary review override. Greetings alternate English with a regional language inferred from timezone, never precise geolocation.

Gallery tiles use small responsive WebP derivatives; original JPEGs remain byte-for-byte unchanged, verified by `public/assets/photos/manifest.json`. The photo dialog displays originals at approximately 80% of the viewport. Sequential low-priority cache warming waits for all thumbnails and skips detected slow/data-saving connections. Spotify is loaded only when its player is opened.

## Deployment

`.github/workflows/pages.yml` installs with `npm ci`, runs checks and builds, then deploys `build/` to GitHub Pages. Changes to source, public assets and build configuration trigger it on main. The custom domain remains `ghostdevhv.me` with HTTPS. No Sites deployment is used.

The former `dist/` source is preserved in Git history and the ignored local legacy backup. Do not edit generated build HTML. Make changes in `src/` or `public/`.

## Design references

Emil Kowalski’s design-engineering and mobile-native guidance: https://github.com/emilkowalski/skills. Source font licenses are included under public assets; npm fontsource packages carry their own licenses. See `LOCAL-PREVIEW.md` for migration context and physical-device testing limitations.
