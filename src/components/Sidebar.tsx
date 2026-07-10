import { useEffect, useRef, useState, type ComponentType } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useApp } from '../context/AppContext';
import { useDismiss } from '../hooks/useDismiss';
import { BrandGlyph, ProceonLogo } from './BrandMark';
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

type IconType = ComponentType<{ size?: number }>;

/* sub-opciones del Hub de Agentes IA */
const HUB_SUBITEMS: { label: string; Icon: IconType; path?: string }[] = [
  { label: 'Conectores', Icon: PlugIcon, path: '/conectores' },
  { label: 'MCP Local', Icon: ServerIcon, path: '/mcp-local' },
  { label: 'Skills', Icon: BookIcon, path: '/skills' },
  { label: 'Comandos', Icon: TerminalIcon, path: '/comandos' },
];

/* ítems del rail colapsado (mismos del sidebar; con tooltip por ícono) */
const RAIL_ITEMS: { label: string; Icon: IconType; path?: string }[] = [
  { label: 'Inicio', Icon: HomeIcon, path: '/inicio' },
  { label: 'Procesos', Icon: ProcessIcon, path: '/procesos' },
  { label: 'Captura', Icon: CaptureIcon },
  { label: 'Análisis', Icon: AnalysisIcon },
  { label: 'Hub de Agentes IA', Icon: AgentsIcon, path: '/agentes' },
  { label: 'Automatizaciones', Icon: BoltIcon, path: '/automatizaciones' },
  { label: 'Panel de Agencia', Icon: PanelIcon, path: '/panel-de-agencia' },
];

/* ---------- expanded sidebar ---------- */
export function Sidebar() {
  const { planLabel, showLocks } = useApp();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => pathname.startsWith(path);
  const [hubOpen, setHubOpen] = useState(() =>
    pathname.startsWith('/agentes') ||
    pathname.startsWith('/conectores') ||
    pathname.startsWith('/mcp-local') ||
    pathname.startsWith('/skills') ||
    pathname.startsWith('/comandos'),
  );
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);

  // cerrar el menú de usuario al cambiar de ruta (evita que quede abierto al navegar)
  useEffect(() => {
    setUserMenuOpen(false);
  }, [pathname]);
  useDismiss(userMenuOpen, userRef, () => setUserMenuOpen(false));

  const inicioActive = isActive('/inicio');
  const procesosActive = isActive('/procesos');
  const conectoresActive = isActive('/conectores');
  const mcpActive = isActive('/mcp-local');
  const skillsActive = isActive('/skills');
  const comandosActive = isActive('/comandos');
  const autoActive = isActive('/automatizaciones');
  const agentesActive = isActive('/agentes') || conectoresActive || mcpActive || skillsActive || comandosActive;

  return (
    <aside className="sb">
      {/* brand */}
      <div className="sb__brand">
        <ProceonLogo height={22} />
        <span className="sb__plan mono">{planLabel}</span>
      </div>

      <nav className="sb__nav">
        <button
          type="button"
          className={`sb__item ${inicioActive ? 'is-active' : ''}`}
          onClick={() => navigate('/inicio')}
          aria-current={inicioActive ? 'page' : undefined}
        >
          <HomeIcon size={18} className="sb__ico" style={inicioActive ? { color: 'var(--accent)' } : undefined} />
          Inicio
        </button>

        <div className="sb__section mono">RELEVAMIENTO</div>

        <button
          type="button"
          className={`sb__item ${procesosActive ? 'is-active' : ''}`}
          onClick={() => navigate('/procesos')}
          aria-current={procesosActive ? 'page' : undefined}
        >
          <ProcessIcon size={18} className="sb__ico" style={procesosActive ? { color: 'var(--accent)' } : undefined} />
          Procesos
        </button>

        <button type="button" className="sb__item">
          <CaptureIcon size={18} className="sb__ico" />
          Captura
          <span className="sb__dot" />
        </button>

        <div className="sb__section sb__section--row mono">
          <span>INTELIGENCIA</span>
          {showLocks && <LockIcon size={11} style={{ color: 'var(--ink-4)' }} />}
        </div>

        <button type="button" className="sb__item">
          <AnalysisIcon size={18} className="sb__ico" />
          Análisis
          {showLocks && <span className="sb__tag mono">PREMIUM</span>}
        </button>

        {/* Hub: botón principal (navega) + botón chevron (despliega el submenú) */}
        <div className={`sb__item sb__parent ${agentesActive ? 'is-active' : ''}`}>
          <button
            type="button"
            className="sb__parent-main"
            onClick={() => navigate('/agentes')}
            aria-current={agentesActive ? 'page' : undefined}
          >
            <AgentsIcon size={18} className="sb__ico" style={agentesActive ? { color: 'var(--accent)' } : undefined} />
            <span className="sb__parent-label">Hub de Agentes IA</span>
          </button>
          <button
            type="button"
            className="sb__chevron-btn"
            aria-label={hubOpen ? 'Contraer' : 'Expandir'}
            aria-expanded={hubOpen}
            onClick={() => setHubOpen((o) => !o)}
          >
            <ChevronDownIcon size={15} className={`sb__chevron ${hubOpen ? 'is-open' : ''}`} />
          </button>
        </div>

        {hubOpen && (
          <div className="sb__sub">
            {HUB_SUBITEMS.map(({ label, Icon, path }) => {
              const subActive = !!path && isActive(path);
              return (
                <button
                  type="button"
                  className={`sb__subitem ${subActive ? 'is-active' : ''}`}
                  key={label}
                  onClick={() => path && navigate(path)}
                  aria-current={subActive ? 'page' : undefined}
                >
                  <Icon size={16} />
                  {label}
                </button>
              );
            })}
          </div>
        )}

        <button
          type="button"
          className={`sb__item ${autoActive ? 'is-active' : ''}`}
          onClick={() => navigate('/automatizaciones')}
          aria-current={autoActive ? 'page' : undefined}
        >
          <BoltIcon size={18} className="sb__ico" style={autoActive ? { color: 'var(--accent)' } : undefined} />
          Automatizaciones
        </button>

        <div className="sb__section mono">CUENTA</div>

        <button
          type="button"
          className={`sb__item ${isActive('/panel-de-agencia') ? 'is-active' : ''}`}
          onClick={() => navigate('/panel-de-agencia')}
          aria-current={isActive('/panel-de-agencia') ? 'page' : undefined}
        >
          <PanelIcon
            size={18}
            className="sb__ico"
            style={isActive('/panel-de-agencia') ? { color: 'var(--accent)' } : undefined}
          />
          Panel de Agencia
        </button>
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
          type="button"
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
  const isActive = (path?: string) => !!path && pathname.startsWith(path);

  return (
    <aside className="sbr">
      <BrandGlyph size={30} />
      {RAIL_ITEMS.map(({ label, Icon, path }) => {
        const active = isActive(path);
        return (
          <button
            type="button"
            key={label}
            className={`sbr__item ${active ? 'is-active' : ''}`}
            data-tip={label}
            aria-label={label}
            aria-current={active ? 'page' : undefined}
            onClick={() => path && navigate(path)}
          >
            <Icon size={19} />
          </button>
        );
      })}
      <div className="sbr__spacer" />
      <div className="sb__avatar">M</div>
    </aside>
  );
}
