export type ItemType = 'pack' | 'pallet' | 'product' | 'container';

export interface InventoryItemData {
  id: string;
  name: string;
  type: ItemType;
  position: {
    x: number;
    y: number;
    z: number;
  };
  dimensions: {
    width: number;
    length: number;
    height: number;
  };
  count: number;
  weight: number;
  color?: string;
  modelUrl?: string; // Optional .glb model URL
  metadata?: {
    sku?: string;
    batch?: string;
    expiryDate?: string;
    [key: string]: any;
  };
}

export interface WarehouseData {
  name: string;
  dimensions: {
    width: number;
    length: number;
    height: number;
  };
  items: InventoryItemData[];
}
