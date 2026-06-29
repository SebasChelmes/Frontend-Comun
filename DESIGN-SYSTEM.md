# Design System — Sebach AI

> Design system **implementado** en este frontend (React + Vite).
> Derivado de **`estilado agents hub.md`** (la guía de estilo de la landing de
> Agents Hub), fuente de verdad de marca de la plataforma.
> Última actualización: 2026-06-28.

Todos los valores viven como **variables CSS** en
[`src/styles/tokens.css`](src/styles/tokens.css). Los componentes **no hardcodean
colores**: referencian estos tokens (criterio de aceptación de `SPEC-FRONTEND-COMUN.md`).
Los tintes suaves se derivan en runtime con `color-mix(... var(--accent) …)`, así que
**re-tematizan** al cambiar el acento.

---

## 1. Marca

- **Nombre:** Sebach AI.
- **Logo:** una **"S"** en cuadrado redondeado (fondo índigo `--accent`, letra blanca,
  peso 600, radio ~30% del lado) + wordmark **"Sebach AI"** (peso 600,
  `letter-spacing: -0.01em`). En el panel de login se usa una **"S"** gigante de
  marca de agua a muy baja opacidad como textura.
- **Voz:** español rioplatense (voseo): "Mapeá", "Analizá", "Probá". Directo y concreto.

---

## 2. Tipografía

| Uso | Fuente | Token |
|---|---|---|
| Texto general, títulos, UI | **DM Sans** (400/500/600/700) | `--font-sans` |
| Eyebrows, chips de estado, metadatos, datos "de sistema" | **DM Mono** (400/500) | `--font-mono` |

- Se cargan desde Google Fonts en [`index.html`](index.html).
- **Firma tipográfica:** títulos en peso **500–600** con tracking **negativo**
  (`letter-spacing: -0.02em`); eyebrows en **DM Mono MAYÚSCULAS** con tracking
  **positivo** (`0.1–0.16em`). Suavizado `antialiased`, interlineado de cuerpo `1.55`.
- Utilidad `.mono` en [`global.css`](src/styles/global.css) para los rótulos mono.

---

## 3. Color (tokens)

### Base / superficies
| Token | Valor | Uso | Origen (estilado AH) |
|---|---|---|---|
| `--bg` | `#FAF6EC` | Fondo de página (crema) | `--bg` |
| `--surface` | `#FFFFFF` | Tarjetas, superficies elevadas | `--surface` |
| `--surface-2` | `#F5F0E4` | Sidebar, lienzos, zonas hundidas, chips | `--surface-alt` |
| `--surface-3` | `#F1EBDD` | Hover de superficies claras | `--hover` |

### Texto
| Token | Valor | Uso |
|---|---|---|
| `--ink` | `#1E1B3A` | Títulos y texto principal (índigo casi negro) |
| `--ink-2` | `#5A5870` | Párrafos, descripciones |
| `--ink-3` | `#908EA4` | Metadatos, eyebrows, placeholders |
| `--ink-4` | `#A8A6B8` | Rótulos mono tenues |

### Marca / acción (acento — **conmutable**)
| Token | Valor por defecto | Uso |
|---|---|---|
| `--accent` | `#3A3678` (índigo) | Logo, links de marca, estado activo, etiquetas, medidor, foco |

Opciones de acento (panel ⚙ / `ACCENT_OPTIONS` en
[`AppContext.tsx`](src/context/AppContext.tsx)): **índigo `#3A3678`** ·
**teal `#1C7C7C`** · **violeta `#7C3AED`**. Los botones primarios usan `--ink`
(índigo casi negro) para preservar el contraste del diseño original.

> Tintes suaves de marca (botón upgrade, avatar, fondo de etiqueta "FLUJOGRAMA")
> se derivan con `color-mix(in srgb, var(--accent) N%, #fff)` ≈ `--primary-soft`.

### Estado
| Token | Valor | Uso |
|---|---|---|
| `--ok` | `#0E8466` | Éxito / "Analizado" / "Listo" (verde de acento) |
| `--warn` | `#D97706` | Decisión / "Validación" / advertencia (ámbar) |

