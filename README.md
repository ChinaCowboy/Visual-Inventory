# Visual Inventory System

A 3D warehouse visualization system built with React Three Fiber that displays inventory items in an interactive 3D space.

## Features

- **3D Visualization**: Interactive 3D rendering of warehouse inventory using React Three Fiber
- **Multiple Item Types**: Support for pallets, packs, products, and containers
- **JSON Data Format**: Flexible JSON-based inventory data with position (X, Y, Z), dimensions (Width, Length, Height), count, and weight
- **GLB Model Support**: Optional support for .glb 3D models for more realistic visualization
- **Interactive Controls**: 
  - Rotate: Left-click and drag
  - Pan: Right-click and drag
  - Zoom: Mouse scroll
- **Hover Details**: Hover over items to see detailed information
- **Color-Coded Items**: Different colors for different item types
- **Real-time Stats**: Toggle FPS and performance statistics

## Tech Stack

- **React Three Fiber**: 3D rendering using Three.js in React
- **@react-three/drei**: Useful helpers for R3F
- **Three.js**: 3D graphics library
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server

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

## Data Format

The inventory data is stored in JSON format with the following structure:

```json
{
  "name": "Warehouse Name",
  "dimensions": {
    "width": 50,
    "length": 50,
    "height": 10
  },
  "items": [
    {
      "id": "PAL-001",
      "name": "Item Name",
      "type": "pallet",
      "position": { "x": 5, "y": 0, "z": 5 },
      "dimensions": { "width": 1.2, "length": 1.0, "height": 1.5 },
      "count": 48,
      "weight": 850,
      "color": "#8B4513",
      "modelUrl": "/models/pallet.glb",
      "metadata": {
        "sku": "SKU-001",
        "batch": "2024-11-A"
      }
    }
  ]
}
```

## Item Types

- **Pallet**: Large wooden platforms (default: brown)
- **Pack**: Medium-sized packages (default: blue)
- **Product**: Individual products (default: green)
- **Container**: Large shipping containers (default: orange)

## Customization

### Adding Custom Models

Place your .glb files in the `public/models/` directory and reference them in the JSON data:

```json
{
  "id": "CUSTOM-001",
  "modelUrl": "/models/your-model.glb",
  ...
}
```

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