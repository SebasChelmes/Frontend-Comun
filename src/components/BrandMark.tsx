/** El glyph cuadrado de Sebach AI (la "S"). `size` controla el lado. */
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
