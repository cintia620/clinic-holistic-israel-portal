
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
      meshRef.current.scale.setScalar(1 + Math.sin(Date.now() * 0.005) * 0.1);
    } else if (meshRef.current) {
      meshRef.current.scale.setScalar(1);
    }
  });

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
        <boxGeometry args={part.size} />
        <meshStandardMaterial
          color={part.color}
          transparent
          opacity={isSelected ? 0.9 : 0.7}
          emissive={isSelected ? part.color : '#000000'}
          emissiveIntensity={isSelected ? 0.2 : 0}
        />
      </mesh>
      
      {isSelected && (
        <Text
          position={[part.position[0], part.position[1] + part.size[1] + 0.5, part.position[2]]}
          fontSize={0.3}
          color="#333"
          anchorX="center"
          anchorY="middle"
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
      groupRef.current.rotation.y += 0.005;
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
      
      {/* Base platform */}
      <mesh position={[0, -3.5, 0]} receiveShadow>
        <cylinderGeometry args={[2, 2, 0.1, 32]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
    </group>
  );
};

export default HumanBodyModel;
