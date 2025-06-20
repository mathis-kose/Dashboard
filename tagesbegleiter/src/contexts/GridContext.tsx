// src/contexts/GridContext.tsx
import { createContext, useContext, useReducer, useEffect } from 'react'; // Added useEffect
import type { PlacedTile, GridPosition } from '../types/grid';
import { useResponsiveGrid } from '../hooks/useResponsiveGrid'; // Import the hook

// Default grid columns (can be considered a fallback or initial before responsive takes over)
export const DEFAULT_GRID_COLUMNS = 12;

interface GridState {
  placedTiles: PlacedTile[];
  showGridLines: boolean;
  gridColumns: number;
}

type GridAction =
  | { type: 'ADD_TILE'; payload: { tile: PlacedTile } }
  | { type: 'REMOVE_TILE'; payload: { tileId: string } }
  | { type: 'MOVE_TILE'; payload: { tileId: string; newPosition: GridPosition } }
  | { type: 'TOGGLE_GRID_LINES' }
  | { type: 'SET_GRID_COLUMNS'; payload: { columns: number } };

const initialState: GridState = {
  placedTiles: [],
  showGridLines: false,
  gridColumns: DEFAULT_GRID_COLUMNS, // Initial default
};

const GridContext = createContext<{
  state: GridState;
  dispatch: React.Dispatch<GridAction>;
} | undefined>(undefined);

function gridReducer(state: GridState, action: GridAction): GridState {
  switch (action.type) {
    case 'ADD_TILE':
      return { ...state, placedTiles: [...state.placedTiles, action.payload.tile] };
    case 'REMOVE_TILE':
      return { ...state, placedTiles: state.placedTiles.filter(tile => tile.id !== action.payload.tileId) };
    case 'MOVE_TILE':
      return {
        ...state,
        placedTiles: state.placedTiles.map(tile =>
          tile.id === action.payload.tileId
            ? { ...tile, position: action.payload.newPosition }
            : tile
        ),
      };
    case 'TOGGLE_GRID_LINES':
      return { ...state, showGridLines: !state.showGridLines };
    case 'SET_GRID_COLUMNS':
      // Prevent dispatching if columns haven't actually changed
      if (state.gridColumns === action.payload.columns) {
        return state;
      }
      return { ...state, gridColumns: action.payload.columns };
    default:
      // Check if the action is exhaustive
      // const _: never = action; // This will cause a type error if any action is not handled
      return state;
  }
}

interface GridProviderProps {
  children: React.ReactNode;
}

export const GridProvider: React.FC<GridProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gridReducer, initialState);
  const responsiveColumns = useResponsiveGrid(); // Use the hook

  // Effect to update grid columns in context when responsiveColumns changes
  useEffect(() => {
    // Dispatch only if the number of columns has actually changed
    if (responsiveColumns !== state.gridColumns) {
      dispatch({ type: 'SET_GRID_COLUMNS', payload: { columns: responsiveColumns } });
    }
  }, [responsiveColumns, state.gridColumns]); // Add state.gridColumns to dependencies

  return (
    <GridContext.Provider value={{ state, dispatch }}>
      {children}
    </GridContext.Provider>
  );
};

export const useGrid = (): { state: GridState; dispatch: React.Dispatch<GridAction> } => {
  const context = useContext(GridContext);
  if (context === undefined) {
    throw new Error('useGrid must be used within a GridProvider');
  }
  return context;
};
