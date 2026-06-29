import { useState } from 'react';

import { AppShell } from '../components/AppShell';
import { ProcessCard } from '../components/ProcessCard';
import { PlusIcon, SearchIcon, SortIcon } from '../components/icons';
import { PROCESSES } from '../data/processes';
import './Procesos.css';

type Filter = 'todos' | 'manuales' | 'digitales';
const FILTERS: { id: Filter; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'manuales', label: 'Manuales' },
  { id: 'digitales', label: 'Digitales' },
];

export default function Procesos() {
  const [filter, setFilter] = useState<Filter>('todos');
  const [query, setQuery] = useState('');

  const visible = PROCESSES.filter((p) => {
    if (filter === 'manuales' && p.kind !== 'flujograma') return false;
    if (filter === 'digitales' && p.kind !== 'guia') return false;
    if (query && !p.title.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <AppShell crumb="RELEVAMIENTO / PROCESOS">
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
    </AppShell>
  );
}
