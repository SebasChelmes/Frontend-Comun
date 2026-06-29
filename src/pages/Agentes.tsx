import { useMemo, useState } from 'react';

import { AgentCard } from '../components/AgentCard';
import { AgentEditModal } from '../components/AgentEditModal';
import { AppShell } from '../components/AppShell';
import { PlusIcon } from '../components/icons';
import { AGENTS, type Agent } from '../data/agents';
import './Agentes.css';

export default function Agentes() {
  const [agents, setAgents] = useState<Agent[]>(AGENTS);
  const [editing, setEditing] = useState<Agent | null>(null);

  const hoursTotal = useMemo(
    () => agents.reduce((sum, a) => sum + a.hoursPerWeek, 0),
    [agents],
  );

  function saveAgent(updated: Agent) {
    setAgents((list) => list.map((a) => (a.id === updated.id ? updated : a)));
    setEditing(null);
  }

  return (
    <AppShell crumb="INTELIGENCIA / AGENTES">
      <header className="ax-header">
        <div>
          <h1 className="ax-h1">Agentes / Hub</h1>
          <p className="ax-lead">
            Tu equipo de agentes de IA — cada uno con su rol, sus integraciones y las horas que
            te ahorra por semana. Editá su nombre y su avatar a la medida de tu empresa.
          </p>
          <div className="ax-stats">
            <span className="ax-stat mono">{agents.length} agentes</span>
            <span className="ax-stat mono">~{hoursTotal} hs/sem ahorradas</span>
          </div>
        </div>
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