### Bordes
| Token | Valor | Uso |
|---|---|---|
| `--line` | `rgba(30,27,58,0.10)` | Borde estándar |
| `--line-strong` | `rgba(30,27,58,0.18)` | Borde reforzado / aristas del diagrama |
| `--line-fill` | `#E6DFCF` | Rellenos de skeleton (preview de guías) |
| `--line-soft` | `#B6B2C4` | Bordes de nodos del diagrama |

### Textura de fondo (body)
Dos gradientes radiales muy sutiles (índigo + verde) sobre el crema, en
[`global.css`](src/styles/global.css):
```css
radial-gradient(ellipse 80% 60% at 12% 22%, rgba(58,54,120,0.06) 0%, transparent 60%),
radial-gradient(ellipse 60% 50% at 88% 78%, rgba(14,132,102,0.05) 0%, transparent 55%),
var(--bg)
```

---

## 4. Sombras

| Token | Valor | Uso |
|---|---|---|
| `--shadow-card` | `0 1px 3px rgba(30,27,58,.05), 0 4px 16px rgba(30,27,58,.06)` | Tarjetas |
| `--shadow-card-sm` | `0 1px 2px rgba(30,27,58,.06)` | Ítem activo del sidebar |
| `--shadow-chip` | `0 1px 2px rgba(30,27,58,.05)` | Chips / segmentos activos |
| `--shadow-elevated` | `0 12px 32px rgba(30,27,58,.12)` | Modales / CTA destacada (reservado) |

Sombras **suaves y difusas**; la elevación se refuerza con borde claro, nunca con bordes oscuros.

---

## 5. Radios

| Token | Valor | Uso |
|---|---|---|
| `--r-pill` | `999px` | Botones, chips, píldoras |
| `--r-xl` | `28px` | Shell de la app / card de login |
| `--r-lg` | `20px` | Tarjetas de proceso |
| `--r-md` | `14px` | Card de upgrade, panel de controles |
| `--r-sm` | `12px` | Inputs, preview tiles |
| `--r-xs` | `11px` | Ítems de nav, search, sort |

---

## 6. Componentes (clases base)

| Componente | Dónde | Notas |
|---|---|---|
| Botones pill | `.btn` `.btn--primary` `.btn--ghost` `.btn--block` ([global.css](src/styles/global.css)) | Primario `--ink`/blanco; ghost `--surface` + borde, hover a `--ink` |
| Inputs | `.field__input` ([Login.css](src/pages/Login.css)) | Foco: borde `--accent` + anillo `color-mix(--accent 18%)` |
| Sidebar | [`Sidebar.tsx`](src/components/Sidebar.tsx) | Expandido (266px) y rail (64px); secciones con eyebrow mono |
| Tarjeta de proceso | [`ProcessCard.tsx`](src/components/ProcessCard.tsx) | Flujograma (preview de nodos) vs. guía (skeleton de pasos) |
| Eyebrow / chip | clase `.mono` + tokens | DM Mono, mayúsculas, tracking positivo |

---

## 7. Gating por plan

`AppContext` deriva, igual que el diseño original `.dc`:
`showUpgrade = plan === 'FREE'` · `showLocks = plan !== 'PREMIUM+'`.
Controla la card de upgrade y los candados PREMIUM / PREMIUM+ del sidebar.

---

## 8. Pendiente / próximos pasos

- **Paleta del flujograma** (`estilado agents hub.md §11`): cuando se integre el
  diagrama Reactflow reutilizado de Insights Hub, mapear los colores por tipo de
  nodo (MANUAL / AUTO / DECISION / WAIT / handoff…) a tokens propios.
- **Iconografía:** el set actual son SVGs propios extraídos del diseño; la guía de
  Agents Hub recomienda estandarizar en **Lucide** para toda la app.
- **Motion:** reveal escalonado, hover `.2s`, respeto de `prefers-reduced-motion`
  (aún no implementado; los hovers ya usan transiciones cortas).
- **Sombra elevada / formularios destacados** (`--shadow-elevated`) cuando aparezcan
  modales o la CTA final.

---

*Fuente de marca: `estilado agents hub.md`. Spec relacionada: `SPEC-FRONTEND-COMUN.md`.*
