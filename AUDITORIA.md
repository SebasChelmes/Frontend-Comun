# Auditoría de Código — Sebach AI Frontend

> **Fecha:** 2026-07-02
> **Proyecto:** Sebach AI Frontend (`sebach-ai-frontend`)
> **Branch:** (default)
> **TypeScript:** `tsc --noEmit` → Sin errores
> **Versión:** 0.1.0 (prototipo / mock data)

---

## Índice

1. [Bugs encontrados](#1-bugs-encontrados)
2. [Código duplicado](#2-código-duplicado)
3. [Incongruencias de lógica](#3-incongruencias-de-lógica)
4. [Código basura / muerto](#4-código-basura--muerto)
5. [Problemas de accesibilidad (a11y)](#5-problemas-de-accesibilidad-a11y)
6. [Problemas de TypeScript / tipado](#6-problemas-de-typescript--tipado)
7. [Problemas de CSS / diseño](#7-problemas-de-css--diseño)
8. [Malas prácticas / deuda técnica](#8-malas-prácticas--deuda-técnica)
9. [Resumen de hallazgos](#9-resumen-de-hallazgos)

---

## 1. Bugs encontrados

### 1.1 — Botones sin handler (UI inerte)

Varios botones en la interfaz no tienen `onClick` ni funcionalidad asociada. El usuario puede clickearlos pero no pasa nada:

| Archivo | Línea | Elemento | Problema |
|---|---|---|---|
| `src/pages/DiagramaView.tsx` | 257 | "Guardar cambios" | `onClick` ausente |
| `src/pages/DiagramaView.tsx` | 258-260 | "Exportar" | `onClick` ausente |
| `src/pages/DiagramaView.tsx` | 261 | "Analizar proceso" | `onClick` ausente |
| `src/pages/DiagramaView.tsx` | 340-342 | "Insertar paso después" | `onClick` ausente |
| `src/pages/DiagramaView.tsx` | 344 | "Descartar cambios" | `onClick` ausente |
| `src/pages/GuiaView.tsx` | 229-234 | "Insertar paso aquí" | `onClick` ausente |
| `src/pages/GuiaView.tsx` | 322-324 | "Nuevo paso" | `onClick` ausente |
| `src/pages/Login.tsx` | 62 | "¿La olvidaste?" (`<a>`) | Sin `href` ni `onClick` |
| `src/pages/Login.tsx` | 100 | "Solicitar acceso" (`<a>`) | Sin `href` ni `onClick` |
| `src/pages/Conectores.tsx` | 103-105 | "Conectar con Google" / "Configurar Jira" | Son `<a>` sin `href` |

### 1.2 — Diagrama: "Guardar cambios" no guarda nada

**Archivo:** `src/pages/DiagramaView.tsx:240-251`

El componente `NodePanel` tiene estado local (`label`, `actor`, `durMin`, `durMax`) que se edita en inputs, pero el botón "Guardar cambios" (línea 257) no tiene `onClick`. Los cambios existen solo en estado local, nunca se persisten ni al diagrama original ni siquiera al estado local del componente padre.

### 1.3 — Guía: "Guardar paso" no persiste cambios

**Archivo:** `src/pages/GuiaView.tsx:79-115`

El componente `StepContent` tiene estado local (`title`, `description`). Al hacer clic en "Guardar paso" (línea 103-108), solo ejecuta `setEditing(false)`. **Nunca llama a `setSteps`** para actualizar la guía. Los cambios se pierden en el siguiente render o al cambiar de paso.

### 1.4 — Diagrama: "Eliminar este paso" no elimina nada

**Archivo:** `src/pages/DiagramaView.tsx:345-348` + línea 384-386

El botón "Eliminar este paso" llama a `handleDelete`, que solo ejecuta `setSelected(null)`. No modifica el array de nodos del diagrama. Es funcionalmente un no-op.

### 1.5 — SVG markers de leyenda rotos

**Archivo:** `src/pages/DiagramaView.tsx:219`

```jsx
markerEnd={`url(#arrow-legend-${label})`}
```

El `<defs>` del SVG de edges solo define markers para `['normal', 'yes', 'no', 'loop']` (línea 106). Los markers referenciados en la leyenda (`arrow-legend-Sí`, `arrow-legend-Rama No`, etc.) **no existen** en el DOM. Esto produce warnings de SVG y las flechas de la leyenda se renderizan sin punta de flecha.

### 1.6 — MCP Local: botón "Reconectar" también corre "Probar conexión"

**Archivo:** `src/pages/McpLocal.tsx:56-63`

El botón de recargar (refresh) en el header ejecuta `handleTest`, que cambia el estado a `'testing'` y luego a `'connected'` tras 1.4s. Es el mismo handler que "Probar conexión" del formulario. Si la conexión está en 'disconnected', el refresh también la pondrá como 'connected' falsamente.

### 1.7 — ProcessCard: sin teclado accesible

**Archivo:** `src/components/ProcessCard.tsx:14`

```tsx
<article className="pc" onClick={...} role="button" tabIndex={0}>
```

Tiene `role="button"` y `tabIndex={0}` pero no tiene manejador `onKeyDown` para Enter/Space. No se puede activar la card solo con teclado.

---

## 2. Código duplicado

### 2.1 — `SEVERITY_COLOR` duplicado en dos archivos

**Archivos:** `src/pages/DiagramaView.tsx:29-33` y `src/pages/GuiaView.tsx:19-23`

```typescript
const SEVERITY_COLOR: Record<string, string> = {
  Alta:  'var(--danger)',
  Media: 'var(--warn)',
  Baja:  'var(--ok)',
};
```

Definición idéntica en dos lugares. Debería estar en un archivo compartido (ej. `src/data/guies.ts` o un archivo de constantes).

### 2.2 — Patrón de empty state repetido

El mismo patrón de "empty state" (icono + título + descripción) aparece implementado manualmente en al menos 5 lugares:

- `src/pages/Skills.tsx:57-65`
- `src/pages/Comandos.tsx:53-61`
- `src/pages/Automatizaciones.tsx:22-38`
- `src/pages/Conectores.tsx:191-199` y `215-223`
- `src/components/AgentPanels.tsx:60-70` (componente `BoxedEmpty`)
- `src/components/AgentPanels.tsx:72-81` (componente `CenterEmpty` — variante distinta)

Cada uno tiene su propio marcado HTML y clases CSS. Se podrían unificar en un componente `<EmptyState>`.

### 2.3 — Patrón de card duplicado

Tres componentes implementan el mismo patrón visual de "card con header + preview + footer":

- `src/components/ProcessCard.tsx` → `pc`
- `src/components/AgentCard.tsx` → `ag`
- `src/pages/Conectores.tsx` → `cn-card` (ProviderCard / SoonCard)

Idéntica estructura: top badge row, title, meta, preview, foot. Cada una con su propio sistema de clases CSS.

### 2.4 — Escape key handler manual vs `useDismiss`

**Archivo:** `src/components/AgentEditModal.tsx:18-22`

```typescript
useEffect(() => {
  const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
  window.addEventListener('keydown', onKey);
  return () => window.removeEventListener('keydown', onKey);
}, [onClose]);
```

El hook `useDismiss` (en `src/hooks/useDismiss.ts`) ya implementa exactamente esto para todos los dropdowns. Este modal podría usar `useDismiss` pero implementa el mismo patrón manualmente.

---

## 3. Incongruencias de lógica

### 3.1 — Filtro "Manuales" / "Digitales" semánticamente incorrecto

**Archivo:** `src/pages/Procesos.tsx:8-12`

```typescript
FILTERS = [
  { id: 'todos', label: 'Todos' },
  { id: 'manuales', label: 'Manuales' },
  { id: 'digitales', label: 'Digitales' },
];
```

Internamente, `manuales` filtra por `p.kind !== 'flujograma'` y `digitales` por `p.kind !== 'guia'`. Esto implica que:
- **flujograma → Manuales** (incorrecto: un flujograma no es necesariamente manual)
- **guia → Digitales** (confuso: una guía también puede ser impresa)

La metadata ya expone esta distinción en `p.meta` (dice "Insights Hub" o "Tracker Hub"), que sería más precisa como etiqueta de filtro.

### 3.2 — `useMemo` con función `getAgent` en dependencias

**Archivo:** `src/components/AppShell.tsx:22-45`

```typescript
const { getAgent } = useAgents();
// ...
const crumb = useMemo(() => {
  // ... usa getAgent(m[1])
}, [pathname, getAgent]);
```

`getAgent` es una función creada en `AgentsContext` dentro de `useMemo`, pero cambia de identidad en cada render porque está dentro del objeto `value` de `useMemo` que depende de `[agents]`. Esto hace que el `useMemo` del breadcrumb se recalcule más de lo necesario. Mejor pasar `agents` directamente.

### 3.3 — `SidebarRail` no marca sub-rutas como activas

**Archivo:** `src/components/Sidebar.tsx:36-44`

```typescript
const RAIL_ITEMS = [
  // ...
  { label: 'Hub de Agentes IA', Icon: AgentsIcon, path: '/agentes' },
  // ...
];
```

En el rail colapsado, el ítem "Hub de Agentes IA" solo se marca activo en `/agentes`, pero no en sus sub-rutas (`/conectores`, `/mcp-local`, `/skills`, `/comandos`), a diferencia del sidebar expandido (línea 75) que sí las incluye.

### 3.4 — Edición de guía en memoria volátil

**Archivo:** `src/pages/GuiaView.tsx:262-263`

```typescript
const [steps, setSteps] = useState(guide?.steps ?? []);
```

Los pasos se cargan desde `guide` (datos mock importados) pero las ediciones solo viven en `steps` del estado local. No hay sincronía con el `guide` original (que es `const`). `deleteStep` llama a `setSteps`, pero el paso se "restaura" al cambiar de ruta y volver (porque los datos mock nunca se modifican).

### 3.5 — NodePanel sin conexión con el diagrama padre

**Archivo:** `src/pages/DiagramaView.tsx:240-352`

NodePanel tiene su propio estado local editable, pero no hay forma de escribir los cambios de vuelta al `diagram` original (que es `const`). No hay callback `onSave`, ni estado compartido, ni mutación. Es UI decorativa.

---

## 4. Código basura / muerto

### 4.1 — `integrations` en Agent nunca se muestra

**Archivo:** `src/data/agents.ts`

El campo `integrations: string[]` está definido en la interfaz `Agent` y poblado con datos (ej. `['gmail', 'calendar', 'drive', 'outlook']`), pero **nunca se renderiza en ninguna parte** del frontend. El comentario dice "Reservado: hoy no se muestran en la card, pero se conservan para el detalle del agente". El detalle del agente (`AgentDetail.tsx`) tampoco lo muestra.

### 4.2 — `AVATAR_COLORS` y `AVATAR_EMOJIS` nunca se usan

**Archivo:** `src/data/agents.ts:31-44`

Arrays exportados pero con zero imports en todo el proyecto. El comentario dice "Por ahora el avatar se muestra vacío (placeholder)." Son datos muertos.

### 4.3 — `avatarEmoji`, `avatarColor`, `hoursPerWeek` en Agent

**Archivo:** `src/data/agents.ts`

Campos opcionales de la interfaz `Agent` que nunca se leen ni renderizan. Solo `avatarImage` se usa (en `Avatar.tsx`).

### 4.4 — `tooltipWrapperStyle` en chartTheme

**Archivo:** `src/components/dashboard/chartTheme.ts:42`

```typescript
export const tooltipWrapperStyle = { outline: 'none' };
```

Exportado pero nunca importado por ningún archivo.

### 4.5 — `CHART_SERIES` sin uso

**Archivo:** `src/components/dashboard/chartTheme.ts:25-32`

```typescript
export const CHART_SERIES = [CHART.insights, CHART.tracker, CHART.agents, CHART.blue, CHART.warn, CHART.cyan];
```

Exportado pero nunca importado.

### 4.6 — `ProcessIcon` local duplicado

**Archivo:** `src/pages/DiagramaView.tsx:482-489`

Define un componente `ProcessIcon` local con un SVG de cuadrícula simple. Ya existe `ProcessIcon` en `src/components/icons.tsx:29-30`.

### 4.7 — SettingsIcon usa CSS vars en SVG

**Archivo:** `src/components/icons.tsx:57-58`

```tsx
<circle cx="9" cy="7" r="2.4" fill="var(--surface-2)" />
<circle cx="15" cy="17" r="2.4" fill="var(--surface-2)" />
```

SVGs con `fill="var(--surface-2)"` funcionan en navegadores modernos solo si el SVG está inline en el HTML. Si se usan como imagen externa (`<img src>`) se rompen, aunque en este proyecto siempre son inline. No obstante, es un antipatrón: los otros íconos usan `stroke="currentColor"` y `fill="none"`, y este rompe la convención.

---

## 5. Problemas de accesibilidad (a11y)

### 5.1 — Cards sin interacción por teclado

- `ProcessCard.tsx:14` — `role="button" tabIndex={0}` sin `onKeyDown`
- `AgentCard.tsx:14` — Mismo patrón (navega al hacer clic), sin `onKeyDown`
- `Conectores.tsx` — Cards clickeables sin soporte de teclado

### 5.2 — Enlaces sin href

- `Login.tsx:62` — `<a className="field__link">¿La olvidaste?</a>` sin `href`
- `Login.tsx:100` — `<a className="login-foot__link">Solicitar acceso</a>` sin `href`

### 5.3 — Lista de navegación sin `<ul>`/`<li>`

**Archivo:** `src/components/Sidebar.tsx`

La navegación del sidebar usa `<button>` sueltos dentro de un `<nav>` sin estructura de lista. Esto es menos semántico para lectores de pantalla.

### 5.4 — Tooltips solo visibles en hover

**Archivo:** `src/components/Sidebar.css:322-345`

Los tooltips del rail colapsado se muestran con `:hover`. No hay soporte para `:focus-visible` ni para mostrarlos con teclado.

---

## 6. Problemas de TypeScript / tipado

### 6.1 — `noUnusedParameters` puede romper el build

Con `noUnusedParameters: true` en `tsconfig.json`, cualquier parámetro no usado causará error. Al momento del análisis, el build pasa, pero añadir código nuevo requiere cuidado.

### 6.2 — `'--dot' as React.CSSProperties`

**Archivo:** `src/components/ModelSelector.tsx:86`

```tsx
style={{ background: g.dot, '--dot': g.dot } as React.CSSProperties}
```

`--dot` no es una propiedad CSS estándar en `React.CSSProperties`. TypeScript no se queja porque se fuerza con `as`, pero es técnicamente incorrecto. Funciona porque React pinta el estilo inline en el DOM, donde la custom property sí es válida.

### 6.3 — `any` implícito en callbacks no tipados

**Archivo:** `src/components/ProcessCard.tsx:9-13`

```typescript
interface Props {
  p: Process;
  onCopyLink?: () => void;
  onShare?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
}
```

Las props de callback son opcionales pero en `CardMenu.tsx` se llaman como `fn?.()`. Esto es correcto, pero en `Procesos.tsx` siempre se pasan explícitamente. El tipado es correcto pero inconsistente con otras partes del código que no usan callbacks opcionales.

---

## 7. Problemas de CSS / diseño

### 7.1 — Layout responsive potencialmente roto en mobile

**Archivo:** `src/components/AppShell.css:10-18`

```css
.app-shell {
  width: min(1500px, 100%);
  height: min(960px, calc(100vh - 80px));
}
```

El `height: min(960px, calc(100vh - 80px))` fuerza una altura fija máxima. En pantallas muy pequeñas, combinado con `padding: 40px 24px` del contenedor padre y los 80px de resta, el contenido puede quedar extremadamente comprimido o desbordar.

### 7.2 — Upsell absolutamente centrado sin adaptarse al contenido

**Archivo:** `src/components/AppShell.css:89-137`

El banner "Pasá a PRO" usa `position: absolute; left: 50%; transform: translateX(-50%)`. Cuando se oculta el texto en resoluciones menores a 880px (línea 139-143), el botón "Mejorar plan" queda descentrado porque el padding izquierdo del contenedor (13px) sigue presente.

### 7.3 — Animación de side-fade en sidebar afecta rendimiento

**Archivo:** `src/components/Sidebar.css:9-18`

```css
.sb { animation: side-fade 0.22s ease; }
.sbr { animation: side-fade 0.22s ease; }
```

Cada vez que el sidebar expandido/contraído se monta (en cada toggle), se ejecuta una animación de opacidad, lo que puede causar parpadeo visual. El sidebar debería persistir en el DOM y solo animar el ancho, como ya hace `.app-side`.

---

## 8. Malas prácticas / deuda técnica

### 8.1 — Todo el state es in-memory

Todos los datos (`processes`, `agents`, `guides`, `diagrams`, `dashboard`) son constantes importadas de archivos `.ts`. Las ediciones (cambiar nombre de agente, duplicar proceso) viven solo en React state y se pierden al refrescar la página. No hay persistencia (ni API, ni localStorage, ni IndexedDB).

### 8.2 — `getAgent` mutable fuera de contexto

**Archivo:** `src/context/AgentsContext.tsx:24`

```typescript
getAgent: (id) => agents.find((a) => a.id === id),
```

La función `getAgent` se recrea en cada `useMemo` que depende de `[agents]`, pero `agents` cambia de referencia en cada `setAgents`. Esto invalida cualquier `useMemo` o `useEffect` que use `getAgent` como dependencia.

### 8.3 — `DiagramaView` mescla SVG edge markers inline con leyenda

**Archivo:** `src/pages/DiagramaView.tsx:105-118`

Los markers de flecha están definidos en un `<defs>` dentro del SVG de edges. La leyenda (fuera del SVG) referencia esos markers con `url("#arrow-legend-${label}")`, pero el scope del SVG hace que la referencia no siempre funcione. Los markers deberían definirse en un `<defs>` global al documento o usarse URLs absolutas con `document.getElementById`.

### 8.4 — Nombres de clases CSS inconsistentes

El proyecto usa múltiples prefijos de clases que no siempre siguen BEM o un naming consistente:

- `sb__*` — Sidebar
- `pc__*` — ProcessCard
- `ag__*` — AgentCard
- `cn-*` — Conectores (a veces sin doble guion bajo)
- `dc-*` — Dashboard components
- `mcp-*` — MCP Local
- `gv-*` — GuiaView
- `dv-*` — DiagramaView
- `ad__*` — AgentDetail
- `ap__*` — AgentPanels
- `aem__*` — AgentEditModal
- `app-*` — AppShell

Algunos usan `__` (BEM), otros usan `-` simple sin block definitivo. Esto dificulta encontrar clases en el CSS.

### 8.5 — CSS de lib-page.css importado con side-effect

**Archivo:** `src/pages/Skills.tsx:1` y `src/pages/Comandos.tsx:2`

```typescript
import '../styles/lib-page.css';
```

Importar CSS como side-effect sin usar módulos CSS puede causar conflictos de nombres y problemas de orden. Esto funciona con Vite pero no escala bien.

### 8.6 — DesignControls visible en producción

**Archivo:** `src/components/DesignControls.tsx`

El panel flotante `DesignControls` permite cambiar acento y plan en tiempo real, pero **está visible tanto en Login como en el AppShell**. No hay flag de entorno que lo oculte en producción. Podría exponerse a usuarios finales sin intención.

---

## 9. Resumen de hallazgos

| Categoría | Cantidad | Severidad |
|---|---|---|
| Bugs funcionales (botones que no hacen nada) | 12 | Alta |
| Bugs de SVG / render | 1 | Media |
| Bugs de lógica de estado | 4 | Alta |
| Código duplicado | 4 | Media |
| Dead code / exports no usados | 6 | Baja |
| Incongruencias de lógica | 5 | Media |
| Problemas de accesibilidad | 4 | Media |
| Problemas de TypeScript | 2 | Baja |
| Problemas de CSS | 3 | Media |
| Malas prácticas / deuda técnica | 6 | Media |

### Recomendaciones prioritarias

1. **Conectar botones "Guardar" y "Eliminar"** en `DiagramaView.tsx` y `GuiaView.tsx` — son la funcionalidad principal de edición.
2. **Unificar `SEVERITY_COLOR`** en un archivo compartido.
3. **Extraer patrones de EmptyState** en un componente reutilizable.
4. **Extraer patrón de card** unificado (ProcessCard / AgentCard / Conectores).
5. **Ocultar `DesignControls`** detrás de un flag de entorno (`import.meta.env.DEV`).
6. **Arreglar markers de leyenda** en el diagrama SVG.
7. **Agregar `onKeyDown`** a las cards con `role="button"` y `tabIndex={0}`.
8. **Agregar `href` o `onClick`** a los enlaces en Login.tsx.
