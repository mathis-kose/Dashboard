// src/components/ui/NeumorphicInput.tsx

interface NeumorphicInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  padding?: string; // e.g., 'px-4 py-2'
}

const NeumorphicInput: React.FC<NeumorphicInputProps> = ({
  className = '',
  padding = 'px-4 py-3', // Default padding
  disabled = false,
  ...props
}) => {
  const baseStyle = `
    bg-[var(--color-bg-light)]
    text-[var(--color-text-light)]
    border-none
    rounded-[var(--border-radius-base)]
    transition-all duration-150 ease-in-out
    focus:outline-none
  `;

  // Inset shadow for the default state of an input
  // On focus, the shadow might change subtly or an accent border might appear
  const inputStyle = disabled
    ? `
      opacity-60
      cursor-not-allowed
      shadow-[var(--shadow-light-outset-soft)] /* Or a flatter inset */
    `
    : `
      shadow-[var(--shadow-light-inset)]
      focus:shadow-[var(--shadow-light-outset-soft)] /* Example: make it pop slightly on focus */
    `;

  return (
    <input
      className={`
        ${baseStyle}
        ${inputStyle}
        ${padding}
        ${className}
      `}
      disabled={disabled}
      {...props}
    />
  );
};

export default NeumorphicInput;
