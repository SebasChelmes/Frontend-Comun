import type { NodeShape, Process } from '../data/processes';
import { ArrowRightIcon, CaptureIcon, LinkIcon, ProcessIcon } from './icons';
import './ProcessCard.css';

export function ProcessCard({ p }: { p: Process }) {
  return (
    <article className="pc">
      <div className="pc__top">
        {p.kind === 'flujograma' ? (
          <span className="pc__type pc__type--flow mono">
            <ProcessIcon size={11} strokeWidth={2} />
            FLUJOGRAMA
          </span>
        ) : (
          <span className="pc__type pc__type--guide mono">
            <CaptureIcon size={11} strokeWidth={2} />
            GUÍA DIGITAL
          </span>
        )}

        {p.kind === 'flujograma' ? (
          <span className={`pc__status ${p.status === 'validacion' ? 'is-warn' : ''}`}>
            <span className="pc__status-dot" />
            {p.status === 'validacion' ? 'Validación' : 'Analizado'}
          </span>
        ) : p.linked ? (
          <span className="pc__linked mono">
            <LinkIcon size={11} />
            {p.statusLabel}
          </span>
        ) : (
          <span className="pc__status">
            <span className="pc__status-dot" />
            {p.statusLabel}
          </span>
        )}
      </div>

      <h3 className="pc__title">{p.title}</h3>
      <p className="pc__meta mono">{p.meta}</p>

      {p.kind === 'flujograma' ? <FlowPreview shapes={p.preview} /> : <GuidePreview />}

      <div className="pc__foot">
        <span className="pc__when mono">{p.when}</span>
        <a className="pc__cta">
          {p.cta} <ArrowRightIcon size={13} strokeWidth={2} />
        </a>
      </div>
    </article>
  );
}

function FlowPreview({ shapes }: { shapes: NodeShape[] }) {
  return (
    <div className="pc__preview pc__preview--flow">
      {shapes.map((s, i) => (
        <span key={i} className="pc__flowrow">
          <Node shape={s} />
          {i < shapes.length - 1 && <span className="pc__edge" />}
        </span>
      ))}
    </div>
  );
}

function Node({ shape }: { shape: NodeShape }) {
  return <span className={`pc__node pc__node--${shape}`} />;
}

function GuidePreview() {
  return (
    <div className="pc__preview pc__preview--guide">
      {[1, 2, 3].map((n) => (
        <div className="pc__step" key={n}>
          <span className={`pc__step-num ${n === 1 ? 'is-active' : ''}`}>{n}</span>
          <span className="pc__step-thumb" />
          <span className="pc__step-bar" />
        </div>
      ))}
    </div>
  );
}
