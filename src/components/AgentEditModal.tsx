import { useEffect, useState } from 'react';

import type { Agent } from '../data/agents';
import { AVATAR_COLORS, AVATAR_EMOJIS } from '../data/agents';
import { CheckIcon, CloseIcon } from './icons';
import './AgentEditModal.css';

interface Props {
  agent: Agent;
  onSave: (a: Agent) => void;
  onClose: () => void;
}

export function AgentEditModal({ agent, onSave, onClose }: Props) {
  const [name, setName] = useState(agent.name);
  const [emoji, setEmoji] = useState(agent.avatarEmoji);
  const [color, setColor] = useState(agent.avatarColor);

  // cerrar con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const canSave = name.trim().length > 0;

  function save() {
    if (!canSave) return;
    onSave({ ...agent, name: name.trim(), avatarEmoji: emoji, avatarColor: color });
  }

  return (
    <div className="aem__overlay" onClick={onClose}>
      <div className="aem" role="dialog" aria-modal="true" aria-label="Editar agente" onClick={(e) => e.stopPropagation()}>
        <div className="aem__head">
          <div>
            <div className="aem__kicker mono">EDITAR AGENTE</div>
            <h3 className="aem__title">{agent.role}</h3>
          </div>
          <button className="aem__close" onClick={onClose} aria-label="Cerrar">
            <CloseIcon size={18} />
          </button>
        </div>

        {/* live preview */}
        <div className="aem__preview">
          <div className="aem__avatar" style={{ background: color }}>
            <span aria-hidden>{emoji}</span>
          </div>
          <div className="aem__preview-meta">
            <div className="aem__preview-name">{name.trim() || 'Sin nombre'}</div>
            <div className="aem__preview-role mono">{agent.category}</div>
          </div>
        </div>

        {/* name */}
        <div className="aem__field">
          <label className="aem__label mono" htmlFor="agent-name">NOMBRE</label>
          <input
            id="agent-name"
            className="aem__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre del agente"
            autoFocus
          />
        </div>

        {/* avatar color */}
        <div className="aem__field">
          <span className="aem__label mono">COLOR DEL AVATAR</span>
          <div className="aem__colors">
            {AVATAR_COLORS.map((c) => (
              <button
                key={c}
                className={`aem__color ${color === c ? 'is-active' : ''}`}
                style={{ background: c }}
                onClick={() => setColor(c)}
                aria-label={`Color ${c}`}
              >
                {color === c && <CheckIcon size={15} />}
              </button>
            ))}
          </div>
        </div>

        {/* avatar emoji */}
        <div className="aem__field">
          <span className="aem__label mono">ÍCONO DEL AVATAR</span>
          <div className="aem__emojis">
            {AVATAR_EMOJIS.map((e) => (
              <button
                key={e}
                className={`aem__emoji ${emoji === e ? 'is-active' : ''}`}
                onClick={() => setEmoji(e)}
                aria-label={`Emoji ${e}`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <div className="aem__foot">
          <button className="btn btn--ghost aem__btn" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn--primary aem__btn" onClick={save} disabled={!canSave}>
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
