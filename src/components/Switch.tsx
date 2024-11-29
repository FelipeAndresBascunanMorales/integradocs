
interface SwitchProps {
  onChange: (checked: boolean) => void;
  checked?: boolean;
}

export function Switch({ onChange, checked = false }: SwitchProps) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full
        ${checked ? 'bg-indigo-600' : 'bg-gray-200'}
        transition-colors duration-200
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 rounded-full bg-white
          transform transition-transform duration-200
          ${checked ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  );
}
