const VARIANTS = {
  primary:    { background: '#1E1E1E', color: '#FFFFFF', borderColor: 'transparent' },
  gold:       { background: '#C9A24D', color: '#1E1E1E', borderColor: 'transparent' },
  outline:    { background: 'transparent', color: '#1E1E1E', borderColor: '#1E1E1E' },
  ghost:      { background: 'transparent', color: '#6B7280', borderColor: '#D1D5DB' },
  appPrimary: { background: '#F47A20', color: '#FFFFFF', borderColor: 'transparent' },
  appOutline: { background: 'transparent', color: '#F47A20', borderColor: '#F47A20' },
  appGhost:   { background: '#1F1F1F', color: '#FFFFFF', borderColor: '#333333' },
};

const HOVER = {
  primary:    { background: '#2B2B2B', boxShadow: '0 4px 16px rgba(0,0,0,0.18)', transform: 'translateY(-1px)' },
  gold:       { background: '#A8833A' },
  outline:    { background: '#1E1E1E', color: '#FFFFFF' },
  ghost:      { borderColor: '#9CA3AF', color: '#1E1E1E' },
  appPrimary: { background: '#D4631A' },
  appOutline: { background: 'rgba(244,122,32,0.12)' },
  appGhost:   { background: '#2A2A2A' },
};

const SIZES = {
  sm: { padding: '8px 16px',  fontSize: 13, borderRadius: 6 },
  md: { padding: '12px 24px', fontSize: 14, borderRadius: 8 },
  lg: { padding: '16px 32px', fontSize: 16, borderRadius: 10 },
};

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  href,
  onClick,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const base = VARIANTS[variant] || VARIANTS.primary;
  const dims = SIZES[size] || SIZES.md;
  const Tag = href ? 'a' : 'button';
  return React.createElement(Tag, {
    ...rest,
    href,
    onClick: disabled ? undefined : onClick,
    disabled: Tag === 'button' ? disabled : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      fontFamily: 'var(--font-ui, Inter, system-ui, sans-serif)',
      fontWeight: 600, letterSpacing: '0.02em', lineHeight: 1.2,
      borderStyle: 'solid', borderWidth: 1.5,
      textDecoration: 'none', whiteSpace: 'nowrap',
      transition: 'background 200ms ease, color 200ms ease, border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      pointerEvents: disabled ? 'none' : 'auto',
      ...base, ...dims,
      ...(hover && !disabled ? (HOVER[variant] || {}) : {}),
      ...style,
    },
  }, children);
}
