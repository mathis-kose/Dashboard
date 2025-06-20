// src/components/GridContainer.tsx
// Removed ReactNode import, will use React.ReactNode
import { useGrid } from '../contexts/GridContext';
import GridCell from './GridCell'; // For rendering debug cells

interface GridContainerProps {
  children: React.ReactNode; // Changed to React.ReactNode
  gap?: number;
  className?: string;
  // rows?: number; // If fixed rows are needed, could also come from context or be prop
}

const GridContainer: React.FC<GridContainerProps> = ({
  children,
  gap = 4, // Corresponds to Tailwind's gap-4 (1rem)
  className = '',
  // rows,
}) => {
  const { state } = useGrid();
  const { showGridLines, gridColumns } = state;

  // Calculate total cells for rendering debug grid cells if rows are dynamic or very large.
  // For now, let's assume a fixed number of rows for the debug grid view, e.g., 10, or make it configurable.
  const debugGridRows = 10;
  const totalDebugCells = gridColumns * debugGridRows;

  return (
    <div
      className={`grid w-full h-full p-4 ${className}`}
      style={{
        gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
        // gridTemplateRows: rows ? `repeat(${rows}, minmax(0, 1fr))` : 'auto',
        gap: `${gap * 0.25}rem`,
        gridAutoRows: 'minmax(100px, auto)', // Example: each row at least 100px high
      }}
      data-testid="grid-container"
    >
      {showGridLines && Array.from({ length: totalDebugCells }).map((_, i) => {
        const x = (i % gridColumns) + 1;
        const y = Math.floor(i / gridColumns) + 1;
        // Simple key, ensure it's stable if cells can change
        return <GridCell key={`debug-cell-${x}-${y}`} x={x} y={y} showGridLines={showGridLines} />;
      })}
      {children}
    </div>
  );
};

export default GridContainer;
