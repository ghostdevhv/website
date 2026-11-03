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

## Content

One vertical page with five detailed work stories, toolkit, education, personal interests, and contact. Onehouse is a past role; no end date is assumed. Career details come from the supplied resume. Work links stay on-page; external navigation is limited to GitHub, LinkedIn, and email contact. The greeting alternates between Hindi and English every nine seconds while visible, unless motion is paused or reduced.

## Local scene and greeting

The scene follows device-local hours: morning 05–11, afternoon 11–17, evening 17–20, night 20–05. These are time-of-day bands, not astronomical sunrise/sunset. A hidden `?view=morning|afternoon|evening|night` query parameter offers manual previews; there is no visible scene selector. Invalid values revert to local time. The primary browser language chooses the initial greeting (33 supported language codes, English fallback), alternating with Hindi every nine seconds when motion is enabled. No geolocation, IP lookup, or personal data transmission.

## Regional language

Greeting and journey line now use a curated timezone-to-language mapping rather than browser language. Both switch together between the regional default and English every nine seconds. Hindi is the chosen default for Indian timezones, not a claim that India has a national language. Unknown, ambiguous, and English-speaking timezone mappings fall back to English; no geolocation or external lookup is used. Timezone is approximate and cannot establish nationality.

## Interactive journey

Home is an illustrated seven-stop journey controlled by the traveler button, previous/next controls, or numbered stops. Escape closes the journey. `dist/journey.js` contains chapter copy. The character follows the SVG road, with reduced-motion and pause support. `/work/`, `/about/`, and `/contact/` are standalone quick-link destinations. Internship chapters use earlier entries in the supplied LaTeX source; Onehouse has no assumed departure date.
