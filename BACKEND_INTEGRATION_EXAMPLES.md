/**
 * ⚠️ EXAMPLES FILE - NOT COMPILED
 * 
 * This file contains examples of how to integrate the Visual Inventory System
 * with your backend API. Copy the relevant code into your components.
 * 
 * This file shows how to connect to your existing backend API that uses
 * the Inventory and InventoryLocation types defined in Inventory.ts.
 */

// These imports would be used in your actual implementation:
// import { useState, useEffect } from 'react';
// import { Inventory, InventoryLocation } from '../Inventory';
// import { WarehouseData } from './types/InventoryItem';
// import { convertInventoryToWarehouseData } from './utils/InventoryConverter';

// Example placeholder types for demonstration
type useState = any;
type useEffect = any;
type Inventory = any;
type InventoryLocation = any;
type WarehouseData = any;
const convertInventoryToWarehouseData = (inv: any, locs: any) => ({} as any);

// ============================================================================
// Example 1: Fetch from API and Convert
// ============================================================================

export function useInventoryFromAPI(apiUrl: string) {
  const [warehouseData, setWarehouseData] = useState<WarehouseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchInventory() {
      try {
        setLoading(true);
        
        // Fetch inventory data
        const inventoryResponse = await fetch(`${apiUrl}/inventory`);
        const inventory: Inventory = await inventoryResponse.json();
        
        // Fetch locations for this inventory
        const locationsResponse = await fetch(
          `${apiUrl}/inventory/${inventory.id}/locations`
        );
        const locations: InventoryLocation[] = await locationsResponse.json();
        
        // Convert to warehouse format
        const warehouse = convertInventoryToWarehouseData(inventory, locations);
        
        setWarehouseData(warehouse);
        setError(null);
      } catch (err) {
        setError(err as Error);
        console.error('Failed to fetch inventory:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchInventory();
  }, [apiUrl]);

  return { warehouseData, loading, error };
}

// Usage in App.tsx:
/*
import { useInventoryFromAPI } from './utils/BackendIntegration';

function App() {
  const { warehouseData, loading, error } = useInventoryFromAPI('https://your-api.com/api');
  
  if (loading) return <div>Loading inventory...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!warehouseData) return <div>No data available</div>;
  
  return (
    <Canvas>
      <InventoryScene warehouseData={warehouseData} />
    </Canvas>
  );
}
*/

// ============================================================================
// Example 2: Real-time Updates with WebSocket
// ============================================================================

export function useInventoryWebSocket(wsUrl: string) {
  const [warehouseData, setWarehouseData] = useState<WarehouseData | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connected');
      setConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.type === 'INVENTORY_UPDATE') {
          const { inventory, locations } = data.payload;
          const warehouse = convertInventoryToWarehouseData(inventory, locations);
          setWarehouseData(warehouse);
        }
      } catch (err) {
        console.error('Failed to parse WebSocket message:', err);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnected(false);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setConnected(false);
    };

    return () => {
      ws.close();
    };
  }, [wsUrl]);

  return { warehouseData, connected };
}

// Usage:
/*
function App() {
  const { warehouseData, connected } = useInventoryWebSocket('wss://your-api.com/ws');
  
  return (
    <div>
      <div>Status: {connected ? 'Connected' : 'Disconnected'}</div>
      {warehouseData && (
        <Canvas>
          <InventoryScene warehouseData={warehouseData} />
        </Canvas>
      )}
    </div>
  );
}
*/

// ============================================================================
// Example 3: Periodic Polling
// ============================================================================

export function useInventoryPolling(apiUrl: string, intervalMs: number = 5000) {
  const [warehouseData, setWarehouseData] = useState<WarehouseData | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const inventoryResponse = await fetch(`${apiUrl}/inventory`);
        const inventory: Inventory = await inventoryResponse.json();
        
        const locationsResponse = await fetch(
          `${apiUrl}/inventory/${inventory.id}/locations`
        );
        const locations: InventoryLocation[] = await locationsResponse.json();
        
        const warehouse = convertInventoryToWarehouseData(inventory, locations);
        setWarehouseData(warehouse);
        setLastUpdate(new Date());
      } catch (err) {
        console.error('Failed to fetch inventory:', err);
      }
    }

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, intervalMs);

    return () => clearInterval(interval);
  }, [apiUrl, intervalMs]);

  return { warehouseData, lastUpdate };
}

