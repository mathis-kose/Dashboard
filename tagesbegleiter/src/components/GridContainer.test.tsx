// src/components/GridContainer.test.tsx
import { render, screen, act } from '@testing-library/react';
import GridContainer from './GridContainer';
import { GridProvider, useGrid, DEFAULT_GRID_COLUMNS } from '../contexts/GridContext';
import React from 'react'; // For React.ReactElement

// Helper to render with provider
const renderWithGridProvider = (
  ui: React.ReactElement,
  initialState?: Partial<ReturnType<typeof useGrid>['state']> // Allow overriding initial context state for tests
) => {
  // A simple way to provide initial state for testing specific scenarios
  // For more complex scenarios, you might mock the provider or use a custom initial state for the reducer
  // This approach is basic: it re-wraps GridProvider for each test with potentially different initial values if needed.
  // However, GridProvider itself sets initial state. To test different *initial* states for gridColumns,
  // we'd need to allow GridProvider to take initial state or test via dispatch.
  // For now, we'll test default context values and test dispatch effects separately in context tests.

  // If we want to test GridContainer with a *specific initial context state* (e.g. different gridColumns)
  // without dispatching, we'd need a more complex setup or to allow GridProvider to accept an initial state.
  // For this test, we'll rely on default initial state of GridProvider.

  return render(
    <GridProvider>
      {ui}
    </GridProvider>
  );
};

// Test component to dispatch actions if needed for GridContainer tests
const GridControlTestComponent: React.FC<{ dispatchAction: () => void, buttonText: string }> = ({ dispatchAction, buttonText }) => {
  return <button onClick={dispatchAction}>{buttonText}</button>;
};


describe('GridContainer', () => {
  it('renders children correctly', () => {
    renderWithGridProvider(<GridContainer><div data-testid="child">Child</div></GridContainer>);
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('uses default columns from GridContext and default gap prop', () => {
    renderWithGridProvider(<GridContainer>Test</GridContainer>);
    const containerElement = screen.getByTestId('grid-container');
    expect(containerElement).toHaveStyle(`grid-template-columns: repeat(${DEFAULT_GRID_COLUMNS}, minmax(0, 1fr))`);
    expect(containerElement).toHaveStyle('gap: 1rem'); // Default gap=4 -> 1rem
  });

  it('applies custom gap from prop', () => {
    renderWithGridProvider(<GridContainer gap={2}>Test</GridContainer>);
    const containerElement = screen.getByTestId('grid-container');
    expect(containerElement).toHaveStyle('gap: 0.5rem'); // Custom gap=2 -> 0.5rem
  });

  it('renders debug grid cells when showGridLines is true in context', () => {
    // To test this, we need to render GridContainer and then dispatch TOGGLE_GRID_LINES
    // Or, provide an initial state to GridProvider where showGridLines is true (more complex setup for provider)
    // Let's use a component that can dispatch the action.
    let dispatchForTest: React.Dispatch<any>; // To capture dispatch

    const TestComponentWithGridAndToggle = () => {
      const { dispatch } = useGrid();
      dispatchForTest = dispatch; // Capture dispatch
      return <GridContainer>Children</GridContainer>;
    };

    renderWithGridProvider(<TestComponentWithGridAndToggle />);

    // Initially, no grid cells should be visible (besides children)
    expect(screen.queryByTestId(/debug-cell-/)).not.toBeInTheDocument();

    act(() => {
      dispatchForTest({ type: 'TOGGLE_GRID_LINES' });
    });

    // Now debug cells should be visible. Check for at least one.
    // The number of cells depends on DEFAULT_GRID_COLUMNS and debugGridRows in GridContainer.
    // Example: default 12 columns * 10 debug rows = 120 cells.
    // We can check for a specific cell or just that some exist.
    expect(screen.getByTestId(`grid-cell-1-1`)).toBeInTheDocument(); // Corrected data-testid prefix
    // Check for the last cell in the first row based on default columns
    expect(screen.getByTestId(`grid-cell-${DEFAULT_GRID_COLUMNS}-1`)).toBeInTheDocument(); // Corrected data-testid prefix
  });
});
