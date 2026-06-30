import { useState } from 'react';

import { GridToolbar, type ToolbarFilter } from '../components/GridToolbar';
import { ProcessCard } from '../components/ProcessCard';
import { PlusIcon } from '../components/icons';
import { PROCESSES, type Process } from '../data/processes';
import './Procesos.css';

const FILTERS: ToolbarFilter[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'manuales', label: 'Manuales' },
  { id: 'digitales', label: 'Digitales' },
];

export default function Procesos() {
  const [processes, setProcesses] = useState<Process[]>(PROCESSES);
  const [filter, setFilter] = useState('todos');
  const [query, setQuery] = useState('');

  const visible = processes.filter((p) => {
    if (filter === 'manuales' && p.kind !== 'flujograma') return false;
    if (filter === 'digitales' && p.kind !== 'guia') return false;
    if (query && !p.title.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  function duplicate(p: Process) {
    const copy: Process = { ...p, id: `${p.id}-copia-${Date.now()}`, title: `${p.title} (copia)` };
    setProcesses((list) => {
      const i = list.findIndex((x) => x.id === p.id);
      return [...list.slice(0, i + 1), copy, ...list.slice(i + 1)];
    });
  }
  function remove(p: Process) {
    setProcesses((list) => list.filter((x) => x.id !== p.id));
  }
  function copyLink(p: Process) {
    navigator.clipboard?.writeText(`https://app.sebach.ai/procesos/${p.id}`);
  }

  return (
    <>
      <header className="px-header">
        <h1 className="px-h1">Procesos</h1>
        <button className="btn btn--primary px-new">
          <PlusIcon size={16} />
          Nuevo proceso
        </button>
      </header>

      <GridToolbar
        filters={FILTERS}
        active={filter}
        onFilter={setFilter}
        query={query}
        onQuery={setQuery}
        searchPlaceholder="Buscar proceso…"
      />

      <div className="px-grid">
        {visible.map((p) => (
          <ProcessCard
            key={p.id}
            p={p}
            onCopyLink={() => copyLink(p)}
            onShare={() => copyLink(p)}
            onDuplicate={() => duplicate(p)}
            onDelete={() => remove(p)}
          />
        ))}
      </div>
    </>
  );
}
