import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { type DiagramEdge, type DiagramNode, getDiagram } from '../data/diagrams';
import { PROCESSES } from '../data/processes';
import { SEVERITY_COLOR } from '../data/severity';
import {
  ArrowRightIcon,
  BoltIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  CloseIcon,
  PlusIcon,
  ProcessIcon,
  TrashIcon,
  UploadIcon,
} from '../components/icons';
import './DiagramaView.css';

// ── tipos de nodo → etiqueta visual ─────────────────────────────────────────
const NODE_LABELS: Record<string, string> = {
  'start':       'Inicio / Fin',
  'end':         'Inicio / Fin',
  'task-manual': 'Tarea manual',
  'task-auto':   'Tarea automática',
  'decision':    'Decisión',
  'handoff':     'Handoff',
  'wait':        'Espera',
  'workaround':  'Workaround',
};

// ── Nodo visual en el canvas ─────────────────────────────────────────────────
function CanvasNode({
  node,
  selected,
  onClick,
}: {
  node: DiagramNode;
  selected: boolean;
  onClick: () => void;
}) {
  const hasPain = (node.painPoints?.length ?? 0) > 0;

  return (
    <div
      className={`dv-node dv-node--${node.type}${selected ? ' is-selected' : ''}`}
      style={{ left: node.x, top: node.y }}
      onClick={onClick}
    >
      {hasPain && <span className="dv-node__pain" title="Señal de dolor"><BoltIcon size={11} /></span>}
      <span className="dv-node__label">{node.label}</span>
      {node.actor && <span className="dv-node__actor mono">{node.actor}</span>}
    </div>
  );
}

