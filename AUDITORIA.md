# Auditoría de Código — Sebach AI Frontend

> **Fecha:** 2026-06-30  
> **Alcance:** Todos los archivos fuente en `src/`, `index.html`, `vite.config.ts`, `tsconfig.json`, `package.json`  
> **Propósito:** Identificar bugs, código muerto, violaciones de principios DRY, malas prácticas, incosistencias y documentación desactualizada.  
> **No se realizó ningún cambio de código.**

---

## Resumen Ejecutivo

| Categoría | Cantidad | Severidad |
|-----------|----------|-----------|
| Bugs / errores funcionales | 5 | Alta |
| Código muerto / no utilizado | 5 | Media |
| Violaciones DRY (código repetido) | 7 | Media |
| Malas prácticas de accesibilidad | 5 | Alta |
| Problemas de TypeScript | 3 | Media |
| Documentación desactualizada | 1 | Media |
| Problemas de CSS / estilos | 4 | Baja |
| Inconsistencias generales | 6 | Baja |

---

## 1. Bugs y Errores Funcionales

### 1.1 `onShare` mapea a `copyLink` en Procesos — identidad disfrazada

- **Archivo:** `src/pages/Procesos.tsx:66`
- **Código:**
  ```tsx
  onShare={() => copyLink(p)}
  ```
- **Problema:** El botón "Compartir" en el menú `CardMenu` ejecuta la misma función que "Copiar enlace". Un usuario esperaría compartir mediante el Share API (`navigator.share`), no copiar un link.
- **Severidad:** Media

### 1.2 El botón "Ordenar" en `GridToolbar` se renderiza incluso sin handler

- **Archivo:** `src/components/GridToolbar.tsx:51-54`
- **Código:**
  ```tsx
  <button className="tb-sort" onClick={onSort}>
  ```
- **Problema:** `onSort` es opcional (`onSort?: () => void`). Si no se provee, se renderiza un botón que hace `undefined()` al clickearlo. Aunque JS/TS no crashea porque `undefined` como handler es simplemente no-op, el botón está presente sin funcionalidad.
- **Severidad:** Baja

### 1.3 El ojo de contraseña (`EyeIcon`) no togglea la visibilidad

- **Archivo:** `src/pages/Login.tsx:72-74`
- **Problema:** El ícono del ojo tiene `role="button"` pero ningún `onClick`. El input de password es siempre `type="password"`. No hay forma de revelar la contraseña escrita.
- **Severidad:** Media

### 1.4 Sidebar items son `<a>` sin `href` ni `onClick`

- **Archivo:** `src/components/Sidebar.tsx:83-86, 98-102, 109-113, 145-148, 152-155`
- **Problema:** Múltiples elementos de navegación son `<a>` tags sin `href` y sin `onClick`. No navegan a ningún lado ni tienen comportamiento definido. Ejemplos: "Inicio", "Captura", "Análisis", "Automatizaciones", "Panel de Agencia". Deberían ser `<button>` o tener `href` por semántica HTML.
- **Severidad:** Media

### 1.5 Botón "Entrar" envía formulario pero no hay validación real

- **Archivo:** `src/pages/Login.tsx:14-17, 78`
- **Problema:** El submit del login navega directamente a `/procesos` sin validar credenciales. No hay llamada a API ni verificación de email/password. Esto es esperable para un MVP, pero representa un falso inicio de sesión.
- **Severidad:** Media (esperado para demo, pero documentado)

---

## 2. Código Muerto / No Utilizado

### 2.1 Tipo `GuideStatus` nunca referenciado

- **Archivo:** `src/data/processes.ts:10`
- **Código:**
  ```ts
  export type GuideStatus = 'listo';
  ```
- **Problema:** Definido y exportado, pero nunca usado como tipo en ninguna parte del proyecto. `GuideProcess` no lo utiliza (usa `statusLabel: string`).
- **Severidad:** Baja

### 2.2 `AVATAR_COLORS` y `AVATAR_EMOJIS` nunca se consumen

- **Archivo:** `src/data/agents.ts:31-44`
- **Problema:** Ambas constantes están exportadas con comentarios "reservado para futura personalización" pero no se importan en ningún componente. Son dead code.
- **Severidad:** Baja

### 2.3 `Integration`, `INTEGRATIONS`, `hoursPerWeek` — declarados pero no usados en UI

