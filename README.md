# Himanshu’s personal website

A dependency-free static portfolio with a time-aware illustrated road journey.

## Local preview

Run `python3 -m http.server 4173 --directory dist` and visit http://localhost:4173.

## Source

- `dist/index.html`: illustrated homepage and chapter panel.
- `dist/journey.js`: six stops, consolidated Adobe internship/job chapter, and navigation.
- `dist/style.css`: responsive layout and scene palettes.
- `dist/sunset.js`: device-local time selection; hidden `?view=morning|afternoon|evening|night` overrides.
- `dist/greeting.js`: paired greeting/journey-line translations using a curated timezone-to-language map. This approximates region; it does not infer nationality. English fallback.
- `dist/work/`, `dist/about/`, `dist/contact/`: standalone destination pages.
- `dist/assets/`: company logos and the illustrated KGP building; sources in `SOURCES.md`.

## Journey

Click the traveler, a road stop, or use two-finger vertical scrolling. Trackpad deltas accumulate to 24px, and momentum is limited to one chapter per gesture. Touch swipes and previous/next buttons are also supported. Escape closes the story. The landscape stays still; only small road dots move. Reduced-motion preferences disable those dots and greeting transitions.

The greeting and journey line alternate every nine seconds between English and a region-associated language. Local-time bands: morning 05–11, afternoon 11–17, evening 17–20, night 20–05. No geolocation or tracking is used. Google Fonts are loaded externally with system fallbacks.

Onehouse is a past role; no departure date is assumed. Career text is based on the user-supplied LaTeX resume.

## Hosting

Publish `dist/` through any static host. `.openai/hosting.json` stores the existing Sites project identity. The GitHub remote stores source only; pushing there does not automatically deploy. No custom domain is configured yet.

## Walking and destination panels

The traveler animates along the road and opens a panel anchored to the destination after arriving. Click or hover an icon (450ms dwell), use trackpad scrolling, or press Up/Down arrows to advance/reverse. Escape closes the panel. Reduced motion makes travel instant. Visible station labels and instructions are omitted; accessible names remain. Adobe uses only its symbol, extracted from the downloaded logo.

Up arrows and upward trackpad gestures advance along the road; down reverses. The homepage introduction remains visible during the journey.

## Workspace

The sole working checkout is `/Users/himanshuverma/Documents/website`. GitHub: `ghostdevhv/website`, branch `main`. There is no separate deployment checkout in Documents/Resume. Publish from this checkout using `.openai/hosting.json`; preserve the GitHub origin remote. Historical deployment archives, previews, photo-review files, and a Git bundle of the previous deployment history are retained locally in ignored `.local-artifacts/`. These artifacts are not uploaded to GitHub. Original personal photos remain in Downloads.
