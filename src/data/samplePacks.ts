import { Pack } from '../types/pack';

// Pack counts for each location (distributed unevenly with some locations having piles)
// Locations with more packs will pile vertically (multiple layers)
const locationPackCounts = [48, 32, 56, 24, 40, 64, 28, 52, 36, 44]; // Total: 424

// Sample Pack data - this represents the Pack records from database
// Each pack has a sequential number that determines its position in the inventory location
export const samplePacks: Pack[] = [
  // Location 201 - 25 packs
  ...Array.from({ length: locationPackCounts[0] }, (_, i) => ({
    id: 20100 + i + 1,
    number: i + 1,
    code: `PACK-201-${String(i + 1).padStart(3, '0')}`,
    inventoryId: 2,
    inventoryLocationId: 201,
    SSCC: `00${(20100 + i + 1).toString().padStart(16, '0')}`,
    expire1: new Date(2025, 11, 31)
  })),
  
  // Location 202 - 18 packs
  ...Array.from({ length: locationPackCounts[1] }, (_, i) => ({
    id: 20200 + i + 1,
    number: i + 1,
    code: `PACK-202-${String(i + 1).padStart(3, '0')}`,
    inventoryId: 2,
    inventoryLocationId: 202,
    SSCC: `00${(20200 + i + 1).toString().padStart(16, '0')}`,
    expire1: new Date(2025, 11, 31)
  })),
  
  // Location 203 - 22 packs
  ...Array.from({ length: locationPackCounts[2] }, (_, i) => ({
    id: 20300 + i + 1,
    number: i + 1,
    code: `PACK-203-${String(i + 1).padStart(3, '0')}`,
    inventoryId: 2,
    inventoryLocationId: 203,
    SSCC: `00${(20300 + i + 1).toString().padStart(16, '0')}`,
    expire1: new Date(2026, 0, 31)
  })),
  
  // Location 204 - 15 packs
  ...Array.from({ length: locationPackCounts[3] }, (_, i) => ({
    id: 20400 + i + 1,
    number: i + 1,
    code: `PACK-204-${String(i + 1).padStart(3, '0')}`,
    inventoryId: 2,
    inventoryLocationId: 204,
    SSCC: `00${(20400 + i + 1).toString().padStart(16, '0')}`,
    expire1: new Date(2026, 0, 31)
  })),
  
  // Location 205 - 20 packs
  ...Array.from({ length: locationPackCounts[4] }, (_, i) => ({
    id: 20500 + i + 1,
    number: i + 1,
    code: `PACK-205-${String(i + 1).padStart(3, '0')}`,
    inventoryId: 2,
    inventoryLocationId: 205,
    SSCC: `00${(20500 + i + 1).toString().padStart(16, '0')}`,
    expire1: new Date(2026, 1, 28)
  })),
  
  // Location 206 - 24 packs
  ...Array.from({ length: locationPackCounts[5] }, (_, i) => ({
    id: 20600 + i + 1,
    number: i + 1,
    code: `PACK-206-${String(i + 1).padStart(3, '0')}`,
    inventoryId: 2,
    inventoryLocationId: 206,
    SSCC: `00${(20600 + i + 1).toString().padStart(16, '0')}`,
    expire1: new Date(2026, 1, 28)
  })),
  
  // Location 207 - 19 packs
  ...Array.from({ length: locationPackCounts[6] }, (_, i) => ({
    id: 20700 + i + 1,
    number: i + 1,
    code: `PACK-207-${String(i + 1).padStart(3, '0')}`,
    inventoryId: 2,
    inventoryLocationId: 207,
    SSCC: `00${(20700 + i + 1).toString().padStart(16, '0')}`,
    expire1: new Date(2026, 2, 31)
  })),
  
  // Location 208 - 16 packs
  ...Array.from({ length: locationPackCounts[7] }, (_, i) => ({
    id: 20800 + i + 1,
    number: i + 1,
    code: `PACK-208-${String(i + 1).padStart(3, '0')}`,
    inventoryId: 2,
    inventoryLocationId: 208,
    SSCC: `00${(20800 + i + 1).toString().padStart(16, '0')}`,
    expire1: new Date(2026, 2, 31)
  })),
  
  // Location 209 - 23 packs
  ...Array.from({ length: locationPackCounts[8] }, (_, i) => ({
    id: 20900 + i + 1,
    number: i + 1,
    code: `PACK-209-${String(i + 1).padStart(3, '0')}`,
    inventoryId: 2,
    inventoryLocationId: 209,
    SSCC: `00${(20900 + i + 1).toString().padStart(16, '0')}`,
    expire1: new Date(2026, 3, 30)
  })),
  
  // Location 210 - 18 packs
  ...Array.from({ length: locationPackCounts[9] }, (_, i) => ({
    id: 21000 + i + 1,
    number: i + 1,
    code: `PACK-210-${String(i + 1).padStart(3, '0')}`,
    inventoryId: 2,
    inventoryLocationId: 210,
    SSCC: `00${(21000 + i + 1).toString().padStart(16, '0')}`,
    expire1: new Date(2026, 3, 30)
  }))
];

// Helper function to get packs by location
export const getPacksByLocation = (locationId: number): Pack[] => {
  return samplePacks.filter(pack => pack.inventoryLocationId === locationId);
};

// Helper function to get pack by ID
export const getPackById = (id: number): Pack | undefined => {
  return samplePacks.find(pack => pack.id === id);
};
