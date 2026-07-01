import { Fragment } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  ACTIVE_USERS,
  GOVERNANCE,
  HEATMAP,
  HEATMAP_DAYS,
  HEATMAP_HOURS,
  HEATMAP_MAX,
  HUB_ACTIVITY,
  PROCESS_STATUS,
  TOP_USERS,
  VALUE_BY_AGENT,
} from '../../data/dashboard';
import { ChartTooltip } from './ChartCard';
import { CHART, axisTick } from './chartTheme';

const AREA_COLOR: Record<string, string> = {
  Administración: CHART.insights,
  Técnicos: CHART.cyan,
  Operativos: CHART.blue,
};

const shortName = (n: string) => (n.length > 20 ? `${n.slice(0, 19)}…` : n);

/* ---------- actividad de los 3 hubs (área apilada) ---------- */
export function HubActivityChart() {
  return (
    <ResponsiveContainer width="100%" height={264}>
      <AreaChart data={HUB_ACTIVITY} margin={{ top: 8, right: 6, left: -6, bottom: 0 }}>
        <defs>
          {(['insights', 'tracker', 'agents'] as const).map((k) => (
            <linearGradient id={`g-${k}`} key={k} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CHART[k]} stopOpacity={0.35} />
              <stop offset="100%" stopColor={CHART[k]} stopOpacity={0.04} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid vertical={false} stroke={CHART.line} />
        <XAxis dataKey="week" tick={axisTick} axisLine={false} tickLine={false} />
        <YAxis tick={axisTick} axisLine={false} tickLine={false} width={48} />
        <Tooltip content={<ChartTooltip />} cursor={{ stroke: CHART.ink4, strokeDasharray: 4 }} />
        <Area isAnimationActive={false} type="monotone" dataKey="agents" name="Agents Hub" stackId="1" stroke={CHART.agents} fill="url(#g-agents)" strokeWidth={2} />
        <Area isAnimationActive={false} type="monotone" dataKey="tracker" name="Tracker Hub" stackId="1" stroke={CHART.tracker} fill="url(#g-tracker)" strokeWidth={2} />
        <Area isAnimationActive={false} type="monotone" dataKey="insights" name="Insights Hub" stackId="1" stroke={CHART.insights} fill="url(#g-insights)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* ---------- valor por agente (barras horizontales) ---------- */
export function ValueByAgentChart() {
  return (
    <ResponsiveContainer width="100%" height={264}>
      <BarChart data={VALUE_BY_AGENT} layout="vertical" margin={{ top: 4, right: 14, left: 6, bottom: 0 }}>
        <CartesianGrid horizontal={false} stroke={CHART.line} />
        <XAxis type="number" tick={axisTick} axisLine={false} tickLine={false} />
        <YAxis
          type="category"
          dataKey="name"
          tickFormatter={shortName}
          tick={axisTick}
          axisLine={false}
          tickLine={false}
          width={150}
        />
        <Tooltip content={<ChartTooltip unit=" h" />} cursor={{ fill: 'rgba(30,27,58,0.04)' }} />
        <Bar isAnimationActive={false} dataKey="hours" name="Horas ahorradas" radius={[0, 6, 6, 0]} barSize={18}>
          {VALUE_BY_AGENT.map((d) => (
            <Cell key={d.name} fill={AREA_COLOR[d.area] ?? CHART.insights} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ---------- donut reutilizable ---------- */
function Donut({
  data,
  centerTop,
  centerBottom,
}: {
  data: { name: string; value: number; color: string }[];
  centerTop: string;
  centerBottom: string;
}) {
  return (
    <div className="dc-donut">
      <ResponsiveContainer width="100%" height={196}>
        <PieChart>
          <Pie isAnimationActive={false} data={data} dataKey="value" innerRadius={56} outerRadius={80} paddingAngle={2} stroke="none">
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="dc-donut__center">
        <div className="dc-donut__num">{centerTop}</div>
        <div className="dc-donut__note mono">{centerBottom}</div>
      </div>
    </div>
  );
}

export function GovernanceDonut() {
  const { approved, rejected, pending } = GOVERNANCE;
  const total = approved + rejected + pending;
  const pct = Math.round((approved / total) * 100);
  const data = [
    { name: 'Aprobadas', value: approved, color: CHART.ok },
    { name: 'Rechazadas', value: rejected, color: CHART.danger },
    { name: 'Pendientes', value: pending, color: CHART.warn },
  ];
  return <Donut data={data} centerTop={`${pct}%`} centerBottom="aprobadas" />;
}

const STATUS_COLORS = [CHART.ok, CHART.warn, CHART.ink4];
export function ProcessDonut() {
  const total = PROCESS_STATUS.reduce((s, d) => s + d.value, 0);
  const data = PROCESS_STATUS.map((d, i) => ({ ...d, name: d.label, color: STATUS_COLORS[i] }));
  return <Donut data={data} centerTop={String(total)} centerBottom="procesos" />;
}

/* ---------- usuarios activos (línea) ---------- */
export function ActiveUsersChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={ACTIVE_USERS} margin={{ top: 8, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke={CHART.line} />
        <XAxis dataKey="week" tick={axisTick} axisLine={false} tickLine={false} />
        <YAxis tick={axisTick} axisLine={false} tickLine={false} width={34} />
        <Tooltip content={<ChartTooltip />} cursor={{ stroke: CHART.ink4, strokeDasharray: 4 }} />
        <Line isAnimationActive={false} type="monotone" dataKey="users" name="Usuarios activos" stroke={CHART.tracker} strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

/* ---------- top usuarios (leaderboard, CSS) ---------- */
export function TopUsers() {
  const max = Math.max(...TOP_USERS.map((u) => u.activity));
  return (
    <div className="dc-lead">
      {TOP_USERS.map((u) => (
        <div className="dc-lead__row" key={u.name}>
          <span className="dc-lead__avatar">{u.initials}</span>
          <div className="dc-lead__info">
            <div className="dc-lead__top">
              <span className="dc-lead__name">{u.name}</span>
              <span className="dc-lead__val mono">{u.activity}</span>
            </div>
            <div className="dc-lead__bar">
              <div className="dc-lead__fill" style={{ width: `${(u.activity / max) * 100}%` }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- heatmap de actividad (día × franja horaria, CSS) ---------- */
export function ActivityHeatmap() {
  return (
    <div className="dc-heat">
      <div className="dc-heat__grid" style={{ gridTemplateColumns: `40px repeat(${HEATMAP_HOURS.length}, 1fr)` }}>
        <span />
        {HEATMAP_HOURS.map((h) => (
          <span className="dc-heat__col mono" key={h}>
            {h}
          </span>
        ))}
        {HEATMAP_DAYS.map((day, r) => (
          <Fragment key={day}>
            <span className="dc-heat__rowlabel mono">{day}</span>
            {HEATMAP[r].map((v, c) => (
              <span
                key={c}
                className="dc-heat__cell"
                title={`${day} · ${HEATMAP_HOURS[c]}h · ${v}`}
                style={{ background: `color-mix(in srgb, var(--chart-agents) ${Math.round((v / HEATMAP_MAX) * 100)}%, var(--surface-2))` }}
              />
            ))}
          </Fragment>
        ))}
      </div>
      <div className="dc-heat__scale mono">
        <span>menos</span>
        <span className="dc-heat__ramp" />
        <span>más</span>
      </div>
    </div>
  );
}