// ── SVG de conexiones ────────────────────────────────────────────────────────
function Edges({
  nodes,
  edges,
  width,
  height,
}: {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  width: number;
  height: number;
}) {
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  const colorOf = (kind: string) => {
    if (kind === 'yes')  return 'var(--ok)';
    if (kind === 'no')   return 'var(--danger)';
    if (kind === 'loop') return 'var(--violet)';
    return 'var(--ink-3)';
  };

  // Approximate node center based on type
  const cx = (n: DiagramNode) => {
    if (n.type === 'start' || n.type === 'end') return n.x + 36;
    if (n.type === 'decision') return n.x + 54;
    return n.x + 80;
  };
  const cy = (n: DiagramNode) => {
    if (n.type === 'start' || n.type === 'end') return n.y + 36;
    if (n.type === 'decision') return n.y + 32;
    return n.y + 34;
  };
  const ch = (n: DiagramNode) => {
    if (n.type === 'start' || n.type === 'end') return 72;
    if (n.type === 'decision') return 64;
    return 68;
  };

  return (
    <svg
      className="dv-edges"
      width={width}
      height={height}
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
    >
      <defs>
        {['normal', 'yes', 'no', 'loop'].map((k) => (
          <marker
            key={k}
            id={`arrow-${k}`}
            markerWidth="7"
            markerHeight="7"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L6,3 z" style={{ fill: colorOf(k) }} />
          </marker>
        ))}
      </defs>

      {edges.map((e, i) => {
        const from = nodeMap[e.from];
        const to   = nodeMap[e.to];
        if (!from || !to) return null;

        const x1 = cx(from);
        const y1 = cy(from) + ch(from) / 2;
        const x2 = cx(to);
        const y2 = cy(to) - ch(to) / 2;
        const color = colorOf(e.kind);

        const isLoop = e.kind === 'loop';

        let d: string;
        if (isLoop) {
          // curved loop going right and back up
          const mx = Math.max(x1, x2) + 60;
          d = `M ${x1} ${y1} C ${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
        } else if (Math.abs(x1 - x2) > 10) {
          // branching: go down then across
          const midY = y1 + (y2 - y1) / 2;
          d = `M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`;
        } else {
          d = `M ${x1} ${y1} L ${x2} ${y2}`;
        }

        const labelX = (x1 + x2) / 2 + (x1 !== x2 ? 6 : 10);
        const labelY = (y1 + y2) / 2;

        return (
          <g key={i}>
            <path
              d={d}
              strokeWidth="1.5"
              fill="none"
              strokeDasharray={isLoop ? '5 3' : undefined}
              markerEnd={`url(#arrow-${e.kind})`}
              style={{ stroke: color }}
            />
            {e.label && (
              <text x={labelX} y={labelY} fontSize="10" fontFamily="DM Mono, monospace" style={{ fill: color }}>
                {e.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ── Leyenda (collapsible) ────────────────────────────────────────────────────
function Legend() {
  const [open, setOpen] = useState(false);
  return (
    <div className="dv-legend">
      <button className="dv-legend__toggle" onClick={() => setOpen((o) => !o)}>
        <span className="dv-legend__ico">■</span>
        Leyenda
        <ChevronDownIcon size={14} className={open ? 'is-open' : ''} style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s' }} />
      </button>
      {open && (
        <div className="dv-legend__body">
          <p className="dv-legend__section mono">TIPOS DE NODO</p>
          {[
            { cls: 'dv-node--start',       label: 'Inicio / Fin'       },
            { cls: 'dv-node--task-manual',  label: 'Tarea manual'       },
            { cls: 'dv-node--task-auto',    label: 'Tarea automática'   },
            { cls: 'dv-node--decision',     label: 'Decisión (rombo)'   },
            { cls: 'dv-node--handoff',      label: 'Handoff'            },
            { cls: 'dv-node--wait',         label: 'Espera'             },
            { cls: 'dv-node--workaround',   label: 'Workaround'         },
          ].map(({ cls, label }) => (
            <div key={label} className="dv-legend__row">
              <span className={`dv-legend__node ${cls}`} />
              <span>{label}</span>
            </div>
          ))}

          <p className="dv-legend__section mono" style={{ marginTop: 10 }}>INDICADORES EN NODOS</p>
          <div className="dv-legend__row">
            <BoltIcon size={13} style={{ color: 'var(--warn)', flex: 'none' }} />
            <span>Señal de dolor detectada</span>
          </div>
          <div className="dv-legend__row">
            <CheckCircleIcon size={13} style={{ color: 'var(--accent)', flex: 'none' }} />
            <span>Inferido por IA</span>
          </div>

          <p className="dv-legend__section mono" style={{ marginTop: 10 }}>CONEXIONES</p>
          {[
            { color: 'var(--ink-3)',  label: 'Secuencia normal', dash: false },
            { color: 'var(--ok)',     label: 'Rama Sí',          dash: false },
            { color: 'var(--danger)', label: 'Rama No',          dash: false },
            { color: 'var(--violet)', label: 'Bucle',            dash: true  },
          ].map(({ color, label, dash }, i) => (
            <div key={label} className="dv-legend__row">
              <svg width="32" height="10" style={{ flex: 'none' }}>
                <defs>
                  <marker id={`arrow-legend-${i}`} markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L6,3 z" style={{ fill: color }} />
                  </marker>
                </defs>
                <line x1="0" y1="5" x2="24" y2="5" strokeWidth="1.5" strokeDasharray={dash ? '4 2' : undefined} markerEnd={`url(#arrow-legend-${i})`} style={{ stroke: color }} />
              </svg>
              <span>{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Panel derecho: editor del nodo seleccionado ──────────────────────────────
function NodePanel({
  node,
  onClose,
  onDelete,
}: {
  node: DiagramNode;
  onClose: () => void;
  onDelete: () => void;
}) {
  const [label,    setLabel]    = useState(node.label.replace('\n', ' '));
  const [actor,    setActor]    = useState(node.actor    ?? '');
  const [durMin,   setDurMin]   = useState(node.durationMin ?? 0);
  const [durMax,   setDurMax]   = useState(node.durationMax ?? 0);

  // sync when node changes
  useEffect(() => {
    setLabel(node.label.replace('\n', ' '));
    setActor(node.actor ?? '');
    setDurMin(node.durationMin ?? 0);
    setDurMax(node.durationMax ?? 0);
  }, [node.id]);

  return (
    <aside className="dv-panel">
      {/* top actions */}
      <div className="dv-panel__top-actions">
        <button className="btn btn--primary dv-panel__save" style={{ flex: 1 }}>Guardar cambios</button>
        <button className="btn btn--ghost dv-panel__export" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <UploadIcon size={14} /> Exportar
        </button>
        <button className="dv-panel__analyze">Analizar proceso</button>
      </div>

      <div className="dv-panel__body">
        {/* node type badge + close */}
        <div className="dv-panel__head">
          <span className={`dv-badge dv-badge--${node.type}`}>{NODE_LABELS[node.type]}</span>
          <button className="dv-panel__close" onClick={onClose} aria-label="Cerrar panel">
            <CloseIcon size={16} />
          </button>
        </div>

        {/* nombre */}
        <div className="dv-panel__field">
          <label className="dv-panel__label mono">Nombre del paso</label>
          <input
            className="dv-panel__input"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            maxLength={32}
          />
          <span className="dv-panel__counter mono">{label.length}/32</span>
        </div>

        {/* actor */}
        <div className="dv-panel__field">
          <label className="dv-panel__label mono">Actor responsable</label>
          <input
            className="dv-panel__input"
            value={actor}
            onChange={(e) => setActor(e.target.value)}
            placeholder="Sin asignar"
          />
        </div>

        {/* duración */}
        <div className="dv-panel__field">
          <label className="dv-panel__label mono">Duración estimada (min)</label>
          <div className="dv-panel__dur">
            <input
              type="number"
              className="dv-panel__input dv-panel__input--sm"
              value={durMin}
              min={0}
              onChange={(e) => setDurMin(+e.target.value)}
            />
            <span className="dv-panel__dur-sep">a</span>
            <input
              type="number"
              className="dv-panel__input dv-panel__input--sm"
              value={durMax}
              min={0}
              onChange={(e) => setDurMax(+e.target.value)}
            />
          </div>
        </div>

        {/* señales de dolor */}
        {(node.painPoints?.length ?? 0) > 0 && (
          <div className="dv-panel__field">
            <p className="dv-panel__label mono">
              <BoltIcon size={12} style={{ color: 'var(--warn)', marginRight: 4 }} />
              {node.painPoints!.length} señal{node.painPoints!.length > 1 ? 'es' : ''} de dolor
            </p>
            {node.painPoints!.map((pp, i) => (
              <div key={i} className="dv-pain">
                <span className="dv-pain__sev" style={{ color: SEVERITY_COLOR[pp.severity] }}>
                  {pp.severity}
                </span>
                <p className="dv-pain__text">{pp.text}</p>
                {pp.quote && <p className="dv-pain__quote">"{pp.quote}"</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* bottom actions */}
      <div className="dv-panel__footer">
        <button className="btn btn--ghost dv-panel__insert">
          <PlusIcon size={14} />
          Insertar paso después
        </button>
        <button className="dv-panel__discard mono">Descartar cambios</button>
        <button className="dv-panel__delete" onClick={onDelete}>
          <TrashIcon size={14} />
          Eliminar este paso
        </button>
      </div>
    </aside>
  );
}

// ── Zoom controls ────────────────────────────────────────────────────────────
function ZoomControls({ zoom, onZoom }: { zoom: number; onZoom: (z: number) => void }) {
  return (
    <div className="dv-zoom">
      <button onClick={() => onZoom(Math.min(zoom + 0.15, 2))} aria-label="Acercar">+</button>
      <span className="mono">{Math.round(zoom * 100)}%</span>
      <button onClick={() => onZoom(Math.max(zoom - 0.15, 0.3))} aria-label="Alejar">−</button>
      <button onClick={() => onZoom(1)} aria-label="Restablecer">⊡</button>
    </div>
  );
}

// ── Vista principal ──────────────────────────────────────────────────────────
export default function DiagramaView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const process = PROCESSES.find((p) => p.id === id);
  const diagram = getDiagram(id ?? '');

  const [nodes, setNodes]       = useState<DiagramNode[]>(diagram?.nodes ?? []);
  const [edges, setEdges]       = useState<DiagramEdge[]>(diagram?.edges ?? []);
  const [selected, setSelected] = useState<DiagramNode | null>(null);
  const [zoom, setZoom]         = useState(1);
  const canvasRef               = useRef<HTMLDivElement>(null);

  const CANVAS_W = 800;
  const CANVAS_H = nodes.length ? Math.max(...nodes.map((n) => n.y)) + 160 : 600;

  const handleSelect = useCallback((node: DiagramNode) => {
    setSelected((prev) => (prev?.id === node.id ? null : node));
  }, []);

  const handleDelete = useCallback(() => {
    if (!selected) return;
    const delId = selected.id;
    setNodes((list) => list.filter((n) => n.id !== delId));
    setEdges((list) => list.filter((e) => e.from !== delId && e.to !== delId));
    setSelected(null);
  }, [selected]);

  if (!process || process.kind !== 'flujograma') {
    return (
      <div style={{ padding: 40, color: 'var(--ink-2)' }}>
        Proceso no encontrado o no es un flujograma.{' '}
        <button className="btn btn--ghost" onClick={() => navigate('/procesos')}>Volver</button>
      </div>
    );
  }

  if (!diagram) {
    return (
      <div style={{ padding: 40, color: 'var(--ink-2)' }}>
        Diagrama no disponible aún para este proceso.{' '}
        <button className="btn btn--ghost" onClick={() => navigate('/procesos')}>Volver</button>
      </div>
    );
  }

  return (
    <div className="dv">
      {/* canvas area */}
      <div className="dv-canvas-wrap">
        {/* mini topbar encima del canvas */}
        <div className="dv-canvas-bar">
          <button
            className="btn btn--ghost dv-back"
            onClick={() => navigate('/procesos')}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <ArrowRightIcon size={14} style={{ transform: 'rotate(180deg)' }} />
            Volver
          </button>
          <span className="dv-canvas-bar__title">{process.title}</span>
          <span className="dv-canvas-bar__meta mono">{process.meta}</span>
        </div>

        {/* canvas scrollable */}
        <div className="dv-canvas" ref={canvasRef}>
          <div
            className="dv-canvas__inner"
            style={{
              width:  CANVAS_W,
              height: CANVAS_H,
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
              marginBottom: CANVAS_H * (zoom - 1),
            }}
          >
            <Edges
              nodes={nodes}
              edges={edges}
              width={CANVAS_W}
              height={CANVAS_H}
            />
            {nodes.map((node) => (
              <CanvasNode
                key={node.id}
                node={node}
                selected={selected?.id === node.id}
                onClick={() => handleSelect(node)}
              />
            ))}
          </div>
        </div>

        {/* controles inferiores */}
        <div className="dv-canvas-bottom">
          <Legend />
          <ZoomControls zoom={zoom} onZoom={setZoom} />
        </div>
      </div>

      {/* panel lateral derecho */}
      {selected ? (
        <NodePanel node={selected} onClose={() => setSelected(null)} onDelete={handleDelete} />
      ) : (
        <div className="dv-panel dv-panel--empty">
          <div className="dv-panel__top-actions">
            <button className="btn btn--primary dv-panel__save" style={{ flex: 1 }}>Guardar cambios</button>
            <button className="btn btn--ghost" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <UploadIcon size={14} /> Exportar
            </button>
            <button className="dv-panel__analyze">Analizar proceso</button>
          </div>
          <div className="dv-panel__placeholder">
            <ProcessIcon size={36} style={{ color: 'var(--ink-4)' }} />
            <p>Seleccioná un nodo del diagrama para editarlo</p>
          </div>
        </div>
      )}
    </div>
  );
}
