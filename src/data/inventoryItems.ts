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

// Pallets for Inventory 1 locations (2x2x1 grid on each location)
// Location dimensions: 1.2m wide × 1.0m length × 2.0m height
// Pallet dimensions: 0.45m × 0.38m × 0.35m each
const palletWidth = 0.45;
const palletLength = 0.38;
const palletHeight = 0.35;
const palletColor = "#50C878"; // Green color for pallets

export const inventory1Pallets: InventoryItemData[] = [
  // Bottom level pallets (on locations A1-R01 to A1-R05) - Single level
  ...createItemGrid("PALLET-101", "Pallet", "pallet", 0.6, 0, 0.5, 1.2, 1.0, 2, 2, palletWidth, palletLength, palletHeight, palletColor, 101, 1001),
  ...createItemGrid("PALLET-102", "Pallet", "pallet", 0.6, 0, 1.5, 1.2, 1.0, 2, 2, palletWidth, palletLength, palletHeight, palletColor, 102, 1002),
  ...createItemGrid("PALLET-103", "Pallet", "pallet", 0.6, 0, 2.5, 1.2, 1.0, 2, 2, palletWidth, palletLength, palletHeight, palletColor, 103, 1003),
  ...createItemGrid("PALLET-104", "Pallet", "pallet", 0.6, 0, 3.5, 1.2, 1.0, 2, 2, palletWidth, palletLength, palletHeight, palletColor, 104, 1004),
  ...createItemGrid("PALLET-105", "Pallet", "pallet", 0.6, 0, 4.5, 1.2, 1.0, 2, 2, palletWidth, palletLength, palletHeight, palletColor, 105, 1005),
  // Top level pallets (on locations A1-R06 to A1-R10) - Single level
  ...createItemGrid("PALLET-106", "Pallet", "pallet", 0.6, 2, 0.5, 1.2, 1.0, 2, 2, palletWidth, palletLength, palletHeight, palletColor, 106, 1006),
  ...createItemGrid("PALLET-107", "Pallet", "pallet", 0.6, 2, 1.5, 1.2, 1.0, 2, 2, palletWidth, palletLength, palletHeight, palletColor, 107, 1007),
  ...createItemGrid("PALLET-108", "Pallet", "pallet", 0.6, 2, 2.5, 1.2, 1.0, 2, 2, palletWidth, palletLength, palletHeight, palletColor, 108, 1008),
  ...createItemGrid("PALLET-109", "Pallet", "pallet", 0.6, 2, 3.5, 1.2, 1.0, 2, 2, palletWidth, palletLength, palletHeight, palletColor, 109, 1009),
  ...createItemGrid("PALLET-110", "Pallet", "pallet", 0.6, 2, 4.5, 1.2, 1.0, 2, 2, palletWidth, palletLength, palletHeight, palletColor, 110, 1010)
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
