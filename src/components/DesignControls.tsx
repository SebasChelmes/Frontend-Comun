/**
 * Floating panel mirroring the design's editor props (Marca: accent, Cuenta: plan).
 * Lets you exercise the same two knobs the .dc file exposed, so the plan-gating
 * (upgrade card, premium locks) and re-theming are visible at runtime.
 */
import { useState } from 'react';
import { ACCENT_OPTIONS, PLAN_OPTIONS, useApp } from '../context/AppContext';
import './DesignControls.css';

export function DesignControls() {
  const { accent, plan, setAccent, setPlan } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <div className={`dctrl ${open ? 'is-open' : ''}`}>
      {open && (
        <div className="dctrl__panel">
          <div className="dctrl__group">
            <span className="dctrl__label mono">MARCA · ACENTO</span>
            <div className="dctrl__swatches">
              {ACCENT_OPTIONS.map((c) => (
                <button
                  key={c}
                  className={`dctrl__swatch ${accent === c ? 'is-active' : ''}`}
                  style={{ background: c }}
                  onClick={() => setAccent(c)}
                  aria-label={`Acento ${c}`}
                />
              ))}
            </div>
          </div>

          <div className="dctrl__group">
            <span className="dctrl__label mono">CUENTA · PLAN</span>
            <div className="dctrl__segs">
              {PLAN_OPTIONS.map((p) => (
                <button
                  key={p}
                  className={`dctrl__seg ${plan === p ? 'is-active' : ''}`}
                  onClick={() => setPlan(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <button className="dctrl__fab" onClick={() => setOpen((o) => !o)} aria-label="Controles de diseño">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
        </svg>
      </button>
    </div>
  );
}
