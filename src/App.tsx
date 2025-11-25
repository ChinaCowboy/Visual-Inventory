import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { InventoryScene } from './components/InventoryScene';
import { WarehouseData } from './types/InventoryItem';
import { inventories, allLocations } from './data/inventorySampleData';
import { allInventoryItems } from './data/inventoryItems';
import { convertInventoryToWarehouseData } from './utils/InventoryConverter';
import './App.css';

const App: React.FC = () => {
  const [showStats, setShowStats] = useState(false);
  
  // Convert the inventory data to warehouse format
  const warehouseData = useMemo<WarehouseData>(() => {
    // Use the first inventory as the main warehouse name
    const mainInventory = inventories[0];
    
    // Convert all locations to warehouse items (wireframe boxes)
    const converted = convertInventoryToWarehouseData(mainInventory, allLocations);
    
    // Add the actual items (pallets and packs) on top of locations
    converted.items = [...converted.items, ...allInventoryItems];
    
    // Update the name to show both inventories
    converted.name = `${inventories[0].name} & ${inventories[1].name}`;
    
    return converted;
  }, []);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1>Visual Inventory System</h1>
        <div className="controls">
          <button onClick={() => setShowStats(!showStats)}>
            {showStats ? 'Hide' : 'Show'} Stats
          </button>
        </div>
      </header>

      {/* Info Panel */}
      <div className="info-panel">
        <h3>Visual Inventory System</h3>
        <div style={{ marginBottom: '1rem' }}>
          <p><strong>Inventory 1:</strong> {inventories[0].name}</p>
          <p style={{ fontSize: '0.85rem', marginLeft: '1rem' }}>
            Layout: 1 column × 10 rows<br />
            Locations: 10
          </p>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <p><strong>Inventory 2:</strong> {inventories[1].name}</p>
          <p style={{ fontSize: '0.85rem', marginLeft: '1rem' }}>
            Layout: 2 columns × 5 rows<br />
            Locations: 10
          </p>
        </div>
        <p style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '0.5rem' }}>
          <strong>Total Locations: {warehouseData.items.length}</strong>
        </p>
        <p>
          Total Capacity: {warehouseData.items.reduce((sum, item) => sum + item.weight, 0).toLocaleString()} units
        </p>
        <div className="legend">
          <h4>Item Types:</h4>
          <div className="legend-item">
            <span className="color-box" style={{ backgroundColor: '#8B4513' }}></span>
            <span>Pallet</span>
          </div>
          <div className="legend-item">
            <span className="color-box" style={{ backgroundColor: '#4A90E2' }}></span>
            <span>Pack</span>
          </div>
          <div className="legend-item">
            <span className="color-box" style={{ backgroundColor: '#50C878' }}></span>
            <span>Product</span>
          </div>
          <div className="legend-item">
            <span className="color-box" style={{ backgroundColor: '#FFB347' }}></span>
            <span>Container</span>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="canvas-container">
        <Canvas shadows>
          <InventoryScene warehouseData={warehouseData} showStats={showStats} />
        </Canvas>
      </div>

      {/* Instructions */}
      <div className="instructions">
        <p>🖱️ Left-click and drag to rotate | Right-click and drag to pan | Scroll to zoom</p>
        <p>Hover over items to see details</p>
      </div>
    </div>
  );
};

export default App;
