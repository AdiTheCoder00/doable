import { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Edges, ContactShadows, Html } from '@react-three/drei';
import { House3D, Tree3D, Rock3D, getSpiralPositions } from './Props3D';
import rickRollVideo from '../../assets/Rickroll {HD + No ads}.mp4';

const TILES: [number, number][] = [];
for (let x = -2; x <= 2; x++) {
  for (let z = -2; z <= 2; z++) {
    if (Math.abs(x) === 2 && Math.abs(z) === 2) continue;
    TILES.push([x, z]);
  }
}

export default function World3D({ buildingsCount, tasks }: { buildingsCount: number, tasks: any[] }) {
  const positions = useMemo(() => getSpiralPositions(buildingsCount), [buildingsCount]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
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
          <group 
            position={[0, 0.2, 0]}
            onClick={(e) => {
              e.stopPropagation();
              // Only trigger if mouse hasn't moved much (not dragging)
              if (e.delta <= 2) {
                setIsPlaying(true);
              }
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'pointer';
              setHovered(true);
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'auto';
              setHovered(false);
            }}
          >
            {/* Hover Tooltip */}
            {hovered && (
              <Html position={[0, 4, 0]} center zIndexRange={[100, 0]} className="pointer-events-none">
                <div className="bg-[var(--accent)] text-white px-3 py-1.5 rounded-full text-sm font-bold whitespace-nowrap shadow-xl animate-bounce tracking-wide select-none">
                  Click it! 👇
                </div>
              </Html>
            )}
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

    {isPlaying && (
      <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">
        <video 
          src={rickRollVideo} 
          autoPlay 
          controls 
          className="w-full h-full max-h-screen object-contain"
          onEnded={() => setIsPlaying(false)}
        />
        <button 
          onClick={() => setIsPlaying(false)}
          className="absolute top-6 right-6 text-white bg-white/20 hover:bg-white/40 backdrop-blur-sm px-4 py-2 rounded-full font-bold transition-colors"
        >
          Close Video
        </button>
      </div>
    )}
    </>
  );
}
