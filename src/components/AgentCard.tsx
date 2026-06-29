import type { Agent } from '../data/agents';
import { EditIcon, UserIcon } from './icons';
import './AgentCard.css';

export function AgentCard({ agent, onEdit }: { agent: Agent; onEdit: (a: Agent) => void }) {
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
