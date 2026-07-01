import { useEffect, type RefObject } from 'react';

/**
 * Cierra un popover/menú al hacer click fuera de `ref` o al presionar Escape.
 * Reemplaza el patrón repetido en dropdowns (ModelSelector, CardMenu, menú de usuario).
 */
export function useDismiss(
  active: boolean,
  ref: RefObject<HTMLElement | null>,
  onDismiss: () => void,
) {
  useEffect(() => {
    if (!active) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onDismiss();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [active, ref, onDismiss]);
}
