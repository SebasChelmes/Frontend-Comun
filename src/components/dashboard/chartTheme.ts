/**
 * Paleta y ajustes comunes para los gráficos (Recharts) del dashboard de Inicio.
 * Recharts necesita colores concretos (no `var()`), así que acá viven los hex
 * espejando los tokens `--chart-*` de tokens.css. Color semántico por hub.
 */
export const CHART = {
  insights: '#3A3678',
  tracker: '#1C7C7C',
  agents: '#7C3AED',
  ok: '#0E8466',
  warn: '#D97706',
  danger: '#DC2626',
  cyan: '#22D3EE',
  blue: '#2563EB',
  // neutrales del design system
  ink: '#1E1B3A',
  ink2: '#5A5870',
  ink3: '#908EA4',
  ink4: '#A8A6B8',
  line: 'rgba(30, 27, 58, 0.10)',
  surface: '#FFFFFF',
} as const;

/** Paleta ordenada para series genéricas (barras por área, etc.). */
export const CHART_SERIES = [
  CHART.insights,
  CHART.tracker,
  CHART.agents,
  CHART.blue,
  CHART.warn,
  CHART.cyan,
];

/** Tipografía/ejes comunes. */
export const axisTick = {
  fill: CHART.ink3,
  fontSize: 11,
  fontFamily: "'DM Mono', monospace",
};

/** Estilo del contenedor del tooltip custom (ver ChartTooltip). */
export const tooltipWrapperStyle = { outline: 'none' };
