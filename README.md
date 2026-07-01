# Sebach AI — Frontend

La **única cara** de la plataforma (Insights Hub · Agents Hub · Tracker Hub).
SPA en **React + Vite + TypeScript**, implementada a partir del diseño en
Claude Design (`.dc.html`) y de `SPEC-FRONTEND-COMUN.md`.

## Qué incluye

- **`/login`** — acceso único (panel de marca con gradiente + formulario, magic link).
- **`/procesos`** — el dashboard común: sidebar estilo Notion/Web3 (expandible y
  plegado a rail), top bar, y la grilla unificada de **flujogramas** (Insights Hub)
  y **guías digitales** (Tracker Hub).
- **Gating por plan** (`FREE` / `PRO` / `PREMIUM+`): tarjeta de upgrade y candados
  premium se muestran según el plan, igual que en el diseño.
- **Acento conmutable** (índigo `#3A3678` / teal `#1C7C7C` / violeta `#7C3AED`)
  publicado como `--accent`, re-tematiza toda la app.

El panel flotante (ícono ⚙ abajo a la derecha) reproduce los *props* del diseño
(acento + plan) para probar el theming y el gating en vivo.

## Estilado

Paleta (base crema + índigo de marca) y tipografía (**DM Sans + DM Mono**) siguen
el design system de Agents Hub — ver [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md).
Todos los colores/tipos viven en [`src/styles/tokens.css`](src/styles/tokens.css)
como variables CSS — los componentes no hardcodean colores (criterio de la spec).

## Scripts

```bash
npm install
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # build de producción (tsc --noEmit && vite build)
npm run preview  # previsualizar el build
```

## Estructura

```
src/
  main.tsx                 # entry + router (layout AppShell + rutas anidadas)
  context/
    AppContext             # accent + plan → --accent, gating
    AgentsContext          # store compartido de agentes (persiste ediciones)
  hooks/useDismiss         # click-afuera + Escape para dropdowns
  pages/
    Login (+ css)
    Procesos               # grilla + CardMenu (compartir/duplicar/eliminar)
    Agentes                # Hub de Agentes (filtros + búsqueda)
    AgentDetail (+ css)    # detalle del agente + tabs (Chat, Archivos, …)
  components/
    AppShell (+ css)       # layout: sidebar (expandible/rail) + top bar + Outlet
    Sidebar, UserMenu, ModelSelector, DesignControls
    GridToolbar, CardMenu, ProcessCard, AgentCard, AgentEditModal
    AgentPanels            # paneles de tabs del agente (Archivos/Agenda/…)
    Avatar, BrandMark, icons
  data/                    # processes.ts, agents.ts (datos de ejemplo)
  styles/                  # tokens.css + global.css
```

## Próximos pasos (según specs)

Esta entrega cubre el **shell**, **Procesos** y el **Hub de Agentes** (con detalle del
agente). Lo siguiente: login real con Supabase (BFF de sesión), conectar la API de
Agents Hub, vista Scribe editable + export PDF, y el diagrama Reactflow de Insights Hub.
