# Connect & Collaborate — clickable prototype

A fully clickable frontend prototype implementing the "Connect & Collaborate"
design (see `../Connect & Collaborate.dc.html` and `../chats/chat1.md` for the
original design source and brief). Built with React, TypeScript and Vite.
No backend — all data is mocked and persisted to `localStorage` so state
survives a page reload.

## What's implemented

- Onboarding: Welcome → Telegram login (mock OTP) → role select (creator / brand)
- Creator flow: profile setup, feed with categories/filters/bookmarks, collaboration
  details, apply flow, my events (tabs), profile (editable), notifications,
  history, support
- Brand flow: brand profile setup, feed with a floating "create" action, a
  3-step create-collaboration wizard (matches the design's step 2/3 pixel for
  pixel), publish flow, "my collaborations" list
- Every button/tab/link navigates somewhere logical or produces a visible
  state change (toasts, toggles, confirmations) — nothing is a dead end

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs to dist/
npm run preview # serve the production build locally
```

## Deploy

A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys
`dist/` to GitHub Pages automatically on every push to `main`. In the repo's
Settings → Pages, set **Source: GitHub Actions**.

The app uses a hash router (`/#/feed`, etc.) and a relative Vite `base`, so it
works unmodified at any subpath (e.g. `https://<user>.github.io/<repo>/`).
