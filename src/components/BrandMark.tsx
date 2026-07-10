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
 * Logo horizontal completo de ProceOn: ícono + wordmark con la "O" circular.
 * Renderiza SVG inline para que DM Sans (cargada en index.html) se aplique
 * y la tipografía coincida exactamente con el branding.
 * `height` controla la altura en px; el ancho se escala proporcionalmente.
 */
export function ProceonLogo({ height = 28 }: { height?: number }) {
  // viewBox 470×80: icono (80×80) + gap (30) + wordmark (~360×80)
  const width = Math.round(height * (470 / 80));
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 470 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ProceOn"
      style={{ flex: 'none', display: 'block' }}
    >
      {/* ícono — escalado de 100×100 a 80×80 */}
      <g transform="scale(0.8)">
        <rect x="0" y="0" width="100" height="100" rx="22" fill="#2F5DF5" />
        <path
          d="M26,74 L50,30 L78,50"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="26" cy="74" r="8.5" fill="#FFFFFF" />
        <circle cx="50" cy="30" r="8.5" fill="#FFFFFF" />
        <circle cx="78" cy="50" r="11.5" fill="#FFFFFF" />
        <circle cx="78" cy="50" r="5"   fill="#2F5DF5" />
      </g>

      {/* wordmark — mismas proporciones que wordmark-ink.svg (viewBox 360×80) */}
      <g transform="translate(110, 0)">
        <text
          x="0" y="58"
          fontSize="56" fontWeight="600" letterSpacing="-1.2"
          fontFamily="DM Sans, system-ui, sans-serif"
          fill="#10131F"
        >
          Proce
        </text>
        {/* "O" = círculo con punto azul interior */}
        <circle cx="270" cy="42" r="17"  fill="none" stroke="#10131F" strokeWidth="9" />
        <circle cx="270" cy="42" r="5.5" fill="#2F5DF5" />
        <text
          x="292" y="58"
          fontSize="56" fontWeight="600" letterSpacing="-1.2"
          fontFamily="DM Sans, system-ui, sans-serif"
          fill="#10131F"
        >
          n
        </text>
      </g>
    </svg>
  );
}
