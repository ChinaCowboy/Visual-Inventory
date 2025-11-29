import { Inventory, InventoryLocation } from '../types/Inventory';
import { WarehouseData, InventoryItemData } from '../types/InventoryItem';

/**
 * Example utility to convert your existing Inventory and InventoryLocation types
 * to the WarehouseData format used by the 3D visualization
 */
export function convertInventoryToWarehouseData(
  inventory: Inventory,
  locations: InventoryLocation[]
): WarehouseData {
  const warehouseData: WarehouseData = {
    name: inventory.name,
    dimensions: {
      width: 50, // You can calculate this based on max X values in locations
      length: 50, // You can calculate this based on max Z values in locations
      height: 10, // You can calculate this based on max Y values in locations
    },
    items: locations.map((location): InventoryItemData => ({
      id: `LOC-${location.id}`,
      name: location.name || `Location ${location.code}`,
      type: 'container', // All locations are containers (wireframe boxes)
      position: {
        x: location.x,
        y: location.y,
        z: location.z,
      },
      dimensions: {
        width: location.width,
        length: location.length,
        height: location.height,
      },
      count: location.contents || 0,
      weight: location.capacity || 0,
      metadata: {
        locationId: location.id,
        locationName: location.name,
        code: location.code,
        description: location.description,
        status: location.status,
        materialId: location.materialId,
        batch: location.batch?.toString(),
        lotId: location.lotId,
        orderId: location.orderId,
        jobTime: location.jobTime,
      },
    })),
  };

  // Calculate actual dimensions based on location data
  if (locations.length > 0) {
    warehouseData.dimensions.width = Math.max(...locations.map(l => l.x + l.width)) + 5;
    warehouseData.dimensions.length = Math.max(...locations.map(l => l.z + l.length)) + 5;
    warehouseData.dimensions.height = Math.max(...locations.map(l => l.y + l.height)) + 2;
  }

  return warehouseData;
}

/**
 * Example usage:
 * 
 * import { convertInventoryToWarehouseData } from './InventoryConverter';
 * 
 * // Fetch your inventory data from API
 * const inventoryData = await fetch('/api/inventory').then(r => r.json());
 * const locations = await fetch('/api/locations').then(r => r.json());
 * 
 * // Convert to warehouse format
 * const warehouseData = convertInventoryToWarehouseData(inventoryData, locations);
 * 
 * // Use in your React component
 * <InventoryScene warehouseData={warehouseData} />
 */
