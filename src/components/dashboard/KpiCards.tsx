import { useId } from 'react';

import { KPIS, PLAN_USAGE, type Kpi } from '../../data/dashboard';
import { CHART } from './chartTheme';

const toneColor: Record<Kpi['tone'], string> = {
  insights: CHART.insights,
  tracker: CHART.tracker,
  agents: CHART.agents,
  ok: CHART.ok,
  warn: CHART.warn,
};

export function KpiCards() {
  return (
    <>
      {KPIS.map((kpi) => (
        <StatCard key={kpi.id} kpi={kpi} />
      ))}
      <PlanCard />
    </>
  );
}

function StatCard({ kpi }: { kpi: Kpi }) {
  const color = toneColor[kpi.tone];
  const up = kpi.deltaPct >= 0;
  return (
    <div className="dc-stat">
      <div className="dc-stat__label mono">{kpi.label}</div>
      <div className="dc-stat__row">
        <div className="dc-stat__value">{kpi.value}</div>
        <Sparkline data={kpi.spark} color={color} />
      </div>
      <div className={`dc-stat__delta ${up ? 'is-up' : 'is-down'}`}>
        {up ? '▲' : '▼'} {Math.abs(kpi.deltaPct)}%
        <span className="dc-stat__delta-note">vs mes anterior</span>
      </div>
    </div>
  );
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const gid = useId();
  const w = 104;
  const h = 36;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - 2 - ((v - min) / range) * (h - 4);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const line = pts.join(' ');
  const area = `${line} ${w},${h} 0,${h}`;
  return (
    <svg className="dc-spark" width={w} height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#${gid})`} />
      <polyline points={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlanCard() {
  const { used, total, label } = PLAN_USAGE;
  const pct = used / total;
  const r = 30;
  const c = 2 * Math.PI * r;
  const color = CHART.insights;
  return (
    <div className="dc-stat dc-plan">
      <div className="dc-stat__label mono">Uso del plan · FREE</div>
      <div className="dc-plan__row">
        <svg className="dc-plan__gauge" width="76" height="76" viewBox="0 0 76 76">
          <circle cx="38" cy="38" r={r} fill="none" stroke="var(--line)" strokeWidth="8" />
          <circle
            cx="38"
            cy="38"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - pct)}
            transform="rotate(-90 38 38)"
          />
          <text x="38" y="41" textAnchor="middle" className="dc-plan__num">
            {used}/{total}
          </text>
        </svg>
        <div className="dc-plan__meta">
          <div className="dc-plan__value">
            {used} de {total}
          </div>
          <div className="dc-plan__note">{label} este mes</div>
        </div>
      </div>
    </div>
  );
}
