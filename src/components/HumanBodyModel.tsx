
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { BodyPart } from '@/pages/HumanBody';

interface HumanBodyModelProps {
  bodyParts: BodyPart[];
  selectedPart: BodyPart | null;
  onPartClick: (part: BodyPart) => void;
  isRotating: boolean;
}

const BodyPartMesh: React.FC<{
  part: BodyPart;
  isSelected: boolean;
  onClick: () => void;
}> = ({ part, isSelected, onClick }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current && isSelected) {
      meshRef.current.scale.setScalar(1 + Math.sin(Date.now() * 0.005) * 0.05);
    } else if (meshRef.current) {
      meshRef.current.scale.setScalar(1);
    }
  });

  // Função para criar geometrias anatômicas realistas
  const createAnatomicalGeometry = (partId: string) => {
    switch (partId) {
      case 'head':
        // Cabeça com formato oval realista
        return (
          <group>
            {/* Crânio principal */}
            <mesh>
              <sphereGeometry args={[0.9, 32, 32]} />
              <meshLambertMaterial color="#FFDBAC" />
            </mesh>
            {/* Face - formato mais achatado */}
            <mesh position={[0, -0.2, 0.7]}>
              <sphereGeometry args={[0.6, 16, 16]} />
              <meshLambertMaterial color="#FFDBAC" />
            </mesh>
            {/* Olhos */}
            <mesh position={[-0.25, 0.1, 0.8]}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshLambertMaterial color="#87CEEB" />
            </mesh>
            <mesh position={[0.25, 0.1, 0.8]}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshLambertMaterial color="#87CEEB" />
            </mesh>
            {/* Nariz */}
            <mesh position={[0, -0.1, 0.85]}>
              <coneGeometry args={[0.08, 0.2, 8]} />
              <meshLambertMaterial color="#FFDBAC" />
            </mesh>
          </group>
        );
      
      case 'chest':
        // Tórax com formato de caixa torácica
        return (
          <group>
            {/* Caixa torácica principal */}
            <mesh>
              <sphereGeometry args={[1.1, 1.4, 0.9]} />
              <meshLambertMaterial color="#FFB6C1" />
            </mesh>
            {/* Costelas visíveis */}
            {Array.from({ length: 6 }, (_, i) => (
              <mesh key={i} position={[0, 0.5 - i * 0.15, 0.8]} rotation={[0, 0, Math.PI / 2]}>
                <torusGeometry args={[0.6 + i * 0.05, 0.02, 8, 16]} />
                <meshLambertMaterial color="#F0E68C" opacity={0.7} transparent />
              </mesh>
            ))}
            {/* Esterno */}
            <mesh position={[0, 0, 0.9]}>
              <boxGeometry args={[0.1, 1.2, 0.05]} />
              <meshLambertMaterial color="#F0E68C" />
            </mesh>
          </group>
        );
      
      case 'abdomen':
        // Abdômen com músculos abdominais
        return (
          <group>
            {/* Abdômen principal */}
            <mesh>
              <cylinderGeometry args={[0.8, 0.9, 1.2, 16]} />
              <meshLambertMaterial color="#FFCCCB" />
            </mesh>
            {/* Músculos abdominais "six-pack" */}
            {Array.from({ length: 6 }, (_, i) => (
              <mesh key={i} position={[(i % 2 === 0 ? -0.2 : 0.2), 0.4 - Math.floor(i / 2) * 0.25, 0.7]}>
                <sphereGeometry args={[0.12, 8, 8]} />
                <meshLambertMaterial color="#FF9999" />
              </mesh>
            ))}
            {/* Umbigo */}
            <mesh position={[0, -0.1, 0.75]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshLambertMaterial color="#CD853F" />
            </mesh>
          </group>
        );
      
      case 'leftArm':
      case 'rightArm':
        const isLeft = partId === 'leftArm';
        return (
          <group>
            {/* Braço superior (úmero) */}
            <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.18, 0.15, 0.8, 12]} />
              <meshLambertMaterial color="#FFDBAC" />
            </mesh>
            {/* Cotovelo */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.15, 12, 12]} />
              <meshLambertMaterial color="#FFDBAC" />
            </mesh>
            {/* Antebraço (rádio e ulna) */}
            <mesh position={[0, -0.4, 0]}>
              <cylinderGeometry args={[0.15, 0.12, 0.8, 12]} />
              <meshLambertMaterial color="#FFDBAC" />
            </mesh>
            {/* Músculos bíceps */}
            <mesh position={[isLeft ? 0.12 : -0.12, 0.3, 0]}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshLambertMaterial color="#FF9999" />
            </mesh>
            {/* Mão */}
            <mesh position={[0, -0.85, 0]}>
              <sphereGeometry args={[0.12, 12, 12]} />
              <meshLambertMaterial color="#FFDBAC" />
            </mesh>
          </group>
        );
      
      case 'leftLeg':
      case 'rightLeg':
        return (
          <group>
            {/* Coxa (fêmur) */}
            <mesh position={[0, 0.5, 0]}>
              <cylinderGeometry args={[0.25, 0.2, 1, 12]} />
              <meshLambertMaterial color="#FFDBAC" />
            </mesh>
            {/* Joelho */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.18, 12, 12]} />
              <meshLambertMaterial color="#FFDBAC" />
            </mesh>
            {/* Panturrilha (tíbia e fíbula) */}
            <mesh position={[0, -0.5, 0]}>
              <cylinderGeometry args={[0.18, 0.15, 1, 12]} />
              <meshLambertMaterial color="#FFDBAC" />
            </mesh>
            {/* Músculos da coxa */}
            <mesh position={[0, 0.4, 0.15]}>
              <sphereGeometry args={[0.15, 8, 8]} />
              <meshLambertMaterial color="#FF9999" />
            </mesh>
            {/* Músculos da panturrilha */}
            <mesh position={[0, -0.3, -0.12]}>
              <sphereGeometry args={[0.12, 8, 8]} />
              <meshLambertMaterial color="#FF9999" />
            </mesh>
            {/* Pé */}
            <mesh position={[0, -1.1, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.12, 0.1, 0.3, 12]} />
              <meshLambertMaterial color="#FFDBAC" />
            </mesh>
          </group>
        );
      
      default:
        return <sphereGeometry args={[0.5, 16, 16]} />;
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
        {createAnatomicalGeometry(part.id)}
      </mesh>
      
      {isSelected && (
        <Text
          position={[part.position[0], part.position[1] + 1.5, part.position[2]]}
          fontSize={0.3}
          color="#2563EB"
          anchorX="center"
          anchorY="middle"
          font="/fonts/helvetiker_regular.typeface.json"
        >
          {part.nameHe}
        </Text>
      )}
    </group>
  );
};

