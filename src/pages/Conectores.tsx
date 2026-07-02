import { type ComponentType, useState } from 'react';

import { EmptyIcon, EmptyState } from '../components/EmptyState';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  DatabaseIcon,
  GlobeIcon,
  InfoIcon,
  LinkIcon,
  PlusIcon,
  PlugIcon,
  WebhookIcon,
  ChevronDownIcon,
  ChatIcon,
  DocIcon,
  CaptureIcon,
  ProcessIcon,
} from '../components/icons';
import './Conectores.css';

type TabId = 'proveedores' | 'propios' | 'webhooks';
type SubTabId = 'todos' | 'rest' | 'db';

interface Provider {
  id: string;
  name: string;
  desc: string;
  bg: string;
  Icon: ComponentType<{ size?: number }>;
  ctaLabel: string;
}

interface SoonProvider {
  id: string;
  name: string;
  desc: string;
  bg: string;
  Icon: ComponentType<{ size?: number }>;
}

const AVAILABLE: Provider[] = [
  {
    id: 'google',
    name: 'Google',
    desc: 'Gmail, Drive, Sheets y Calendar',
    bg: '#4285F4',
    Icon: GlobeIcon,
    ctaLabel: 'Conectar con Google',
  },
  {
    id: 'jira',
    name: 'Jira',
    desc: 'Gestión de issues: buscar, crear, comentar y cambiar estados.',
    bg: '#0052CC',
    Icon: ProcessIcon,
    ctaLabel: 'Configurar Jira',
  },
];

const SOON: SoonProvider[] = [
  { id: 'slack', name: 'Slack', desc: 'Mensajes y notificaciones en canales', bg: '#4A154B', Icon: ChatIcon },
  { id: 'notion', name: 'Notion', desc: 'Páginas, bases de datos y contenido', bg: '#333333', Icon: DocIcon },
  { id: 'whatsapp', name: 'WhatsApp Business', desc: 'Mensajes y notificaciones por WhatsApp', bg: '#25D366', Icon: ChatIcon },
  { id: 'instagram', name: 'Instagram', desc: 'Gestión de mensajes y comentarios', bg: '#E1306C', Icon: CaptureIcon },
];

/* cabecera compartida de cada tab (descripción izq + botón der) */
function TabHead({ desc, children }: { desc?: string; children: React.ReactNode }) {
  return (
    <div className="cn-tab-head">
      {desc ? <p className="cn-tab-head__desc">{desc}</p> : <span />}
      {children}
    </div>
  );
}

/* card de proveedor disponible — mismo patrón que ProcessCard */
function ProviderCard({ p }: { p: Provider }) {
  return (
    <article className="cn-card card-surface">
      <div className="cn-card__top">
        <span className="cn-card__type mono">
          <CheckCircleIcon size={11} strokeWidth={2} />
          INTEGRACIÓN
        </span>
        <span className="cn-card__status">
          <span className="cn-card__dot" />
          Disponible
        </span>
      </div>

      <h3 className="cn-card__title">{p.name}</h3>
      <p className="cn-card__meta mono">{p.desc}</p>

      <div className="cn-card__preview">
        <span className="cn-card__icon" style={{ background: p.bg }}>
          <p.Icon size={26} />
        </span>
      </div>

      <div className="cn-card__foot">
        <span />
        <button type="button" className="cn-card__cta">
          {p.ctaLabel} <ArrowRightIcon size={13} strokeWidth={2} />
        </button>
      </div>
    </article>
  );
}

/* card de proveedor próximamente */
function SoonCard({ p }: { p: SoonProvider }) {
  return (
    <article className="cn-card cn-card--soon card-surface">
      <div className="cn-card__top">
        <span className="cn-card__type cn-card__type--soon mono">
          INTEGRACIÓN
        </span>
        <span className="cn-card__linked mono">Próximamente</span>
      </div>

      <h3 className="cn-card__title">{p.name}</h3>
      <p className="cn-card__meta mono">{p.desc}</p>

      <div className="cn-card__preview cn-card__preview--soon">
        <span className="cn-card__icon" style={{ background: p.bg }}>
          <p.Icon size={26} />
        </span>
      </div>

      <div className="cn-card__foot">
        <span />
        <span className="cn-card__cta cn-card__cta--muted">Próximamente</span>
      </div>
    </article>
  );
}

