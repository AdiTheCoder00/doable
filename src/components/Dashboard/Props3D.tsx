import { useState } from 'react';
import { Html } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';

const HOUSE_COLORS = ['#6EE7B7', '#60A5FA', '#F97316'];

export function House3D({ position, colorVariant, delay = 0, label }: { position: [number, number, number], colorVariant: number, delay?: number, label?: string }) {
  const color = HOUSE_COLORS[Math.floor(colorVariant * HOUSE_COLORS.length)];
  const [hovered, setHovered] = useState(false);
  
  const { scale } = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
    delay,
    config: { tension: 200, friction: 12 }
  });

  return (
    <a.group position={position} scale={scale} onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }} onPointerOut={() => setHovered(false)}>
      {/* Base */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.35, 0.3, 4]} />
        <meshStandardMaterial color="#FDBA74" flatShading />
      </mesh>
      
      {hovered && label && (
        <Html position={[0, 0.8, 0]} center zIndexRange={[100, 0]}>
          <div className="bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold shadow-sm whitespace-nowrap text-[var(--text)] pointer-events-none border border-[var(--border)]">
            {label}
          </div>
        </Html>
      )}
    </a.group>
  );
}

export function Tree3D({ position, delay = 0 }: { position: [number, number, number], delay?: number }) {
  const { scale } = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
    delay,
    config: { tension: 200, friction: 12 }
  });

  return (
    <a.group position={position} scale={scale}>
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 6]} />
        <meshStandardMaterial color="#78350F" flatShading />
      </mesh>
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.2, 0.4, 6]} />
        <meshStandardMaterial color="#166534" flatShading />
      </mesh>
    </a.group>
  );
}

export function Rock3D({ position, colorVariant, delay = 0 }: { position: [number, number, number], colorVariant: number, delay?: number }) {
  const { scale } = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
    delay,
    config: { tension: 200, friction: 12 }
  });
  
  const rotX = colorVariant * Math.PI;
  const rotY = (colorVariant + 0.5) * Math.PI;

  return (
    <a.group position={position} scale={scale}>
      <mesh position={[0, 0.08, 0]} rotation={[rotX, rotY, 0]} castShadow receiveShadow>
        <dodecahedronGeometry args={[0.12, 0]} />
        <meshStandardMaterial color="#9CA3AF" flatShading />
      </mesh>
    </a.group>
  );
}


