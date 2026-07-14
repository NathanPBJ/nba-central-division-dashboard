# Pacers Court Command

Interactive Indiana Pacers command-center dashboard with tabs for overview, roster, player stats, team stats, season performance, and franchise history.

## Stack

- Vite + React
- Tailwind CSS
- Recharts
- lucide-react icons
- Vite dev middleware endpoint
- ESPN public data feeds for roster, headshots, player stats, standings, and scoreboard data
- Wikipedia data feeds for franchise history and achievement facts

## Features

- Pacers-inspired premium sports UI with navy, gold, and court-grid visual language
- Responsive tab navigation
- Official Pacers logo from the provided `public/pacers-logo.svg` asset
- Roster cards with real player headshots, search, position filter, and sorting
- Player stat leaderboard with sortable metric chart
- Player comparison chart for points, assists, and rebounds
- Team stat ranking cards and rank/output chart
- Season performance and recent form visualizations
- Automatic insight cards for top scorer, best playmaker, most efficient player, and team strength
- History and achievements section

## Data Note

The app loads live/current data at runtime from `/api/pacers/live`, a Vite dev middleware endpoint that fetches from:

- ESPN public APIs for team profile, current roster, player stats, standings, scoreboard, recent games, and headshots
- Wikipedia APIs for franchise history and achievement fields

`src/data/pacersData.js` remains only as a fallback if those APIs are unavailable during local development.

## Run Locally

```bash
npm install
npm run dev
```

Build check:

```bash
npm run build
```
