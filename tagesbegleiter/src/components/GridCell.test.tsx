// src/components/GridCell.test.tsx
import { render, screen } from '@testing-library/react';
import GridCell from './GridCell';

describe('GridCell', () => {
  it('renders with correct data-testid', () => {
    render(<GridCell x={1} y={2} />);
    expect(screen.getByTestId('grid-cell-1-2')).toBeInTheDocument();
  });

  it('shows coordinates when showGridLines is true', () => {
    render(<GridCell x={1} y={2} showGridLines />);
    expect(screen.getByText('(1,2)')).toBeInTheDocument();
    expect(screen.getByTestId('grid-cell-1-2')).toHaveClass('border');
  });
});
