const TONES = {
  green:    { background: '#DCFCE7', color: '#166534', dot: '#22C55E' },
  yellow:   { background: '#FEF9C3', color: '#854D0E', dot: '#F59E0B' },
  red:      { background: '#FEE2E2', color: '#991B1B', dot: '#EF4444' },
  blue:     { background: '#DBEAFE', color: '#1E40AF', dot: null },
  verified: { background: '#EFF6FF', color: '#4A9EFF', dot: null },
  count:    { background: '#1E1E1E', color: '#C9A24D', dot: null },
};

function checkIcon() {
  return React.createElement('svg', {
    viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
    strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round',
    style: { width: 12, height: 12, flexShrink: 0 },
  }, React.createElement('polyline', { points: '20 6 9 17 4 12' }));
}

export function Badge({ tone = 'green', dot, check = false, children, style, ...rest }) {
  const t = TONES[tone] || TONES.green;
  const showDot = dot === undefined ? Boolean(t.dot) : dot;
  return React.createElement('span', {
    ...rest,
    style: {
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: tone === 'count' ? '5px 12px' : '4px 10px',
      borderRadius: 99,
      fontFamily: 'var(--font-ui, Inter, system-ui, sans-serif)',
      fontSize: tone === 'count' ? 12 : 11,
      fontWeight: 600, lineHeight: 1.4, whiteSpace: 'nowrap',
      background: t.background, color: t.color,
      ...style,
    },
  },
    check ? checkIcon() : null,
    showDot && t.dot
      ? React.createElement('span', {
          style: { width: 6, height: 6, borderRadius: '50%', background: t.dot, flexShrink: 0 },
        })
      : null,
    children,
  );
}