// Usage:
/*
function App() {
  const { warehouseData, lastUpdate } = useInventoryPolling('https://your-api.com/api', 10000);
  
  return (
    <div>
      <div>Last updated: {lastUpdate?.toLocaleTimeString()}</div>
      {warehouseData && (
        <Canvas>
          <InventoryScene warehouseData={warehouseData} />
        </Canvas>
      )}
    </div>
  );
}
*/

// ============================================================================
// Example 4: Filter and Transform Data
// ============================================================================

export function useFilteredInventory(
  apiUrl: string,
  filters?: {
    minCapacity?: number;
    maxCapacity?: number;
    status?: number[];
    materialIds?: number[];
  }
) {
  const [warehouseData, setWarehouseData] = useState<WarehouseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAndFilter() {
      try {
        setLoading(true);
        
        const inventoryResponse = await fetch(`${apiUrl}/inventory`);
        const inventory: Inventory = await inventoryResponse.json();
        
        const locationsResponse = await fetch(
          `${apiUrl}/inventory/${inventory.id}/locations`
        );
        let locations: InventoryLocation[] = await locationsResponse.json();
        
        // Apply filters
        if (filters) {
          locations = locations.filter(loc => {
            if (filters.minCapacity && (loc.capacity || 0) < filters.minCapacity) {
              return false;
            }
            if (filters.maxCapacity && (loc.capacity || 0) > filters.maxCapacity) {
              return false;
            }
            if (filters.status && filters.status.length > 0) {
              if (!filters.status.includes(loc.status)) {
                return false;
              }
            }
            if (filters.materialIds && filters.materialIds.length > 0) {
              if (!loc.materialId || !filters.materialIds.includes(loc.materialId)) {
                return false;
              }
            }
            return true;
          });
        }
        
        const warehouse = convertInventoryToWarehouseData(inventory, locations);
        setWarehouseData(warehouse);
      } catch (err) {
        console.error('Failed to fetch and filter inventory:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAndFilter();
  }, [apiUrl, filters]);

  return { warehouseData, loading };
}

// Usage:
/*
function App() {
  const [filters, setFilters] = useState({
    minCapacity: 100,
    status: [1, 2], // Active statuses
  });
  
  const { warehouseData, loading } = useFilteredInventory(
    'https://your-api.com/api',
    filters
  );
  
  return (
    <div>
      <FilterControls onFilterChange={setFilters} />
      {loading ? (
        <div>Loading...</div>
      ) : warehouseData ? (
        <Canvas>
          <InventoryScene warehouseData={warehouseData} />
        </Canvas>
      ) : (
        <div>No data</div>
      )}
    </div>
  );
}
*/

// ============================================================================
// Example 5: Complete Integration Example
// ============================================================================

/*
// Complete App.tsx with backend integration

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { InventoryScene } from './components/InventoryScene';
import { useInventoryFromAPI } from './utils/BackendIntegration';
import './App.css';

const App: React.FC = () => {
  const [showStats, setShowStats] = useState(false);
  const [apiUrl] = useState(process.env.REACT_APP_API_URL || 'http://localhost:8080/api');
  
  const { warehouseData, loading, error } = useInventoryFromAPI(apiUrl);

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Loading inventory data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="error-screen">
          <h2>Error Loading Inventory</h2>
          <p>{error.message}</p>
          <button onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!warehouseData) {
    return (
      <div className="app-container">
        <div className="empty-screen">
          <p>No inventory data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Visual Inventory System</h1>
        <div className="controls">
          <button onClick={() => setShowStats(!showStats)}>
            {showStats ? 'Hide' : 'Show'} Stats
          </button>
          <button onClick={() => window.location.reload()}>
            Refresh
          </button>
        </div>
      </header>

      <div className="info-panel">
        <h3>{warehouseData.name}</h3>
        <p>Total Items: {warehouseData.items.length}</p>
        <p>
          Total Weight: {
            warehouseData.items.reduce((sum, item) => sum + item.weight, 0).toLocaleString()
          } kg
        </p>
      </div>

      <div className="canvas-container">
        <Canvas shadows>
          <InventoryScene warehouseData={warehouseData} showStats={showStats} />
        </Canvas>
      </div>

      <div className="instructions">
        <p>🖱️ Left-click to rotate | Right-click to pan | Scroll to zoom</p>
      </div>
    </div>
  );
};

export default App;
*/
