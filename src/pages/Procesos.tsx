import { useState } from 'react';

import { DesignControls } from '../components/DesignControls';
import { ProcessCard } from '../components/ProcessCard';
import { Sidebar, SidebarRail } from '../components/Sidebar';
import { BellIcon, PlusIcon, SearchIcon, SidebarToggleIcon, SortIcon } from '../components/icons';
import { PROCESSES } from '../data/processes';
import './Procesos.css';

type Filter = 'todos' | 'manuales' | 'digitales';
const FILTERS: { id: Filter; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'manuales', label: 'Manuales' },
  { id: 'digitales', label: 'Digitales' },
];

export default function Procesos() {
  const [collapsed, setCollapsed] = useState(false);
  const [filter, setFilter] = useState<Filter>('todos');
  const [query, setQuery] = useState('');

  const visible = PROCESSES.filter((p) => {
    if (filter === 'manuales' && p.kind !== 'flujograma') return false;
    if (filter === 'digitales' && p.kind !== 'guia') return false;
    if (query && !p.title.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="px-screen">
      <div className="px-shell">
        {collapsed ? <SidebarRail /> : <Sidebar />}

        <div className="px-content">
          {/* top bar */}
          <div className="px-topbar">
            <button
              className="px-iconbtn"
              onClick={() => setCollapsed((c) => !c)}
              aria-label="Plegar barra lateral"
            >
              <SidebarToggleIcon size={17} />
            </button>
            <span className="px-crumb mono">RELEVAMIENTO / PROCESOS</span>
            <div className="px-topbar__right">
              <a className="px-help">Ayuda</a>
              <button className="px-iconbtn px-bell" aria-label="Notificaciones">
                <BellIcon size={17} />
                <span className="px-bell__dot" />
              </button>
            </div>
          </div>

          {/* scroll body */}
          <div className="px-body">
            <header className="px-header">
              <div>
                <h1 className="px-h1">Procesos</h1>
                <p className="px-lead">
                  Todos los procesos de tu empresa — flujogramas de procesos manuales y guías de
                  procesos digitales, en una sola grilla.
                </p>
                <div className="px-stats">
                  <span className="px-stat mono">12 procesos</span>
                  <span className="px-stat mono">5 manuales</span>
                  <span className="px-stat mono">7 digitales</span>
                </div>
              </div>
              <button className="btn btn--primary px-new">
                <PlusIcon size={16} />
                Nuevo proceso
              </button>
            </header>

            {/* toolbar */}
            <div className="px-toolbar">
              <div className="px-seg">
                {FILTERS.map((f) => (
                  <span
                    key={f.id}
                    className={`px-seg__opt ${filter === f.id ? 'is-active' : ''}`}
                    onClick={() => setFilter(f.id)}
                  >
                    {f.label}
                  </span>
                ))}
              </div>
              <div className="px-search">
                <SearchIcon size={16} style={{ color: 'var(--ink-3)' }} />
                <input
                  placeholder="Buscar proceso…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <button className="px-sort">
                <SortIcon size={15} />
                Ordenar
              </button>
            </div>

            {/* grid */}
            <div className="px-grid">
              {visible.map((p) => (
                <ProcessCard key={p.id} p={p} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <DesignControls />
    </div>
  );
}
