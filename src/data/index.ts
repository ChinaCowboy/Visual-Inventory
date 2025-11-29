// Central export point for all data
// This file makes it easy to integrate real data from database in the future

// Pack data (represents database records)
export { samplePacks, getPacksByLocation, getPackById } from './samplePacks';

// PackItem data (3D visualization items generated from Pack data)
export { inventory1Pallets, inventory2Packs, allInventoryItems } from './inventoryItems';

// Inventory and location structure
export { inventory1, inventory2, inventory1Locations, inventory2Locations } from './inventorySampleData';
