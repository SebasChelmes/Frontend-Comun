import type { Agent } from '../data/agents';
import { INTEGRATIONS } from '../data/agents';
import { EditIcon } from './icons';
import './AgentCard.css';

export function AgentCard({ agent, onEdit }: { agent: Agent; onEdit: (a: Agent) => void }) {
  return (
    <article className="ag">
      <div className="ag__head">
        <div className="ag__avatar" style={{ background: agent.avatarColor }}>
          <span aria-hidden>{agent.avatarEmoji}</span>
        </div>
        <div className="ag__id">
          <h3 className="ag__name">{agent.name}</h3>
          <p className="ag__role mono">
            {agent.role} · {agent.category}
          </p>
        </div>
        <button className="ag__edit" onClick={() => onEdit(agent)}>
          <EditIcon size={14} />
          Editar
        </button>
      </div>

      <p className="ag__desc">{agent.description}</p>

      <div className="ag__foot">
        <div className="ag__ints">
          {agent.integrations.map((key) => {
            const it = INTEGRATIONS[key];
            if (!it) return null;
            return (
              <span
                key={key}
                className="ag__int"
                style={{ background: it.color }}
                title={it.key}
              >
                {it.label}
              </span>
            );
          })}
        </div>
        <span className="ag__hours mono">~{agent.hoursPerWeek} hs/sem</span>
      </div>
    </article>
  );
}
