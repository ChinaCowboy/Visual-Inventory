import { InventoryItemData } from '../types/InventoryItem';

// Helper function to create a grid of items on a location
const createItemGrid = (
  baseId: string,
  baseName: string,
  type: 'pallet' | 'pack',
  locationX: number,
  locationY: number,
  locationZ: number,
  locationWidth: number,
  locationLength: number,
  gridCols: number,
  gridRows: number,
  itemWidth: number,
  itemLength: number,
  itemHeight: number,
  color: string,
  locationId: number,
  materialId: number
): InventoryItemData[] => {
  const items: InventoryItemData[] = [];
  const spacing = 0.02; // Small gap between items
  
  // Calculate starting positions (centered on location)
  const totalGridWidth = gridCols * itemWidth + (gridCols - 1) * spacing;
  const totalGridLength = gridRows * itemLength + (gridRows - 1) * spacing;
  const startX = locationX - totalGridWidth / 2 + itemWidth / 2;
  const startZ = locationZ - totalGridLength / 2 + itemLength / 2;
  
  let itemIndex = 0;
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      const x = startX + col * (itemWidth + spacing);
      const z = startZ + row * (itemLength + spacing);
      const y = locationY + 0.01; // Just above the location floor
      
      items.push({
        id: `${baseId}-${itemIndex + 1}`,
        name: `${baseName} ${itemIndex + 1}`,
        type: type,
        position: { x, y, z },
        dimensions: { width: itemWidth, length: itemLength, height: itemHeight },
        count: Math.floor(Math.random() * 20) + 10,
        weight: type === 'pallet' ? Math.floor(Math.random() * 100) + 50 : Math.floor(Math.random() * 30) + 10,
        color: color,
        metadata: { locationId, materialId }
      });
      
      itemIndex++;
    }
  }
  
  return items;
};

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
  locationId: number,
  materialId: number,
  stackHeights: number[] // Array of heights for each column
): InventoryItemData[] => {
  const items: InventoryItemData[] = [];
  const cols = stackHeights.length;
  const spacing = 0.02;
  const totalWidth = cols * boxWidth + (cols - 1) * spacing;
  const startX = locationX - totalWidth / 2 + boxWidth / 2;
  
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
  // Bottom level locations - varying stack heights (like screenshot)
  ...createVerticalStacks("PALLET-101", 0.6, 0, 0.5, 101, 1001, [6, 8, 10, 7]), // 4 columns with different heights
  ...createVerticalStacks("PALLET-102", 0.6, 0, 1.5, 102, 1002, [9, 7, 11, 8]),
  ...createVerticalStacks("PALLET-103", 0.6, 0, 2.5, 103, 1003, [5, 10, 6, 9]),
  ...createVerticalStacks("PALLET-104", 0.6, 0, 3.5, 104, 1004, [8, 6, 9, 11]),
  ...createVerticalStacks("PALLET-105", 0.6, 0, 4.5, 105, 1005, [7, 9, 8, 10]),
  // Top level locations - varying stack heights
  ...createVerticalStacks("PALLET-106", 0.6, 2, 0.5, 106, 1006, [6, 10, 7, 9]),
  ...createVerticalStacks("PALLET-107", 0.6, 2, 1.5, 107, 1007, [8, 7, 11, 6]),
  ...createVerticalStacks("PALLET-108", 0.6, 2, 2.5, 108, 1008, [9, 8, 6, 10]),
  ...createVerticalStacks("PALLET-109", 0.6, 2, 3.5, 109, 1009, [7, 11, 9, 8]),
  ...createVerticalStacks("PALLET-110", 0.6, 2, 4.5, 110, 1010, [10, 6, 8, 9])
];

// Packs for Inventory 2 locations (4x4 grid on each location)
// Location dimensions: 1.2m wide × 1.0m length × 2.0m height
// Pack dimensions: 0.14m × 0.11m × 0.15m each
const packWidth = 0.14;
const packLength = 0.11;
const packHeight = 0.15;
const packColor = "#4A90E2";

