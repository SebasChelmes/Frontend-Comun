import type { Agent } from '../data/agents';
import { STATUS_META } from '../data/agents';
import { EditIcon, UserIcon } from './icons';
import './AgentCard.css';

export function AgentCard({ agent, onEdit }: { agent: Agent; onEdit: (a: Agent) => void }) {
  const status = STATUS_META[agent.status];

  return (
    <article className="ag">
      <div className="ag__head">
        <Avatar agent={agent} />
        <div className="ag__id">
          <h3 className="ag__name">{agent.name}</h3>
          <p className="ag__role mono">{agent.category}</p>
        </div>
        <button className="ag__edit" onClick={() => onEdit(agent)} aria-label="Editar agente">
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

/** Avatar: imagen elegida por el usuario, o placeholder vacío mientras no haya. */
function Avatar({ agent }: { agent: Agent }) {
  if (agent.avatarImage) {
    return <img className="ag__avatar ag__avatar--img" src={agent.avatarImage} alt="" />;
  }
  return (
    <span className="ag__avatar ag__avatar--empty" aria-hidden>
      <UserIcon size={20} />
    </span>
  );
}
