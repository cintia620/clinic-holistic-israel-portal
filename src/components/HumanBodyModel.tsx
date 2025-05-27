
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

  // Function to create anatomically appropriate geometry
  const createAnatomicalGeometry = (partId: string, size: [number, number, number]) => {
    switch (partId) {
      case 'head':
        // Sphere for head
        return <sphereGeometry args={[size[0] * 0.6, 16, 16]} />;
      
      case 'chest':
        // Ellipsoid for chest (ribcage)
        return (
          <group>
            <sphereGeometry args={[size[0] * 0.6, size[1] * 0.8, size[2] * 0.5]} />
          </group>
        );
      
      case 'abdomen':
        // Slightly tapered cylinder for abdomen
        return <cylinderGeometry args={[size[0] * 0.4, size[0] * 0.5, size[1], 12]} />;
      
      case 'leftArm':
      case 'rightArm':
        // Capsule shape for arms (cylinder with rounded ends)
        return (
          <group>
            <cylinderGeometry args={[size[0] * 0.5, size[0] * 0.3, size[1], 8]} />
          </group>
        );
      
      case 'leftLeg':
      case 'rightLeg':
        // Tapered cylinder for legs (thicker at top)
        return <cylinderGeometry args={[size[0] * 0.6, size[0] * 0.4, size[1], 8]} />;
      
      default:
        return <boxGeometry args={size} />;
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
        {createAnatomicalGeometry(part.id, part.size)}
        <meshStandardMaterial
          color={part.color}
          transparent
          opacity={isSelected ? 0.9 : 0.8}
          emissive={isSelected ? part.color : '#000000'}
          emissiveIntensity={isSelected ? 0.2 : 0}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
      
      {/* Add joints/connections for realism */}
      {(part.id === 'leftArm' || part.id === 'rightArm') && (
        <mesh position={[part.position[0], part.position[1] + part.size[1] * 0.4, part.position[2]]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial color="#FFCCCB" opacity={0.8} transparent />
        </mesh>
      )}
      
      {(part.id === 'leftLeg' || part.id === 'rightLeg') && (
        <>
          {/* Hip joint */}
          <mesh position={[part.position[0], part.position[1] + part.size[1] * 0.4, part.position[2]]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color="#FFCCCB" opacity={0.8} transparent />
          </mesh>
          {/* Knee joint */}
          <mesh position={[part.position[0], part.position[1] - part.size[1] * 0.1, part.position[2]]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial color="#FFCCCB" opacity={0.8} transparent />
          </mesh>
        </>
      )}
      
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
      
      {/* Spine representation */}
      <mesh position={[0, 0.5, -0.1]}>
        <cylinderGeometry args={[0.05, 0.08, 3, 8]} />
        <meshStandardMaterial color="#F5F5DC" opacity={0.7} transparent />
      </mesh>
      
      {/* Base platform */}
      <mesh position={[0, -3.5, 0]} receiveShadow>
        <cylinderGeometry args={[2, 2, 0.1, 32]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
    </group>
  );
};

export default HumanBodyModel;
