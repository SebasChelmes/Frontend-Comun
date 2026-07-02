import { useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useAgents } from '../context/AgentsContext';
import { useApp } from '../context/AppContext';
import { DesignControls } from './DesignControls';
import { ModelSelector } from './ModelSelector';
import { Sidebar, SidebarRail } from './Sidebar';
import { BellIcon, SidebarToggleIcon, StarIcon } from './icons';
import './AppShell.css';

/**
 * Layout común de la app (persistente): sidebar (expandible/rail) + top bar +
 * cuerpo scrolleable con <Outlet/>. Al ser layout, no se desmonta al navegar
 * entre pantallas, así el estado del sidebar (colapsado, submenús) persiste.
 */
export function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [animating, setAnimating] = useState(false);
  const { showUpgrade } = useApp();
  const { pathname } = useLocation();
  const { getAgent } = useAgents();

  // breadcrumb del top bar, derivado de la ruta actual
  const crumb = useMemo(() => {
    if (pathname.startsWith('/inicio')) return 'INICIO';
    if (pathname.match(/^\/procesos\/[^/]+\/diagrama/)) return 'RELEVAMIENTO / PROCESOS / DIAGRAMA';
    if (pathname.match(/^\/procesos\/[^/]+\/guia/))     return 'RELEVAMIENTO / PROCESOS / GUÍA';
    if (pathname.startsWith('/procesos')) return 'RELEVAMIENTO / PROCESOS';
    if (pathname.startsWith('/conectores')) return 'HUB DE AGENTES IA / CONECTORES';
    if (pathname.startsWith('/mcp-local')) return 'HUB DE AGENTES IA / MCP LOCAL';
    if (pathname.startsWith('/skills')) return 'HUB DE AGENTES IA / SKILLS';
    if (pathname.startsWith('/comandos')) return 'HUB DE AGENTES IA / COMANDOS';
    if (pathname.startsWith('/automatizaciones')) return 'AUTOMATIZACIONES';
    if (pathname.startsWith('/panel-de-agencia')) return 'CUENTA / PANEL DE AGENCIA';
    if (pathname.startsWith('/agentes')) {
      const m = pathname.match(/^\/agentes\/([^/]+)/);
      if (m) {
        const a = getAgent(m[1]);
        return `INTELIGENCIA / AGENTES${a ? ` / ${a.name.toUpperCase()}` : ''}`;
      }
      return 'INTELIGENCIA / AGENTES';
    }
    return '';
  }, [pathname, getAgent]);

  return (
    <div className="app-screen">
      <div className="app-shell">
        <div
          className={`app-side ${collapsed ? 'is-collapsed' : ''} ${animating ? 'is-animating' : ''}`}
          onTransitionEnd={() => setAnimating(false)}
        >
          {collapsed ? <SidebarRail /> : <Sidebar />}
        </div>

        <div className="app-content">
          <div className="app-topbar">
            <button
              type="button"
              className="icon-btn icon-btn--bordered"
              onClick={() => {
                setCollapsed((c) => !c);
                setAnimating(true);
              }}
              aria-label="Plegar barra lateral"
            >
              <SidebarToggleIcon size={17} />
            </button>
            <span className="app-crumb mono">{crumb}</span>

            {/* upsell centrado absolutamente en el topbar */}
            {showUpgrade && (
              <div className="app-upsell">
                <span className="app-upsell__lead">
                  <StarIcon size={14} className="app-upsell__star" />
                  Pasá a <b>PRO</b>
                </span>
                <button type="button" className="app-upsell__btn">Mejorar plan</button>
              </div>
            )}

            <div className="app-topbar__right">
              <ModelSelector />
              <button type="button" className="icon-btn icon-btn--bordered app-bell" aria-label="Notificaciones">
                <BellIcon size={17} />
                <span className="app-bell__dot" />
              </button>
            </div>
          </div>

          <div className="app-body">
            <Outlet />
          </div>
        </div>
      </div>

      <DesignControls />
    </div>
  );
}