const HumanBodyModel: React.FC<HumanBodyModelProps> = ({
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
    <group ref={groupRef}>
      {bodyParts.map((part) => (
        <BodyPartMesh
          key={part.id}
          part={part}
          isSelected={selectedPart?.id === part.id}
          onClick={() => onPartClick(part)}
        />
      ))}
      
      {/* Coluna vertebral anatomicamente correta */}
      <group>
        {Array.from({ length: 24 }, (_, i) => (
          <mesh key={i} position={[0, 2.5 - i * 0.2, -0.3]}>
            <cylinderGeometry args={[0.08, 0.08, 0.15, 8]} />
            <meshLambertMaterial color="#F5F5DC" />
          </mesh>
        ))}
      </group>
      
      {/* Clavículas */}
      <mesh position={[-0.6, 2, 0.2]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
        <meshLambertMaterial color="#F5F5DC" />
      </mesh>
      <mesh position={[0.6, 2, 0.2]} rotation={[0, 0, -Math.PI / 6]}>
        <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
        <meshLambertMaterial color="#F5F5DC" />
      </mesh>
      
      {/* Pelve */}
      <mesh position={[0, -0.5, 0]}>
        <torusGeometry args={[0.7, 0.15, 8, 16]} />
        <meshLambertMaterial color="#F5F5DC" />
      </mesh>
      
      {/* Base anatômica */}
      <mesh position={[0, -4, 0]} receiveShadow>
        <cylinderGeometry args={[2.5, 2.5, 0.2, 32]} />
        <meshLambertMaterial color="#E8E8E8" />
      </mesh>
      
      {/* Sombra do corpo */}
      <mesh position={[0, -3.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 6]} />
        <meshLambertMaterial color="#000000" opacity={0.1} transparent />
      </mesh>
    </group>
  );
};

export default HumanBodyModel;
