// src/components/GridCell.tsx

// React import removed, React.FC will be used by type-checking but not needed at runtime for JSX
interface GridCellProps {
  x: number;
  y: number;
  isOccupied?: boolean; // Example prop
  showGridLines?: boolean;
}

const GridCell: React.FC<GridCellProps> = ({ x, y, isOccupied, showGridLines }) => {
  return (
    <div
      className={`
        ${showGridLines ? 'border border-dashed border-[var(--color-text-light)] opacity-30' : ''}
        ${isOccupied ? 'bg-red-300 opacity-50' : ''} /* For debugging */
      `}
      data-testid={`grid-cell-${x}-${y}`}
      style={{
        gridColumnStart: x,
        gridRowStart: y,
        // width: '100%', // Cells will expand to grid tracks
        // height: '100%',
      }}
    >
      {showGridLines && <span className="text-xs p-1">{`(${x},${y})`}</span>}
    </div>
  );
};

export default GridCell;
