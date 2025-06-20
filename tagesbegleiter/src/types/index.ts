// src/types/index.ts
export interface GridPosition {
  x: number;
  y: number;
}

export interface TileConfig {
  // Base configuration, can be extended by specific tiles
  [key: string]: any;
}

export interface Tile {
  id: string;
  type: string; // Later an enum e.g. TileType.CLOCK
  position: GridPosition;
  size: { w: number; h: number }; // e.g. 1x1, 2x1
  config?: TileConfig;
}

export interface AppState {
  tiles: Tile[];
  // Add other global state properties here later
}
