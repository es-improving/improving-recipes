## Context

Read [[README.md]] for greater context and what the application does.

## Story System

The stories and their accompaning artifacts are stored here: `docs/stories/{01}-story-name/`

When you are done creating a plan, save it to `docs/stories/{plan-name-folder}/`

The story flow is as follows:

* create-story
* create-ac
* create-technical-plan
* implement-story (not yet created)
* update-documentation (skill not yet created)

## Technical Stack

- **Runtime:** Node.js with TypeScript
- **Backend:** Express 4 (`src/server.ts`) serving a REST API under `/api/recipes`
- **Frontend:** Vanilla JS (`public/js/main.js`) + plain CSS, served as static files by Express
- **Data layer:** In-memory store (`src/db/memoryStore.ts`) — intentionally temporary, seeded with sample data, resets on restart.
- **Build:** `tsc` compiles both server (`tsconfig.json`) and client (`tsconfig.client.json`) TypeScript; output goes to `dist/`
- **Dev server:** `ts-node-dev` for the server (hot reload) + `tsc --watch` for client, run together via `concurrently`

## Deployment

The app runs behind nginx on an EC2 instance. The process is managed by [PM2](https://pm2.keymetrics.io/).

Deployment is done through [a GitHub action](https://github.com/es-improving/improving-recipes/settings/actions/runners/2). This action is using a self-hosted runner sitting on the EC2 instance that the app is running on.
