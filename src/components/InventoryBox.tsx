import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Mesh } from 'three';
import * as THREE from 'three';
import { InventoryItemData } from '../types/InventoryItem';
import { PalletModel } from './PalletModel';

interface InventoryBoxProps {
  item: InventoryItemData;
  interactive?: boolean;
  showTips?: boolean;
}

export const InventoryBox: React.FC<InventoryBoxProps> = ({ item, interactive = true, showTips = true }) => {
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

  // Check if this is an actual item (pallet/pack) or just a location wireframe
  const isActualItem = item.type === 'pallet' || item.type === 'pack' || item.type === 'product';
  
  // Check if this is a pack location (Inventory 2 - locations 201-210)
  const isPackLocation = !isActualItem && item.metadata?.locationId >= 201 && item.metadata?.locationId <= 210;

  // Create bottom grid lines for pallet locations (no walls/roof)
  const bottomLines = React.useMemo(() => {
    if (isActualItem || isPackLocation) return null;
    
    const points = [];
    // Bottom rectangle
    const hw = width / 2;
    const hl = length / 2;
    const bottomY = -height / 2;
    
    // Four corners of bottom
    points.push(
      new THREE.Vector3(-hw, bottomY, -hl),
      new THREE.Vector3(hw, bottomY, -hl),
      
      new THREE.Vector3(hw, bottomY, -hl),
      new THREE.Vector3(hw, bottomY, hl),
      
      new THREE.Vector3(hw, bottomY, hl),
      new THREE.Vector3(-hw, bottomY, hl),
      
      new THREE.Vector3(-hw, bottomY, hl),
      new THREE.Vector3(-hw, bottomY, -hl)
    );
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [width, length, height, isActualItem, isPackLocation]);
  
  // Create box edges (walls and roof) for pack locations
  const boxGeometry = React.useMemo(() => {
    if (!isPackLocation) return null;
    return new THREE.BoxGeometry(width, height, length);
  }, [width, height, length, isPackLocation]);

  const itemGeometry = React.useMemo(() => {
    if (!isActualItem) return null;
    return new THREE.BoxGeometry(width, height, length);
  }, [width, height, length, isActualItem]);

  return (
    <group position={[x, y + height / 2, z]}>
      {/* Pallet model for actual pallet items */}
      {isActualItem && item.type === 'pallet' && (
        <PalletModel scale={[width / 1.2, height / 0.15, length / 1.0]} />
      )}
      {/* Solid mesh for other actual items (packs, products, etc.) */}
      {isActualItem && item.type !== 'pallet' && itemGeometry && (
        <>
          <mesh
            ref={meshRef}
            onPointerOver={() => interactive && setHovered(true)}
            onPointerOut={() => interactive && setHovered(false)}
          >
            <boxGeometry args={[width, height, length]} />
            <meshStandardMaterial
              color={color}
              transparent
              opacity={item.type === 'pack' ? (hovered ? 0.95 : 0.85) : (hovered ? 0.8 : 0.6)}
              roughness={0.5}
              metalness={0.2}
            />
          </mesh>
          {/* Add border edges for packs */}
          {item.type === 'pack' && (
            <lineSegments>
              <edgesGeometry args={[itemGeometry]} />
              <lineBasicMaterial 
                color={hovered ? '#ffffff' : '#1a3a5c'} 
                linewidth={2}
              />
            </lineSegments>
          )}
        </>
      )}
      
      {/* Bottom lines only for pallet locations - no roof or sides */}
      {!isActualItem && !isPackLocation && bottomLines && (
        <lineSegments
          geometry={bottomLines}
          onPointerOver={() => interactive && setHovered(true)}
          onPointerOut={() => interactive && setHovered(false)}
        >
          <lineBasicMaterial 
            color={hovered ? '#ffffff' : color} 
            linewidth={2}
          />
        </lineSegments>
      )}
      
      {/* Wireframe box with walls and roof for pack locations */}
      {isPackLocation && boxGeometry && (
        <>
          <mesh
            onPointerOver={() => interactive && setHovered(true)}
            onPointerOut={() => interactive && setHovered(false)}
          >
            <boxGeometry args={[width, height, length]} />
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0}
              side={THREE.DoubleSide}
            />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[boxGeometry]} />
            <lineBasicMaterial 
              color={hovered ? '#ffffff' : color} 
              linewidth={2}
            />
          </lineSegments>
        </>
      )}

      {/* Pack number label on the side - scaled with pack size */}
      {isActualItem && item.type === 'pack' && item.metadata?.packNumber && (
        <Text
          position={[0, 0, length / 2 + 0.001]}
          fontSize={Math.min(width, length) * 0.4}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          outlineWidth={Math.min(width, length) * 0.02}
          outlineColor="#ffffff"
        >
          {item.metadata.packNumber}
        </Text>
      )}

      {/* Location name label - at left top corner */}
      {!isActualItem && (item.metadata?.locationName || item.metadata?.locationId) && (
        <Text
          position={[-width / 2 + 0.1, height / 2 + 0.05, -length / 2 + 0.1]}
          fontSize={Math.min(width, length) * 0.15}
          color="#ffffff"
          anchorX="left"
          anchorY="top"
          outlineWidth={Math.min(width, length) * 0.008}
          outlineColor="#000000"
        >
          {item.metadata.locationName || item.metadata.locationId}
        </Text>
      )}

      {/* Hover label */}
      {hovered && showTips && (
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
