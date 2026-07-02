import { ArrowRightIcon, PlusIcon, UserIcon } from '../components/icons';
import './PanelDeAgencia.css';

interface Client {
  id: string;
  name: string;
  industry: string;
  active: boolean;
  procesos: number;
  analizados: number;
  impacto: string | null;
}

const CLIENTS: Client[] = [
  {
    id: 'abc-srl',
    name: 'ABC srl',
    industry: 'Comercio y retail',
    active: false,
    procesos: 1,
    analizados: 1,
    impacto: null,
  },
  {
    id: 'elitrax',
    name: 'Elitrax',
    industry: 'Tecnología y software',
    active: true,
    procesos: 2,
    analizados: 2,
    impacto: '$544k – $3.0M',
  },
];

export default function PanelDeAgencia() {
  return (
    <>
      <header className="page-header">
        <div>
          <h1 className="page-title">Panel de Agencia</h1>
          <p className="pa-subtitle">{CLIENTS.length} empresas en tu organización</p>
        </div>
        <div className="pa-head-actions">
          <button type="button" className="btn btn--ghost pa-manage-btn">
            Gestionar equipo
            <ArrowRightIcon size={15} />
          </button>
          <button type="button" className="btn btn--primary" style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <PlusIcon size={15} />
            Agregar cliente
          </button>
        </div>
      </header>

      <div className="page-grid pa-grid">
        {CLIENTS.map((c) => (
          <div key={c.id} className="pa-card card-surface">
            {/* top */}
            <div className="pa-card__top">
              <div className="pa-card__avatar">
                <UserIcon size={20} />
              </div>
              <div className="pa-card__meta">
                <div className="pa-card__name">{c.name}</div>
                <div className="pa-card__industry mono">{c.industry}</div>
              </div>
              {c.active && (
                <span className="pa-card__badge">
                  <span className="pa-card__badge-dot" />
                  Activo
                </span>
              )}
            </div>

            {/* stats */}
            <div className="pa-card__stats">
              <div className="pa-stat">
                <span className="pa-stat__label mono">Procesos</span>
                <span className="pa-stat__val">{c.procesos}</span>
              </div>
              <div className="pa-stat">
                <span className="pa-stat__label mono">Analizados</span>
                <span className="pa-stat__val">{c.analizados}</span>
              </div>
              <div className="pa-stat">
                <span className="pa-stat__label mono">Impacto/mes</span>
                <span className="pa-stat__val pa-stat__val--impact">
                  {c.impacto ?? '—'}
                </span>
              </div>
            </div>

            {/* footer CTA — solo cuando no está activo */}
            {!c.active && (
              <button type="button" className="btn btn--ghost pa-card__cta">
                Trabajar con este cliente
                <ArrowRightIcon size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
