import type { Agent } from '../data/agents';
import { UserIcon } from './icons';
import './Avatar.css';

/**
 * Avatar del agente: imagen elegida por el usuario, o placeholder vacío mientras
 * no haya. Único lugar con esta lógica (antes duplicada en 3 componentes).
 */
export function Avatar({
  agent,
  size = 42,
  iconSize = 20,
}: {
  agent: Agent;
  size?: number;
  iconSize?: number;
}) {
  const style = { width: size, height: size };
  if (agent.avatarImage) {
    return <img className="avatar avatar--img" style={style} src={agent.avatarImage} alt="" />;
  }
  return (
    <span className="avatar avatar--empty" style={style} aria-hidden>
      <UserIcon size={iconSize} />
    </span>
  );
}
