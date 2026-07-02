export type NodeType =
  | 'start'
  | 'end'
  | 'task-manual'
  | 'task-auto'
  | 'decision'
  | 'handoff'
  | 'wait'
  | 'workaround';

export type EdgeType = 'normal' | 'yes' | 'no' | 'loop';

export interface DiagramNode {
  id: string;
  type: NodeType;
  label: string;
  actor?: string;
  durationMin?: number;
  durationMax?: number;
  painPoints?: { severity: 'Alta' | 'Media' | 'Baja'; text: string; quote?: string }[];
  x: number; // canvas px from left
  y: number; // canvas px from top
}

export interface DiagramEdge {
  from: string;
  to: string;
  kind: EdgeType;
  label?: string;
}

export interface Diagram {
  processId: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

// ── Onboarding de cliente (9 nodos, 2 dolores) ──────────────────────────────
const onboardingCliente: Diagram = {
  processId: 'onboarding-cliente',
  nodes: [
    { id: 'n1', type: 'start',       label: 'Inicio',                  x: 320, y: 40  },
    { id: 'n2', type: 'task-manual', label: 'Recibir solicitud',        actor: 'Comercial',  durationMin: 10, durationMax: 20, x: 320, y: 130 },
    { id: 'n3', type: 'task-manual', label: 'Verificar documentos',     actor: 'Comercial',  durationMin: 20, durationMax: 40, x: 320, y: 230,
      painPoints: [{ severity: 'Media', text: 'El cliente suele enviar documentos incompletos', quote: '"Siempre nos mandan la mitad y hay que pedirlos de vuelta"' }] },
    { id: 'n4', type: 'decision',    label: '¿Documentos\ncompletos?',  x: 320, y: 340 },
    { id: 'n5', type: 'task-manual', label: 'Solicitar\ncorrección',    actor: 'Comercial',  durationMin: 5,  durationMax: 15, x: 560, y: 340 },
    { id: 'n6', type: 'task-auto',   label: 'Crear cuenta',             actor: 'Sistema',    durationMin: 2,  durationMax: 5,  x: 320, y: 460 },
    { id: 'n7', type: 'task-auto',   label: 'Enviar credenciales',      actor: 'Sistema',    durationMin: 1,  durationMax: 2,  x: 320, y: 560 },
    { id: 'n8', type: 'handoff',     label: 'Reunión de bienvenida',    actor: 'CS Manager', durationMin: 30, durationMax: 60, x: 320, y: 660,
      painPoints: [{ severity: 'Alta', text: 'Doble agenda para coordinar la reunión', quote: '"Tardamos 2-3 días solo en encontrar horario"' }] },
    { id: 'n9', type: 'end',         label: 'Fin',                      x: 320, y: 780 },
  ],
  edges: [
    { from: 'n1', to: 'n2', kind: 'normal' },
    { from: 'n2', to: 'n3', kind: 'normal' },
    { from: 'n3', to: 'n4', kind: 'normal' },
    { from: 'n4', to: 'n6', kind: 'yes',    label: 'Sí' },
    { from: 'n4', to: 'n5', kind: 'no',     label: 'No' },
    { from: 'n5', to: 'n3', kind: 'loop' },
    { from: 'n6', to: 'n7', kind: 'normal' },
    { from: 'n7', to: 'n8', kind: 'normal' },
    { from: 'n8', to: 'n9', kind: 'normal' },
  ],
};

// ── Aprobación de facturas (14 nodos, 3 dolores) ────────────────────────────
const aprobacionFacturas: Diagram = {
  processId: 'aprobacion-facturas',
  nodes: [
    { id: 'n1',  type: 'start',       label: 'Inicio',                   x: 320, y: 40  },
    { id: 'n2',  type: 'task-manual', label: 'Recibir factura',           actor: 'Admin',      durationMin: 5,  durationMax: 10, x: 320, y: 130 },
    { id: 'n3',  type: 'task-manual', label: 'Registrar en sistema',      actor: 'Admin',      durationMin: 10, durationMax: 20, x: 320, y: 230 },
    { id: 'n4',  type: 'decision',    label: '¿Monto > $50k?',            x: 320, y: 340 },
    { id: 'n5',  type: 'handoff',     label: 'Aprobar Gerente',           actor: 'Gerencia',   durationMin: 60, durationMax: 480, x: 560, y: 340,
      painPoints: [{ severity: 'Alta', text: 'El gerente tarda hasta 2 días en aprobar', quote: '"La factura lleva 3 días esperando firma"' }] },
    { id: 'n6',  type: 'task-auto',   label: 'Aprobar automático',        actor: 'Sistema',    durationMin: 1,  durationMax: 1,  x: 320, y: 460 },
    { id: 'n7',  type: 'task-manual', label: 'Programar pago',            actor: 'Tesorería',  durationMin: 10, durationMax: 20, x: 320, y: 560,
      painPoints: [{ severity: 'Media', text: 'No hay fecha de pago estándar', quote: '"Cada proveedor pide distinto"' }] },
    { id: 'n8',  type: 'task-auto',   label: 'Ejecutar transferencia',    actor: 'Banco',      durationMin: 1,  durationMax: 60, x: 320, y: 660 },
    { id: 'n9',  type: 'decision',    label: '¿Transferencia\nok?',        x: 320, y: 760 },
    { id: 'n10', type: 'workaround',  label: 'Retry manual',              actor: 'Admin',      durationMin: 30, durationMax: 60, x: 560, y: 760,
      painPoints: [{ severity: 'Media', text: 'Falla bancaria obliga a reintentos manuales' }] },
    { id: 'n11', type: 'task-auto',   label: 'Notificar proveedor',       actor: 'Sistema',    durationMin: 1,  durationMax: 1,  x: 320, y: 880 },
    { id: 'n12', type: 'end',         label: 'Fin',                       x: 320, y: 980 },
  ],
  edges: [
    { from: 'n1',  to: 'n2',  kind: 'normal' },
    { from: 'n2',  to: 'n3',  kind: 'normal' },
    { from: 'n3',  to: 'n4',  kind: 'normal' },
    { from: 'n4',  to: 'n5',  kind: 'no',     label: 'Sí' },
    { from: 'n4',  to: 'n6',  kind: 'yes',    label: 'No' },
    { from: 'n5',  to: 'n7',  kind: 'normal' },
    { from: 'n6',  to: 'n7',  kind: 'normal' },
    { from: 'n7',  to: 'n8',  kind: 'normal' },
    { from: 'n8',  to: 'n9',  kind: 'normal' },
    { from: 'n9',  to: 'n10', kind: 'no',     label: 'No' },
    { from: 'n10', to: 'n8',  kind: 'loop' },
    { from: 'n9',  to: 'n11', kind: 'yes',    label: 'Sí' },
    { from: 'n11', to: 'n12', kind: 'normal' },
  ],
};

// ── Gestión de reclamos (7 nodos) ───────────────────────────────────────────
const gestionReclamos: Diagram = {
  processId: 'gestion-reclamos',
  nodes: [
    { id: 'n1', type: 'start',       label: 'Inicio',                x: 320, y: 40  },
    { id: 'n2', type: 'task-manual', label: 'Recibir reclamo',       actor: 'Soporte',     durationMin: 5,  durationMax: 10, x: 320, y: 130 },
    { id: 'n3', type: 'decision',    label: '¿Tipo de\nreclamo?',     x: 320, y: 240 },
    { id: 'n4', type: 'handoff',     label: 'Escalar a Técnico',     actor: 'Técnico',     durationMin: 60, durationMax: 240, x: 560, y: 240 },
    { id: 'n5', type: 'task-auto',   label: 'Respuesta automática',  actor: 'Sistema',     durationMin: 1,  durationMax: 2,  x: 320, y: 360 },
    { id: 'n6', type: 'wait',        label: 'Esperar confirmación',  actor: 'Cliente',     durationMin: 60, durationMax: 1440, x: 320, y: 460 },
    { id: 'n7', type: 'end',         label: 'Fin',                   x: 320, y: 560 },
  ],
  edges: [
    { from: 'n1', to: 'n2', kind: 'normal' },
    { from: 'n2', to: 'n3', kind: 'normal' },
    { from: 'n3', to: 'n4', kind: 'no',     label: 'Técnico' },
    { from: 'n3', to: 'n5', kind: 'yes',    label: 'Auto' },
    { from: 'n4', to: 'n6', kind: 'normal' },
    { from: 'n5', to: 'n6', kind: 'normal' },
    { from: 'n6', to: 'n7', kind: 'normal' },
  ],
};

export const DIAGRAMS: Diagram[] = [onboardingCliente, aprobacionFacturas, gestionReclamos];

export function getDiagram(processId: string): Diagram | undefined {
  return DIAGRAMS.find((d) => d.processId === processId);
}
