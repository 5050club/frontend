# 5050 Club — Frontend

This is a Vite + React + TypeScript frontend for the 5050 Club betting league.

Quick start:

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Configure backend API by setting `VITE_API_BASE` in `.env` if needed (defaults to `http://localhost:8000`).

Notes:
- Auth is implemented as a small context that expects `/auth/login` and `/auth/register` endpoints returning an access token and user object.
- Pages scaffolded: Landing, Login, Register, Main, My Team, League Picks, Standings.
- Tailwind is configured for quick styling.

Next steps:
- Build out `My Team` page to fetch weekly games and implement draft vs lock-in pick behavior (done: draft + lock, min $1 enforcement, bankroll calculation).
- Implement timezone display using the user's locale and server kickoff timestamps (ISO + tz) (done: uses Intl.DateTimeFormat).
- Add mock API endpoints (MSW) to develop UI without backend; enable with `VITE_USE_MOCKS=true`.
- Implemented League Picks page (hides picks until kickoff) and Standings page with mock data.
- Improved styling and responsive UX for Standings and League Picks (cards, badges, responsive grid).
- Added local team SVG placeholders and a `teamMap` for logos/colors (`src/assets/teams`, `src/utils/teams.ts`).
- Added mobile polish: collapsible game cards and small animations for better mobile UX.
- Added a visual theme switcher (`Team colors` vs `Neutral`) with `ThemeProvider` and `ThemeToggle`. Theme persists in localStorage.
- Added subtle animations: logo hover scale, collapse/fade transitions, icon rotation on expand.
- Integrate with your existing FastAPI endpoints for games/picks/standings when ready (switch off mocks by setting `VITE_USE_MOCKS=false`).

**See** `CONTRIBUTING.md` for minimum requirements & quick start information.
