import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

export default function LiquidGlassBlob() {
  const meshRef = useRef();
  const { viewport, mouse } = useThree();
  const [targetPosition] = useState(() => new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Hedef pozisyonu fareye göre hesapla
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;
    
    const mouseVec = new THREE.Vector3(mouseX, mouseY, 0);
    const currentPos = meshRef.current.position;

    // Fareden kaçma mantığı (Çok yaklaştığında iter)
    const dist = currentPos.distanceTo(mouseVec);
    const repulsionRadius = 3;

    if (dist < repulsionRadius) {
      // Uzaklaş
      const dir = currentPos.clone().sub(mouseVec).normalize();
      targetPosition.copy(currentPos).add(dir.multiplyScalar(0.5));
    } else {
      // Yavaşça merkeze veya farenin biraz uzağına geri dön
      // "Canlı" hissi vermek için farenin etrafında dolanır
      targetPosition.set(mouseX * 0.5, mouseY * 0.5, 0);
    }

    // Pozisyonu yumuşat (Lerp)
    meshRef.current.position.lerp(targetPosition, 0.05);

    // Kendi etrafında organik şekilde dön
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
  });

  return (
    <>
      <Environment preset="city" />
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.5, 32]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={2}
            chromaticAberration={0.4}
            anisotropy={0.3}
            distortion={0.5}
            distortionScale={0.5}
            temporalDistortion={0.2}
            transmission={1}
            ior={1.5}
            color="#ffeebf"
          />
        </mesh>
      </Float>
    </>
  );
}
