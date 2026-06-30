/**
 * Datos de la pantalla "Hub de Agentes".
 * Cards de agentes editables (nombre + avatar), con estado y métricas de uso.
 * Contenido tomado de las pantallas de referencia.
 */

/* ---------- integraciones (registro con colores de marca, estilado §10) ----------
   Reservado: hoy no se muestran en la card, pero se conservan para el detalle del agente. */
export interface Integration {
  key: string;
  label: string; // monograma mostrado en el chip
  color: string; // color de marca
}

export const INTEGRATIONS: Record<string, Integration> = {
  gmail: { key: 'gmail', label: 'M', color: '#EA4335' },
  calendar: { key: 'calendar', label: 'C', color: '#4285F4' },
  drive: { key: 'drive', label: 'D', color: '#1FA463' },
  sheets: { key: 'sheets', label: 'S', color: '#0F9D58' },
  outlook: { key: 'outlook', label: 'O', color: '#0072C6' },
  slack: { key: 'slack', label: '#', color: '#611F69' },
  whatsapp: { key: 'whatsapp', label: 'W', color: '#25D366' },
  linkedin: { key: 'linkedin', label: 'in', color: '#0A66C2' },
  zendesk: { key: 'zendesk', label: 'Z', color: '#03363D' },
  hubspot: { key: 'hubspot', label: 'H', color: '#FF7A59' },
};

/* ---------- avatar: paleta + emojis (reservado para la futura personalización) ----------
   Por ahora el avatar se muestra vacío (placeholder). Más adelante el usuario podrá
   elegir su avatar desde otro lugar (imagen / foto) -> Agent.avatarImage. */
export const AVATAR_COLORS = [
  '#3A3678', // índigo
  '#0D9488', // teal
  '#7C3AED', // violeta
  '#D97706', // ámbar
  '#2563EB', // azul
  '#0E8466', // verde
] as const;

export const AVATAR_EMOJIS = [
  '🤖', '🧮', '👥', '🎧', '📈', '🗂️',
  '📊', '💼', '📨', '🛠️', '📅', '💬',
  '📋', '🧾', '🚀', '🔧', '🧠', '✨',
] as const;

/* ---------- agentes ---------- */
export type AgentStatus = 'activo' | 'pausado' | 'inactivo';

/** Áreas de la empresa (filtro del Hub). */
export type AgentArea = 'Administración' | 'Técnicos' | 'Operativos';
export const AGENT_AREAS: AgentArea[] = ['Administración', 'Técnicos', 'Operativos'];

export interface Agent {
  id: string;
  name: string;
  role: string;
  /** Categoría específica que se muestra en la card. */
  category: string;
  /** Área de la empresa, usada por el filtro del Hub. */
  area: AgentArea;
  description: string;
  /** Avatar elegido por el usuario (imagen / foto). Vacío = placeholder. */
  avatarImage?: string;
  /** Reservado para futura personalización (emoji + color). No se muestra por ahora. */
  avatarEmoji?: string;
  avatarColor?: string;
  integrations: string[]; // keys de INTEGRATIONS (reservado)
  hoursPerWeek: number; // estimación de horas ahorradas / semana (reservado)
  /** Estado operativo del agente. */
  status: AgentStatus;
  /** Última ejecución (relativo). */
  lastRun: string;
  /** Ejecuciones en el mes en curso. */
  runsThisMonth: number;
  /** Tasa de éxito (%) de las ejecuciones. */
  successRate: number;
}

export const AGENTS: Agent[] = [
  {
    id: 'asistente-personal',
    name: 'Asistente personal',
    role: 'Asistente personal',
    category: 'Productividad',
    area: 'Administración',
    description: 'Limpia tu bandeja, envía correos y gestiona tu calendario.',
    integrations: ['gmail', 'calendar', 'drive', 'outlook'],
    hoursPerWeek: 10,
    status: 'activo',
    lastRun: 'hace 2 h',
    runsThisMonth: 128,
    successRate: 99,
  },
  {
    id: 'contable',
    name: 'Contable',
    role: 'Contable',
    category: 'Finanzas',
    area: 'Administración',
    description: 'Categoriza gastos, concilia cuentas y prepara informes.',
    integrations: ['sheets', 'drive'],
    hoursPerWeek: 8,
    status: 'activo',
    lastRun: 'hace 5 h',
    runsThisMonth: 64,
    successRate: 98,
  },
  {
    id: 'gerente-rrhh',
    name: 'Gerente de RRHH',
    role: 'Gerente de RRHH',
    category: 'Recursos Humanos',
    area: 'Administración',
    description: 'Publica ofertas, revisa CVs, hace onboarding y nómina.',
    integrations: ['linkedin', 'gmail'],
    hoursPerWeek: 6,
    status: 'pausado',
    lastRun: 'hace 3 días',
    runsThisMonth: 22,
    successRate: 95,
  },
  {
    id: 'servicio-cliente',
    name: 'Rep. de Servicio al Cliente',
    role: 'Rep. de Servicio al Cliente',
    category: 'Soporte',
    area: 'Técnicos',
    description: 'Lee tickets, redacta respuestas, procesa reembolsos y escala los casos.',
    integrations: ['zendesk', 'gmail', 'slack', 'whatsapp'],
    hoursPerWeek: 12,
    status: 'activo',
    lastRun: 'hace 12 min',
    runsThisMonth: 240,
    successRate: 97,
  },
  {
    id: 'rep-ventas',
    name: 'Rep. de ventas',
    role: 'Rep. de ventas',
    category: 'Comercial',
    area: 'Operativos',
    description: 'Sigue leads, manda recordatorios, actualiza el CRM y arma propuestas.',
    integrations: ['hubspot', 'gmail', 'calendar'],
    hoursPerWeek: 9,
    status: 'activo',
    lastRun: 'hace 1 día',
    runsThisMonth: 87,
    successRate: 96,
  },
  {
    id: 'gerente-oficina',
    name: 'Gerente de oficina',
    role: 'Gerente de oficina',
    category: 'Operaciones',
    area: 'Operativos',
    description: 'Organiza documentos, coordina horarios y comunicaciones internas.',
    integrations: ['drive', 'slack', 'calendar'],
    hoursPerWeek: 7,
    status: 'inactivo',
    lastRun: 'hace 2 semanas',
    runsThisMonth: 15,
    successRate: 92,
  },
];

/** Etiqueta + color de token para cada estado. */
export const STATUS_META: Record<AgentStatus, { label: string; color: string }> = {
  activo: { label: 'Activo', color: 'var(--ok)' },
  pausado: { label: 'Pausado', color: 'var(--warn)' },
  inactivo: { label: 'Inactivo', color: 'var(--ink-4)' },
};
