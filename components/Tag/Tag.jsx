const TONES = {
  cream:  { background: '#EDE8E0', color: '#1E1E1E', borderColor: 'transparent' },
  gold:   { background: '#FBF3E2', color: '#A8833A', borderColor: '#C9A24D' },
  dark:   { background: '#2A2A2A', color: '#9CA3AF', borderColor: 'transparent' },
  orange: { background: 'rgba(244,122,32,0.15)', color: '#F47A20', borderColor: 'transparent' },
  active: { background: '#F47A20', color: '#FFFFFF', borderColor: 'transparent' },
};

export function Tag({ tone = 'cream', onClick, children, style, ...rest }) {
  const t = TONES[tone] || TONES.cream;
  return React.createElement('span', {
    ...rest,
    onClick,
    style: {
      display: 'inline-block',
      padding: '5px 12px', borderRadius: 99,
      borderStyle: 'solid', borderWidth: 1,
      fontFamily: 'var(--font-ui, Inter, system-ui, sans-serif)',
      fontSize: 12, fontWeight: 500, lineHeight: 1.4, whiteSpace: 'nowrap',
      cursor: onClick ? 'pointer' : 'default',
      ...t, ...style,
    },
  }, children);
}
