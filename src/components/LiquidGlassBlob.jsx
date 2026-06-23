import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';

export default function LiquidGlassBlob() {
  const meshRef = useRef();
  const ringGroupRef = useRef();
  const interactiveGroupRef = useRef();

  const [hovered, setHovered] = useState(false);
  const [activeNode, setActiveNode] = useState(null);

  const radius = 2.3;

  // Fare pozisyonunu global takip etmek için (tıklamaya gerek kalmadan eğilmesi için)
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Ekran merkezine göre normalize edilmiş fare pozisyonu (-1 ile 1 arası)
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Etkileşimli yörünge durakları
  const nodes = [
    { angle: 0, label: "Tasarım Vizyonumuz" },
    { angle: Math.PI / 1.5, label: "Gizli Projeler" },
    { angle: Math.PI * 1.33, label: "Özel Teklif" }
  ];

  useFrame((state, delta) => {
    if (!interactiveGroupRef.current || !meshRef.current) return;

    // Kendi etrafında organik şekilde dön
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;

    // Yörünge dönüşü
    if (ringGroupRef.current) {
      ringGroupRef.current.rotation.z += delta * 0.2;
    }

    // Fare hareketine göre tüm grubu çok daha yavaş ve yumuşak eğ/döndür (Parallax efekti)
    const targetRotationX = mousePosition.current.y * 0.5; // Dönüş miktarını 0.8'den 0.5'e düşürdük
    const targetRotationY = mousePosition.current.x * 0.5;

    // Lerp değerini 0.05'ten 0.015'e düşürerek geçişin çok daha yavaş olmasını sağladık
    interactiveGroupRef.current.rotation.x = THREE.MathUtils.lerp(interactiveGroupRef.current.rotation.x, targetRotationX, 0.015);
    interactiveGroupRef.current.rotation.y = THREE.MathUtils.lerp(interactiveGroupRef.current.rotation.y, targetRotationY, 0.015);

    // Hover anında kırılma efektini artır
    const material = meshRef.current.material;
    if (material) {
      material.distortion = THREE.MathUtils.lerp(material.distortion, hovered ? 1.2 : 0.5, 0.05);
      material.chromaticAberration = THREE.MathUtils.lerp(material.chromaticAberration, hovered ? 0.8 : 0.4, 0.05);
    }
  });

  return (
    <>
      <Environment preset="city" />
      
      {/* İkisi beraber salınım yapsın diye ana Float grubunun içine aldık */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <group ref={interactiveGroupRef}>
          
          <mesh 
            ref={meshRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <icosahedronGeometry args={[1.5, 32]} />
            <MeshTransmissionMaterial
              backside
              samples={4}
              resolution={512}
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

          {/* Çapraz Eğik Yörünge (Topa göre biraz aşağıda) */}
          <group ref={ringGroupRef} rotation={[1.2, 0, -0.6]} position={[0, -0.4, 0]}>
            
            {/* İnce Yörünge Çizgisi (Torus) */}
            <mesh>
              <torusGeometry args={[radius, 0.005, 16, 100]} />
              <meshBasicMaterial color="rgba(154, 22, 31, 0.5)" transparent={true} />
            </mesh>

            {/* Yörünge Üzerindeki Tıklanabilir Duraklar */}
            {nodes.map((node, i) => {
              const x = Math.cos(node.angle) * radius;
              const y = Math.sin(node.angle) * radius;
              const isActive = activeNode === i;
                
                return (
                  <mesh 
                    key={i} 
                    position={[x, y, 0]}
                    onPointerOver={(e) => {
                      e.stopPropagation();
                      document.body.style.cursor = 'pointer';
                    }}
                    onPointerOut={(e) => {
                      e.stopPropagation();
                      document.body.style.cursor = 'auto';
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveNode(isActive ? null : i);
                    }}
                  >
                    <sphereGeometry args={[isActive ? 0.06 : 0.03, 16, 16]} />
                    <meshBasicMaterial color={isActive ? "#ffecaf" : "rgba(255, 236, 175, 0.8)"} />
                    
                    <pointLight distance={2} intensity={isActive ? 0.6 : 0.15} color={isActive ? "#ffecaf" : "#ffffff"} />
                    
                    {isActive && (
                      <Html distanceFactor={10} position={[0, 0.2, 0]} center>
                        <div style={{
                          background: 'rgba(20, 20, 20, 0.8)',
                          backdropFilter: 'blur(10px)',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          color: 'var(--color-gold)',
                          fontFamily: 'var(--font-main)',
                          fontSize: '12px',
                          letterSpacing: '1px',
                          textTransform: 'uppercase',
                          border: '1px solid rgba(255, 236, 175, 0.2)',
                          whiteSpace: 'nowrap',
                          pointerEvents: 'none'
                        }}>
                          {node.label}
                        </div>
                      </Html>
                    )}
                  </mesh>
                );
              })}

              {/* Dönen Beyaz Top (Uydu) */}
              <mesh position={[radius, 0, 0]}>
                <sphereGeometry args={[0.03, 16, 16]} />
                <meshBasicMaterial color="#ffffff" />
                <pointLight distance={2.5} intensity={0.3} color="#ffffff" />
              </mesh>
          </group>
        </group>
      </Float>
    </>
  );
}