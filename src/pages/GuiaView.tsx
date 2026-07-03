import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getGuide, type GuideStep } from '../data/guides';
import { PROCESSES } from '../data/processes';
import { SEVERITY_COLOR } from '../data/severity';
import { ExportMenu } from '../components/ExportMenu';
import {
  ArrowRightIcon,
  BoltIcon,
  CheckCircleIcon,
  CloseIcon,
  EditIcon,
  ImageIcon,
  PaperclipIcon,
  PlusIcon,
  TrashIcon,
  UserIcon,
} from '../components/icons';
import './GuiaView.css';

// ── Barra lateral de pasos ──────────────────────────────────────────
function StepNav({
  steps,
  activeId,
  onSelect,
}: {
  steps: GuideStep[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const activeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [activeId]);

  return (
    <nav className="gv-nav">
      <p className="gv-nav__title mono">PASOS</p>
      <div className="gv-nav__list">
        {steps.map((s) => {
          const isActive = s.id === activeId;
          const hasPain  = (s.painPoints?.length ?? 0) > 0;
          return (
            <button
              type="button"
              key={s.id}
              ref={isActive ? activeRef : undefined}
              className={`gv-nav__item${isActive ? ' is-active' : ''}`}
              onClick={() => onSelect(s.id)}
            >
              <span className="gv-nav__num mono">{s.number}</span>
              <span className="gv-nav__label">{s.title}</span>
              {hasPain && <BoltIcon size={11} style={{ color: 'var(--warn)', flex: 'none' }} />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ── Contenido de un paso ────────────────────────────────────────────
function StepContent({
  step,
  total,
  onPrev,
  onNext,
  onDelete,
  onSave,
}: {
  step: GuideStep;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onDelete: () => void;
  onSave: (patch: { title: string; description: string }) => void;
}) {
  const [editing,     setEditing]     = useState(false);
  const [title,       setTitle]       = useState(step.title);
  const [description, setDescription] = useState(step.description);

  // sync when step changes
  useEffect(() => {
    setTitle(step.title);
    setDescription(step.description);
    setEditing(false);
  }, [step.id]);

  return (
    <article className="gv-step">
      {/* cabecera del paso */}
      <div className="gv-step__head">
        <div className="gv-step__num-wrap">
          <span className="gv-step__num mono">{step.number}</span>
          <span className="gv-step__total mono">/ {total}</span>
        </div>

        <div className="gv-step__actions">
          {editing ? (
            <>
              <button
                type="button"
                className="btn btn--primary gv-step__save"
                onClick={() => {
                  onSave({ title, description });
                  setEditing(false);
                }}
              >
                <CheckCircleIcon size={15} />
                Guardar paso
              </button>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => {
                  setTitle(step.title);
                  setDescription(step.description);
                  setEditing(false);
                }}
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn btn--ghost gv-step__edit-btn"
              onClick={() => setEditing(true)}
            >
              <EditIcon size={14} />
              Editar paso
            </button>
          )}
        </div>
      </div>

      {/* título del paso */}
      {editing ? (
        <input
          className="gv-step__title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
      ) : (
        <h2 className="gv-step__title">{title}</h2>
      )}

      {/* metadata: actor + duración */}
      <div className="gv-step__meta-row">
        <span className="gv-step__meta-chip">
          <UserIcon size={13} />
          {step.actor}
        </span>
        <span className="gv-step__meta-chip gv-step__meta-chip--dur mono">
          ⏱ {step.durationLabel}
        </span>
        {step.hasAttachment && (
          <span className="gv-step__meta-chip">
            <PaperclipIcon size={13} />
            Adjunto
          </span>
        )}
        {(step.painPoints?.length ?? 0) > 0 && (
          <span className="gv-step__meta-chip gv-step__meta-chip--pain">
            <BoltIcon size={13} />
            {step.painPoints!.length} dolor{step.painPoints!.length > 1 ? 'es' : ''}
          </span>
        )}
      </div>

      <div className="gv-step__divider" />

      {/* descripción */}
      <div className="gv-step__body">
        {editing ? (
          <textarea
            className="gv-step__textarea"
            value={description}
            rows={8}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <p className="gv-step__desc">{description}</p>
        )}
      </div>

      {/* captura de pantalla del paso (placeholder — funcionalidad futura) */}
      {!editing && (
        <div className="gv-step__shot" role="img" aria-label="Espacio para la captura de pantalla del paso">
          <ImageIcon size={24} className="gv-step__shot-icon" />
          <span className="gv-step__shot-title">Captura de pantalla del paso</span>
          <span className="gv-step__shot-hint">Se mostrará aquí al activar la funcionalidad</span>
        </div>
      )}

      {/* adjunto placeholder */}
      {step.hasAttachment && !editing && (
        <div className="gv-step__attachment">
          <PaperclipIcon size={15} style={{ color: 'var(--ink-3)' }} />
          <span>Archivo adjunto — <span className="gv-step__att-link">Ver adjunto</span></span>
        </div>
      )}

      {/* señales de dolor */}
      {(step.painPoints?.length ?? 0) > 0 && (
        <div className="gv-step__pains">
          <p className="gv-step__pains-title">
            <BoltIcon size={14} style={{ color: 'var(--warn)' }} />
            Señales de dolor detectadas
          </p>
          {step.painPoints!.map((pp, i) => (
            <div key={i} className="gv-pain">
              <span className="gv-pain__sev" style={{ color: SEVERITY_COLOR[pp.severity] }}>
                {pp.severity}
              </span>
              <p className="gv-pain__text">{pp.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* navegación prev/next + acciones destructivas */}
      <div className="gv-step__footer">
        <div className="gv-step__nav">
          <button
            type="button"
            className="btn btn--ghost gv-step__prev"
            onClick={onPrev}
            disabled={step.number === 1}
          >
            <ArrowRightIcon size={14} style={{ transform: 'rotate(180deg)' }} />
            Anterior
          </button>
          <button
            type="button"
            className="btn btn--ghost gv-step__insert"
          >
            <PlusIcon size={14} />
            Insertar paso aquí
          </button>
          <button
            type="button"
            className="btn btn--primary gv-step__next"
            onClick={onNext}
            disabled={step.number === total}
          >
            Siguiente
            <ArrowRightIcon size={14} />
          </button>
        </div>

        <button type="button" className="btn-danger-text gv-step__delete" onClick={onDelete}>
          <TrashIcon size={14} />
          Eliminar este paso
        </button>
      </div>
    </article>
  );
}

// ── Vista principal ─────────────────────────────────────────────────
export default function GuiaView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const process = PROCESSES.find((p) => p.id === id);
  const guide   = getGuide(id ?? '');

  const [steps,    setSteps]    = useState(guide?.steps ?? []);
  const [activeId, setActiveId] = useState(guide?.steps[0]?.id ?? '');

  // nombre del proceso editable inline (estado local, como la edición de pasos)
  const [procTitle,    setProcTitle]    = useState(process?.title ?? '');
  const [editingTitle, setEditingTitle] = useState(false);

  const activeStep = steps.find((s) => s.id === activeId);

  function goTo(delta: number) {
    const idx = steps.findIndex((s) => s.id === activeId);
    const next = steps[idx + delta];
    if (next) setActiveId(next.id);
  }

  function deleteStep() {
    if (steps.length <= 1) return;
    const idx  = steps.findIndex((s) => s.id === activeId);
    const next = steps[idx + 1] ?? steps[idx - 1];
    setSteps((list) => list.filter((s) => s.id !== activeId).map((s, i) => ({ ...s, number: i + 1 })));
    if (next) setActiveId(next.id);
  }

  function saveStep(patch: { title: string; description: string }) {
    setSteps((list) => list.map((s) => (s.id === activeId ? { ...s, ...patch } : s)));
  }

  if (!process || process.kind !== 'guia') {
    return (
      <div style={{ padding: 40, color: 'var(--ink-2)' }}>
        Proceso no encontrado o no es una guía.{' '}
        <button type="button" className="btn btn--ghost" onClick={() => navigate('/procesos')}>Volver</button>
      </div>
    );
  }

  if (!guide || steps.length === 0) {
    return (
      <div style={{ padding: 40, color: 'var(--ink-2)' }}>
        Guía sin pasos aún.{' '}
        <button type="button" className="btn btn--ghost" onClick={() => navigate('/procesos')}>Volver</button>
      </div>
    );
  }

  return (
    <div className="gv">
      {/* topbar de la guía */}
      <header className="gv-topbar">
        <button
          type="button"
          className="btn btn--ghost gv-back"
          onClick={() => navigate('/procesos')}
        >
          <ArrowRightIcon size={14} style={{ transform: 'rotate(180deg)' }} />
          Procesos
        </button>

        <div className="gv-topbar__center">
          {editingTitle ? (
            <input
              className="gv-topbar__title-input"
              value={procTitle}
              autoFocus
              onChange={(e) => setProcTitle(e.target.value)}
              onBlur={() => setEditingTitle(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setEditingTitle(false);
                if (e.key === 'Escape') {
                  setProcTitle(process.title);
                  setEditingTitle(false);
                }
              }}
            />
          ) : (
            <>
              <span className="gv-topbar__title">{procTitle}</span>
              <button
                type="button"
                className="icon-btn icon-btn--sm gv-topbar__edit"
                onClick={() => setEditingTitle(true)}
                aria-label="Editar nombre del proceso"
              >
                <EditIcon size={14} />
              </button>
            </>
          )}
          <span className="gv-topbar__badge mono">{steps.length} pasos</span>
        </div>

        <div className="gv-topbar__actions">
          <ExportMenu />
          <button
            type="button"
            className="icon-btn"
            onClick={() => navigate('/procesos')}
            aria-label="Cerrar"
          >
            <CloseIcon size={17} />
          </button>
        </div>
      </header>

      {/* progreso global */}
      <div className="gv-progress">
        <div
          className="gv-progress__fill"
          style={{ width: `${((activeStep?.number ?? 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* cuerpo: nav lateral + contenido */}
      <div className="gv-body">
        <StepNav steps={steps} activeId={activeId} onSelect={setActiveId} />

        {activeStep && (
          <StepContent
            key={activeStep.id}
            step={activeStep}
            total={steps.length}
            onPrev={() => goTo(-1)}
            onNext={() => goTo(+1)}
            onDelete={deleteStep}
            onSave={saveStep}
          />
        )}
      </div>
    </div>
  );
}