- **Archivo:** `src/data/agents.ts:9-26, 68`
- **Problema:** El tipo `Integration`, el registro `INTEGRATIONS` y la propiedad `hoursPerWeek` del agente están definidos y exportados, pero nunca se renderizan en la interfaz. `avatarEmoji` y `avatarColor` también son reservados.
- **Severidad:** Baja

### 2.4 Icono `CheckIcon` se exporta pero no se usa

- **Archivo:** `src/components/icons.tsx:105-106`
- **Código:**
  ```tsx
  export const CheckIcon = (p: IconProps) => ...
  ```
- **Problema:** `CheckIcon` está definido y exportado pero no es importado por ningún archivo. Dead code.
- **Severidad:** Baja

### 2.5 `tsconfig.tsbuildinfo` y `tsconfig.node.tsbuildinfo` no están en `.gitignore`

- **Archivo:** `.gitignore`, raíz del proyecto
- **Problema:** Estos archivos de build info de TypeScript no están listados en `.gitignore`. Si se ejecutó `tsc --noEmit`, estos archivos se generan en la raíz y podrían ser trackeados por git (aunque en el estado actual no aparecen en el tree de git).
- **Severidad:** Baja

---

## 3. Violaciones DRY (Código Repetido)

### 3.1 Patrón "click outside + Escape" repetido 4 veces

- **Archivos:**
  - `src/components/Sidebar.tsx:59-71`
  - `src/components/ModelSelector.tsx:47-59`
  - `src/components/CardMenu.tsx:19-31`
- **Problema:** El mismo patrón de `useEffect` con `mousedown` + `keydown('Escape')` se repite en 3 componentes. Debería ser un custom hook `useClickOutside` o `useDismiss`.
- **Severidad:** Media

### 3.2 Componente `Avatar` definido 3 veces

- **Archivos:**
  - `src/components/AgentCard.tsx:62-71`
  - `src/components/AgentDetail.tsx:176-185`
  - `src/components/AgentEditModal.tsx:98-107`
- **Problema:** Misma lógica de avatar (imagen vs placeholder con `UserIcon`) escrita en 3 lugares diferentes con ligeras variaciones en clases y tamaños.
- **Severidad:** Media

### 3.3 Grid de Procesos y Agentes son idénticos

- **Archivos:**
  - `src/pages/Procesos.css:18-23, 25-33` (`.px-grid`)
  - `src/pages/Agentes.css:18-23, 25-33` (`.ax-grid`)
- **Problema:** Los estilos de grid (3 columnas, 2 columnas a 1100px, 1 columna a 720px) están duplicados exactamente en dos CSS separados.
- **Severidad:** Baja

### 3.4 Headers de páginas Procesos y Agentes casi idénticos

- **Archivos:**
  - `src/pages/Procesos.css:3-15` (`.px-header`, `.px-h1`, `.px-new`)
  - `src/pages/Agentes.css:3-15` (`.ax-header`, `.ax-h1`, `.ax-new`)
- **Problema:** Mismos estilos con diferentes prefijos (`.px-` vs `.ax-`). Podrían compartir una clase común.
- **Severidad:** Baja

### 3.5 Input fields con focus ring se repiten

- **Archivos:**
  - `src/pages/Login.css:159-162`
  - `src/components/AgentEditModal.css:135-138`
- **Problema:** El mismo patrón de focus (border-color + box-shadow con `color-mix`) está duplicado.
- **Severidad:** Baja

### 3.6 Breadcrumb-back nav en AgentDetail usa `navigate` en vez de `<Link>`

- **Archivo:** `src/pages/AgentDetail.tsx:55`
- **Problema:** Usa `navigate('/agentes')` con onClick en vez del componente `<Link>` de react-router-dom que sería más semántico y accesible. No es DRY per se, pero es una inconsistencia con el patrón de React Router.
- **Severidad:** Baja

---

## 4. Problemas de Accesibilidad

### 4.1 EyeIcon en Login no responde a teclado

- **Archivo:** `src/pages/Login.tsx:72-74`
- **Código:**
  ```tsx
  <span className="field__eye" role="button" aria-label="Mostrar contraseña">
    <EyeIcon size={18} />
  </span>
  ```
- **Problema:** Tiene `role="button"` pero no `tabIndex={0}`, `onKeyDown` ni `onClick`. No es operable por teclado.
- **Severidad:** Alta

### 4.2 `<a>` tags sin `href` en Sidebar — nulo semánticamente

