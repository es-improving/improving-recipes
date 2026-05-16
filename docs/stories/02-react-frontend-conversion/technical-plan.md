# Technical Plan: React Frontend Conversion

## Overview

Convert the vanilla JS frontend to a React + TypeScript SPA served by Vite, while leaving the Express backend untouched. The app becomes a single-page application with client-side routing via React Router.

---

## Architecture Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Routing | SPA with React Router | Idiomatic React; better training example |
| Frontend source | `client/` top-level directory | Clear separation from backend `src/` |
| Vite output | `dist/public/` | All compiled output lives under `dist/` |
| Static assets | Keep `public/styles.css`; delete HTML + JS files | CSS copied as-is by Vite via `publicDir` |
| Component granularity | Page components + sub-components for Pantry | Better training example of component decomposition |
| State management | All pantry state lifted to `PantryPage` | Explicit data flow; avoids child-to-sibling coordination |
| API layer | One custom hook per API call | Encapsulates fetch logic; good pattern for trainees |
| Dev proxy | Vite proxies `/api` to Express on port 4000 | Keeps API URLs relative; matches production |
| Dev script | `concurrently` with `vite` + `ts-node-dev` | Minimal change from current approach |
| TypeScript config | `client/tsconfig.json` for client; root `tsconfig.json` for server | Independent browser/Node environments |

---

## Directory Structure

```
improving-recipes/
├── client/                      # New: React frontend source
│   ├── index.html               # Vite entry point (replaces public/index.html)
│   ├── tsconfig.json            # Client TS config (browser target)
│   └── src/
│       ├── main.tsx             # React entry; mounts <App /> into #root
│       ├── App.tsx              # BrowserRouter + routes + shared Layout
│       ├── pages/
│       │   ├── RecipesPage.tsx
│       │   └── PantryPage.tsx   # Owns all pantry state
│       ├── components/
│       │   ├── IngredientRow.tsx     # Display row with Edit/Delete buttons
│       │   ├── IngredientForm.tsx    # Inline add/edit form with validation
│       │   └── DeleteConfirm.tsx     # Inline "Are you sure? Yes/No" UI
│       └── hooks/
│           ├── useIngredients.ts        # GET /api/ingredients
│           ├── useCreateIngredient.ts   # POST /api/ingredients
│           ├── useUpdateIngredient.ts   # PUT /api/ingredients/:id
│           ├── useDeleteIngredient.ts   # DELETE /api/ingredients/:id
│           └── useRecipes.ts            # GET /api/recipes
├── public/
│   └── styles.css               # Kept; Vite copies it to dist/public/
├── src/                         # Express backend — unchanged except server.ts
│   └── server.ts                # Update static path + add SPA catch-all
├── vite.config.ts               # New
├── tsconfig.json                # Server only (unchanged)
└── package.json                 # Updated scripts + new deps
```

---

## Key Implementation Details

### `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: 'client',
  publicDir: '../public',        // copies public/styles.css to dist/public/
  build: {
    outDir: '../dist/public',
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
})
```

### `src/server.ts` changes

Two changes only:

1. Update static file path:
   ```ts
   // Before:
   app.use(express.static(path.join(__dirname, '..', 'public')));
   // After:
   app.use(express.static(path.join(__dirname, '..', 'dist', 'public')));
   ```

2. Add SPA catch-all **after** all API routes:
   ```ts
   app.get('*', (_req, res) => {
     res.sendFile(path.join(__dirname, '..', 'dist', 'public', 'index.html'));
   });
   ```

### `package.json` script changes

```json
"scripts": {
  "dev": "PORT=4000 concurrently \"vite\" \"ts-node-dev --respawn --transpile-only src/server.ts\"",
  "build": "tsc -p tsconfig.json && vite build",
  "start": "node dist/server.js"
}
```

### New dependencies

```
dependencies:
  react, react-dom, react-router-dom

devDependencies:
  @types/react, @types/react-dom
  @vitejs/plugin-react
  vite
```

### `client/tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

### URL changes

| Before | After |
|---|---|
| `/` | `/` (unchanged) |
| `/pantry.html` | `/pantry` |

The nav links in `App.tsx` use React Router `<Link>` components pointing to `/` and `/pantry`.

### Custom hook pattern

Each hook encapsulates one API call. Example:

```ts
// hooks/useIngredients.ts
export function useIngredients() {
  const [ingredients, setIngredients] = useState<PantryItem[]>([]);

  async function refresh() {
    const res = await fetch('/api/ingredients');
    if (res.ok) setIngredients(await res.json());
  }

  useEffect(() => { refresh(); }, []);

  return { ingredients, refresh };
}
```

Mutation hooks (create, update, delete) return an async function and a `submitting` boolean for disabling the Save button during in-flight requests.

### `PantryPage` state shape

```ts
type PantryState =
  | { mode: 'list' }
  | { mode: 'adding' }
  | { mode: 'editing'; id: string }
  | { mode: 'deleting'; id: string }
```

A single `mode` discriminated union replaces multiple boolean flags, making impossible states unrepresentable.

---

## Files to Delete

- `public/index.html`
- `public/pantry.html`
- `public/js/` (entire directory)
- `tsconfig.client.json`

---

## Deployment

No changes to the GitHub Actions workflow (`npm ci` → `npm run build` → `pm2 restart`). The `vite build` command is invoked as part of `npm run build`, and Vite's output lands in `dist/public/` where Express expects it.

---

## Implementation Order

1. Install new dependencies and update `package.json` scripts
2. Add `vite.config.ts` and `client/tsconfig.json`
3. Scaffold `client/index.html` and `client/src/main.tsx`
4. Build `App.tsx` with React Router (two routes, shared header/nav)
5. Implement `useRecipes` hook + `RecipesPage`
6. Implement all pantry hooks (`useIngredients`, `useCreateIngredient`, `useUpdateIngredient`, `useDeleteIngredient`)
7. Implement pantry components (`IngredientRow`, `IngredientForm`, `DeleteConfirm`) + `PantryPage`
8. Update `src/server.ts` (static path + catch-all)
9. Delete old files (`public/index.html`, `public/pantry.html`, `public/js/`, `tsconfig.client.json`)
10. Verify build output and dev server work end-to-end
