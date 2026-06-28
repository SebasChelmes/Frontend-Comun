# Geminus — Frontend común

La **única cara** del ecosistema Geminus (Insights Hub · Agents Hub · Tracker Hub).
SPA en **React + Vite + TypeScript**, implementada a partir del diseño
`Geminus Frontend.dc.html` (Claude Design) y de `SPEC-FRONTEND-COMUN.md`.

## Qué incluye

- **`/login`** — acceso único (panel de marca con gradiente + formulario, magic link).
- **`/procesos`** — el dashboard común: sidebar estilo Notion/Web3 (expandible y
  plegado a rail), top bar, y la grilla unificada de **flujogramas** (Insights Hub)
  y **guías digitales** (Tracker Hub).
- **Gating por plan** (`FREE` / `PRO` / `PREMIUM+`): tarjeta de upgrade y candados
  premium se muestran según el plan, igual que en el diseño.
- **Acento conmutable** (`#F88379` / `#22d3ee` / `#a855f7`) publicado como
  `--accent`, re-tematiza toda la app.

El panel flotante (ícono ⚙ abajo a la derecha) reproduce los *props* del diseño
(acento + plan) para probar el theming y el gating en vivo.

## Design tokens

Todos los colores/tipos viven en [`src/styles/tokens.css`](src/styles/tokens.css)
como variables CSS — los componentes no hardcodean colores (criterio de la spec).

## Scripts

```bash
npm install
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # build de producción (tsc -b && vite build)
npm run preview  # previsualizar el build
```

## Estructura

```
src/
  main.tsx              # entry + router (/login, /procesos)
  context/AppContext    # accent + plan (props del diseño) → --accent, gating
  pages/                # Login, Procesos (+ CSS)
  components/           # Sidebar (expandido/rail), ProcessCard, icons, BrandMark, DesignControls
  data/processes.ts     # las 6 cards de ejemplo del diseño
  styles/               # tokens.css + global.css
```

## Próximos pasos (según specs)

Esta entrega cubre el **esqueleto del shell** y la sección **Procesos** (Fase 1 de
`SPEC-FRONTEND-COMUN.md §10`). Lo siguiente: login real con Supabase (BFF de sesión),
conectar Agents Hub, vista Scribe editable + export PDF, y el diagrama Reactflow
reutilizado de Insights Hub.
