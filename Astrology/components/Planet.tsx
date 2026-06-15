'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

export function Planet() {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2.5, 64, 64]}>
      <meshStandardMaterial 
        color="#4a90e2" 
        emissive="#1e3a8a" 
        metalness={0.3} 
        roughness={0.8} 
      />
    </Sphere>
  );
}
