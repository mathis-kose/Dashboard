// src/contexts/GridContext.test.tsx
import { render, screen, act } from '@testing-library/react';
import { useGrid, GridProvider, DEFAULT_GRID_COLUMNS } from './GridContext'; // Added DEFAULT_GRID_COLUMNS
// import type { PlacedTile } from '../types/grid'; // Not directly used in tests, TILE_SIZE_UNITS is enough for payload
import { TILE_SIZE_UNITS } from '../types/grid';
// import React from 'react'; // Not needed for JSX with new transform, React.FC is fine
import { jest } from '@jest/globals'; // For mocking console

const TestConsumer: React.FC<{ onStateChange?: (state: any) => void }> = ({ onStateChange }) => {
  const { state, dispatch } = useGrid();

  if (onStateChange) {
    onStateChange(state);
  }

  return (
    <div>
      <button onClick={() => dispatch({ type: 'ADD_TILE', payload: { tile: { id: 'test1', position: { x: 1, y: 1 }, size: TILE_SIZE_UNITS.UNIT_1X1 } } })}>
        Add
      </button>
      <button onClick={() => dispatch({ type: 'REMOVE_TILE', payload: { tileId: 'test1' } })}>
        Remove
      </button>
      <button onClick={() => dispatch({ type: 'MOVE_TILE', payload: { tileId: 'test1', newPosition: { x: 2, y: 2 } } })}>
        Move
      </button>
      <button onClick={() => dispatch({ type: 'TOGGLE_GRID_LINES' })}>
        ToggleGrid
      </button>
      <button onClick={() => dispatch({ type: 'SET_GRID_COLUMNS', payload: { columns: 8 } })}>
        SetCols8
      </button>
      <span data-testid="tile-count">{state.placedTiles.length}</span>
      <span data-testid="show-grid-lines">{String(state.showGridLines)}</span>
      <span data-testid="grid-columns">{state.gridColumns}</span>
      {state.placedTiles.map(tile => (
        <div key={tile.id} data-testid={`tile-${tile.id}-pos`}>{`${tile.position.x},${tile.position.y}`}</div>
      ))}
    </div>
  );
};

describe('GridContext', () => {
  it('provides initial state', () => {
    let receivedState: any;
    render(
      <GridProvider>
        <TestConsumer onStateChange={state => receivedState = state} />
      </GridProvider>
    );
    expect(receivedState.placedTiles).toEqual([]);
    expect(receivedState.showGridLines).toBe(false);
    expect(receivedState.gridColumns).toBe(DEFAULT_GRID_COLUMNS);
  });

  it('handles ADD_TILE action', () => {
    render(
      <GridProvider>
        <TestConsumer />
      </GridProvider>
    );
    act(() => {
      screen.getByText('Add').click();
    });
    expect(screen.getByTestId('tile-count').textContent).toBe('1');
    expect(screen.getByTestId('tile-test1-pos').textContent).toBe('1,1');
  });

  it('handles REMOVE_TILE action', () => {
     render(
      <GridProvider>
        <TestConsumer />
      </GridProvider>
    );
    act(() => {
      screen.getByText('Add').click(); // Add first
    });
    expect(screen.getByTestId('tile-count').textContent).toBe('1');
    act(() => {
      screen.getByText('Remove').click();
    });
    expect(screen.getByTestId('tile-count').textContent).toBe('0');
  });

  it('handles MOVE_TILE action', () => {
    render(
      <GridProvider>
        <TestConsumer />
      </GridProvider>
    );
    act(() => {
      screen.getByText('Add').click(); // Add first
    });
    act(() => {
      screen.getByText('Move').click();
    });
    expect(screen.getByTestId('tile-test1-pos').textContent).toBe('2,2');
  });

  it('handles TOGGLE_GRID_LINES action', () => {
    render(<GridProvider><TestConsumer /></GridProvider>);
    expect(screen.getByTestId('show-grid-lines').textContent).toBe('false');
    act(() => {
      screen.getByText('ToggleGrid').click();
    });
    expect(screen.getByTestId('show-grid-lines').textContent).toBe('true');
    act(() => {
      screen.getByText('ToggleGrid').click();
    });
    expect(screen.getByTestId('show-grid-lines').textContent).toBe('false');
  });

  it('handles SET_GRID_COLUMNS action', () => {
    render(<GridProvider><TestConsumer /></GridProvider>);
    expect(screen.getByTestId('grid-columns').textContent).toBe(String(DEFAULT_GRID_COLUMNS));
    act(() => {
      screen.getByText('SetCols8').click();
    });
    expect(screen.getByTestId('grid-columns').textContent).toBe('8');
  });

  it('throws error if useGrid is used outside of GridProvider', () => {
    const originalError = console.error;
    console.error = jest.fn();

    const BadConsumer = () => { useGrid(); return null; };
    expect(() => render(<BadConsumer />)).toThrow('useGrid must be used within a GridProvider');

    console.error = originalError;
  });
});
