import { useState } from 'react';
import '../styles/lib-page.css';
import {
  ChevronDownIcon,
  HelpIcon,
  PlusIcon,
  SearchIcon,
  TerminalIcon,
  UploadIcon,
} from '../components/icons';

export default function Comandos() {
  const [faqOpen, setFaqOpen] = useState(false);

  return (
    <div className="lib">
      {/* ── encabezado ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <h1 className="page-title">Biblioteca de Comandos</h1>
          <p style={{ fontSize: 13.5, color: 'var(--ink-2)', margin: '4px 0 0', lineHeight: 1.55 }}>
            Creá y organizá los prompts reutilizables de tus agentes IA.
          </p>
        </div>

        <div className="lib-actions">
          <button type="button" className="btn btn--ghost" style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <UploadIcon size={15} />
            Importar
          </button>
          <button type="button" className="btn btn--primary" style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <PlusIcon size={15} />
            Nuevo comando
          </button>
        </div>
      </div>

      {/* ── buscador ── */}
      <div className="lib-search">
        <span className="lib-search__icon"><SearchIcon size={16} /></span>
        <input
          type="text"
          className="lib-search__input"
          placeholder="Buscar comandos…"
          readOnly
        />
      </div>

      {/* ── contador ── */}
      <span className="lib-count mono">0 COMANDOS</span>

      {/* ── empty state ── */}
      <div className="lib-empty">
        <div className="lib-empty__icon">
          <TerminalIcon size={26} />
        </div>
        <p className="lib-empty__title">Todavía no tenés comandos</p>
        <p className="lib-empty__desc">
          Creá tu primer comando o importá uno existente para empezar.
        </p>
      </div>

      {/* ── FAQ acordeón ── */}
      <div
        className="lib-faq"
        role="button"
        tabIndex={0}
        aria-expanded={faqOpen}
        onClick={() => setFaqOpen((o) => !o)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setFaqOpen((o) => !o)}
      >
        <div className="lib-faq__head">
          <span className="lib-faq__label">
            <span className="lib-faq__label-icon"><HelpIcon size={16} /></span>
            ¿Cómo funcionan los comandos?
          </span>
          <ChevronDownIcon
            size={17}
            className={`lib-faq__chev${faqOpen ? ' is-open' : ''}`}
          />
        </div>

        {faqOpen && (
          <div className="lib-faq__body">
            <p>
              <strong>Un comando es un prompt reutilizable</strong> que podés invocar en cualquier
              conversación con un agente. Estructuralo con secciones claras: contexto, objetivo,
              restricciones y formato de salida esperado.
            </p>
            <p>
              <strong>Referenciá skills desde un comando</strong> usando el encabezado
              {' '}<code className="lib-tip__inline">## Skills requeridas</code> seguido del nombre
              de la skill. El agente cargará las instrucciones de la skill automáticamente.
            </p>
            <p>
              <strong>Usá variables dinámicas</strong> con la sintaxis{' '}
              <code className="lib-tip__inline">{'{{variable}}'}</code> para personalizar
              el comando en cada ejecución sin editarlo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