/* ---------- Proveedores tab ---------- */
function ProveedoresTab() {
  return (
    <div className="cn-body">
      <TabHead>
        <button type="button" className="btn btn--primary page-new">
          <PlusIcon size={15} />
          Agregar proveedor
        </button>
      </TabHead>

      <div className="cn-section">
        <div className="cn-section__label mono">DISPONIBLES</div>
        <div className="cn-providers">
          {AVAILABLE.map((p) => <ProviderCard key={p.id} p={p} />)}
        </div>
      </div>

      <div className="cn-section">
        <div className="cn-section__label mono">PRÓXIMAMENTE</div>
        <div className="cn-providers">
          {SOON.map((p) => <SoonCard key={p.id} p={p} />)}
        </div>
      </div>
    </div>
  );
}

/* ---------- Conectores propios tab ---------- */
function PropiosTab({ subTab, onSubTab }: { subTab: SubTabId; onSubTab: (t: SubTabId) => void }) {
  return (
    <div className="cn-body">
      <TabHead desc="Conectá tus APIs y bases de datos para que los agentes puedan operar sobre ellos.">
        <button type="button" className="btn btn--primary page-new">
          <PlusIcon size={15} />
          Nuevo conector
          <ChevronDownIcon size={14} />
        </button>
      </TabHead>

      <div className="cn-subtabs">
        <button type="button" className={`tab cn-subtab ${subTab === 'todos' ? 'is-active' : ''}`} onClick={() => onSubTab('todos')}>
          Todos
        </button>
        <button type="button" className={`tab cn-subtab ${subTab === 'rest' ? 'is-active' : ''}`} onClick={() => onSubTab('rest')}>
          REST API
        </button>
        <button type="button" className={`tab cn-subtab ${subTab === 'db' ? 'is-active' : ''}`} onClick={() => onSubTab('db')}>
          Base de datos
        </button>
      </div>

      <EmptyState
        variant="plain"
        media={<EmptyIcon>{subTab === 'db' ? <DatabaseIcon size={26} /> : <PlugIcon size={26} />}</EmptyIcon>}
        title="Sin conectores configurados"
        description={<>Agregá un conector para que los agentes puedan<br />operar sobre tus sistemas propios.</>}
      />
    </div>
  );
}

/* ---------- Webhooks tab ---------- */
function WebhooksTab() {
  return (
    <div className="cn-body">
      <TabHead>
        <button type="button" className="btn btn--primary page-new">
          <PlusIcon size={15} />
          Nuevo webhook
        </button>
      </TabHead>

      <EmptyState
        variant="plain"
        media={<EmptyIcon><WebhookIcon size={26} /></EmptyIcon>}
        title="Sin webhooks configurados"
        description={<>Creá tu primer webhook para que tus agentes<br />reaccionen automáticamente a eventos de otros sistemas.</>}
      />
    </div>
  );
}

/* ---------- main ---------- */
export default function Conectores() {
  const [tab, setTab] = useState<TabId>('proveedores');
  const [subTab, setSubTab] = useState<SubTabId>('todos');

  return (
    <div className="cn">
      <header className="page-header">
        <h1 className="page-title cn-title">
          Conectores
          <span className="cn-info" title="¿Cómo funciona?">
            <InfoIcon size={17} />
          </span>
        </h1>
      </header>

      <div className="cn-tabs">
        <button type="button" className={`tab cn-tab ${tab === 'proveedores' ? 'is-active' : ''}`} onClick={() => setTab('proveedores')}>
          <GlobeIcon size={14} />
          Proveedores
        </button>
        <button type="button" className={`tab cn-tab ${tab === 'propios' ? 'is-active' : ''}`} onClick={() => setTab('propios')}>
          <LinkIcon size={14} />
          Conectores propios
        </button>
        <button type="button" className={`tab cn-tab ${tab === 'webhooks' ? 'is-active' : ''}`} onClick={() => setTab('webhooks')}>
          <WebhookIcon size={14} />
          Webhooks
        </button>
      </div>

      {tab === 'proveedores' && <ProveedoresTab />}
      {tab === 'propios' && <PropiosTab subTab={subTab} onSubTab={setSubTab} />}
      {tab === 'webhooks' && <WebhooksTab />}
    </div>
  );
}
