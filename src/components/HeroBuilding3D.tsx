import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import heroBuilding from "@/assets/hero-building.jpg";

function Building() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.15;
  });

  const floors = 7;
  const width = 2.4;
  const depth = 1.6;
  const floorH = 0.55;

  return (
    <group ref={group} position={[0, -1.6, 0]}>
      {/* base plinth */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[width + 0.6, 0.1, depth + 0.6]} />
        <meshStandardMaterial color="#e8dfc8" roughness={0.9} />
      </mesh>

      {Array.from({ length: floors }).map((_, i) => {
        const y = 0.2 + i * floorH;
        return (
          <group key={i} position={[0, y, 0]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[width, floorH * 0.85, depth]} />
              <meshStandardMaterial color="#f6efde" roughness={0.55} metalness={0.05} />
            </mesh>
            {/* windows strip front */}
            <mesh position={[0, 0, depth / 2 + 0.001]}>
              <planeGeometry args={[width * 0.92, floorH * 0.55]} />
              <meshStandardMaterial
                color="#9bb6c7"
                emissive="#f1c47a"
                emissiveIntensity={0.35}
                roughness={0.2}
                metalness={0.7}
              />
            </mesh>
            {/* balcony */}
            <mesh position={[0, -floorH * 0.35, depth / 2 + 0.18]} castShadow>
              <boxGeometry args={[width * 0.96, 0.06, 0.35]} />
              <meshStandardMaterial color="#efe5cc" roughness={0.85} />
            </mesh>
            <mesh position={[0, -floorH * 0.18, depth / 2 + 0.35]}>
              <boxGeometry args={[width * 0.96, 0.22, 0.02]} />
              <meshStandardMaterial color="#cfa55a" metalness={0.7} roughness={0.3} />
            </mesh>
            {/* side windows */}
            <mesh position={[width / 2 + 0.001, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[depth * 0.85, floorH * 0.5]} />
              <meshStandardMaterial color="#9bb6c7" emissive="#f1c47a" emissiveIntensity={0.25} roughness={0.2} metalness={0.7} />
            </mesh>
            <mesh position={[-width / 2 - 0.001, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
              <planeGeometry args={[depth * 0.85, floorH * 0.5]} />
              <meshStandardMaterial color="#9bb6c7" emissive="#f1c47a" emissiveIntensity={0.25} roughness={0.2} metalness={0.7} />
            </mesh>
          </group>
        );
      })}

      {/* roof */}
      <mesh position={[0, 0.2 + floors * floorH + 0.05, 0]}>
        <boxGeometry args={[width + 0.2, 0.1, depth + 0.2]} />
        <meshStandardMaterial color="#cfa55a" metalness={0.6} roughness={0.35} />
      </mesh>
    </group>
  );
}

export function HeroBuilding3D() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <img
        src={heroBuilding}
        alt="Modern luxury apartment building at golden hour"
        className="h-full w-full rounded-3xl object-cover"
      />
    );
  }

  return (
    <div className="relative h-full w-full">
      <Canvas
        shadows
        camera={{ position: [4.5, 2.2, 5], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#00000000"]} />
        <ambientLight intensity={0.55} />
        <directionalLight
          position={[5, 6, 4]}
          intensity={1.4}
          color="#ffd9a3"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-4, 3, -2]} intensity={0.4} color="#bcd4ff" />
        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.5}>
            <Building />
          </Float>
          <ContactShadows position={[0, -1.6, 0]} opacity={0.35} scale={10} blur={2.5} far={4} />
          <Environment preset="sunset" />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Canvas>
    </div>
  );
}
