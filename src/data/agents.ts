/**
 * Datos de la pantalla "Agentes / Hub".
 * Cards de agentes editables (nombre + avatar), con integraciones y horas/semana.
 * Contenido tomado de las pantallas de referencia.
 */

/* ---------- integraciones (registro con colores de marca, estilado §10) ---------- */
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
export interface Agent {
  id: string;
  name: string;
  role: string;
  category: string;
  description: string;
  /** Avatar elegido por el usuario (imagen / foto). Vacío = placeholder. */
  avatarImage?: string;
  /** Reservado para futura personalización (emoji + color). No se muestra por ahora. */
  avatarEmoji?: string;
  avatarColor?: string;
  integrations: string[]; // keys de INTEGRATIONS
  hoursPerWeek: number; // estimación de horas ahorradas / semana
}

export const AGENTS: Agent[] = [
  {
    id: 'asistente-personal',
    name: 'Asistente personal',
    role: 'Asistente personal',
    category: 'Productividad',
    description: 'Limpia tu bandeja, envía correos y gestiona tu calendario.',
    avatarEmoji: '🤖',
    avatarColor: '#3A3678',
    integrations: ['gmail', 'calendar', 'drive', 'outlook'],
    hoursPerWeek: 10,
  },
  {
    id: 'contable',
    name: 'Contable',
    role: 'Contable',
    category: 'Finanzas',
    description: 'Categoriza gastos, concilia cuentas y prepara informes.',
    avatarEmoji: '🧮',
    avatarColor: '#0D9488',
    integrations: ['sheets', 'drive'],
    hoursPerWeek: 8,
  },
  {
    id: 'gerente-rrhh',
    name: 'Gerente de RRHH',
    role: 'Gerente de RRHH',
    category: 'Recursos Humanos',
    description: 'Publica ofertas, revisa CVs, hace onboarding y nómina.',
    avatarEmoji: '👥',
    avatarColor: '#7C3AED',
    integrations: ['linkedin', 'gmail'],
    hoursPerWeek: 6,
  },
  {
    id: 'servicio-cliente',
    name: 'Rep. de Servicio al Cliente',
    role: 'Rep. de Servicio al Cliente',
    category: 'Soporte',
    description: 'Lee tickets, redacta respuestas, procesa reembolsos y escala los casos.',
    avatarEmoji: '🎧',
    avatarColor: '#D97706',
    integrations: ['zendesk', 'gmail', 'slack', 'whatsapp'],
    hoursPerWeek: 12,
  },
  {
    id: 'rep-ventas',
    name: 'Rep. de ventas',
    role: 'Rep. de ventas',
    category: 'Comercial',
    description: 'Sigue leads, manda recordatorios, actualiza el CRM y arma propuestas.',
    avatarEmoji: '📈',
    avatarColor: '#2563EB',
    integrations: ['hubspot', 'gmail', 'calendar'],
    hoursPerWeek: 9,
  },
  {
    id: 'gerente-oficina',
    name: 'Gerente de oficina',
    role: 'Gerente de oficina',
    category: 'Operaciones',
    description: 'Organiza documentos, coordina horarios y comunicaciones internas.',
    avatarEmoji: '🗂️',
    avatarColor: '#0E8466',
    integrations: ['drive', 'slack', 'calendar'],
    hoursPerWeek: 7,
  },
];
