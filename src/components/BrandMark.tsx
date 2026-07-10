/** Ícono cuadrado de ProceOn (solo el glyph). `size` controla el lado en px. */
export function BrandGlyph({ size = 28 }: { size?: number }) {
  return (
    <img
      src="/favicon.svg"
      alt="ProceOn"
      width={size}
      height={size}
      style={{ flex: 'none', display: 'block' }}
    />
  );
}

/**
 * Logo horizontal completo de ProceOn: ícono + wordmark.
 * Usa HTML/CSS en lugar de SVG text para que DM Sans (cargada en la app)
 * fluya correctamente y la "O" circular quede pegada al texto sin gaps.
 */
export function ProceonLogo({ height = 28 }: { height?: number }) {
  const fontSize  = Math.round(height * 0.78);
  // La "O" debe igualar la cap-height de DM Sans (≈ 72% del font-size)
  const circleSize  = Math.round(fontSize * 0.72);
  const strokeWidth = Math.max(2, Math.round(circleSize * 0.22));
  const dotSize     = Math.max(3, Math.round(circleSize * 0.38));

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: Math.round(height * 0.38),
        height,
        flexShrink: 0,
      }}
    >
      {/* Ícono */}
      <img
        src="/favicon.svg"
        alt=""
        width={height}
        height={height}
        style={{ display: 'block', flexShrink: 0 }}
      />

      {/* Wordmark: Proce + O circular + n */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          fontFamily: 'DM Sans, system-ui, sans-serif',
          fontWeight: 600,
          fontSize,
          letterSpacing: '-0.025em',
          color: '#10131F',
          lineHeight: 1,
          gap: Math.round(circleSize * 0.08),
        }}
      >
        <span>Proce</span>

        {/* La "O" = círculo con punto azul interior */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width:  circleSize,
            height: circleSize,
            border: `${strokeWidth}px solid #10131F`,
            borderRadius: '50%',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width:  dotSize,
              height: dotSize,
              borderRadius: '50%',
              background: '#2F5DF5',
              display: 'block',
              flexShrink: 0,
            }}
          />
        </span>

        <span>n</span>
      </div>
    </div>
  );
}
