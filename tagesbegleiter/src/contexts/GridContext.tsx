// src/contexts/GridContext.tsx
import { createContext, useContext, useReducer } from 'react'; // Removed ReactNode
import type { PlacedTile, GridPosition /*, TileSize */ } from '../types/grid'; // TileSize might not be needed directly in context state/actions yet
// Placeholder for actual tile types/configurations from P4
// import type { Tile } from '../types/index'; // Assuming base Tile type from P1 - commented out as Tile is not used yet

// Default grid columns
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
  showGridLines: false, // Default to false
  gridColumns: DEFAULT_GRID_COLUMNS,
};

// GridContext and gridReducer (update reducer for new actions)
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
      return { ...state, gridColumns: action.payload.columns };
    default:
      // Check if the action is exhaustive
      const _: never = action; // This will cause a type error if any action is not handled
      return state;
  }
}

// GridProvider and useGrid remain the same structure
interface GridProviderProps {
  children: React.ReactNode; // Changed to React.ReactNode
}

export const GridProvider: React.FC<GridProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gridReducer, initialState);
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
