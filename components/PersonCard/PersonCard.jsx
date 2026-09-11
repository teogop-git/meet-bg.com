export function PersonCard({
  name,
  initials,
  location,
  dinners,
  tags = [],
  verified = false,
  following = false,
  avatarGradient = 'linear-gradient(135deg,#F47A20,#D4631A)',
  onFollow,
  followLabel = 'Follow',
  followingLabel = 'Following ✓',
  style,
  ...rest
}) {
  const auto = (name || '').trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
  const meta = [location, dinners != null ? dinners + ' dinners' : null].filter(Boolean).join(' · ');
  const ui = 'var(--font-ui, Inter, system-ui, sans-serif)';
  return React.createElement('div', {
    ...rest,
    style: {
      display: 'flex', flexDirection: 'column',
      background: '#1F1F1F', borderRadius: 12, padding: 14, minWidth: 0,
      ...style,
    },
  },
    React.createElement('div', {
      style: {
        width: 48, height: 48, borderRadius: '50%', background: avatarGradient,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#FFFFFF', fontFamily: ui, fontWeight: 700, fontSize: 18,
        marginBottom: 10,
      },
    }, initials || auto),
    React.createElement('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: 5,
        fontFamily: ui, fontSize: 14, fontWeight: 600, color: '#FFFFFF', marginBottom: 2,
      },
    },
      name,
      verified ? React.createElement('span', {
        style: { color: '#4A9EFF', fontSize: 12 }, title: 'Verified',
      }, '✓') : null),
    meta ? React.createElement('div', {
      style: { fontFamily: ui, fontSize: 12, color: '#6B7280', marginBottom: 8 },
    }, meta) : null,
    tags.length ? React.createElement('div', {
      style: { display: 'flex', flexWrap: 'wrap', gap: 4 },
    }, tags.map((t, i) => React.createElement('span', {
      key: i,
      style: {
        background: '#2A2A2A', color: '#9CA3AF',
        fontFamily: ui, fontSize: 10,
        padding: '3px 8px', borderRadius: 99,
      },
    }, t))) : null,
    onFollow ? React.createElement('div', {
      style: { marginTop: 'auto', paddingTop: 10 },
    }, React.createElement('button', {
      onClick: onFollow,
      style: {
        marginTop: 0, width: '100%', padding: 7,
        borderRadius: 6, borderStyle: 'solid', borderWidth: 1,
        fontFamily: ui, fontSize: 12, fontWeight: 600, cursor: 'pointer',
        transition: 'background 200ms ease, color 200ms ease',
        ...(following
          ? { background: '#2A2A2A', color: '#F47A20', borderColor: '#F47A20' }
          : { background: '#F47A20', color: '#FFFFFF', borderColor: 'transparent' }),
      },
    }, following ? followingLabel : followLabel)) : null,
  );
}
