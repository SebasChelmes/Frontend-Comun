/** The Sebach AI glyph + wordmark. `size` controls the square glyph. */
export function BrandGlyph({ size = 28, radius = 8, font = 15 }: { size?: number; radius?: number; font?: number }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: 'var(--accent)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        fontSize: font,
        flex: 'none',
      }}
    >
      S
    </span>
  );
}

export function BrandMark({ size = 28, font = 17 }: { size?: number; font?: number }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <BrandGlyph size={size} />
      <span style={{ fontSize: font, fontWeight: 600, letterSpacing: '-0.01em' }}>Sebach AI</span>
    </span>
  );
}
