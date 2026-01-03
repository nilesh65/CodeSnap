export const selectStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: 'var(--secondary-bg)',
    borderColor: 'var(--border-color)',
    boxShadow: 'none',
    color: 'var(--text-primary)',
  }),

  singleValue: (base) => ({
    ...base,
    color: 'var(--text-primary)', // selected value
  }),

  placeholder: (base) => ({
    ...base,
    color: 'var(--text-secondary)',
  }),

  input: (base) => ({
    ...base,
    color: 'var(--text-primary)',
  }),

  menu: (base) => ({
    ...base,
    backgroundColor: 'var(--secondary-bg)',
  }),

  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused
      ? 'var(--tertiary-bg)'
      : 'var(--secondary-bg)',
    color: 'var(--text-primary)', // 🔑 THIS fixes thin white text
    cursor: 'pointer',
  }),
};