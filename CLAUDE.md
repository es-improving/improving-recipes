## Context

Read [[README.md]] for greater context and what the application does.

## Story System

The stories and their accompaning artifacts are stored here: `docs/stories/{01}-story-name/`

See [docs/story-system.md](docs/story-system.md) for information on how the skills are ordered in this project. Every a new session is started, this MUST be read.

## Technical Stack

- **Runtime:** Node.js with TypeScript
- **Backend:** Express 4 (`src/server.ts`) serving a REST API under `/api/recipes`
- **Frontend:** React
- **Testing:** Jest
- **Data layer:** In-memory store (`src/db/memoryStore.ts`) — intentionally temporary, seeded with sample data, resets on restart.
- **Build:** `tsc` compiles both server (`tsconfig.json`) and client (`tsconfig.client.json`) TypeScript; output goes to `dist/`
- **Dev server:** `ts-node-dev` for the server (hot reload) + `tsc --watch` for client, run together via `concurrently`

## Deployment

The app runs behind nginx on an EC2 instance. The process is managed by [PM2](https://pm2.keymetrics.io/).

Deployment is done through [a GitHub action](https://github.com/es-improving/improving-recipes/settings/actions/runners/2). This action is using a self-hosted runner sitting on the EC2 instance that the app is running on.
