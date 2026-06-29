import { useState, type ReactNode } from 'react';

import { useApp } from '../context/AppContext';
import { DesignControls } from './DesignControls';
import { Sidebar, SidebarRail } from './Sidebar';
import { BellIcon, SidebarToggleIcon, StarIcon } from './icons';
import './AppShell.css';

/**
 * Shell común de la app: ventana enmarcada + sidebar (expandible/rail) + top bar
 * + cuerpo scrolleable. Lo usan las pantallas internas (Procesos, Agentes, …).
 */
export function AppShell({ crumb, children }: { crumb: string; children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const { showUpgrade } = useApp();

  return (
    <div className="app-screen">
      <div className="app-shell">
        {collapsed ? <SidebarRail /> : <Sidebar />}

        <div className="app-content">
          <div className="app-topbar">
            <button
              className="app-iconbtn"
              onClick={() => setCollapsed((c) => !c)}
              aria-label="Plegar barra lateral"
            >
              <SidebarToggleIcon size={17} />
            </button>
            <span className="app-crumb mono">{crumb}</span>
            <div className="app-topbar__right">
              {showUpgrade && (
                <div className="app-upsell">
                  <span className="app-upsell__lead">
                    <StarIcon size={14} className="app-upsell__star" />
                    Pasá a <b>PRO</b>
                  </span>
                  <button className="app-upsell__btn">Mejorar plan</button>
                </div>
              )}
              <a className="app-help">Ayuda</a>
              <button className="app-iconbtn app-bell" aria-label="Notificaciones">
                <BellIcon size={17} />
                <span className="app-bell__dot" />
              </button>
            </div>
          </div>

          <div className="app-body">{children}</div>
        </div>
      </div>

      <DesignControls />
    </div>
  );
}
