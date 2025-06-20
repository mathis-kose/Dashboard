// src/utils/gridUtils.ts
import type { PlacedTile, TileSize, GridPosition } from '../types/grid';

/**
 * Checks if a new tile (defined by its position and size) would collide with any existing placed tiles.
 * Assumes positions are 1-indexed.
 */
export function checkCollision(
  newTilePosition: GridPosition,
  newTileSize: TileSize,
  placedTiles: PlacedTile[]
): boolean {
  const newTileEndX = newTilePosition.x + newTileSize.w - 1;
  const newTileEndY = newTilePosition.y + newTileSize.h - 1;

  for (const tile of placedTiles) {
    const existingTileEndX = tile.position.x + tile.size.w - 1;
    const existingTileEndY = tile.position.y + tile.size.h - 1;

    // Check for overlap
    const xOverlap = newTilePosition.x <= existingTileEndX && newTileEndX >= tile.position.x;
    const yOverlap = newTilePosition.y <= existingTileEndY && newTileEndY >= tile.position.y;

    if (xOverlap && yOverlap) {
      return true; // Collision detected
    }
  }
  return false; // No collision
}

/**
 * Finds an available spot for a new tile of a given size in a grid.
 * Tries to place it row by row, then column by column.
 * Returns the top-left GridPosition (1-indexed) if a spot is found, otherwise null.
 */
export function findAvailableSpot(
  newTileSize: TileSize,
  placedTiles: PlacedTile[],
  gridColumns: number,
  gridRows: number // Max rows to check, can be a large number for an "infinite" grid
): GridPosition | null {
  for (let y = 1; y <= gridRows - newTileSize.h + 1; y++) {
    for (let x = 1; x <= gridColumns - newTileSize.w + 1; x++) {
      const position: GridPosition = { x, y };
      if (!checkCollision(position, newTileSize, placedTiles)) {
        // Check if the spot is within grid boundaries (already implicitly handled by loop limits for x,y)
        // Ensure the tile does not exceed grid boundaries from this position
        if (x + newTileSize.w -1 <= gridColumns && y + newTileSize.h -1 <= gridRows) {
             return position; // Found a spot
        }
      }
    }
  }
  return null; // No spot found
}
