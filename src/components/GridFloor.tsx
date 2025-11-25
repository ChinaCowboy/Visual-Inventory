import React from 'react';
import * as THREE from 'three';

interface GridFloorProps {
  width?: number;
  length?: number;
  gridSize?: number;
}

export const GridFloor: React.FC<GridFloorProps> = ({ 
  width = 30, 
  length = 20, 
  gridSize = 1 
}) => {
  return (
    <group>
      {/* Main floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[4, 0, 3]} receiveShadow>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color="#2C3E50" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Grid helper */}
      <gridHelper 
        args={[Math.max(width, length), Math.max(width, length) / gridSize, '#34495E', '#34495E']} 
        position={[4, 0.01, 3]}
      />

      {/* Axes indicators */}
      <arrowHelper args={[new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 3, 0xff0000]} />
      <arrowHelper args={[new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 3, 0x00ff00]} />
      <arrowHelper args={[new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 3, 0x0000ff]} />
    </group>
  );
};