export const inventory2Packs: InventoryItemData[] = [
  // Bottom level packs - Column 1 (locations 201, 203, 205) - 3 levels stacked
  // Level 1
  ...createItemGrid("PACK-201-L1", "Pack", "pack", 6.6, 0, 0.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 201, 2001),
  ...createItemGrid("PACK-203-L1", "Pack", "pack", 6.6, 0, 1.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 203, 2003),
  ...createItemGrid("PACK-205-L1", "Pack", "pack", 6.6, 0, 2.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 205, 2005),
  // Level 2
  ...createItemGrid("PACK-201-L2", "Pack", "pack", 6.6, 0 + packHeight, 0.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 201, 2001),
  ...createItemGrid("PACK-203-L2", "Pack", "pack", 6.6, 0 + packHeight, 1.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 203, 2003),
  ...createItemGrid("PACK-205-L2", "Pack", "pack", 6.6, 0 + packHeight, 2.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 205, 2005),
  // Level 3
  ...createItemGrid("PACK-201-L3", "Pack", "pack", 6.6, 0 + packHeight * 2, 0.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 201, 2001),
  ...createItemGrid("PACK-203-L3", "Pack", "pack", 6.6, 0 + packHeight * 2, 1.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 203, 2003),
  ...createItemGrid("PACK-205-L3", "Pack", "pack", 6.6, 0 + packHeight * 2, 2.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 205, 2005),
  
  // Bottom level packs - Column 2 (locations 202, 204, 206) - 3 levels stacked
  // Level 1
  ...createItemGrid("PACK-202-L1", "Pack", "pack", 7.8, 0, 0.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 202, 2002),
  ...createItemGrid("PACK-204-L1", "Pack", "pack", 7.8, 0, 1.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 204, 2004),
  ...createItemGrid("PACK-206-L1", "Pack", "pack", 7.8, 0, 2.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 206, 2006),
  // Level 2
  ...createItemGrid("PACK-202-L2", "Pack", "pack", 7.8, 0 + packHeight, 0.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 202, 2002),
  ...createItemGrid("PACK-204-L2", "Pack", "pack", 7.8, 0 + packHeight, 1.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 204, 2004),
  ...createItemGrid("PACK-206-L2", "Pack", "pack", 7.8, 0 + packHeight, 2.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 206, 2006),
  // Level 3
  ...createItemGrid("PACK-202-L3", "Pack", "pack", 7.8, 0 + packHeight * 2, 0.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 202, 2002),
  ...createItemGrid("PACK-204-L3", "Pack", "pack", 7.8, 0 + packHeight * 2, 1.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 204, 2004),
  ...createItemGrid("PACK-206-L3", "Pack", "pack", 7.8, 0 + packHeight * 2, 2.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 206, 2006),
  
  // Top level packs - Column 1 (locations 207, 209) - 3 levels stacked
  // Level 1
  ...createItemGrid("PACK-207-L1", "Pack", "pack", 6.6, 2, 0.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 207, 2007),
  ...createItemGrid("PACK-209-L1", "Pack", "pack", 6.6, 2, 1.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 209, 2009),
  // Level 2
  ...createItemGrid("PACK-207-L2", "Pack", "pack", 6.6, 2 + packHeight, 0.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 207, 2007),
  ...createItemGrid("PACK-209-L2", "Pack", "pack", 6.6, 2 + packHeight, 1.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 209, 2009),
  // Level 3
  ...createItemGrid("PACK-207-L3", "Pack", "pack", 6.6, 2 + packHeight * 2, 0.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 207, 2007),
  ...createItemGrid("PACK-209-L3", "Pack", "pack", 6.6, 2 + packHeight * 2, 1.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 209, 2009),
  
  // Top level packs - Column 2 (locations 208, 210) - 3 levels stacked
  // Level 1
  ...createItemGrid("PACK-208-L1", "Pack", "pack", 7.8, 2, 0.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 208, 2008),
  ...createItemGrid("PACK-210-L1", "Pack", "pack", 7.8, 2, 1.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 210, 2010),
  // Level 2
  ...createItemGrid("PACK-208-L2", "Pack", "pack", 7.8, 2 + packHeight, 0.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 208, 2008),
  ...createItemGrid("PACK-210-L2", "Pack", "pack", 7.8, 2 + packHeight, 1.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 210, 2010),
  // Level 3
  ...createItemGrid("PACK-208-L3", "Pack", "pack", 7.8, 2 + packHeight * 2, 0.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 208, 2008),
  ...createItemGrid("PACK-210-L3", "Pack", "pack", 7.8, 2 + packHeight * 2, 1.5, 1.2, 1.0, 4, 4, packWidth, packLength, packHeight, packColor, 210, 2010)
];

// Export combined items
export const allInventoryItems = [...inventory1Pallets, ...inventory2Packs];
