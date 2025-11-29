import { InventoryItemData } from '../types/InventoryItem';
import { getPacksByLocation } from './samplePacks';

// Pallets for Inventory 1 locations - Stacked vertically like screenshot
// Location dimensions: 1.2m wide × 1.0m length × 2.0m height
// Box dimensions: 0.25m × 0.2m × 0.15m each (small boxes stacked high)
const boxWidth = 0.25;
const boxLength = 0.2;
const boxHeight = 0.15;
const boxColor = "#FF8C42"; // Orange color like screenshot

// Helper to create vertical stacks with varying heights
const createVerticalStacks = (
  baseId: string,
  locationX: number,
  locationY: number,
  locationZ: number,
  locationWidth: number,
  locationId: number,
  materialId: number,
  stackHeights: number[] // Array of heights for each column
): InventoryItemData[] => {
  const items: InventoryItemData[] = [];
  const spacing = 0.02;
  // Align to left border of location
  const startX = locationX - locationWidth / 2 + boxWidth / 2;
  
  stackHeights.forEach((height, col) => {
    const x = startX + col * (boxWidth + spacing);
    const z = locationZ;
    
    for (let level = 0; level < height; level++) {
      const y = locationY + level * boxHeight;
      items.push({
        id: `${baseId}-C${col + 1}-L${level + 1}`,
        name: `Box ${col + 1}-${level + 1}`,
        type: 'pallet',
        position: { x, y, z },
        dimensions: { width: boxWidth, length: boxLength, height: boxHeight },
        count: Math.floor(Math.random() * 20) + 10,
        weight: Math.floor(Math.random() * 50) + 20,
        color: boxColor,
        metadata: { locationId, materialId }
      });
    }
  });
  
  return items;
};

export const inventory1Pallets: InventoryItemData[] = [
  // Single level locations - varying stack heights (like screenshot) - aligned to left
  ...createVerticalStacks("PALLET-101", 0.6, 0, 0.5, 1.2, 101, 1001, [5, 7, 8, 6]), // 4 columns with different heights
  ...createVerticalStacks("PALLET-102", 0.6, 0, 1.5, 1.2, 102, 1002, [7, 6, 9, 7]),
  ...createVerticalStacks("PALLET-103", 0.6, 0, 2.5, 1.2, 103, 1003, [4, 8, 5, 7]),
  ...createVerticalStacks("PALLET-104", 0.6, 0, 3.5, 1.2, 104, 1004, [6, 5, 7, 9]),
  ...createVerticalStacks("PALLET-105", 0.6, 0, 4.5, 1.2, 105, 1005, [5, 7, 6, 8])
];

// Packs for Inventory 2 locations (positioned sequentially by Pack.number)
// Location dimensions: 1.2m wide × 1.0m length × 1.2m height
// Pack dimensions: 0.14m × 0.11m × 0.15m each
const packWidth = 0.14;
const packLength = 0.11;
const packHeight = 0.15;
const packColor = "#4A90E2";

// Location position data - maps locationId to physical position
const locationPositions: Record<number, { x: number; y: number; z: number; width: number; length: number }> = {
  201: { x: 6.6, y: 0, z: 0.5, width: 1.2, length: 1.0 },
  202: { x: 7.8, y: 0, z: 0.5, width: 1.2, length: 1.0 },
  203: { x: 6.6, y: 0, z: 1.5, width: 1.2, length: 1.0 },
  204: { x: 7.8, y: 0, z: 1.5, width: 1.2, length: 1.0 },
  205: { x: 6.6, y: 0, z: 2.5, width: 1.2, length: 1.0 },
  206: { x: 7.8, y: 0, z: 2.5, width: 1.2, length: 1.0 },
  207: { x: 6.6, y: 0.8, z: 0.5, width: 1.2, length: 1.0 },
  208: { x: 7.8, y: 0.8, z: 0.5, width: 1.2, length: 1.0 },
  209: { x: 6.6, y: 0.8, z: 1.5, width: 1.2, length: 1.0 },
  210: { x: 7.8, y: 0.8, z: 1.5, width: 1.2, length: 1.0 }
};

// Helper to create PackItems from Pack data, positioned by Pack.number
const createPackItemsFromPacks = (locationId: number): InventoryItemData[] => {
  const packs = getPacksByLocation(locationId);
  const position = locationPositions[locationId];
  
  if (!position || packs.length === 0) {
    return [];
  }
  
  const items: InventoryItemData[] = [];
  const spacing = 0.02;
  
  // Calculate how many packs fit per row and column
  const packsPerRow = Math.floor(position.width / (packWidth + spacing));
  const packsPerCol = Math.floor(position.length / (packLength + spacing));
  const packsPerLevel = packsPerRow * packsPerCol;
  
  // Start from left-front corner of location
  const startX = position.x - position.width / 2 + packWidth / 2;
  const startZ = position.z - position.length / 2 + packLength / 2;
  
  // Sort packs by number to ensure correct sequential positioning
  const sortedPacks = [...packs].sort((a, b) => a.number - b.number);
  
  sortedPacks.forEach((pack) => {
    const index = pack.number - 1;
    const level = Math.floor(index / packsPerLevel);
    const posInLevel = index % packsPerLevel;
    const row = Math.floor(posInLevel / packsPerRow);
    const col = posInLevel % packsPerRow;
    
    const x = startX + col * (packWidth + spacing);
    const z = startZ + row * (packLength + spacing);
    const y = position.y + level * packHeight;
    
    items.push({
      id: `PACK-ITEM-${pack.id}`,
      name: pack.code || `Pack ${pack.number}`,
      type: 'pack',
      position: { x, y, z },
      dimensions: { width: packWidth, length: packLength, height: packHeight },
      count: 1,
      weight: Math.floor(Math.random() * 30) + 10,
      color: packColor,
      metadata: { 
        locationId,
        materialId: 2000 + locationId,
        packId: pack.id,
        packNumber: pack.number,
        packCode: pack.code,
        SSCC: pack.SSCC,
        expire1: pack.expire1
      }
    });
  });
  
  return items;
};

// Generate inventory2Packs from actual Pack data
export const inventory2Packs: InventoryItemData[] = [
  ...createPackItemsFromPacks(201),
  ...createPackItemsFromPacks(202),
  ...createPackItemsFromPacks(203),
  ...createPackItemsFromPacks(204),
  ...createPackItemsFromPacks(205),
  ...createPackItemsFromPacks(206),
  ...createPackItemsFromPacks(207),
  ...createPackItemsFromPacks(208),
  ...createPackItemsFromPacks(209),
  ...createPackItemsFromPacks(210)
];

// Export combined items
export const allInventoryItems = [...inventory1Pallets, ...inventory2Packs];
