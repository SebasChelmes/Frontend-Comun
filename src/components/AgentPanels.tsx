import { useState, type ComponentType, type ReactNode } from 'react';

import type { Agent } from '../data/agents';
import { ConfirmDialog } from './ConfirmDialog';
import { EmptyIcon, EmptyState } from './EmptyState';
import {
  BookIcon,
  ChevronDownIcon,
  CopyIcon,
  DocIcon,
  LinkIcon,
  PlayIcon,
  PlusIcon,
  TerminalIcon,
  TrashIcon,
  UploadIcon,
} from './icons';
import './AgentPanels.css';

type IconType = ComponentType<{ size?: number; className?: string }>;

/* ---------- datos de ejemplo (los reemplaza el backend de Agents Hub) ---------- */
const SAMPLE_COMMANDS = [
  { name: '/checklist-onboarding', desc: 'Generá un plan de onboarding completo y estructurado.' },
  { name: '/evaluar-cv', desc: 'Evaluá un CV para un puesto específico y devolvé un puntaje.' },
  { name: '/redactar-oferta', desc: 'Redactá una oferta de trabajo atractiva y completa.' },
];
const SAMPLE_SKILLS = [
  {
    name: 'criterios-evaluacion-cv',
    title: 'Criterios de Evaluación de CV',
    desc: 'Base de conocimiento para evaluar candidatos de forma consistente.',
  },
];

/* ---------- helpers ---------- */
function PanelHead({
  icon: Icon,
  title,
  sub,
  action,
}: {
  icon?: IconType;
  title: string;
  sub: string;
  action?: ReactNode;
}) {
  return (
    <div className="ap__head">
      <div className="ap__head-text">
        <h3 className="ap__title">
          {Icon && <Icon size={17} className="ap__title-ico" />}
          {title}
        </h3>
        <p className="ap__sub mono">{sub}</p>
      </div>
      {action}
    </div>
  );
}

function BoxedEmpty({ icon: Icon, title, text }: { icon: IconType; title?: string; text: string }) {
  return (
    <EmptyState
      variant="inset"
      className="ap__empty-slot"
      media={<EmptyIcon><Icon size={22} /></EmptyIcon>}
      title={title}
      description={text}
    />
  );
}

function CenterEmpty({ title, text }: { title: string; text: string }) {
  return (
    <div className="ap__center">
      <EmptyState variant="plain" title={title} description={text} />
    </div>
  );
}

const ghostManage = (
  <button type="button" className="btn btn--ghost ap__btn">
    <PlusIcon size={15} />
    Gestionar
  </button>
);

/* ---------- Archivos ---------- */
export function FilesPanel({ agent }: { agent: Agent }) {
  return (
    <div className="ap">
      <section className="ap__section">
        <PanelHead
          icon={BookIcon}
          title="Base de conocimiento"
          sub={`Documentos y URLs que ${agent.name} puede consultar al responder`}
          action={
            <div className="ap__actions">
              <button type="button" className="btn btn--ghost ap__btn">
                <LinkIcon size={15} />
                URL
              </button>
              <button type="button" className="btn btn--primary ap__btn">
                <UploadIcon size={15} />
                Subir archivo
              </button>
            </div>
          }
        />
        <BoxedEmpty
          icon={BookIcon}
          title="Sin documentos en la base de conocimiento"
          text={`Subí un PDF, TXT, CSV o agregá una URL para que ${agent.name} pueda consultarlos.`}
        />
      </section>

      <div className="ap__divider" />

      <section className="ap__section">
        <PanelHead icon={DocIcon} title="Archivos generados" sub={`Documentos que ${agent.name} ha creado`} />
        <BoxedEmpty icon={DocIcon} text={`Todavía no hay archivos generados por ${agent.name}.`} />
      </section>
    </div>
  );
}

/* ---------- Agenda ---------- */
export function SchedulesPanel({ agent }: { agent: Agent }) {
  return (
    <div className="ap">
      <PanelHead
        title="Tareas programadas"
        sub={`Automatizá tareas recurrentes para ${agent.name}`}
        action={
          <button type="button" className="btn btn--primary ap__btn">
            <PlusIcon size={15} />
            Nueva tarea
          </button>
        }
      />
      <CenterEmpty
        title="Sin tareas programadas"
        text={`Creá tareas recurrentes para que ${agent.name} las ejecute automáticamente según la frecuencia que configures.`}
      />
    </div>
  );
}

