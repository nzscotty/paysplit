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
## Data and privacy
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
