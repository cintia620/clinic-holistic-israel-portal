
import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Mesh } from 'three';
import * as THREE from 'three';
import { Text, Sphere, Cylinder, Box } from '@react-three/drei';
import { BodyPart } from '@/pages/HumanBody';

interface RealisticHumanModelProps {
  bodyParts: BodyPart[];
  selectedPart: BodyPart | null;
  onPartClick: (part: BodyPart) => void;
  isRotating: boolean;
}

const AnatomicalMesh: React.FC<{
  part: BodyPart;
  isSelected: boolean;
  onClick: () => void;
}> = ({ part, isSelected, onClick }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current && isSelected) {
      meshRef.current.scale.setScalar(1 + Math.sin(Date.now() * 0.005) * 0.03);
    } else if (meshRef.current) {
      meshRef.current.scale.setScalar(1);
    }
  });

  // Texturas anatômicas realistas
  const skinTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Gradiente de pele realista
    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    gradient.addColorStop(0, '#FFDBAC');
    gradient.addColorStop(0.3, '#F4C2A1');
    gradient.addColorStop(0.7, '#E8A987');
    gradient.addColorStop(1, '#D4956B');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    
    // Adicionar textura de pele
    ctx.globalAlpha = 0.1;
    for (let i = 0; i < 1000; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? '#C9A876' : '#E8B998';
      ctx.fillRect(Math.random() * 512, Math.random() * 512, 1, 1);
    }
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  const muscleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    
    const gradient = ctx.createLinearGradient(0, 0, 256, 256);
    gradient.addColorStop(0, '#8B0000');
    gradient.addColorStop(0.5, '#A52A2A');
    gradient.addColorStop(1, '#CD5C5C');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  const createRealisticGeometry = (partId: string) => {
    const commonMaterial = {
      map: skinTexture,
      roughness: 0.8,
      metalness: 0.1,
    };

    switch (partId) {
      case 'head':
        return (
          <group>
            {/* Crânio com proporções reais */}
            <mesh>
              <sphereGeometry args={[0.11, 32, 32]} />
              <meshStandardMaterial {...commonMaterial} color="#FFDBAC" />
            </mesh>
            
            {/* Face com estrutura óssea */}
            <mesh position={[0, -0.03, 0.08]}>
              <boxGeometry args={[0.16, 0.12, 0.1]} />
              <meshStandardMaterial {...commonMaterial} color="#F5DEB3" />
            </mesh>
            
            {/* Mandíbula */}
            <mesh position={[0, -0.08, 0.06]}>
              <boxGeometry args={[0.12, 0.04, 0.08]} />
              <meshStandardMaterial {...commonMaterial} color="#F5DEB3" />
            </mesh>
            
            {/* Olhos anatômicos */}
            <mesh position={[-0.03, 0.02, 0.1]}>
              <sphereGeometry args={[0.015, 16, 16]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[0.03, 0.02, 0.1]}>
              <sphereGeometry args={[0.015, 16, 16]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            
            {/* Íris */}
            <mesh position={[-0.03, 0.02, 0.11]}>
              <sphereGeometry args={[0.008, 8, 8]} />
              <meshStandardMaterial color="#4169E1" />
            </mesh>
            <mesh position={[0.03, 0.02, 0.11]}>
              <sphereGeometry args={[0.008, 8, 8]} />
              <meshStandardMaterial color="#4169E1" />
            </mesh>
            
            {/* Nariz com cartilagem */}
            <mesh position={[0, -0.01, 0.11]} rotation={[Math.PI / 2, 0, 0]}>
              <coneGeometry args={[0.01, 0.03, 8]} />
              <meshStandardMaterial {...commonMaterial} color="#F0E68C" />
            </mesh>
            
            {/* Orelhas */}
            <mesh position={[-0.1, 0, 0.02]} rotation={[0, Math.PI / 4, 0]}>
              <torusGeometry args={[0.02, 0.008, 8, 16]} />
              <meshStandardMaterial {...commonMaterial} color="#FFDBAC" />
            </mesh>
            <mesh position={[0.1, 0, 0.02]} rotation={[0, -Math.PI / 4, 0]}>
              <torusGeometry args={[0.02, 0.008, 8, 16]} />
              <meshStandardMaterial {...commonMaterial} color="#FFDBAC" />
            </mesh>
          </group>
        );

      case 'chest':
        return (
          <group>
            {/* Caixa torácica realista */}
            <mesh>
              <cylinderGeometry args={[0.16, 0.18, 0.24, 16]} />
              <meshStandardMaterial {...commonMaterial} color="#FFB6C1" />
            </mesh>
            
            {/* Costelas anatômicas */}
            {Array.from({ length: 12 }, (_, i) => (
              <group key={i}>
                <mesh 
                  position={[0, 0.1 - i * 0.02, 0]} 
                  rotation={[0, 0, Math.PI / 2]}
                >
                  <torusGeometry args={[0.12 + i * 0.005, 0.003, 8, 24]} />
                  <meshStandardMaterial color="#F5F5DC" metalness={0.1} roughness={0.9} />
                </mesh>
              </group>
            ))}
            
            {/* Esterno */}
            <mesh position={[0, 0, 0.17]}>
              <boxGeometry args={[0.02, 0.2, 0.01]} />
              <meshStandardMaterial color="#F5F5DC" />
            </mesh>
            
            {/* Músculos peitorais */}
            <mesh position={[-0.06, 0.05, 0.15]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshStandardMaterial map={muscleTexture} color="#CD5C5C" />
            </mesh>
            <mesh position={[0.06, 0.05, 0.15]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshStandardMaterial map={muscleTexture} color="#CD5C5C" />
            </mesh>
          </group>
        );

      case 'abdomen':
        return (
          <group>
            {/* Abdômen com músculos definidos */}
            <mesh>
              <cylinderGeometry args={[0.14, 0.16, 0.2, 16]} />
              <meshStandardMaterial {...commonMaterial} color="#FFCCCB" />
            </mesh>
            
            {/* Músculos abdominais "six-pack" realistas */}
            {Array.from({ length: 8 }, (_, i) => {
              const row = Math.floor(i / 2);
              const col = i % 2;
              return (
                <mesh 
                  key={i} 
                  position={[(col === 0 ? -0.03 : 0.03), 0.08 - row * 0.04, 0.14]}
                >
                  <boxGeometry args={[0.025, 0.03, 0.01]} />
                  <meshStandardMaterial map={muscleTexture} color="#B22222" />
                </mesh>
              );
            })}
            
            {/* Umbigo realista */}
            <mesh position={[0, -0.02, 0.15]}>
              <cylinderGeometry args={[0.008, 0.006, 0.01, 12]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
          </group>
        );

      case 'leftArm':
      case 'rightArm':
        const isLeft = partId === 'leftArm';
        return (
          <group>
            {/* Úmero com anatomia realista */}
            <mesh position={[0, 0.08, 0]}>
              <cylinderGeometry args={[0.025, 0.022, 0.16, 12]} />
              <meshStandardMaterial {...commonMaterial} color="#FFDBAC" />
            </mesh>
            
            {/* Cotovelo com articulação */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.022, 16, 16]} />
              <meshStandardMaterial {...commonMaterial} color="#FFDBAC" />
            </mesh>
            
            {/* Rádio e Ulna */}
            <mesh position={[-0.008, -0.08, 0]}>
              <cylinderGeometry args={[0.015, 0.018, 0.16, 12]} />
              <meshStandardMaterial {...commonMaterial} color="#FFDBAC" />
            </mesh>
            <mesh position={[0.008, -0.08, 0]}>
              <cylinderGeometry args={[0.015, 0.018, 0.16, 12]} />
              <meshStandardMaterial {...commonMaterial} color="#FFDBAC" />
            </mesh>
            
            {/* Bíceps e Tríceps */}
            <mesh position={[isLeft ? 0.02 : -0.02, 0.06, 0]}>
              <sphereGeometry args={[0.018, 12, 12]} />
              <meshStandardMaterial map={muscleTexture} color="#CD5C5C" />
            </mesh>
            <mesh position={[isLeft ? -0.02 : 0.02, 0.04, 0]}>
              <sphereGeometry args={[0.015, 12, 12]} />
              <meshStandardMaterial map={muscleTexture} color="#B22222" />
            </mesh>
            
            {/* Mão anatômica */}
            <mesh position={[0, -0.17, 0]}>
              <boxGeometry args={[0.04, 0.06, 0.01]} />
              <meshStandardMaterial {...commonMaterial} color="#FFDBAC" />
            </mesh>
            
            {/* Dedos */}
            {Array.from({ length: 5 }, (_, i) => (
              <mesh key={i} position={[-0.015 + i * 0.008, -0.2, 0]}>
                <cylinderGeometry args={[0.003, 0.003, 0.02, 8]} />
                <meshStandardMaterial {...commonMaterial} color="#FFDBAC" />
              </mesh>
            ))}
          </group>
        );

      case 'leftLeg':
      case 'rightLeg':
        return (
          <group>
            {/* Fêmur */}
            <mesh position={[0, 0.1, 0]}>
              <cylinderGeometry args={[0.035, 0.03, 0.2, 12]} />
              <meshStandardMaterial {...commonMaterial} color="#FFDBAC" />
            </mesh>
            
            {/* Joelho com patela */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.03, 16, 16]} />
              <meshStandardMaterial {...commonMaterial} color="#FFDBAC" />
            </mesh>
            <mesh position={[0, 0, 0.03]}>
              <sphereGeometry args={[0.015, 12, 12]} />
              <meshStandardMaterial color="#F5F5DC" />
            </mesh>
            
            {/* Tíbia e Fíbula */}
            <mesh position={[0, -0.1, 0]}>
              <cylinderGeometry args={[0.025, 0.02, 0.2, 12]} />
              <meshStandardMaterial {...commonMaterial} color="#FFDBAC" />
            </mesh>
            <mesh position={[0.015, -0.1, 0]}>
              <cylinderGeometry args={[0.008, 0.008, 0.18, 8]} />
              <meshStandardMaterial {...commonMaterial} color="#FFDBAC" />
            </mesh>
            
            {/* Músculos da coxa */}
            <mesh position={[0, 0.08, 0.025]}>
              <sphereGeometry args={[0.025, 12, 12]} />
              <meshStandardMaterial map={muscleTexture} color="#8B0000" />
            </mesh>
            <mesh position={[0, 0.08, -0.02]}>
              <sphereGeometry args={[0.02, 12, 12]} />
              <meshStandardMaterial map={muscleTexture} color="#A52A2A" />
            </mesh>
            
            {/* Panturrilha */}
            <mesh position={[0, -0.06, -0.015]}>
              <sphereGeometry args={[0.018, 12, 12]} />
              <meshStandardMaterial map={muscleTexture} color="#CD5C5C" />
            </mesh>
            
            {/* Pé anatômico */}
            <mesh position={[0, -0.22, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.025, 0.02, 0.08, 12]} />
              <meshStandardMaterial {...commonMaterial} color="#FFDBAC" />
            </mesh>
            
            {/* Dedos do pé */}
            {Array.from({ length: 5 }, (_, i) => (
              <mesh key={i} position={[-0.01 + i * 0.005, -0.22, 0.05]}>
                <sphereGeometry args={[0.004, 8, 8]} />
                <meshStandardMaterial {...commonMaterial} color="#FFDBAC" />
              </mesh>
            ))}
          </group>
        );

      default:
        return (
          <mesh>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color={part.color} />
          </mesh>
        );
    }
  };

  return (
    <group>
      <mesh
        ref={meshRef}
        position={part.position}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        {createRealisticGeometry(part.id)}
      </mesh>
      
      {isSelected && (
        <Text
          position={[part.position[0], part.position[1] + 0.3, part.position[2]]}
          fontSize={0.05}
          color="#2563EB"
          anchorX="center"
          anchorY="middle"
        >
          {part.nameHe}
        </Text>
      )}
    </group>
  );
};

const RealisticHumanModel: React.FC<RealisticHumanModelProps> = ({
  bodyParts,
  selectedPart,
  onPartClick,
  isRotating
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current && isRotating) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={groupRef} scale={[5, 5, 5]}>
      {bodyParts.map((part) => (
        <AnatomicalMesh
          key={part.id}
          part={part}
          isSelected={selectedPart?.id === part.id}
          onClick={() => onPartClick(part)}
        />
      ))}
      
      {/* Coluna vertebral anatomicamente precisa */}
      <group>
        {/* Vértebras cervicais (C1-C7) */}
        {Array.from({ length: 7 }, (_, i) => (
          <mesh key={`cervical-${i}`} position={[0, 0.55 - i * 0.02, -0.04]}>
            <cylinderGeometry args={[0.012, 0.012, 0.015, 8]} />
            <meshStandardMaterial color="#F5F5DC" />
          </mesh>
        ))}
        
        {/* Vértebras torácicas (T1-T12) */}
        {Array.from({ length: 12 }, (_, i) => (
          <mesh key={`thoracic-${i}`} position={[0, 0.4 - i * 0.018, -0.04]}>
            <cylinderGeometry args={[0.015, 0.015, 0.016, 8]} />
            <meshStandardMaterial color="#F5F5DC" />
          </mesh>
        ))}
        
        {/* Vértebras lombares (L1-L5) */}
        {Array.from({ length: 5 }, (_, i) => (
          <mesh key={`lumbar-${i}`} position={[0, 0.18 - i * 0.022, -0.04]}>
            <cylinderGeometry args={[0.018, 0.018, 0.02, 8]} />
            <meshStandardMaterial color="#F5F5DC" />
          </mesh>
        ))}
        
        {/* Sacro */}
        <mesh position={[0, 0.05, -0.04]}>
          <boxGeometry args={[0.04, 0.06, 0.02]} />
          <meshStandardMaterial color="#F5F5DC" />
        </mesh>
        
        {/* Cóccix */}
        <mesh position={[0, -0.02, -0.04]}>
          <coneGeometry args={[0.015, 0.03, 6]} />
          <meshStandardMaterial color="#F5F5DC" />
        </mesh>
      </group>
      
      {/* Clavículas anatômicas */}
      <mesh position={[-0.08, 0.38, 0.03]} rotation={[0, 0, Math.PI / 8]}>
        <cylinderGeometry args={[0.006, 0.006, 0.12, 8]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>
      <mesh position={[0.08, 0.38, 0.03]} rotation={[0, 0, -Math.PI / 8]}>
        <cylinderGeometry args={[0.006, 0.006, 0.12, 8]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>
      
      {/* Pelve realista */}
      <mesh position={[0, -0.1, 0]}>
        <torusGeometry args={[0.12, 0.025, 12, 24]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>
      
      {/* Omoplatas */}
      <mesh position={[-0.1, 0.3, -0.06]} rotation={[0, Math.PI / 6, 0]}>
        <boxGeometry args={[0.06, 0.08, 0.01]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>
      <mesh position={[0.1, 0.3, -0.06]} rotation={[0, -Math.PI / 6, 0]}>
        <boxGeometry args={[0.06, 0.08, 0.01]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>
      
      {/* Base anatômica com escala médica */}
      <mesh position={[0, -0.8, 0]} receiveShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.04, 32]} />
        <meshStandardMaterial color="#E8E8E8" />
      </mesh>
      
      {/* Sombra realista */}
      <mesh position={[0, -0.78, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.6, 1.2]} />
        <meshStandardMaterial color="#000000" opacity={0.15} transparent />
      </mesh>
    </group>
  );
};

export default RealisticHumanModel;
