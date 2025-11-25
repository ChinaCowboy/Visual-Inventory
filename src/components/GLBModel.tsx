import React, { Suspense } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';
import { Text } from '@react-three/drei';
import { InventoryItemData } from '../types/InventoryItem';

interface GLBModelProps {
  item: InventoryItemData;
}

export const GLBModel: React.FC<GLBModelProps> = ({ item }) => {
  const [hovered, setHovered] = React.useState(false);

  if (!item.modelUrl) {
    return null;
  }

  const { x, y, z } = item.position;
  const { width, length, height } = item.dimensions;

  return (
    <Suspense fallback={null}>
      <group position={[x, y, z]}>
        <GLBModelLoader 
          url={item.modelUrl} 
          scale={[width, height, length]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        />
        
        {hovered && (
          <Text
            position={[0, height + 0.5, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.05}
            outlineColor="black"
          >
            {`${item.name}\n${item.type} | ${item.count} units\n${item.weight}kg`}
          </Text>
        )}
      </group>
    </Suspense>
  );
};

interface GLBModelLoaderProps {
  url: string;
  scale: [number, number, number];
  onPointerOver: () => void;
  onPointerOut: () => void;
}

const GLBModelLoader: React.FC<GLBModelLoaderProps> = ({ url, scale, onPointerOver, onPointerOut }) => {
  const gltf = useLoader(GLTFLoader, url);
  
  return (
    <primitive 
      object={gltf.scene} 
      scale={scale}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    />
  );
};
