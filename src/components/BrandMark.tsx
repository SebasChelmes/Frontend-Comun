/** Ícono cuadrado de ProceOn. `size` controla el lado en px. */
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
