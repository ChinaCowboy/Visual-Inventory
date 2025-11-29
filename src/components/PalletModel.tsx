

// Pallet dimensions (meters)
const PALLET_WIDTH = 1.2;   // X (side to side)
const PALLET_LENGTH = 1.0;  // Z (front to back)
const PALLET_HEIGHT = 0.15; // Y (height)

// Slat and block sizes
const SLAT_HEIGHT = 0.022;
const SLAT_WIDTH = 0.09;
const SLAT_GAP = 0.07;
const BLOCK_WIDTH = 0.09;
const BLOCK_HEIGHT = 0.09;
const BLOCK_LENGTH = 0.09;

const WOOD_COLOR = '#e0c39a';

// Use a function component with props: React.ComponentProps<'group'>
export function PalletModel(props: React.ComponentProps<'group'>) {
  // Top slats (5)
  const topSlats = Array.from({ length: 5 }).map((_, i) => {
    const x = -PALLET_WIDTH / 2 + SLAT_WIDTH / 2 + i * (SLAT_WIDTH + SLAT_GAP);
    return (
      <mesh key={`top-slat-${i}`} position={[x, PALLET_HEIGHT / 2 - SLAT_HEIGHT / 2, 0]}>
        <boxGeometry args={[SLAT_WIDTH, SLAT_HEIGHT, PALLET_LENGTH]} />
        <meshStandardMaterial color={WOOD_COLOR} />
      </mesh>
    );
  });

  // Bottom slats (3)
  const bottomSlats = [0, 1, 2].map((i) => {
    const x = -PALLET_WIDTH / 2 + SLAT_WIDTH / 2 + i * (PALLET_WIDTH - SLAT_WIDTH) / 2;
    return (
      <mesh key={`bottom-slat-${i}`} position={[x, -PALLET_HEIGHT / 2 + SLAT_HEIGHT / 2, 0]}>
        <boxGeometry args={[SLAT_WIDTH, SLAT_HEIGHT, PALLET_LENGTH]} />
        <meshStandardMaterial color={WOOD_COLOR} />
      </mesh>
    );
  });

  // Blocks (3 rows: left, center, right)
  const blockXs = [
    -PALLET_WIDTH / 2 + BLOCK_WIDTH / 2,
    0,
    PALLET_WIDTH / 2 - BLOCK_WIDTH / 2
  ];
  const blockZs = [
    -PALLET_LENGTH / 2 + BLOCK_LENGTH / 2,
    0,
    PALLET_LENGTH / 2 - BLOCK_LENGTH / 2
  ];
  const blocks = blockXs.flatMap((x) =>
    blockZs.map((z) => (
      <mesh key={`block-${x}-${z}`} position={[x, 0, z]}>
        <boxGeometry args={[BLOCK_WIDTH, BLOCK_HEIGHT, BLOCK_LENGTH]} />
        <meshStandardMaterial color={WOOD_COLOR} />
      </mesh>
    ))
  );

  return (
    <group {...props}>
      {topSlats}
      {bottomSlats}
      {blocks}
    </group>
  );
}
