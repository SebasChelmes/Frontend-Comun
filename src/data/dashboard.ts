/**
 * Datos de ejemplo del dashboard de Inicio. Shapes limpios que luego mapean a las
 * APIs de los 3 backends (Insights / Tracker / Agents). Todo mock por ahora.
 */

/* ---------- KPIs de cabecera ---------- */
export type KpiTone = 'insights' | 'tracker' | 'agents' | 'ok' | 'warn';
export interface Kpi {
  id: string;
  label: string;
  value: string;
  deltaPct: number; // + mejora, - baja
  spark: number[];
  tone: KpiTone;
}

export const KPIS: Kpi[] = [
  { id: 'horas', label: 'Horas ahorradas · mes', value: '312 h', deltaPct: 18, tone: 'ok', spark: [180, 190, 210, 205, 240, 260, 255, 290, 312] },
  { id: 'ejec', label: 'Ejecuciones de agentes', value: '1.284', deltaPct: 12, tone: 'agents', spark: [820, 900, 870, 960, 1010, 1100, 1150, 1210, 1284] },
  { id: 'procesos', label: 'Procesos mapeados', value: '48', deltaPct: 9, tone: 'insights', spark: [30, 32, 35, 37, 39, 42, 44, 46, 48] },
  { id: 'aprob', label: 'Tasa de aprobación', value: '94%', deltaPct: 3, tone: 'tracker', spark: [88, 89, 90, 90, 91, 92, 93, 93, 94] },
];

/** Uso del plan (freemium) para el gauge. */
export const PLAN_USAGE = { used: 3, total: 5, label: 'procesos' };

/* ---------- Actividad de los 3 hubs (semanal) ---------- */
export interface HubActivityPoint {
  week: string;
  insights: number;
  tracker: number;
  agents: number;
}
export const HUB_ACTIVITY: HubActivityPoint[] = [
  { week: 'S1', insights: 22, tracker: 14, agents: 40 },
  { week: 'S2', insights: 26, tracker: 18, agents: 46 },
  { week: 'S3', insights: 24, tracker: 22, agents: 52 },
  { week: 'S4', insights: 30, tracker: 26, agents: 58 },
  { week: 'S5', insights: 34, tracker: 30, agents: 64 },
  { week: 'S6', insights: 32, tracker: 34, agents: 72 },
  { week: 'S7', insights: 38, tracker: 40, agents: 80 },
  { week: 'S8', insights: 42, tracker: 44, agents: 88 },
  { week: 'S9', insights: 46, tracker: 52, agents: 96 },
  { week: 'S10', insights: 50, tracker: 58, agents: 108 },
];

/* ---------- Valor por agente (horas ahorradas) ---------- */
export interface AgentValue {
  name: string;
  area: string;
  hours: number;
}
export const VALUE_BY_AGENT: AgentValue[] = [
  { name: 'Rep. de Servicio al Cliente', area: 'Técnicos', hours: 48 },
  { name: 'Asistente personal', area: 'Administración', hours: 40 },
  { name: 'Rep. de ventas', area: 'Operativos', hours: 36 },
  { name: 'Contable', area: 'Administración', hours: 32 },
  { name: 'Gerente de oficina', area: 'Operativos', hours: 28 },
  { name: 'Gerente de RRHH', area: 'Administración', hours: 22 },
];

/* ---------- Gobernanza (human-in-the-loop) ---------- */
export const GOVERNANCE = {
  approved: 268,
  rejected: 14,
  pending: 6,
  avgApprovalMin: 8,
};

/* ---------- Estado de procesos ---------- */
export const PROCESS_STATUS = [
  { label: 'Analizado', value: 28 },
  { label: 'En validación', value: 12 },
  { label: 'Sin analizar', value: 8 },
];

/* ---------- Top usuarios ---------- */
export interface TopUser {
  name: string;
  initials: string;
  area: string;
  activity: number;
}
export const TOP_USERS: TopUser[] = [
  { name: 'Martina Ríos', initials: 'M', area: 'Operaciones', activity: 342 },
  { name: 'Bruno Costa', initials: 'B', area: 'Comercial', activity: 298 },
  { name: 'Lucía Fernández', initials: 'L', area: 'Finanzas', activity: 264 },
  { name: 'Diego Álvarez', initials: 'D', area: 'RRHH', activity: 187 },
  { name: 'Sofía Méndez', initials: 'S', area: 'Soporte', activity: 143 },
];

/* ---------- Usuarios activos (WAU) ---------- */
export interface WauPoint {
  week: string;
  users: number;
}
export const ACTIVE_USERS: WauPoint[] = [
  { week: 'S1', users: 9 },
  { week: 'S2', users: 11 },
  { week: 'S3', users: 12 },
  { week: 'S4', users: 12 },
  { week: 'S5', users: 15 },
  { week: 'S6', users: 16 },
  { week: 'S7', users: 18 },
  { week: 'S8', users: 19 },
  { week: 'S9', users: 21 },
  { week: 'S10', users: 23 },
];

/* ---------- Heatmap de actividad (día × franja horaria) ---------- */
export const HEATMAP_DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
export const HEATMAP_HOURS = ['8', '10', '12', '14', '16', '18', '20'];
// filas = días, columnas = franjas horarias; valores 0..100 (intensidad de actividad)
export const HEATMAP: number[][] = [
  [20, 55, 78, 60, 82, 66, 24],
  [26, 60, 84, 62, 88, 70, 20],
  [30, 64, 90, 70, 92, 74, 28],
  [24, 58, 80, 66, 86, 72, 22],
  [18, 46, 68, 54, 70, 58, 30],
  [6, 14, 20, 16, 18, 12, 8],
  [4, 8, 10, 9, 12, 7, 5],
];
export const HEATMAP_MAX = 100;
