# Himanshu Verma — personal website

Astro 7 + Tailwind CSS 4, built as four static pages.

[Website](https://ghostdevhv.me/) · [Source](https://github.com/ghostdevhv/website) · [Résumé](https://github.com/ghostdevhv/resume)

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

[Check and deploy website](https://github.com/ghostdevhv/website/actions/workflows/pages.yml) runs `npm ci`, `npm run check`, and `npm run build` for pull requests and pushes to `main`. Pull requests validate only. Successful main builds upload `build/` and deploy to GitHub Pages. You can also select **Run workflow** on `main` for a manual deployment.

The build job has read-only repository access; only the deployment job has Pages and OIDC write permissions. No personal access tokens or cross-repository secrets are required. GitHub Actions are pinned to verified release commits, with monthly Dependabot update pull requests. Node is read from `.nvmrc`, and npm uses the committed lockfile and dependency cache.

Repository settings: **Pages → Source → GitHub Actions**, custom domain `ghostdevhv.me`, HTTPS enforced. `public/CNAME` preserves the domain in the build. Namecheap DNS and email forwarding are managed separately; publishing does not change them. The legacy `.openai/hosting.json` is retained metadata and is not used by this pipeline.

To release, review locally using the checks above, then push or merge to `main` and confirm the Actions run succeeds. To roll back a change, revert its commit on `main`; that creates a fresh deployment. No version tag or GitHub Release is required.

The résumé links to the public resume repository rather than the website artifact. A PDF update there becomes available through the same button after GitHub’s raw-file cache refreshes, without this workflow running.

The former `dist/` source is preserved in Git history and the ignored local legacy backup. Do not edit generated build HTML. Make changes in `src/` or `public/`.

## Design references

Emil Kowalski’s design-engineering and mobile-native guidance: https://github.com/emilkowalski/skills. Source font licenses are included under public assets; npm fontsource packages carry their own licenses. See `LOCAL-PREVIEW.md` for migration context and physical-device testing limitations.
