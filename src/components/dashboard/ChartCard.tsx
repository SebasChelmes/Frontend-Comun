import type { ReactNode } from 'react';

import './dashboard.css';

/** Card contenedora de un gráfico: título + subtítulo opcional + acción/leyenda. */
export function ChartCard({
  title,
  subtitle,
  action,
  children,
  className = '',
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`dc-card ${className}`}>
      <div className="dc-card__head">
        <div className="dc-card__titles">
          <h3 className="dc-card__title">{title}</h3>
          {subtitle && <p className="dc-card__sub mono">{subtitle}</p>}
        </div>
        {action && <div className="dc-card__action">{action}</div>}
      </div>
      <div className="dc-card__body">{children}</div>
    </section>
  );
}

/** Leyenda simple (punto + label) para los gráficos. */
export function Legend({ items }: { items: { label: string; color: string }[] }) {
  return (
    <div className="dc-legend">
      {items.map((it) => (
        <span className="dc-legend__item" key={it.label}>
          <span className="dc-legend__dot" style={{ background: it.color }} />
          {it.label}
        </span>
      ))}
    </div>
  );
}

interface TooltipPayload {
  name?: string;
  value?: number | string;
  color?: string;
  payload?: Record<string, unknown>;
}

/** Tooltip con el estilado del design system (reemplaza al default de Recharts). */
export function ChartTooltip({
  active,
  payload,
  label,
  unit = '',
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string | number;
  unit?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="dc-tip">
      {label !== undefined && <div className="dc-tip__label mono">{label}</div>}
      {payload.map((p, i) => (
        <div className="dc-tip__row" key={i}>
          <span className="dc-tip__dot" style={{ background: p.color }} />
          <span className="dc-tip__name">{p.name}</span>
          <span className="dc-tip__val">
            {p.value}
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
}
