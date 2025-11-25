import React from 'react';
import { OrbitControls, PerspectiveCamera, Stats } from '@react-three/drei';
import { InventoryItemData, WarehouseData } from '../types/InventoryItem';
import { InventoryBox } from './InventoryBox';
import { GLBModel } from './GLBModel';
import { GridFloor } from './GridFloor';

interface InventorySceneProps {
  warehouseData: WarehouseData;
  showStats?: boolean;
  enableShadows?: boolean;
}

export const InventoryScene: React.FC<InventorySceneProps> = ({ 
  warehouseData, 
  showStats = false,
  enableShadows = true 
}) => {
  const { dimensions, items } = warehouseData;

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera 
        makeDefault 
        position={[20, 15, 20]} 
        fov={60}
      />

      {/* Controls */}
      <OrbitControls 
        enableDamping
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={100}
        maxPolarAngle={Math.PI / 2}
      />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1}
        castShadow={enableShadows}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      <pointLight position={[-10, 10, -10]} intensity={0.5} />
      <hemisphereLight args={['#ffffff', '#444444', 0.3]} />

      {/* Scene */}
      <GridFloor width={dimensions.width} length={dimensions.length} />

      {/* Render inventory items */}
      {items.map((item: InventoryItemData) => (
        item.modelUrl ? (
          <GLBModel key={item.id} item={item} />
        ) : (
          <InventoryBox key={item.id} item={item} />
        )
      ))}

      {/* Stats (FPS, memory, etc.) */}
      {showStats && <Stats />}

      {/* Fog for depth perception */}
      <fog attach="fog" args={['#1a1a1a', 30, 100]} />
    </>
  );
};
