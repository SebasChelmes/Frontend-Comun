import { useRef, useState } from 'react';

import { useDismiss } from '../hooks/useDismiss';
import { ChevronDownIcon, DocIcon, UploadIcon } from './icons';
import './ExportMenu.css';

const FORMATS = [
  { label: 'PDF', ext: '.pdf' },
  { label: 'Word', ext: '.docx' },
  { label: 'Markdown', ext: '.md' },
];

/**
 * Botón "Exportar" con desplegable de formato (PDF · Word · Markdown).
 * Demo: la exportación real se conectará más adelante — por ahora cada ítem
 * solo cierra el panel. Reusa el patrón de panel del design system.
 */
export function ExportMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useDismiss(open, ref, () => setOpen(false));

  return (
    <div className="xm" ref={ref}>
      <button
        type="button"
        className={`btn btn--primary xm__btn ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <UploadIcon size={14} />
        Exportar
        <ChevronDownIcon size={14} className={`xm__chev ${open ? 'is-open' : ''}`} />
      </button>

      {open && (
        <div className="xm__panel" role="menu">
          <div className="xm__label mono">Formato</div>
          {FORMATS.map((f) => (
            <button
              type="button"
              key={f.ext}
              role="menuitem"
              className="xm__item"
              onClick={() => setOpen(false)}
            >
              <DocIcon size={16} className="xm__ico" />
              <span className="xm__name">{f.label}</span>
              <span className="xm__ext mono">{f.ext}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
