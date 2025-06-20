// src/utils/gridUtils.test.ts
import { checkCollision, findAvailableSpot } from './gridUtils';
import { TILE_SIZE_UNITS } from '../types/grid';
import type { PlacedTile, TileSize, GridPosition } from '../types/grid';

describe('checkCollision', () => {
  const placedTiles: PlacedTile[] = [
    { id: 'tile1', position: { x: 1, y: 1 }, size: TILE_SIZE_UNITS.UNIT_2X1 }, // Occupies (1,1) to (2,1)
    { id: 'tile2', position: { x: 3, y: 2 }, size: TILE_SIZE_UNITS.UNIT_1X2 }, // Occupies (3,2) to (3,3)
  ];

  it('should return true for direct overlap', () => {
    expect(checkCollision({ x: 1, y: 1 }, TILE_SIZE_UNITS.UNIT_1X1, placedTiles)).toBe(true);
  });

  it('should return true for partial overlap', () => {
    expect(checkCollision({ x: 2, y: 1 }, TILE_SIZE_UNITS.UNIT_2X1, placedTiles)).toBe(true); // Overlaps with tile1
  });

  it('should return true if new tile contains an existing tile', () => {
    expect(checkCollision({ x: 1, y: 1 }, TILE_SIZE_UNITS.UNIT_3X1, placedTiles)).toBe(true);
  });

  it('should return true if existing tile contains the new tile', () => {
    expect(checkCollision({x:3, y:2}, TILE_SIZE_UNITS.UNIT_1X1, placedTiles)).toBe(true);
  });

  it('should return false for no overlap', () => {
    expect(checkCollision({ x: 1, y: 2 }, TILE_SIZE_UNITS.UNIT_1X1, placedTiles)).toBe(false);
    expect(checkCollision({ x: 4, y: 1 }, TILE_SIZE_UNITS.UNIT_1X1, placedTiles)).toBe(false);
  });

  it('should return false when placedTiles is empty', () => {
    expect(checkCollision({ x: 1, y: 1 }, TILE_SIZE_UNITS.UNIT_1X1, [])).toBe(false);
  });
});

describe('findAvailableSpot', () => {
  const gridColumns = 4;
  const gridRows = 4;

  it('should find a spot in an empty grid', () => {
    const spot = findAvailableSpot(TILE_SIZE_UNITS.UNIT_2X1, [], gridColumns, gridRows);
    expect(spot).toEqual({ x: 1, y: 1 });
  });

  it('should find the next available spot', () => {
    const placed: PlacedTile[] = [{ id: 't1', position: { x: 1, y: 1 }, size: TILE_SIZE_UNITS.UNIT_1X1 }];
    const spot = findAvailableSpot(TILE_SIZE_UNITS.UNIT_1X1, placed, gridColumns, gridRows);
    expect(spot).toEqual({ x: 2, y: 1 });
  });

  it('should skip rows if necessary', () => {
    const placed: PlacedTile[] = [
      { id: 't1', position: { x: 1, y: 1 }, size: TILE_SIZE_UNITS.UNIT_2X1 }, // (1,1)-(2,1)
      { id: 't2', position: { x: 3, y: 1 }, size: TILE_SIZE_UNITS.UNIT_2X1 }, // (3,1)-(4,1) -> row 1 full
    ];
    const spot = findAvailableSpot(TILE_SIZE_UNITS.UNIT_1X1, placed, gridColumns, gridRows);
    expect(spot).toEqual({ x: 1, y: 2 });
  });

  it('should return null if no spot is available', () => {
    const placed: PlacedTile[] = [
      { id: 't1', position: { x: 1, y: 1 }, size: {w: gridColumns, h: gridRows} }, // Fill entire grid
    ];
    const spot = findAvailableSpot(TILE_SIZE_UNITS.UNIT_1X1, placed, gridColumns, gridRows);
    expect(spot).toBeNull();
  });

  it('should return null if tile is larger than grid', () => {
    const spot = findAvailableSpot({ w: gridColumns + 1, h: 1 }, [], gridColumns, gridRows);
    expect(spot).toBeNull();
  });

  it('should place a 2x1 tile correctly after a 1x1 tile', () => {
    const placed: PlacedTile[] = [{ id: 't1', position: {x: 1, y: 1}, size: TILE_SIZE_UNITS.UNIT_1X1 }];
    const spot = findAvailableSpot(TILE_SIZE_UNITS.UNIT_2X1, placed, gridColumns, gridRows);
    expect(spot).toEqual({ x: 2, y: 1 });
  });

  it('should not place a tile if it would exceed column boundaries from a potential spot', () => {
    // Grid 3x3. Tile 2x1. Spot (2,1) is okay. Spot (3,1) is not for 2x1.
    const placed: PlacedTile[] = [{ id: 't1', position: {x:1,y:1}, size: TILE_SIZE_UNITS.UNIT_1X1}];
    const spot = findAvailableSpot(TILE_SIZE_UNITS.UNIT_2X1, placed, 3, 3);
    expect(spot).toEqual({x:2,y:1}); // (2,1) works

    const spot2 = findAvailableSpot(TILE_SIZE_UNITS.UNIT_2X1, [
        {id: 't1', position: {x:1,y:1}, size: TILE_SIZE_UNITS.UNIT_2X1} // block (1,1) and (2,1)
    ], 3, 3);
    // Next try for x would be 3. 3 + 2 - 1 = 4 which is > 3. So (3,1) is invalid.
    // It should then go to y=2, x=1
    expect(spot2).toEqual({x:1,y:2});
  });

   it('should not place a tile if it would exceed row boundaries from a potential spot', () => {
    const placed: PlacedTile[] = [];
    const spot = findAvailableSpot(TILE_SIZE_UNITS.UNIT_1X2, placed, 3, 1); // Tile is 1x2, grid is 3x1
    expect(spot).toBeNull();
  });
});
