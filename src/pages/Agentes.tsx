import { useState } from 'react';

import { AgentCard } from '../components/AgentCard';
import { AgentEditModal } from '../components/AgentEditModal';
import { GridToolbar, type ToolbarFilter } from '../components/GridToolbar';
import { PlusIcon } from '../components/icons';
import { useAgents } from '../context/AgentsContext';
import { AGENT_AREAS, type Agent } from '../data/agents';
import './Agentes.css';

// filtros por área de empresa
const FILTERS: ToolbarFilter[] = [
  { id: 'todos', label: 'Todos' },
  ...AGENT_AREAS.map((a) => ({ id: a, label: a })),
];

export default function Agentes() {
  const { agents, updateAgent } = useAgents();
  const [editing, setEditing] = useState<Agent | null>(null);
  const [filter, setFilter] = useState('todos');
  const [query, setQuery] = useState('');

  const visible = agents.filter((a) => {
    if (filter !== 'todos' && a.area !== filter) return false;
    if (query && !a.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  function saveAgent(updated: Agent) {
    updateAgent(updated);
    setEditing(null);
  }

  return (
    <>
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
    </>
  );
}
