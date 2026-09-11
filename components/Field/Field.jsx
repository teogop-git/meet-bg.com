export function Field({
  label,
  type = 'text',
  placeholder,
  hint,
  error,
  success = false,
  theme = 'light',
  options,
  value,
  defaultValue,
  onChange,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const dark = theme === 'dark';
  const accent = dark ? '#F47A20' : '#C9A24D';
  const border = error ? '#EF4444' : success ? '#22C55E' : focused ? accent : dark ? '#333333' : '#D1D5DB';
  const ring = error ? 'rgba(239,68,68,0.15)' : dark ? 'rgba(244,122,32,0.15)' : 'rgba(201,162,77,0.15)';

  const controlStyle = {
    width: '100%',
    padding: dark ? '12px 14px' : '10px 14px',
    borderRadius: 8,
    borderStyle: 'solid', borderWidth: 1.5, borderColor: border,
    fontFamily: 'var(--font-ui, Inter, system-ui, sans-serif)',
    fontSize: 14, lineHeight: 1.4,
    color: dark ? '#FFFFFF' : '#1E1E1E',
    background: dark ? '#1F1F1F' : '#FFFFFF',
    outline: 'none',
    boxShadow: focused ? '0 0 0 3px ' + ring : 'none',
    transition: 'border-color 200ms ease, box-shadow 200ms ease',
  };

  const shared = {
    ...rest, value, defaultValue, onChange, placeholder,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: controlStyle,
  };

  const control = options
    ? React.createElement('select', shared,
        options.map((o, i) => {
          const val = typeof o === 'string' ? o : o.value;
          const lab = typeof o === 'string' ? o : o.label;
          return React.createElement('option', { key: i, value: val }, lab);
        }))
    : React.createElement('input', { ...shared, type });

  return React.createElement('div', {
    style: { display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0, ...style },
  },
    label ? React.createElement('label', {
      style: {
        fontFamily: 'var(--font-ui, Inter, system-ui, sans-serif)',
        fontSize: 12, fontWeight: 600,
        color: dark ? '#9CA3AF' : '#1E1E1E',
      },
    }, label) : null,
    control,
    error
      ? React.createElement('div', { style: { fontSize: 11, color: '#EF4444' } }, error)
      : hint
        ? React.createElement('div', { style: { fontSize: 11, color: '#9CA3AF' } }, hint)
        : null,
  );
}
