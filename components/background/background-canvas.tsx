import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame, Canvas } from "@react-three/fiber";
import { Stars, useTexture } from "@react-three/drei";

interface PlanetProps {
  position?: [number, number, number];
  size?: number;
  color?: string;
  orbitRadius?: number;
  orbitSpeed?: number;
  rotationSpeed?: number;
  textureUrl?: string;
}

function Planet({ 
  position = [0, 0, 0], 
  size = 1, 
  color = "#ffffff", 
  orbitRadius = 10,
  orbitSpeed = 0.01,
  rotationSpeed = 0.01,
  textureUrl
}: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const angle = useRef(Math.random() * Math.PI * 2);
  const texture = textureUrl ? useTexture(textureUrl) : null;
  
  useFrame(() => {
    if (meshRef.current) {
      // Orbit movement
      angle.current += orbitSpeed;
      meshRef.current.position.x = Math.sin(angle.current) * orbitRadius;
      meshRef.current.position.z = Math.cos(angle.current) * orbitRadius;
      
      // Self rotation
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        map={texture} 
        metalness={0.2} 
        roughness={0.8} 
      />
    </mesh>
  );
}

interface OrbitalRingProps {
  radius?: number;
  color?: string;
  opacity?: number;
}

function OrbitalRing({ radius = 10, color = "#ffffff", opacity = 0.1 }: OrbitalRingProps) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.1, radius + 0.1, 64]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} />
    </mesh>
  );
}

interface SolarSystemProps {
  intensity?: number;
}

function SolarSystem({ intensity = 1 }: SolarSystemProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  useFrame(() => {
    if (groupRef.current) {
      // Subtle parallax effect
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.x = mousePosition.current.y * 0.1 * intensity;
      groupRef.current.rotation.y = mousePosition.current.x * 0.1 * intensity;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Sun */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial color="#FDB813" />
        <pointLight intensity={5} distance={100} decay={2} />
      </mesh>
      
      {/* Orbital rings */}
      <OrbitalRing radius={5} color="#aaa" opacity={0.1 * intensity} />
      <OrbitalRing radius={8} color="#aaa" opacity={0.1 * intensity} />
      <OrbitalRing radius={12} color="#aaa" opacity={0.1 * intensity} />
      <OrbitalRing radius={16} color="#aaa" opacity={0.1 * intensity} />
      
      {/* Planets */}
      <Planet 
        position={[5, 0, 0]} 
        size={0.6} 
        color="#E5CDAA" 
        orbitRadius={5}
        orbitSpeed={0.015}
        rotationSpeed={0.02}
      />
      <Planet 
        position={[8, 0, 0]} 
        size={0.9} 
        color="#3498db" 
        orbitRadius={8}
        orbitSpeed={0.01}
        rotationSpeed={0.015}
      />
      <Planet 
        position={[12, 0, 0]} 
        size={0.8} 
        color="#e74c3c" 
        orbitRadius={12}
        orbitSpeed={0.007}
        rotationSpeed={0.01}
      />
      <Planet 
        position={[16, 0, 0]} 
        size={1.2} 
        color="#f39c12" 
        orbitRadius={16}
        orbitSpeed={0.005}
        rotationSpeed={0.008}
      />
      
      {/* Stars */}
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade
        speed={1}
      />
    </group>
  );
}

interface BackgroundCanvasProps {
  intensity?: number;
}

export default function BackgroundCanvas({ intensity = 1 }: BackgroundCanvasProps) {
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 15, 30], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <SolarSystem intensity={intensity} />
      </Canvas>
    </div>
  );
}