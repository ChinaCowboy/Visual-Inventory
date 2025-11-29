export interface Pallet {
  id: number;
  number: number;
  inventoryId?: number;
  inventoryLocationId?: number;
  SSCC?: string;
  units?: number;
}