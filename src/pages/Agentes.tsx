import { useState } from 'react';

import { AgentCard } from '../components/AgentCard';
import { AgentEditModal } from '../components/AgentEditModal';
import { AppShell } from '../components/AppShell';
import { PlusIcon } from '../components/icons';
import { AGENTS, type Agent } from '../data/agents';
import './Agentes.css';

export default function Agentes() {
  const [agents, setAgents] = useState<Agent[]>(AGENTS);
  const [editing, setEditing] = useState<Agent | null>(null);

  function saveAgent(updated: Agent) {
    setAgents((list) => list.map((a) => (a.id === updated.id ? updated : a)));
    setEditing(null);
  }

  return (
    <AppShell crumb="INTELIGENCIA / AGENTES">
      <header className="ax-header">
        <h1 className="ax-h1">Hub</h1>
        <button className="btn btn--primary ax-new">
          <PlusIcon size={16} />
          Nuevo agente
        </button>
      </header>

      <div className="ax-grid">
        {agents.map((a) => (
          <AgentCard key={a.id} agent={a} onEdit={setEditing} />
        ))}
      </div>

      {editing && (
        <AgentEditModal agent={editing} onSave={saveAgent} onClose={() => setEditing(null)} />
      )}
    </AppShell>
  );
}
