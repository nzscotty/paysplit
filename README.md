# Paysplit

Paysplit is a local-only money allocation planner. Enter the amount you are paid, decide what percentage should go to each account, and use the result to set up automatic transfers.
There is no account, backend, or tracking. Your split is saved in your browser so you can return to the plan on the same device.


## What it does
- Calculates dollar amounts from a pay amount and allocation percentages.
- Supports weekly, fortnightly, and monthly pay frequencies.
- Shows the amount and percentage still unassigned, including over-allocation warnings.
- Lets you rename, add, remove, and restore allocation rows.
- Provides a five-account structure for pay, everyday spending, debt reduction, short-term goals, and long-term goals.
- Generates a payday transfer checklist from the current split.
- Works as an installable Progressive Web App (PWA).

The calculator starts with a recommended example split:
| Account | Percentage |
| --- | ---: |
| Pay account | 40% |
| Card account | 20% |
| Debt buster account | 20% |
| Short term account | 10% |
| Long term account | 10% |

These are starting points, not financial advice. Adjust the structure to fit your income, commitments, and goals.

## Try it online

The live app is available at [nzscotty.github.io/paysplit](https://nzscotty.github.io/paysplit/).

## Getting started

Requirements:

- Node.js 20 or newer
- npm

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot reload. |
| `npm run build` | Type-check and create a production build. |
| `npm run preview` | Preview the production build locally. |
| `npm run test` | Run the calculation tests with Vitest. |
| `npm run lint` | Run Oxlint. |

## Deployment

The `main` branch deploys automatically to GitHub Pages through [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The Vite production build uses `/paysplit/` as its base path so assets load correctly from the repository site.

To enable the workflow on a new repository, set **Settings > Pages > Build and deployment > Source** to **GitHub Actions**.

## Data and privacy

Paysplit stores the current plan in browser `localStorage` under the `paysplit-state-v2` key. No data is sent to a server by the app. Clearing browser storage, using a different browser, or using a different device will not carry the plan across.

Use the **Clear** control to remove all allocation rows from the current plan. Use **Defaults** to restore the example account rows while keeping the current pay amount and frequency.

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- `usehooks-ts` for local storage state
- `lucide-react` for interface icons
- `vite-plugin-pwa` for the manifest and service worker
- Vitest for calculation tests
- Oxlint for linting

## Project structure

```text
src/
  components/       UI sections and calculator controls
  lib/              Calculation and formatting helpers
  types/            Shared application types
  App.tsx           Persisted state and page composition
  index.css         Layout and visual styling
public/             PWA and favicon assets
```
