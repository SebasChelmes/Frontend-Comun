import { useNavigate } from 'react-router-dom';

import type { Agent } from '../data/agents';
import { STATUS_META } from '../data/agents';
import { Avatar } from './Avatar';
import { EditIcon } from './icons';
import './AgentCard.css';

export function AgentCard({ agent, onEdit }: { agent: Agent; onEdit: (a: Agent) => void }) {
  const status = STATUS_META[agent.status];
  const navigate = useNavigate();

  return (
    <article className="ag card-surface" onClick={() => navigate(`/agentes/${agent.id}`)} role="button" tabIndex={0}>
      <div className="ag__head">
        <Avatar agent={agent} size={42} iconSize={20} />
        <div className="ag__id">
          <h3 className="ag__name">{agent.name}</h3>
          <p className="ag__role mono">{agent.category}</p>
        </div>
        <button
          className="ag__edit"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(agent);
          }}
          aria-label="Editar agente"
        >
          <EditIcon size={14} />
          Editar
        </button>
      </div>

      <p className="ag__desc">{agent.description}</p>

      {/* métricas del agente */}
      <div className="ag__stats">
        <div className="ag__stat">
          <span className="ag__stat-label mono">ESTADO</span>
          <span className="ag__stat-value">
            <span className="ag__status-dot" style={{ background: status.color }} />
            {status.label}
          </span>
        </div>
        <div className="ag__stat">
          <span className="ag__stat-label mono">ÚLTIMA EJECUCIÓN</span>
          <span className="ag__stat-value mono">{agent.lastRun}</span>
        </div>
        <div className="ag__stat">
          <span className="ag__stat-label mono">EJECUCIONES · MES</span>
          <span className="ag__stat-value">{agent.runsThisMonth}</span>
        </div>
        <div className="ag__stat">
          <span className="ag__stat-label mono">TASA DE ÉXITO</span>
          <span className="ag__stat-value">{agent.successRate}%</span>
        </div>
      </div>
    </article>
  );
}
