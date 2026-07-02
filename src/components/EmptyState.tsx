import type { ReactNode } from 'react';
import './EmptyState.css';

type Variant = 'card' | 'inset' | 'plain';

interface Props {
  /** Área de media: caja de ícono, cluster de íconos, etc. Opcional. */
  media?: ReactNode;
  title?: string;
  description?: ReactNode;
  /** CTA opcional debajo de la descripción. */
  action?: ReactNode;
  /** Chrome del contenedor:
   *  - `card`  → tarjeta completa (surface + borde + sombra), para bloques de página.
   *  - `inset` → fondo sutil (surface-2), para secciones dentro de un panel.
   *  - `plain` → sin chrome, para cuando ya vive dentro de otra tarjeta. */
  variant?: Variant;
  className?: string;
}

/**
 * Estado vacío reutilizable (ícono + título + descripción + acción, centrados).
 * Unifica los empty states repetidos en Skills, Comandos, Automatizaciones,
 * Conectores y los paneles del agente. El "media" es flexible para soportar
 * tanto un ícono único como el cluster de 3 cajas de Automatizaciones.
 */
export function EmptyState({ media, title, description, action, variant = 'card', className }: Props) {
  return (
    <div className={`empty-state empty-state--${variant}${className ? ` ${className}` : ''}`}>
      {media && <div className="empty-state__media">{media}</div>}
      {title && <p className="empty-state__title">{title}</p>}
      {description && <p className="empty-state__desc">{description}</p>}
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
}

/** Caja de ícono estándar (círculo 56px) usada por la mayoría de los empty states. */
export function EmptyIcon({ children }: { children: ReactNode }) {
  return <span className="empty-state__icon">{children}</span>;
}
