# Contributing — Getting the frontend running locally

This file contains minimum requirements and quick steps for a new developer to get the frontend running locally.

## ✅ Prerequisites
- Node.js (LTS recommended, e.g. Node 18+)
- npm (bundled with Node) or yarn
- Git

Optional helpful tools:
- Homebrew (macOS): `brew install node`
- nvm (Node version manager): https://github.com/nvm-sh/nvm

## 🔧 Environment
Create a `.env` file in the project root. Minimum values:

```bash
VITE_USE_MOCKS=true
VITE_API_BASE=http://localhost:8000
```

- `VITE_USE_MOCKS`: when `true` the frontend uses MSW (Mock Service Worker) to serve mock endpoints so you don't need the backend running to develop UI.
- `VITE_API_BASE`: base URL to your FastAPI backend when you want to turn mocks off.

## 🚀 Quick start
```bash
# clone
git clone <repo>
cd frontend

# install deps
npm install

# start dev server (Vite on :5173)
npm run dev
```

## 🔁 Useful commands
- `npm run dev` — Start dev server
- `npm run build` — Build production bundle
- `npm run preview` — Preview built site locally
- `npm run lint` — Run ESLint
- `npm run format` — Run Prettier

## 🧰 Working with mocks
- MSW is used for local dev; start the site with `VITE_USE_MOCKS=true` (default in this repo `.env`).
- Mock endpoints implemented (examples): `/games`, `/picks`, `/league/picks`, `/standings`, `/picks/draft`, `/picks/lock`.

## 🔒 FastAPI / Auth considerations
- Axios is configured with `withCredentials: true` to allow cookie-based sessions. If you adopt HTTP-only cookie auth in the backend, ensure FastAPI:
  - Sets `HttpOnly`, appropriate `SameSite` / `Secure` attributes on cookies
  - Enables CORS with `allow_credentials=True` and lists the frontend origin (e.g., `http://localhost:5173`) in `allowed_origins`.

## 🐞 Troubleshooting
- "Cannot find module" for images/SVGs: ensure `src/types/custom.d.ts` exists. If TypeScript still complains, restart the TS server in VS Code: _Cmd/Ctrl+Shift+P → TypeScript: Restart TS server_.
- If `npm` is not found: install Node via Homebrew (`brew install node`) or nvm.
- If `npm install` fails with `ETARGET` (e.g. "No matching version found for tailwindcss@^3.5.0"), try one of the following:
  - Update the dependency to a published version: `npm install tailwindcss@latest -D` (this will add a compatible version to your package.json).
  - Or update `tailwindcss` in `package.json` to a stable `3.4.x` version, then run `npm install` again.
  - Clear the npm cache and retry: `npm cache clean --force` then `npm install`.

---

If you'd like, I can add automated tests (unit + E2E), a checklist for code reviews, or expand this into a full contributor guide. Which would you prefer next?