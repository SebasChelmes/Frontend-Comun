import { useRef, useState } from 'react';

import { useDismiss } from '../hooks/useDismiss';
import { CopyIcon, LinkIcon, MoreIcon, ShareIcon, TrashIcon } from './icons';
import './CardMenu.css';

interface Props {
  onCopyLink?: () => void;
  onShare?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
}

/** Menú de acciones (⋯) para una card, estilo Scribe. Dropdown con cierre por
 *  click-afuera / Escape (mismo patrón que ModelSelector y UserMenu). */
export function CardMenu({ onCopyLink, onShare, onDuplicate, onDelete }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useDismiss(open, ref, () => setOpen(false));

  const run = (fn?: () => void) => () => {
    setOpen(false);
    fn?.();
  };

  return (
    <div className="cm" ref={ref}>
      <button
        type="button"
        className={`cm__btn ${open ? 'is-open' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        aria-label="Acciones"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <MoreIcon size={16} />
      </button>

      {open && (
        <div className="cm__panel" role="menu">
          <button type="button" className="cm__item" role="menuitem" onClick={run(onCopyLink)}>
            <LinkIcon size={15} className="cm__ico" />
            Copiar enlace
          </button>
          <button type="button" className="cm__item" role="menuitem" onClick={run(onShare)}>
            <ShareIcon size={15} className="cm__ico" />
            Compartir
          </button>
          <button type="button" className="cm__item" role="menuitem" onClick={run(onDuplicate)}>
            <CopyIcon size={15} className="cm__ico" />
            Duplicar
          </button>
          <div className="cm__divider" />
          <button type="button" className="cm__item cm__item--danger" role="menuitem" onClick={run(onDelete)}>
            <TrashIcon size={15} className="cm__ico" />
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}
