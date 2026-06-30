import { useState } from 'react';

import { AgentCard } from '../components/AgentCard';
import { AgentEditModal } from '../components/AgentEditModal';
import { AppShell } from '../components/AppShell';
import { GridToolbar, type ToolbarFilter } from '../components/GridToolbar';
import { PlusIcon } from '../components/icons';
import { AGENTS, AGENT_AREAS, type Agent } from '../data/agents';
import './Agentes.css';

// filtros por área de empresa
const FILTERS: ToolbarFilter[] = [
  { id: 'todos', label: 'Todos' },
  ...AGENT_AREAS.map((a) => ({ id: a, label: a })),
];

export default function Agentes() {
  const [agents, setAgents] = useState<Agent[]>(AGENTS);
  const [editing, setEditing] = useState<Agent | null>(null);
  const [filter, setFilter] = useState('todos');
  const [query, setQuery] = useState('');

  const visible = agents.filter((a) => {
    if (filter !== 'todos' && a.area !== filter) return false;
    if (query && !a.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  function saveAgent(updated: Agent) {
    setAgents((list) => list.map((a) => (a.id === updated.id ? updated : a)));
    setEditing(null);
  }

  return (
    <AppShell crumb="INTELIGENCIA / AGENTES">
      <header className="ax-header">
        <h1 className="ax-h1">Hub de Agentes</h1>
        <button className="btn btn--primary ax-new">
          <PlusIcon size={16} />
          Nuevo agente
        </button>
      </header>

      <GridToolbar
        filters={FILTERS}
        active={filter}
        onFilter={setFilter}
        query={query}
        onQuery={setQuery}
        searchPlaceholder="Buscar agente…"
      />

      <div className="ax-grid">
        {visible.map((a) => (
          <AgentCard key={a.id} agent={a} onEdit={setEditing} />
        ))}
      </div>

      {editing && (
        <AgentEditModal agent={editing} onSave={saveAgent} onClose={() => setEditing(null)} />
      )}
    </AppShell>
  );
}
