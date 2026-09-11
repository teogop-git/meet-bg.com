const SEAT_TONES = {
  normal: { background: '#F7F4EF', color: '#1E1E1E' },
  low:    { background: '#FEF3C7', color: '#92400E' },
  full:   { background: '#FEE2E2', color: '#991B1B' },
};

export function EventCard({
  date,
  title,
  city,
  price,
  seats,
  seatsTone = 'normal',
  imageLabel,
  gradient = 'linear-gradient(135deg,#1E1E1E 0%,#2B2B2B 100%)',
  href,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const seat = SEAT_TONES[seatsTone] || SEAT_TONES.normal;
  const Tag = href ? 'a' : 'div';
  return React.createElement(Tag, {
    ...rest, href, onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'block', textDecoration: 'none',
      background: '#FFFFFF', borderRadius: 12, overflow: 'hidden',
      boxShadow: hover ? '0 4px 24px rgba(0,0,0,0.12)' : '0 2px 16px rgba(0,0,0,0.08)',
      transform: hover ? 'translateY(-2px)' : 'none',
      transition: 'transform 200ms ease, box-shadow 200ms ease',
      cursor: href || onClick ? 'pointer' : 'default',
      ...style,
    },
  },
    React.createElement('div', {
      style: {
        height: 100, background: gradient,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#C9A24D',
        fontFamily: 'var(--font-ui, Inter, system-ui, sans-serif)',
        fontSize: 11, fontWeight: 600,
        letterSpacing: '0.1em', textTransform: 'uppercase',
      },
    }, imageLabel || city),
    React.createElement('div', { style: { padding: '12px 14px' } },
      date ? React.createElement('div', {
        style: {
          fontFamily: 'var(--font-ui, Inter, system-ui, sans-serif)',
          fontSize: 11, fontWeight: 600, color: '#C9A24D',
          letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4,
        },
      }, date) : null,
      React.createElement('div', {
        style: {
          fontFamily: "var(--font-display, 'Cormorant Garamond', serif)",
          fontSize: 17, fontWeight: 500, color: '#1E1E1E',
          lineHeight: 1.3, marginBottom: 6, textWrap: 'pretty',
        },
      }, title),
      React.createElement('div', {
        style: {
          display: 'flex', gap: 8, flexWrap: 'wrap',
          fontFamily: 'var(--font-ui, Inter, system-ui, sans-serif)',
          fontSize: 11, color: '#9CA3AF',
        },
      },
        city ? React.createElement('span', null, city) : null,
        city && price ? React.createElement('span', null, '·') : null,
        price ? React.createElement('span', null, price) : null),
      seats ? React.createElement('div', {
        style: {
          display: 'inline-block', marginTop: 8,
          padding: '3px 8px', borderRadius: 99,
          fontFamily: 'var(--font-ui, Inter, system-ui, sans-serif)',
          fontSize: 10, fontWeight: 600,
          ...seat,
        },
      }, seats) : null),
  );
}