- **Archivo:** `src/components/Sidebar.tsx:83, 98, 109, 145, 152`
- **Problema:** Elementos `<a>` sin `href` no son focusables por teclado y no tienen semántica de link. Deberían ser `<button>` o tener `role="button"` + `href`.
- **Severidad:** Alta

### 4.3 Sidebar items activos usan solo color para indicar estado

- **Archivo:** `src/components/Sidebar.tsx:94`
- **Código:**
  ```tsx
  style={isActive('/procesos') ? { color: 'var(--accent)' } : undefined}
  ```
- **Problema:** El estado activo solo se diferencia por color, sin cambios de peso, icono adicional o atributo `aria-current`. Esto es una mala práctica según WCAG.
- **Severidad:** Media

### 4.4 Foco visible inconsistente

- **Archivo:** Global
- **Problema:** Solo `AgentCard.css:17-20` define `focus-visible`. El resto de elementos interactivos (botones, links) no tienen estilos de foco. Navegación por teclado es difícil.
- **Severidad:** Alta

### 4.5 Tooltips en `ad__tab` y `sbr__item` no son accesibles

- **Archivos:** `src/pages/AgentDetail.css:113-136`, `src/components/Sidebar.css:273-296`
- **Problema:** Los tooltips usan pseudo-elementos `::after` con `attr(data-tip)`, que no son anunciados por lectores de pantalla. Deberían usarse `aria-describedby` o `title` nativo como fallback.
- **Severidad:** Media

---

## 5. Problemas de TypeScript

### 5.1 Non-null assertion frágil en AgentDetail

- **Archivo:** `src/pages/AgentDetail.tsx:101`
- **Código:**
  ```tsx
  <EmptyPanel label={TABS.find((t) => t.id === tab)!.label} ...
  ```
- **Problema:** El `!` asume que el `find` siempre encuentra un match. Si un `tabId` no está en `TABS`, crashea en runtime. Aunque hoy todos los tabs vienen de `TABS`, es frágil ante cambios futuros.
- **Severidad:** Baja

### 5.2 `noUnusedLocals` y `noUnusedParameters` activos — riesgo de build fallido

- **Archivo:** `tsconfig.json:20-21`
- **Problema:** El `tsconfig.json` tiene `noUnusedLocals: true` y `noUnusedParameters: true`. Si se ejecuta `npm run build` (que corre `tsc --noEmit`), cualquier parámetro o variable no usada rompe el build. Por ejemplo, en `AgentPanels.tsx`, varios componentes reciben `agent` pero lo usan solo en strings template, lo cual está bien, pero cualquier variable no usada haría fallar la compilación.
- **Severidad:** Alta (potencial)

### 5.3 Tipo `FlowProcess` no usa `GuideStatus`

- **Archivo:** `src/data/processes.ts`
- **Problema:** El tipo `FlowProcess` usa `FlowStatus` (bien), pero `GuideStatus` es un tipo que nunca se referencia (ver punto 2.1). Si se activa `noUnusedLocals`, esto no falla porque `GuideStatus` está en un archivo donde es *exportada* no *local*. Pero si se exporta sin usarse, es código inútil.
- **Severidad:** Baja

---

## 6. Problemas de CSS / Estilos

### 6.1 Regla global `btn:disabled` dentro de CSS de componente

- **Archivo:** `src/components/AgentEditModal.css:171-174`
- **Código:**
  ```css
  .btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
  ```
- **Problema:** Esta regla global debería estar en `global.css`, no en el CSS de un modal. Si se elimina este CSS en el futuro, todos los botones deshabilitados pierden su estilo.
- **Severidad:** Media

### 6.2 `max-width` fijo en `min(1500px, 100%)` — posible scroll horizontal en pantallas medianas

- **Archivo:** `src/components/AppShell.css:12-13`
- **Problema:** El shell mide `min(1500px, 100%)` pero el padding del `app-screen` es de 40px a cada lado (80px total). En pantallas de 1500px de ancho, el contenido ocupa 1500px + 80px = 1580px > viewport, causando scroll horizontal.
- **Severidad:** Baja

### 6.3 Sin `prefers-reduced-motion` para animaciones

- **Archivos:** Múltiples archivos CSS con `@keyframes` y `transition`
- **Problema:** Ninguna animación respeta `@media (prefers-reduced-motion: reduce)`. Usuarios con sensibilidad al movimiento no tienen forma de desactivar las transiciones. El DESIGN-SYSTEM.md lo marca como pendiente.
- **Severidad:** Media

### 6.4 Variables CSS duplicadas en `tokens.css` y `DESIGN-SYSTEM.md` (documentación vs implementación)

