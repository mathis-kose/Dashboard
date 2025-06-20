// src/types/grid.ts
export const TILE_SIZE_UNITS = {
  UNIT_1X1: { w: 1, h: 1 },
  UNIT_2X1: { w: 2, h: 1 },
  UNIT_3X1: { w: 3, h: 1 },
  UNIT_1X2: { w: 1, h: 2 },
  UNIT_2X2: { w: 2, h: 2 },
  // Add more sizes as needed by the blueprint/specs
};

export interface TileSize {
  w: number; // width in grid units
  h: number; // height in grid units
}

// Re-export or ensure GridPosition is available if it's in a different file
// For simplicity, let's assume GridPosition is also in this file or imported
export interface GridPosition {
  x: number; // column start (1-indexed)
  y: number; // row start (1-indexed)
}

export interface PlacedTile {
  id: string;
  size: TileSize;
  position: GridPosition;
}
