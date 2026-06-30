/**
 * Estado compartido de los agentes. Vive sobre el router para que las ediciones
 * (nombre, avatar, …) persistan al navegar entre el Hub y el detalle del agente.
 * (En memoria; cuando exista backend, este store consumirá su API.)
 */
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import { AGENTS, type Agent } from '../data/agents';

interface AgentsState {
  agents: Agent[];
  getAgent: (id?: string) => Agent | undefined;
  updateAgent: (a: Agent) => void;
}

const AgentsContext = createContext<AgentsState | null>(null);

export function AgentsProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>(AGENTS);

  const value = useMemo<AgentsState>(
    () => ({
      agents,
      getAgent: (id) => agents.find((a) => a.id === id),
      updateAgent: (updated) =>
        setAgents((list) => list.map((a) => (a.id === updated.id ? updated : a))),
    }),
    [agents],
  );

  return <AgentsContext.Provider value={value}>{children}</AgentsContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAgents(): AgentsState {
  const ctx = useContext(AgentsContext);
  if (!ctx) throw new Error('useAgents must be used within <AgentsProvider>');
  return ctx;
}
