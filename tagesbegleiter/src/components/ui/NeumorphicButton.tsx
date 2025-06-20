// src/components/ui/NeumorphicButton.tsx

interface NeumorphicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  padding?: string; // e.g., 'px-4 py-2'
  isPressed?: boolean; // To externally control pressed state if needed
}

const NeumorphicButton: React.FC<NeumorphicButtonProps> = ({
  children,
  className = '',
  padding = 'px-6 py-3', // Default padding
  isPressed = false, // Default to not pressed
  disabled = false,
  ...props
}) => {
  const baseStyle = `
    bg-[var(--color-bg-light)]
    text-[var(--color-text-light)]
    border-none
    rounded-[var(--border-radius-base)]
    cursor-pointer
    transition-all duration-150 ease-in-out
    focus:outline-none
  `;

  const disabledStyle = `
    opacity-50
    cursor-not-allowed
    shadow-[var(--shadow-light-inset)]
  `;

  // Regular state: outset shadow
  // Hover state: slightly stronger outset shadow or subtle change
  // Active/Pressed state: inset shadow to give "pressed" feel
  // isPressed prop allows external control of the pressed state, useful for toggle buttons

  const interactiveStyle = disabled
    ? disabledStyle
    : `
      shadow-[var(--shadow-light-outset-soft)]
      hover:shadow-[var(--shadow-light-outset-strong)]
      active:shadow-[var(--shadow-light-inset)]
    `;

  const pressedStyle = !disabled ? `shadow-[var(--shadow-light-inset)]` : disabledStyle;

  return (
    <button
      className={`
        ${baseStyle}
        ${isPressed ? pressedStyle : interactiveStyle}
        ${padding}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default NeumorphicButton;
