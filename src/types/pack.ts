export interface Pack {
  id: number;
  number: number;
  code?: string;
  inventoryId?: number;
  inventoryLocationId?: number;
  SSCC?: string;
  expire1 : Date | null;
}