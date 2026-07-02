/**
 * Color de token por severidad de señal de dolor.
 * Compartido por la vista de diagrama (DiagramaView) y la de guía (GuiaView)
 * para evitar duplicar el mapa en ambos archivos.
 */
export const SEVERITY_COLOR: Record<string, string> = {
  Alta:  'var(--danger)',
  Media: 'var(--warn)',
  Baja:  'var(--ok)',
};
