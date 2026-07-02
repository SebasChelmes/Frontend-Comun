import { EmptyState } from '../components/EmptyState';
import { BoltIcon, CalendarIcon, MailIcon, PlusIcon } from '../components/icons';
import './Automatizaciones.css';

export default function Automatizaciones() {
  return (
    <div className="auto">
      {/* ── encabezado ── */}
      <div className="auto-head">
        <div>
          <h1 className="page-title">Automatizaciones</h1>
          <p className="auto-head__sub">
            Conectá tus agentes con eventos externos para disparar acciones de forma automática.
          </p>
        </div>
        <button type="button" className="btn btn--primary auto-head__cta">
          <PlusIcon size={15} />
          Nueva automatización
        </button>
      </div>

      {/* ── empty state ── */}
      <EmptyState
        media={
          <div className="auto-empty__icons">
            <div className="auto-icon-box auto-icon-box--teal"><MailIcon size={22} /></div>
            <div className="auto-icon-box auto-icon-box--dark"><CalendarIcon size={22} /></div>
            <div className="auto-icon-box auto-icon-box--violet"><BoltIcon size={22} /></div>
          </div>
        }
        title="Sin automatizaciones todavía"
        description="Creá tu primera automatización para que tus agentes actúen sin intervención manual."
      />
    </div>
  );
}
