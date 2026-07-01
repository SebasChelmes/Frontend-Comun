import { useEffect, useState } from 'react';

import type { Agent } from '../data/agents';
import { Avatar } from './Avatar';
import { CloseIcon } from './icons';
import './AgentEditModal.css';

interface Props {
  agent: Agent;
  onSave: (a: Agent) => void;
  onClose: () => void;
}

export function AgentEditModal({ agent, onSave, onClose }: Props) {
  const [name, setName] = useState(agent.name);

  // cerrar con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const canSave = name.trim().length > 0;

  function save() {
    if (!canSave) return;
    onSave({ ...agent, name: name.trim() });
  }

  return (
    <div className="aem__overlay" onClick={onClose}>
      <div
        className="aem"
        role="dialog"
        aria-modal="true"
        aria-label="Editar agente"
        onClick={(e) => e.stopPropagation()}
      >
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
          <Avatar agent={agent} size={56} iconSize={24} />
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

        {/* avatar (placeholder — selección de imagen/foto próximamente) */}
        <div className="aem__field">
          <span className="aem__label mono">AVATAR</span>
          <div className="aem__avatar-row">
            <Avatar agent={agent} size={44} iconSize={18} />
            <div className="aem__avatar-info">
              <button className="btn btn--ghost aem__avatar-btn" disabled>
                Elegir imagen
              </button>
              <span className="aem__hint">Próximamente: subí una imagen o foto.</span>
            </div>
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
