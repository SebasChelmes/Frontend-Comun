import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useApp } from '../context/AppContext';
import { BrandGlyph } from './BrandMark';
import { UserMenu } from './UserMenu';
import {
  AgentsIcon,
  AnalysisIcon,
  BoltIcon,
  BookIcon,
  CaptureIcon,
  ChevronDownIcon,
  HomeIcon,
  LockIcon,
  PanelIcon,
  PlugIcon,
  ProcessIcon,
  ServerIcon,
  TerminalIcon,
} from './icons';
import './Sidebar.css';

/* sub-opciones del Hub de Agentes IA */
const HUB_SUBITEMS = [
  { label: 'Conectores', Icon: PlugIcon },
  { label: 'MCP Local', Icon: ServerIcon },
  { label: 'Skills', Icon: BookIcon },
  { label: 'Comandos', Icon: TerminalIcon },
];

/* ---------- expanded sidebar ---------- */
export function Sidebar() {
  const { planLabel, showLocks } = useApp();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => pathname.startsWith(path);
  const [hubOpen, setHubOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);

  // cerrar el menú de usuario al cambiar de ruta (evita que quede abierto al navegar)
  useEffect(() => {
    setUserMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!userMenuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setUserMenuOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [userMenuOpen]);

  return (
    <aside className="sb">
      {/* brand */}
      <div className="sb__brand">
        <BrandGlyph size={28} />
        <span className="sb__brand-word">Sebach AI</span>
        <span className="sb__plan mono">{planLabel}</span>
      </div>

      <nav className="sb__nav">
        <a className="sb__item">
          <HomeIcon size={18} className="sb__ico" />
          Inicio
        </a>

        <div className="sb__section mono">RELEVAMIENTO</div>

        <a
          className={`sb__item ${isActive('/procesos') ? 'is-active' : ''}`}
          onClick={() => navigate('/procesos')}
        >
          <ProcessIcon size={18} className="sb__ico" style={isActive('/procesos') ? { color: 'var(--accent)' } : undefined} />
          Procesos
        </a>

        <a className="sb__item">
          <CaptureIcon size={18} className="sb__ico" />
          Captura
          <span className="sb__dot" />
        </a>

        <div className="sb__section sb__section--row mono">
          <span>INTELIGENCIA</span>
          {showLocks && <LockIcon size={11} style={{ color: 'var(--ink-4)' }} />}
        </div>

        <a className="sb__item">
          <AnalysisIcon size={18} className="sb__ico" />
          Análisis
          {showLocks && <span className="sb__tag mono">PREMIUM</span>}
        </a>

        <a
          className={`sb__item sb__parent ${isActive('/agentes') ? 'is-active' : ''}`}
          onClick={() => navigate('/agentes')}
        >
          <AgentsIcon size={18} className="sb__ico" style={isActive('/agentes') ? { color: 'var(--accent)' } : undefined} />
          <span className="sb__parent-label">Hub de Agentes IA</span>
          <span
            className="sb__chevron-btn"
            role="button"
            aria-label={hubOpen ? 'Contraer' : 'Expandir'}
            onClick={(e) => {
              e.stopPropagation();
              setHubOpen((o) => !o);
            }}
          >
            <ChevronDownIcon size={15} className={`sb__chevron ${hubOpen ? 'is-open' : ''}`} />
          </span>
        </a>

        {hubOpen && (
          <div className="sb__sub">
            {HUB_SUBITEMS.map(({ label, Icon }) => (
              <a className="sb__subitem" key={label}>
                <Icon size={16} className="sb__subico" />
                {label}
              </a>
            ))}
          </div>
        )}

        <a className="sb__item">
          <BoltIcon size={18} className="sb__ico" />
          Automatizaciones
        </a>

        <div className="sb__section mono">CUENTA</div>

        <a className="sb__item">
          <PanelIcon size={18} className="sb__ico" />
          Panel de Agencia
        </a>
      </nav>

      {/* user footer */}
      <div className="sb__user" ref={userRef}>
        {userMenuOpen && <UserMenu onClose={() => setUserMenuOpen(false)} />}
        <div className="sb__avatar">M</div>
        <div className="sb__user-info">
          <div className="sb__user-name">Martina Ríos</div>
          <div className="sb__user-mail mono">martina@empresa.com</div>
        </div>
        <button
          className={`sb__user-more ${userMenuOpen ? 'is-open' : ''}`}
          aria-label="Opciones de usuario"
          aria-haspopup="menu"
          aria-expanded={userMenuOpen}
          onClick={() => setUserMenuOpen((o) => !o)}
        >
          ⋮
        </button>
      </div>
    </aside>
  );
}

/* ---------- collapsed rail ---------- */
export function SidebarRail() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <aside className="sbr">
      <BrandGlyph size={30} radius={9} />
      <a className="sbr__item"><HomeIcon size={19} /></a>
      <a
        className={`sbr__item ${isActive('/procesos') ? 'is-active' : ''}`}
        onClick={() => navigate('/procesos')}
      >
        <ProcessIcon size={19} />
      </a>
      <a className="sbr__item"><CaptureIcon size={19} /></a>
      <a className="sbr__item"><AnalysisIcon size={19} /></a>
      <a
        className={`sbr__item ${isActive('/agentes') ? 'is-active' : ''}`}
        onClick={() => navigate('/agentes')}
      >
        <AgentsIcon size={19} />
      </a>
      <div className="sbr__spacer" />
      <div className="sb__avatar">M</div>
    </aside>
  );
}
