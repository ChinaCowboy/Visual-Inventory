import { WarehouseData, InventoryItemData } from '../types/InventoryItem';

/**
 * Utility class for loading and managing inventory data
 */
export class InventoryDataLoader {
  /**
   * Load inventory data from a JSON file
   */
  static async loadFromFile(filePath: string): Promise<WarehouseData> {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load inventory data from ${filePath}`);
    }
    return response.json();
  }

  /**
   * Load inventory data from an API endpoint
   */
  static async loadFromAPI(apiUrl: string): Promise<WarehouseData> {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to load inventory data from API: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Convert legacy inventory format to the new format
   */
  static convertLegacyFormat(legacyData: any): WarehouseData {
    const warehouseData: WarehouseData = {
      name: legacyData.name || 'Warehouse',
      dimensions: {
        width: legacyData.dimensions?.width || 50,
        length: legacyData.dimensions?.length || 50,
        height: legacyData.dimensions?.height || 10,
      },
      items: [],
    };

    // Convert locations to items
    if (legacyData.locations && Array.isArray(legacyData.locations)) {
      warehouseData.items = legacyData.locations.map((location: any, index: number): InventoryItemData => ({
        id: location.id?.toString() || `ITEM-${index + 1}`,
        name: location.name || `Item ${index + 1}`,
        type: this.inferItemType(location),
        position: {
          x: location.x || 0,
          y: location.y || 0,
          z: location.z || 0,
        },
        dimensions: {
          width: location.width || 1,
          length: location.length || 1,
          height: location.height || 1,
        },
        count: location.contents || 1,
        weight: location.capacity || 0,
        metadata: {
          code: location.code,
          status: location.status,
          materialId: location.materialId,
          batch: location.batch,
        },
      }));
    }

    return warehouseData;
  }

  /**
   * Infer item type from legacy location data
   */
  private static inferItemType(location: any): 'pack' | 'pallet' | 'product' | 'container' {
    const capacity = location.capacity || 0;
    const height = location.height || 1;

    if (capacity > 1000 || height > 2) {
      return 'pallet';
    } else if (capacity > 500) {
      return 'container';
    } else if (capacity > 100) {
      return 'pack';
    }
    return 'product';
  }

  /**
   * Filter items by type
   */
  static filterByType(
    warehouseData: WarehouseData,
    types: Array<'pack' | 'pallet' | 'product' | 'container'>
  ): WarehouseData {
    return {
      ...warehouseData,
      items: warehouseData.items.filter(item => types.includes(item.type)),
    };
  }

  /**
   * Filter items by weight range
   */
  static filterByWeight(
    warehouseData: WarehouseData,
    minWeight: number,
    maxWeight: number
  ): WarehouseData {
    return {
      ...warehouseData,
      items: warehouseData.items.filter(
        item => item.weight >= minWeight && item.weight <= maxWeight
      ),
    };
  }

  /**
   * Get statistics about the warehouse
   */
  static getStatistics(warehouseData: WarehouseData) {
    const items = warehouseData.items;
    
    return {
      totalItems: items.length,
      totalWeight: items.reduce((sum, item) => sum + item.weight, 0),
      totalCount: items.reduce((sum, item) => sum + item.count, 0),
      itemsByType: {
        pallet: items.filter(i => i.type === 'pallet').length,
        pack: items.filter(i => i.type === 'pack').length,
        product: items.filter(i => i.type === 'product').length,
        container: items.filter(i => i.type === 'container').length,
      },
      averageWeight: items.length > 0 
        ? items.reduce((sum, item) => sum + item.weight, 0) / items.length 
        : 0,
    };
  }
}
