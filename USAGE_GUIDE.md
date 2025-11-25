# Visual Inventory System - Usage Guide

## Getting Started

The application is now running at http://localhost:3000

## How to Use

### Basic Navigation

1. **Rotate View**: Left-click and drag anywhere in the 3D view
2. **Pan View**: Right-click and drag
3. **Zoom**: Use your mouse scroll wheel

### Viewing Item Details

- **Hover** over any 3D box to see:
  - Item name
  - Item type (pallet, pack, product, container)
  - Unit count
  - Weight

### Showing Performance Stats

Click the "Show Stats" button in the top-right to display:
- FPS (Frames Per Second)
- Memory usage
- Render time

## Customizing Your Inventory Data

### Option 1: Edit Sample Data

Edit `src/data/sampleInventory.json` with your own inventory items:

```json
{
  "id": "YOUR-001",
  "name": "Your Item Name",
  "type": "pallet",
  "position": { "x": 10, "y": 0, "z": 10 },
  "dimensions": { "width": 1.2, "length": 1.0, "height": 1.5 },
  "count": 50,
  "weight": 800,
  "color": "#FF6B6B"
}
```

### Option 2: Load from API

Modify `src/App.tsx` to load data from your API:

```typescript
import { InventoryDataLoader } from './utils/InventoryDataLoader';

// Inside your component
useEffect(() => {
  InventoryDataLoader.loadFromAPI('https://your-api.com/inventory')
    .then(data => setWarehouseData(data))
    .catch(error => console.error('Failed to load inventory:', error));
}, []);
```

### Option 3: Convert Existing Data

If you have existing inventory data in the format defined in `Inventory.ts`:

```typescript
import { convertInventoryToWarehouseData } from './utils/InventoryConverter';

// Your existing data
const inventory = { /* your Inventory object */ };
const locations = [ /* your InventoryLocation array */ ];

// Convert to warehouse format
const warehouseData = convertInventoryToWarehouseData(inventory, locations);
```

## Item Types and Colors

| Type      | Default Color | Typical Use                    |
|-----------|---------------|--------------------------------|
| Pallet    | Brown         | Large shipments, bulk storage  |
| Pack      | Blue          | Medium packages                |
| Product   | Green         | Individual items               |
| Container | Orange        | Shipping containers, large bins|

## Using Custom 3D Models

### Step 1: Add GLB Files

Place your `.glb` files in the `public/models/` directory:

```
public/
  └── models/
      ├── pallet.glb
      ├── box.glb
      └── container.glb
```

### Step 2: Reference in Data

Add the `modelUrl` property to your items:

```json
{
  "id": "CUSTOM-001",
  "name": "Custom Pallet",
  "type": "pallet",
  "modelUrl": "/models/pallet.glb",
  "position": { "x": 5, "y": 0, "z": 5 },
  "dimensions": { "width": 1.2, "length": 1.0, "height": 1.5 },
  "count": 48,
  "weight": 850
}
```

## Data Format Reference

### Complete Item Format

```typescript
{
  id: string;              // Unique identifier
  name: string;            // Display name
  type: 'pack' | 'pallet' | 'product' | 'container';
  position: {
    x: number;             // X coordinate (meters)
    y: number;             // Y coordinate (meters)
    z: number;             // Z coordinate (meters)
  };
  dimensions: {
    width: number;         // Width in meters
    length: number;        // Length in meters
    height: number;        // Height in meters
  };
  count: number;           // Number of units
  weight: number;          // Total weight in kg
  color?: string;          // Optional hex color (e.g., "#FF0000")
  modelUrl?: string;       // Optional path to .glb model
  metadata?: {             // Optional additional data
    sku?: string;
    batch?: string;
    expiryDate?: string;
    [key: string]: any;
  };
}
```

## Tips and Best Practices

### Performance

- **Large Warehouses**: For warehouses with 1000+ items, consider:
  - Implementing pagination or filtering
  - Using instanced meshes for identical items
  - Reducing shadow quality in the scene

### Positioning

- **Coordinates**: The system uses meters as the unit
  - X axis: Left/Right (red arrow)
  - Y axis: Up/Down (green arrow)
  - Z axis: Forward/Back (blue arrow)
- **Origin**: (0, 0, 0) is at the center of the floor

### Colors

- Use hex colors: `"#FF6B6B"`
- Or named colors: `"red"`, `"blue"`, etc.
- Leave blank to use default type-based colors

## Common Issues

### Items Not Appearing

1. Check console for errors
2. Verify position coordinates are within warehouse bounds
3. Ensure dimensions are positive numbers
4. Check that Y position is 0 or above

### GLB Models Not Loading

1. Verify the file path is correct (relative to `public/`)
2. Check browser console for 404 errors
3. Ensure the GLB file is valid
4. Try opening the model URL directly in browser

### Performance Issues

1. Enable stats to monitor FPS
2. Reduce number of items displayed
3. Disable shadows in `InventoryScene` component
4. Use simpler GLB models or stick with boxes

## Advanced Customization

### Modify Scene Lighting

Edit `src/components/InventoryScene.tsx`:

```typescript
<ambientLight intensity={0.6} />  // Increase for brighter scene
<directionalLight intensity={1.5} />  // Adjust main light
```

### Change Camera Position

```typescript
<PerspectiveCamera 
  makeDefault 
  position={[30, 20, 30]}  // Adjust X, Y, Z
  fov={75}                 // Field of view
/>
```

### Modify Floor Grid

Edit `src/components/GridFloor.tsx` to change grid size, colors, or add markers.

## Building for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory ready for deployment.

## Need Help?

- Check the README.md for project overview
- Review TypeScript types in `src/types/InventoryItem.ts`
- Examine sample data in `src/data/sampleInventory.json`
- React Three Fiber docs: https://r3f.docs.pmnd.rs
