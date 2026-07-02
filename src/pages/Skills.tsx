import '../styles/lib-page.css';
import { EmptyIcon, EmptyState } from '../components/EmptyState';
import {
  BookIcon,
  InfoIcon,
  PlusIcon,
  SearchIcon,
  UploadIcon,
} from '../components/icons';

export default function Skills() {
  return (
    <div className="lib">
      {/* ── encabezado ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <div className="lib-title">
            <h1 className="page-title">Biblioteca de Skills</h1>
            <span
              className="lib-info"
              title="Las skills son instrucciones reutilizables que podés referenciar en tus comandos con la sintaxis ## Skills requeridas."
            >
              <InfoIcon size={16} />
            </span>
          </div>
          <p style={{ fontSize: 13.5, color: 'var(--ink-2)', margin: '4px 0 0', lineHeight: 1.55 }}>
            Definí conjuntos de instrucciones reutilizables para tus agentes IA.
          </p>
        </div>

        <div className="lib-actions">
          <button type="button" className="btn btn--ghost">
            <UploadIcon size={15} />
            Importar
          </button>
          <button type="button" className="btn btn--primary">
            <PlusIcon size={15} />
            Nueva skill
          </button>
        </div>
      </div>

      {/* ── buscador ── */}
      <div className="lib-search">
        <span className="lib-search__icon"><SearchIcon size={16} /></span>
        <input
          type="text"
          className="lib-search__input"
          placeholder="Buscar skills…"
          readOnly
        />
      </div>

      {/* ── contador ── */}
      <span className="lib-count mono">0 SKILLS</span>

      {/* ── empty state ── */}
      <EmptyState
        media={<EmptyIcon><BookIcon size={26} /></EmptyIcon>}
        title="Todavía no tenés skills"
        description="Creá tu primera skill o importá una existente para empezar."
      />

      {/* ── tip: cómo referenciar una skill ── */}
      <div className="lib-tip">
        <div className="lib-tip__head">
          <span className="lib-tip__icon"><InfoIcon size={16} /></span>
          ¿Cómo se usa una skill en un comando?
        </div>
        <p className="lib-tip__desc">
          Referenciá cualquier skill desde tus comandos usando el encabezado{' '}
          <code className="lib-tip__inline">## Skills requeridas</code> seguido del
          nombre exacto de la skill:
        </p>
        <pre className="lib-code">{`## Skills requeridas\n- criterios-evaluacion-cv`}</pre>
        <p className="lib-tip__desc">
          El agente cargará automáticamente las instrucciones de la skill al ejecutar el comando.
        </p>
      </div>
    </div>
  );
}
