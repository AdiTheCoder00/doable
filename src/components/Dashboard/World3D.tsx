import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Edges, ContactShadows } from '@react-three/drei';
import { House3D, Tree3D, Rock3D, getSpiralPositions } from './Props3D';

const TILES: [number, number][] = [];
for (let x = -2; x <= 2; x++) {
  for (let z = -2; z <= 2; z++) {
    if (Math.abs(x) === 2 && Math.abs(z) === 2) continue;
    TILES.push([x, z]);
  }
}

export default function World3D({ buildingsCount, tasks }: { buildingsCount: number, tasks: any[] }) {
  const positions = useMemo(() => getSpiralPositions(buildingsCount), [buildingsCount]);

  return (
    <Canvas 
      shadows 
      camera={{ position: [10, 10, 10], zoom: 50, near: 0.1, far: 100 }}
      orthographic
      className="w-full h-full cursor-grab active:cursor-grabbing"
    >
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize={1024}
      />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 3}
        autoRotate
        autoRotateSpeed={0.15}
        enableDamping
        dampingFactor={0.1}
      />

      <Float speed={1.5} rotationIntensity={0} floatIntensity={1} floatingRange={[-0.1, 0.1]}>
        <group position={[0, -0.2, 0]}>
          
          {/* Isometric Tile Island */}
          <group position={[0, -0.125, 0]}>
            {TILES.map(([x, z]) => (
              <mesh key={`${x}-${z}`} position={[x, 0, z]} receiveShadow castShadow>
                <boxGeometry args={[1, 0.25, 1]} />
                <meshStandardMaterial color="#9cd899" />
                <Edges color="#79bc75" threshold={15} />
              </mesh>
            ))}
          </group>

          {/* Buildings */}
          <group position={[0, 0.2, 0]}>
            {positions.map((p, i) => {
              const label = tasks[i] ? tasks[i].title : `Task ${i + 1}`;
              const delay = i === positions.length - 1 ? 300 : 0; 
              
              if (p.type === 'tree') {
                return <Tree3D key={p.id} position={[p.x, 0, p.z]} delay={delay} />;
              }
              if (p.type === 'rock') {
                return <Rock3D key={p.id} position={[p.x, 0, p.z]} colorVariant={p.colorVariant} delay={delay} />;
              }
              return (
                <House3D 
                  key={p.id} 
                  position={[p.x, 0, p.z]} 
                  colorVariant={p.colorVariant} 
                  delay={delay} 
                  label={label} 
                />
              );
            })}
          </group>

          <ContactShadows position={[0, -0.19, 0]} opacity={0.4} scale={10} blur={2} far={2} />
        </group>
      </Float>
    </Canvas>
  );
}
