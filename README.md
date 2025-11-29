# Visual Inventory System

A 3D warehouse visualization system built with React Three Fiber that displays inventory items in an interactive 3D space with real-time pack positioning and inventory location management.

## Features

- **3D Interactive Visualization**: Real-time 3D rendering of warehouse inventory with Two Inventories:
  - **Inventory 1**: 5 pallet locations with vertically stacked boxes (4 columns per location)
  - **Inventory 2**: 10 pack locations with multi-layer packing (2×5 grid layout)
  
- **Sequential Pack Positioning**: Packs are positioned sequentially by Pack.number field:
  - Fills left-to-right (X direction)
  - Then front-to-back (Z direction)
  - Finally stacks vertically (Y direction)
  - Supports up to 5 pack layers per location

- **Rich Item Visualization**:
  - **Pallets**: Orange stacked boxes with varying heights per location
  - **Packs**: Blue semi-transparent boxes with dark blue borders, up to 424 total packs distributed across 10 locations
  - Dynamic transparency based on hover state

- **Location Labeling**:
  - Inventory location names displayed at top-left corner (e.g., "A1-R01", "B2-C1R1")
  - Pack numbers displayed on each pack (scaled with pack size)
  - Automatically scaled with location/item size

- **Interactive Controls**: 
  - **Rotate**: Left-click and drag
  - **Pan**: Right-click and drag
  - **Zoom**: Mouse scroll
  - **Hover Details**: Hover over items to see information (togglable)

- **UI Controls**:
  - **Toggle Stats**: Show/hide FPS and performance metrics
  - **Toggle Tips**: Show/hide hover tooltips (pack/item details)

- **Color-Coded Visualization**: 
  - Orange boxes for pallets
  - Blue boxes with dark blue borders for packs
  - Wireframe boxes for inventory locations

## Tech Stack

- **React 19.2.0**: UI framework
- **React Three Fiber 9.4.0**: 3D rendering using Three.js in React
- **Three.js 0.181.2**: 3D graphics engine
- **@react-three/drei 10.7.7**: Helper utilities and components
- **TypeScript 5.9.3**: Type-safe development
- **Vite 6.4.1**: Fast build tool and dev server

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Opens the application at `http://localhost:3000`

## Building

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── InventoryScene.tsx      # Main 3D scene setup
│   ├── InventoryBox.tsx        # Item/location rendering with labels
│   ├── GridFloor.tsx           # Floor visualization
│   └── GLBModel.tsx            # 3D model loader
├── data/
│   ├── samplePacks.ts          # Sample Pack data (424 packs total)
│   ├── inventoryItems.ts       # PackItem generation from Pack data
│   ├── inventorySampleData.ts  # Inventory and location definitions
│   └── index.ts                # Central export point
├── types/
│   ├── Inventory.ts            # Inventory/InventoryLocation types
│   ├── pack.ts                 # Pack interface
│   └── InventoryItem.ts        # WarehouseData/InventoryItemData types
├── utils/
│   └── InventoryConverter.ts   # Data conversion utilities
└── App.tsx                      # Main application component
```

## Data Format

### Pack Data Structure

```typescript
interface Pack {
  id: number;
  number: number;              // Sequential position (1-based)
  code?: string;               // Pack code (e.g., "PACK-201-001")
  inventoryId?: number;        // Inventory ID
  inventoryLocationId?: number; // Location ID (201-210)
  SSCC?: string;               // Serial Shipping Container Code
  expire1: Date | null;        // Expiration date
}
```

### Pack Distribution (Current Sample Data)

- Location 201: 48 packs (3 layers)
- Location 202: 32 packs (2 layers)
- Location 203: 56 packs (4 layers)
- Location 204: 24 packs (2 layers)
- Location 205: 40 packs (3 layers)
- Location 206: 64 packs (4 layers)
- Location 207: 28 packs (2 layers)
- Location 208: 52 packs (4 layers)
- Location 209: 36 packs (3 layers)
- Location 210: 44 packs (3 layers)

**Total: 424 packs** distributed across 10 pack locations

## Inventory Locations

### Inventory 1 (Pallet Storage)
- **Location**: 101-105 (5 locations in a single column)
- **Layout**: 1 column × 10 rows (1 location per row)
- **Dimensions**: 1.2m width × 1.0m length × 1.5m height
- **Spacing**: Left-aligned vertical stacks

### Inventory 2 (Pack Storage)
- **Layout**: 2 columns × 5 rows grid
- **Bottom Level**: Locations 201-206 (3 rows × 2 columns) at y=0
- **Top Level**: Locations 207-210 (2 rows × 2 columns) at y=0.8m
- **Dimensions**: 1.2m width × 1.0m length × 0.8m height (each level)
- **No Gap**: Top level directly on bottom level (no space between)

## Key Features

### Sequential Pack Positioning

Packs are positioned based on their `Pack.number` field:

```
Grid Layout (per location):
- 8 packs per row (X direction)
- 2 rows per layer (Z direction)
- 5 layers maximum (Y direction)

Fill Order:
1. Fill row left-to-right (X)
2. Fill columns front-to-back (Z)
3. Stack up (Y) when layer full
```

### Responsive Labels

- **Pack Numbers**: Font size scales to 40% of pack dimension
- **Location Names**: Font size scales to 15% of location dimension
- **Outlines**: Automatically adjust thickness based on item size

## Integration with Real Data

The system is designed for easy integration with real database data:

1. **Current**: Uses `samplePacks.ts` with hardcoded 424 packs
2. **Future**: Replace with database queries:

```typescript
// In samplePacks.ts
export const samplePacks = await fetchPacksFromDatabase();
```

The visualization layer automatically adapts to any Pack data structure matching the interface, making it robust for production deployment.

## Customization

### Changing Pack Counts

Edit `src/data/samplePacks.ts`:

```typescript
const locationPackCounts = [48, 32, 56, 24, 40, 64, 28, 52, 36, 44]; // Modify these numbers
```

### Adjusting Location Dimensions

Edit `src/data/inventorySampleData.ts`:

```typescript
{
  id: 201,
  width: 1.2,    // Change width
  length: 1.0,   // Change length
  height: 0.8,   // Change height
  // ... other properties
}
```

### Modifying Colors

Edit `src/components/InventoryBox.tsx`:

```typescript
const packColor = "#4A90E2";     // Pack color (blue)
const boxColor = "#FF8C42";      // Pallet color (orange)
```

## Visual Reference

- **Pallet Locations**: Bottom border lines only (wireframe floor outline)
- **Pack Locations**: Full wireframe boxes (walls + roof)
- **Actual Items**: Semi-transparent 3D boxes with borders
- **Hover State**: Items become more opaque and white borders appear

### Modifying Sample Data

Edit `src/data/sampleInventory.json` to add, remove, or modify inventory items.

## Project Structure

```
Visual-Inventory/
├── src/
│   ├── components/
│   │   ├── InventoryBox.tsx      # 3D box component for items
│   │   ├── GLBModel.tsx          # GLB model loader component
│   │   ├── GridFloor.tsx         # Warehouse floor with grid
│   │   └── InventoryScene.tsx    # Main 3D scene
│   ├── types/
│   │   └── InventoryItem.ts      # TypeScript interfaces
│   ├── data/
│   │   └── sampleInventory.json  # Sample inventory data
│   ├── App.tsx                   # Main application component
│   ├── App.css                   # Styles
│   └── index.tsx                 # Entry point
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## License

MIT 