import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Mesh } from 'three';
import * as THREE from 'three';
import { InventoryItemData } from '../types/InventoryItem';

interface InventoryBoxProps {
  item: InventoryItemData;
  interactive?: boolean;
}

export const InventoryBox: React.FC<InventoryBoxProps> = ({ item, interactive = true }) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = React.useState(false);

  useFrame(() => {
    if (meshRef.current && hovered) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  const getColorByType = (type: string): string => {
    switch (type) {
      case 'pallet':
        return '#8B4513';
      case 'pack':
        return '#4A90E2';
      case 'product':
        return '#50C878';
      case 'container':
        return '#FFB347';
      default:
        return '#CCCCCC';
    }
  };

  const color = item.color || getColorByType(item.type);
  const { x, y, z } = item.position;
  const { width, length, height } = item.dimensions;
  
  const boxGeometry = React.useMemo(() => new THREE.BoxGeometry(width, height, length), [width, height, length]);

  // Check if this is an actual item (pallet/pack) or just a location wireframe
  const isActualItem = item.type === 'pallet' || item.type === 'pack' || item.type === 'product';

  return (
    <group position={[x, y + height / 2, z]}>
      {/* Solid mesh for actual items (pallets, packs, etc.) or transparent for locations */}
      <mesh
        ref={meshRef}
        onPointerOver={() => interactive && setHovered(true)}
        onPointerOut={() => interactive && setHovered(false)}
      >
        <boxGeometry args={[width, height, length]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={isActualItem ? (hovered ? 0.8 : 0.6) : (hovered ? 0.3 : 0)}
          roughness={0.5}
          metalness={0.2}
        />
      </mesh>
      
      {/* Border outline - always show for wireframes, optional for solid items */}
      {!isActualItem && (
        <lineSegments>
          <edgesGeometry args={[boxGeometry]} />
          <lineBasicMaterial 
            color={hovered ? '#ffffff' : color} 
            linewidth={hovered ? 3 : 2}
            opacity={1}
            transparent={false}
          />
        </lineSegments>
      )}

      {/* Label */}
      {hovered && (
        <Text
          position={[0, height / 2 + 0.3, 0]}
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
  );
};