/* ---------- Comandos ---------- */
export function CommandsPanel({ agent }: { agent: Agent }) {
  return (
    <div className="ap">
      <PanelHead
        title="Comandos disponibles"
        sub={`${SAMPLE_COMMANDS.length} comandos para ${agent.name}`}
        action={ghostManage}
      />
      <div className="ap__grid">
        {SAMPLE_COMMANDS.map((c) => (
          <CommandCard key={c.name} name={c.name} desc={c.desc} />
        ))}
      </div>

      <div className="ap__divider" />

      <PanelHead
        title="Skills disponibles"
        sub={`${SAMPLE_SKILLS.length} skill activa para ${agent.name}`}
        action={ghostManage}
      />
      <div className="ap__grid">
        {SAMPLE_SKILLS.map((s) => (
          <SkillCard key={s.name} {...s} />
        ))}
      </div>
    </div>
  );
}

function CommandCard({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="ap__card">
      <div className="ap__card-top">
        <span className="ap__card-ico">
          <TerminalIcon size={15} />
        </span>
        <div className="ap__card-tools">
          <button type="button" className="icon-btn icon-btn--sm" title="Copiar">
            <CopyIcon size={13} />
          </button>
          <button type="button" className="icon-btn icon-btn--sm" aria-label="Más">
            <ChevronDownIcon size={13} />
          </button>
        </div>
      </div>
      <div className="ap__card-name mono">{name}</div>
      <p className="ap__card-desc">{desc}</p>
      <button type="button" className="btn btn--primary ap__run">
        <PlayIcon size={14} />
        Ejecutar
      </button>
    </div>
  );
}

function SkillCard({
  name,
  title,
  desc,
  deletable,
  onDelete,
}: {
  name: string;
  title: string;
  desc: string;
  deletable?: boolean;
  onDelete?: () => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="ap__card">
      <div className="ap__card-top">
        <span className="ap__card-ico ap__card-ico--skill">
          <BookIcon size={15} />
        </span>
        <div className="ap__card-tools">
          <button
            type="button"
            className="icon-btn icon-btn--sm"
            aria-label={deletable ? 'Eliminar' : 'Copiar'}
            onClick={deletable ? () => setConfirmDelete(true) : undefined}
          >
            {deletable ? <TrashIcon size={13} /> : <CopyIcon size={13} />}
          </button>
          <button type="button" className="icon-btn icon-btn--sm" aria-label="Más">
            <ChevronDownIcon size={13} />
          </button>
        </div>
      </div>
      <div className="ap__card-name ap__card-name--skill mono">{name}</div>
      <div className="ap__card-title">{title}</div>
      <p className="ap__card-desc">{desc}</p>

      {confirmDelete && (
        <ConfirmDialog
          title={`¿Eliminar la skill "${title}"?`}
          description="Esta acción no se puede deshacer."
          onConfirm={() => { onDelete?.(); setConfirmDelete(false); }}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </div>
  );
}

/* ---------- Skills ---------- */
export function SkillsPanel({ agent }: { agent: Agent }) {
  const [skills, setSkills] = useState(SAMPLE_SKILLS);

  return (
    <div className="ap">
      <PanelHead
        title="Skills activas"
        sub={`${skills.length} skill asignada a ${agent.name}`}
        action={ghostManage}
      />
      <div className="ap__grid">
        {skills.map((s) => (
          <SkillCard
            key={s.name}
            {...s}
            deletable
            onDelete={() => setSkills((list) => list.filter((sk) => sk.name !== s.name))}
          />
        ))}
      </div>
      <div className="ap__note">
        <BookIcon size={16} className="ap__note-ico" />
        El contenido de estas skills se inyecta automáticamente en el contexto del agente durante el chat.
      </div>
    </div>
  );
}

/* ---------- Bandeja ---------- */
const INBOX_SUBS = [
  { id: 'pendientes', label: 'Pendientes' },
  { id: 'enviados', label: 'Enviados' },
  { id: 'rechazados', label: 'Rechazados' },
] as const;

export function InboxPanel({ agent }: { agent: Agent }) {
  const [sub, setSub] = useState<(typeof INBOX_SUBS)[number]['id']>('pendientes');

  const empty: Record<string, { title: string; text: string }> = {
    pendientes: {
      title: 'No hay acciones pendientes',
      text: `Cuando ${agent.name} quiera enviar un email, aparecerá aquí para que lo revises antes de enviarlo.`,
    },
    enviados: { title: 'Sin envíos', text: `Los emails que ${agent.name} haya enviado aparecerán aquí.` },
    rechazados: { title: 'Sin rechazos', text: 'Las acciones que rechaces aparecerán aquí.' },
  };

  return (
    <div className="ap">
      <div className="ap__subtabs">
        {INBOX_SUBS.map((s) => (
          <button
            type="button"
            key={s.id}
            className={`tab ap__subtab ${sub === s.id ? 'is-active' : ''}`}
            onClick={() => setSub(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <CenterEmpty title={empty[sub].title} text={empty[sub].text} />
    </div>
  );
}
