// src/components/ui/NeumorphicCard.tsx

interface NeumorphicCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: string; // e.g., 'p-4', 'p-6'
  elementType?: keyof JSX.IntrinsicElements; // Allow specifying div, article, etc.
}

const NeumorphicCard: React.FC<NeumorphicCardProps> = ({
  children,
  className = '',
  padding = 'p-6',
  elementType: ElementType = 'div',
}) => {
  return (
    <ElementType
      className={`
        bg-[var(--color-bg-light)]
        rounded-[var(--border-radius-base)]
        shadow-[var(--shadow-light-outset-strong)]
        transition-all duration-300 ease-in-out
        ${padding}
        ${className}
      `}
    >
      {children}
    </ElementType>
  );
};

export default NeumorphicCard;