- **Archivos:** `src/styles/tokens.css`, `DESIGN-SYSTEM.md`
- **Problema:** Los valores están en dos lugares (CSS + markdown). Si se actualiza uno y no el otro, se genera una deriva silenciosa entre la documentación y la realidad.
- **Severidad:** Baja

---

## 7. Documentación Desactualizada

### 7.1 README.md no refleja la estructura actual

- **Archivo:** `README.md:39-47`
- **Problema:** El README muestra una estructura de `src/` que incluye solo `main.tsx`, `context/AppContext`, `pages/Login`/`Procesos`, `components/Sidebar`/`ProcessCard`/`icons`/`BrandMark`/`DesignControls` y `data/processes.ts`. Faltan: `Agentes.tsx`, `AgentDetail.tsx` (y sus CSS), `AgentCard`, `AgentEditModal`, `AgentPanels`, `GridToolbar`, `CardMenu`, `ModelSelector`, `UserMenu`, `AppShell`, `BrandMark` (parcial), `context/AgentsContext`, `data/agents.ts` y sus respectivos CSS.
- **Severidad:** Media

---

## 8. Inconsistencias Generales

### 8.1 Mezcla de estilos inline y variables CSS

- **Archivos:** Multiples
- **Problema:** Algunos componentes usan estilos inline (`style={{}}`) para colores que deberían ser variables CSS. Ej: `AgentCard.css:80` usa `#dc2626` (rojo) hardcodeado en vez de una variable. `AgentPanels.css:147-148` usa `#7c3aed` (violeta) hardcodeado para skills. Esto rompe la promesa del design system de "no colores hardcodeados".
- **Severidad:** Media

### 8.2 `BrandGlyph` y `BrandMark` duplican wordmark

- **Archivos:** `src/components/BrandMark.tsx`
- **Problema:** `BrandGlyph` renderiza solo la "S" cuadrada. `BrandMark` renderiza `BrandGlyph` + texto "Sebach AI". En `Sidebar.tsx:76-79`, se usa `BrandGlyph` + texto manualmente, duplicando la lógica de `BrandMark`.
- **Severidad:** Baja

### 8.3 `DesignControls` flotante aparece tanto en Login como en AppShell

- **Archivos:** `src/pages/Login.tsx:99`, `src/components/AppShell.tsx:85`
- **Problema:** El panel de controles de diseño (⚙) se renderiza en ambas pantallas, login y shell. No hay problema funcional pero rompe la inmersión del login.
- **Severidad:** Baja

### 8.4 No hay limpieza de estado al "cerrar sesión"

- **Archivo:** `src/components/UserMenu.tsx:109`
- **Código:**
  ```tsx
  onClick={() => navigate('/login')}
  ```
- **Problema:** "Cerrar sesión" navega a `/login` pero no resetea el estado global (plan, acento, agentes). Si el usuario cambió el plan a PREMIUM+, al volver al login y luego a `/procesos`, el estado persiste.
- **Severidad:** Baja (para MVP)

### 8.5 Login muestra indicador de ruta de desarrollo

- **Archivo:** `src/pages/Login.tsx:21`
- **Código:**
  ```tsx
  <div className="login-eyebrow mono">LOGIN · /login</div>
  ```
- **Problema:** Muestra la ruta actual como parte del UI. Es un artifact de desarrollo que no debería estar en producción.
- **Severidad:** Baja

### 8.6 Filtros dicen "Manuales/Digitales" en vez de "Flujogramas/Guías"

- **Archivo:** `src/pages/Procesos.tsx:9-13`
- **Código:**
  ```tsx
  { id: 'manuales', label: 'Manuales' },
  { id: 'digitales', label: 'Digitales' },
  ```
- **Problema:** El filtro usa términos genéricos "Manuales/Digitales", mientras que los datos usan `kind: 'flujograma' | 'guia'`. Hay una desconexión semántica entre la UI y los datos.
- **Severidad:** Baja

---

## 9. Seguridad

### 9.1 Credenciales hardcodeadas como valores por defecto

- **Archivo:** `src/pages/Login.tsx:11-12`
- **Código:**
  ```tsx
  const [email, setEmail] = useState('martina@empresa.com');
  const [password, setPassword] = useState('passphrase');
  ```
- **Problema:** Email y contraseña están hardcodeados en el estado inicial. Si bien es para demo, expone un patrón de login falso que podría ser malinterpretado.
- **Severidad:** Baja (para demo)

