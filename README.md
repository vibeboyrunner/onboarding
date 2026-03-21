# Onboarding App

A minimal Express service used as the reference app during VibeBoyRunner onboarding. It demonstrates the `.vibeboyrunner` app layout that VBR dev pools discover and orchestrate.

## Endpoints

| Method | Path      | Description                                                        |
|--------|-----------|--------------------------------------------------------------------|
| GET    | `/hello`  | Returns `{ message: "Hello, {name}!" }` — accepts `?name` query param (defaults to `World`) |
| GET    | `/health` | Returns `{ status: "ok" }`                                        |

## Quick Start

### Local development (watch mode)

```bash
npm install
npm run dev
```

Runs `tsx watch src/index.ts` — restarts on file changes, no build step needed.

### Build and run

```bash
npm run build
npm start
```

Compiles TypeScript to `dist/` and runs `node dist/index.js`.

## Environment Variables

| Variable   | Default       | Description          |
|------------|---------------|----------------------|
| `APP_PORT` | `3000`        | HTTP listen port     |
| `NODE_ENV` | `development` | Node environment     |

## VibeBoyRunner Integration

The `.vibeboyrunner/` directory contains everything the VBR manager needs to discover and run this app inside a dev pool:

```
.vibeboyrunner/
├── config.json          # port bindings and default env vars
├── docker-compose.yml   # compose service definition
└── Dockerfile           # container image build
```

### config.json

Declares port and env bindings consumed by the manager when allocating resources:

```json
{
  "bindings": {
    "ports": {
      "APP_PORT": 3000
    },
    "envs": {
      "NODE_ENV": "development"
    }
  }
}
```

### docker-compose.yml

Defines the `app` service. The manager calls `docker compose up -d --build` with resolved port and env overrides.

### Dockerfile

Builds from `node:20-bookworm-slim`, installs deps, compiles TypeScript, and keeps the container alive with `tail -f /dev/null` so the manager can exec commands inside it.

## Tech Stack

| Category      | Technology             |
|---------------|------------------------|
| Runtime       | Node.js 20             |
| Language      | TypeScript 5.8         |
| Framework     | Express 4.x            |
| Build         | `tsc`                  |
| Dev           | `tsx` (watch mode)     |
| Container     | Docker (Debian slim)   |
| Orchestration | Docker Compose         |

## How It Fits the Onboarding Flow

When VBR boots for the first time with an empty workspace, the Father Agent starts the onboarding flow:

1. Clones this repo into the workspace's `apps/` directory.
2. Walks the user through the `.vibeboyrunner` structure.
3. Brings up the workspace dev pool to show the app running inside VBR.
4. Demonstrates feature dev pools and worker agents.

The app is intentionally minimal — just enough to show the full VBR lifecycle without extra complexity.
