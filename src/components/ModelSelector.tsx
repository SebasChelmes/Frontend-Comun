import { useRef, useState } from 'react';

import { useDismiss } from '../hooks/useDismiss';
import { ChevronDownIcon, CpuIcon } from './icons';
import './ModelSelector.css';

interface Model {
  name: string;
  note: string;
}
interface Group {
  label: string;
  /** parte final del rótulo resaltada en acento (ej. "configurable") */
  accentTail?: string;
  /** color del indicador (por proveedor) */
  dot: string;
  models: Model[];
}

const GROUPS: Group[] = [
  {
    label: 'Claude · Anthropic',
    dot: 'var(--accent)',
    models: [
      { name: 'Sonnet 4.6', note: 'Recomendado' },
      { name: 'Haiku 4.5', note: 'Rápido · económico' },
      { name: 'Opus 4.7', note: 'Máxima inteligencia' },
    ],
  },
  {
    label: 'Local · Ollama · ',
    accentTail: 'configurable',
    dot: 'var(--warn)',
    models: [
      { name: 'Llama 3.2', note: 'Meta · 3B' },
      { name: 'Qwen 2.5', note: 'Alibaba · 7B' },
      { name: 'Mistral 7B', note: 'Mistral AI' },
      { name: 'DeepSeek R1', note: 'Razonamiento · 7B' },
    ],
  },
];

export function ModelSelector() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('Sonnet 4.6');
  const ref = useRef<HTMLDivElement>(null);
  useDismiss(open, ref, () => setOpen(false));

  return (
    <div className="ms" ref={ref}>
      <button
        className={`ms__btn ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        title="Seleccionar motor LLM"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <CpuIcon size={16} className="ms__cpu" />
        <span className="ms__current">{selected}</span>
        <ChevronDownIcon size={14} className={`ms__chev ${open ? 'is-open' : ''}`} />
      </button>

      {open && (
        <div className="ms__panel" role="listbox">
          {GROUPS.map((g) => (
            <div className="ms__group" key={g.label}>
              <div className="ms__group-label mono">
                {g.label}
                {g.accentTail && <span className="ms__accent">{g.accentTail}</span>}
              </div>
              {g.models.map((m) => {
                const isSel = m.name === selected;
                return (
                  <button
                    key={m.name}
                    role="option"
                    aria-selected={isSel}
                    className={`ms__item ${isSel ? 'is-selected' : ''}`}
                    onClick={() => {
                      setSelected(m.name);
                      setOpen(false);
                    }}
                  >
                    <span
                      className={`ms__dot ${isSel ? 'is-selected' : ''}`}
                      style={{ background: g.dot, '--dot': g.dot } as React.CSSProperties}
                    />
                    <span className="ms__meta">
                      <span className="ms__name">{m.name}</span>
                      <span className="ms__note mono">{m.note}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