---

## 10. Archivos Huérfanos o Sobrantes

### 10.1 `tsconfig.node.tsbuildinfo` y `tsconfig.tsbuildinfo` en la raíz

- **Problema:** Archivos de cache/compilación de TypeScript que no deberían estar en el repositorio.
- **Severidad:** Baja

### 10.2 `dist/` generado (aunque gitignored)

- **Problema:** El directorio `dist/` existe con un build generado. No hay problema si está en `.gitignore`, pero podría confundir sobre cuál es la fuente de verdad.
- **Severidad:** Informativo

---

## Glosario de Archivos Auditados

| Archivo | Líneas | Hallazgos |
|---------|--------|-----------|
| `src/main.tsx` | 37 | OK |
| `src/context/AppContext.tsx` | 64 | OK (leve: `planLabel` es redundante con `plan`) |
| `src/context/AgentsContext.tsx` | 39 | OK |
| `src/data/processes.ts` | 108 | Código muerto (`GuideStatus`), incoherencia semántica filtros |
| `src/data/agents.ts` | 171 | Código muerto (`AVATAR_COLORS`, `AVATAR_EMOJIS`, `Integration`, `hoursPerWeek`) |
| `src/pages/Login.tsx` | 102 | EyeIcon sin toggle, credenciales hardcodeadas, artifact ruta |
| `src/pages/Login.css` | 223 | OK |
| `src/pages/Procesos.tsx` | 74 | `onShare` = `copyLink` |
| `src/pages/Procesos.css` | 34 | Duplicado con Agentes.css |
| `src/pages/Agentes.tsx` | 64 | OK |
| `src/pages/Agentes.css` | 34 | Duplicado con Procesos.css |
| `src/pages/AgentDetail.tsx` | 185 | Non-null assertion frágil, `Avatar` duplicado |
| `src/pages/AgentDetail.css` | 280 | Tooltips no accesibles |
| `src/components/AppShell.tsx` | 88 | DesignControls duplicado |
| `src/components/AppShell.css` | 157 | Scroll horizontal potencial |
| `src/components/Sidebar.tsx` | 203 | Vanilla `<a>` sin `href`, DRY en click-outside |
| `src/components/Sidebar.css` | 300 | Tooltip no accesible |
| `src/components/UserMenu.tsx` | 116 | Logout sin limpiar estado |
| `src/components/UserMenu.css` | 139 | OK |
| `src/components/BrandMark.tsx` | 31 | `BrandGlyph` + `BrandMark` chocan semánticamente |
| `src/components/icons.tsx` | 205 | `CheckIcon` muerto |
| `src/components/ProcessCard.tsx` | 101 | OK |
| `src/components/ProcessCard.css` | 207 | OK |
| `src/components/GridToolbar.tsx` | 57 | Botón Ordenar sin handler opcional |
| `src/components/GridToolbar.css` | 82 | OK |
| `src/components/CardMenu.tsx` | 76 | DRY en click-outside |
| `src/components/CardMenu.css` | 86 | OK |
| `src/components/ModelSelector.tsx` | 113 | DRY en click-outside, `--dot` hack CSS |
| `src/components/ModelSelector.css` | 134 | OK |
| `src/components/DesignControls.tsx` | 58 | OK |
| `src/components/DesignControls.css` | 97 | OK |
| `src/components/AgentCard.tsx` | 71 | `Avatar` duplicado |
| `src/components/AgentCard.css` | 127 | Hardcodeo de `#dc2626` |
| `src/components/AgentEditModal.tsx` | 108 | `Avatar` duplicado (x3) |
| `src/components/AgentEditModal.css` | 174 | Regla global `btn:disabled` en CSS local |
| `src/components/AgentPanels.tsx` | 298 | Hardcodeo de `#7c3aed` en CSS |
| `src/components/AgentPanels.css` | 255 | `#7c3aed` hardcodeado en `.ap__card-ico--skill` |
| `src/styles/tokens.css` | 51 | OK |
| `src/styles/global.css` | 101 | OK |
| `index.html` | 19 | OK |
| `vite.config.ts` | 11 | OK |
| `tsconfig.json` | 25 | `noUnusedLocals` + `noUnusedParameters` = riesgo de build |
| `package.json` | 24 | OK |
| `.gitignore` | 11 | Faltan `*.tsbuildinfo` |
| `README.md` | 54 | Estructura desactualizada |

---

*Fin del reporte de auditoría.*
