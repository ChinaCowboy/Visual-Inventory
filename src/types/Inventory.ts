export interface Inventory {
  id: number;
  guid: string;
  name: string;
  code?: string;
  processUnitId: number;
  allowPartial: boolean;

  stockTakeId?: number;
  locationAssemblyId?: number;
  locationClassName?: string;
  reserveAssemblyId?: number;
  reserveClassName?: string;
  autoSnapshot: boolean;
  sortMaterial: boolean;
  sortPO: boolean;
  sortBatch: boolean;
  sortLot: boolean;
  sortProductionLot: boolean;
  sortResourceArea: boolean;
  sortProductionDay: boolean;
  trackSupplier: boolean;
  trackPO: boolean;
  trackBatch: boolean;
  trackLot: boolean;
  trackPlot: boolean;
  trackRmArea: boolean;
  trackPrDay: boolean;
  trackOrder: boolean;
  trackPOrder: boolean;
  // Navigation properties (exclude when creating/updating)
  processUnit?: any; // PrunitDto - virtual navigation property

  locations?: InventoryLocation[]; // ICollection<InventoryLocationDto> - virtual navigation property
}


export interface InventoryLocation {
  id: number;
  name: string;
  description?: string;
  inventoryId: number;
  code?: string;
  x: number;
  y: number;
  z: number;
  width: number;
  length: number;
  height: number;
  useSequence: number;
  capacity?: number;
  um: number; // UmProduct enum
  confirmEmpty: boolean;
  contents?: number;
  status: number; // LocationStatus enum
  inBlock: number; // BlockType enum
  outBlock: number; // BlockType enum
  materialId?: number;
  poId?: number;
  batch?: number;
  lotId?: number;
  plotId?: number;
  productionDay?: string;
  destinationId?: number;
  orderId?: number;
  orderLineId?: number;
  stockTakeId?: number;
  templateId?: number;
  jobTime?: string;
}