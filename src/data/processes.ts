/**
 * The unified "Procesos" grid: flujogramas (Insights Hub) + guías digitales
 * (Tracker Hub), per SPEC-FRONTEND-COMUN.md §4. Data transcribed from the
 * design's six example cards.
 */

export type ProcessKind = 'flujograma' | 'guia';

export type FlowStatus = 'analizado' | 'validacion';

interface BaseProcess {
  id: string;
  title: string;
  /** "Insights Hub · 9 nodos · 2 dolores" — the mono sub-line */
  meta: string;
  /** relative timestamp shown bottom-left */
  when: string;
}

export interface FlowProcess extends BaseProcess {
  kind: 'flujograma';
  status: FlowStatus;
  /** node shapes rendered in the preview tile, left→right */
  preview: NodeShape[];
  cta: string;
}

export interface GuideProcess extends BaseProcess {
  kind: 'guia';
  /** the "Listo" / "vinculado" treatment on the top-right */
  statusLabel: string;
  linked: boolean;
  cta: string;
}

export type Process = FlowProcess | GuideProcess;

/** Shapes used in the flujograma preview tile. */
export type NodeShape =
  | 'start' // accent-ringed circle
  | 'circle' // plain circle
  | 'box' // rounded square
  | 'diamond' // rotated square (decision)
  | 'box-warn'; // dashed warning box

export const PROCESSES: Process[] = [
  {
    id: 'onboarding-cliente',
    kind: 'flujograma',
    title: 'Onboarding de cliente',
    meta: 'Insights Hub · 9 nodos · 2 dolores',
    status: 'analizado',
    when: 'hace 2 días',
    preview: ['start', 'box', 'diamond', 'box'],
    cta: 'Abrir diagrama',
  },
  {
    id: 'alta-empleado',
    kind: 'guia',
    title: 'Alta de nuevo empleado',
    meta: 'Tracker Hub · 12 pasos · PDF listo',
    statusLabel: 'vinculado',
    linked: true,
    when: 'hace 1 día',
    cta: 'Ver guía',
  },
  {
    id: 'aprobacion-facturas',
    kind: 'flujograma',
    title: 'Aprobación de facturas',
    meta: 'Insights Hub · 14 nodos · 3 dolores',
    status: 'analizado',
    when: 'hace 4 días',
    preview: ['start', 'diamond', 'box', 'circle'],
    cta: 'Abrir diagrama',
  },
  {
    id: 'cierre-caja',
    kind: 'guia',
    title: 'Cierre de caja diario',
    meta: 'Tracker Hub · 8 pasos · PDF listo',
    statusLabel: 'Listo',
    linked: false,
    when: 'hace 6 horas',
    cta: 'Ver guía',
  },
  {
    id: 'gestion-reclamos',
    kind: 'flujograma',
    title: 'Gestión de reclamos',
    meta: 'Insights Hub · 7 nodos · sin analizar',
    status: 'validacion',
    when: 'hace 1 semana',
    preview: ['start', 'box-warn', 'diamond', 'box'],
    cta: 'Revisar',
  },
  {
    id: 'carga-pedidos-erp',
    kind: 'guia',
    title: 'Carga de pedidos en ERP',
    meta: 'Tracker Hub · 18 pasos · PDF listo',
    statusLabel: 'vinculado',
    linked: true,
    when: 'hace 2 semanas',
    cta: 'Ver guía',
  },
];
