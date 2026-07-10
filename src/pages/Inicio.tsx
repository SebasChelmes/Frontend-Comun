import { ChartCard, Legend } from '../components/dashboard/ChartCard';
import {
  ActiveUsersChart,
  ActivityHeatmap,
  GovernanceDonut,
  HubActivityChart,
  ProcessDonut,
  TopUsers,
  ValueByAgentChart,
} from '../components/dashboard/Charts';
import { KpiCards } from '../components/dashboard/KpiCards';
import { CHART } from '../components/dashboard/chartTheme';
import { GOVERNANCE } from '../data/dashboard';
import '../components/dashboard/dashboard.css';

export default function Inicio() {
  return (
    <div className="dc">
      <header className="page-header">
        <div>
          <h1 className="page-title">Inicio</h1>
          <p className="dc-sub">
            Panorama de tu empresa en ProceOn — valor, actividad y gobernanza.
          </p>
        </div>
      </header>

      {/* KPIs */}
      <div className="dc-kpis">
        <KpiCards />
      </div>

      {/* actividad de los hubs (ancho completo) */}
      <ChartCard
        title="Actividad de los hubs"
        subtitle="Ejecuciones · últimas 10 semanas"
        action={
          <Legend
            items={[
              { label: 'Insights Hub', color: CHART.insights },
              { label: 'Tracker Hub', color: CHART.tracker },
              { label: 'Agents Hub', color: CHART.agents },
            ]}
          />
        }
      >
        <HubActivityChart />
      </ChartCard>

      {/* valor + gobernanza + estado de procesos */}
      <div className="dc-grid-3">
        <ChartCard title="Valor por agente" subtitle="Horas ahorradas · mes">
          <ValueByAgentChart />
        </ChartCard>

        <ChartCard
          title="Gobernanza"
          subtitle={`Human-in-the-loop · ${GOVERNANCE.avgApprovalMin} min prom.`}
          action={
            <Legend
              items={[
                { label: 'Aprob.', color: CHART.ok },
                { label: 'Rech.', color: CHART.danger },
                { label: 'Pend.', color: CHART.warn },
              ]}
            />
          }
        >
          <GovernanceDonut />
        </ChartCard>

        <ChartCard
          title="Estado de procesos"
          subtitle="Distribución actual"
          action={
            <Legend
              items={[
                { label: 'Analizado', color: CHART.ok },
                { label: 'Validación', color: CHART.warn },
                { label: 'Sin analizar', color: CHART.ink4 },
              ]}
            />
          }
        >
          <ProcessDonut />
        </ChartCard>
      </div>

      {/* usuarios */}
      <div className="dc-grid-2">
        <ChartCard title="Top usuarios" subtitle="Actividad · mes">
          <TopUsers />
        </ChartCard>
        <ChartCard title="Usuarios activos" subtitle="Semanal (WAU)">
          <ActiveUsersChart />
        </ChartCard>
      </div>

      {/* heatmap */}
      <ChartCard title="Actividad por día y hora" subtitle="Cuándo se usa más la plataforma">
        <ActivityHeatmap />
      </ChartCard>
    </div>
  );
}
