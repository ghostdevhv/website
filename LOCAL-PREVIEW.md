# Local preview and verification

The editable site is in `src/`, and static assets are in `public/`. The résumé lives in the separate public [resume repository](https://github.com/ghostdevhv/resume); there is no local résumé copy or submodule.

Use Node 22.23.4 or newer and npm 9.6.5 or newer:

```sh
nvm use
npm ci
npm run dev
```

Open http://127.0.0.1:4321/. Review Home, About, Work and Contact at phone, tablet and desktop widths. Resize the window while the journey is open. Check keyboard arrows, touch/swipe navigation, checkpoint dialogs, gallery navigation and the résumé link.

Append `?view=morning`, `?view=afternoon`, `?view=evening` or `?view=night` to any page to review its palette. The header selector persists a choice; Auto restores local time. Verify reduced-motion behavior as well. No service worker is installed.

Before release:

```sh
npm run check
npm run build
npm run preview
```

Build output goes to ignored `build/`. The preview server uses port 4321; stop the dev server before starting it. Viewport emulation does not replace testing Safari on a physical iPhone. Check touch gestures, browser chrome, safe areas and photo dialogs on the actual device when available.

Pushes to `main` deploy through GitHub Pages after checks pass; pull requests only validate. See [README.md](README.md#deployment) for release and rollback instructions. The former static implementation is retained in Git history; do not edit generated build HTML.
