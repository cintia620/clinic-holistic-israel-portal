import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import HumanBodyModel from '@/components/HumanBodyModel';
import BodyPartInfo from '@/components/BodyPartInfo';

export interface BodyPart {
  id: string;
  name: string;
  nameHe: string;
  description: string;
  color: string;
  position: [number, number, number];
  size: [number, number, number];
}

const HumanBody = () => {
  const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null);
  const [isRotating, setIsRotating] = useState(true);

  // Proporções anatômicas baseadas no Homem Vitruviano e estudos médicos
  const bodyParts: BodyPart[] = [
    {
      id: 'head',
      name: 'Head',
      nameHe: 'ראש - Caput',
      description: 'Estrutura craniana contendo o encéfalo, órgãos sensoriais e cavidades nasais e orais',
      color: '#FFDBAC',
      position: [0, 2.8, 0],
      size: [1, 1, 1]
    },
    {
      id: 'chest',
      name: 'Thorax',
      nameHe: 'חזה - Thorax',
      description: 'Cavidade torácica protegida pelas costelas, contendo coração, pulmões e grandes vasos',
      color: '#FFB6C1',
      position: [0, 1.5, 0],
      size: [1.4, 1.2, 0.8]
    },
    {
      id: 'abdomen',
      name: 'Abdomen',
      nameHe: 'בטן - Abdomen',
      description: 'Cavidade abdominal com órgãos digestivos, fígado, baço, pâncreas e rins',
      color: '#FFCCCB',
      position: [0, 0.2, 0],
      size: [1.1, 1, 0.7]
    },
    {
      id: 'leftArm',
      name: 'Membrum Superius Sinistrum',
      nameHe: 'זרוע שמאל - Brachium',
      description: 'Membro superior esquerdo: úmero, rádio, ulna, músculos flexores e extensores',
      color: '#FFDBAC',
      position: [-1.3, 1.8, 0],
      size: [0.25, 1.8, 0.25]
    },
    {
      id: 'rightArm',
      name: 'Membrum Superius Dextrum',
      nameHe: 'זרוע ימין - Brachium',
      description: 'Membro superior direito: úmero, rádio, ulna, músculos flexores e extensores',
      color: '#FFDBAC',
      position: [1.3, 1.8, 0],
      size: [0.25, 1.8, 0.25]
    },
    {
      id: 'leftLeg',
      name: 'Membrum Inferius Sinistrum',
      nameHe: 'רגל שמאל - Crus',
      description: 'Membro inferior esquerdo: fêmur, tíbia, fíbula, músculos quadríceps e isquiotibiais',
      color: '#FFDBAC',
      position: [-0.35, -1.3, 0],
      size: [0.35, 2.2, 0.35]
    },
    {
      id: 'rightLeg',
      name: 'Membrum Inferius Dextrum',
      nameHe: 'רגל ימין - Crus',
      description: 'Membro inferior direito: fêmur, tíbia, fíbula, músculos quadríceps e isquiotibiais',
      color: '#FFDBAC',
      position: [0.35, -1.3, 0],
      size: [0.35, 2.2, 0.35]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 font-heebo" dir="rtl">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Atlas Anatômico Digital - Corpus Humanum
          </h1>
          <p className="text-lg text-gray-600">
            Modelo anatômico baseado em estudos médicos e livros de anatomia humana - Explore cada sistema do corpo
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="h-[700px]">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Modelo Anatômico 3D - Estudo Médico</CardTitle>
                  <Button
                    onClick={() => setIsRotating(!isRotating)}
                    variant={isRotating ? "default" : "outline"}
                  >
                    {isRotating ? "עצור סיבוב" : "התחל סיבוב"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="h-full p-0">
                <Canvas 
                  camera={{ position: [0, 0, 10], fov: 45 }}
                  shadows
                >
                  {/* Iluminação médica especializada */}
                  <ambientLight intensity={0.3} />
                  <directionalLight 
                    position={[10, 10, 5]} 
                    intensity={1.2} 
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                  />
                  <pointLight position={[-10, 10, 10]} intensity={0.8} color="#ffffff" />
                  <pointLight position={[10, -10, -10]} intensity={0.4} color="#87CEEB" />
                  <spotLight 
                    position={[0, 15, 0]} 
                    intensity={0.6} 
                    angle={Math.PI / 6}
                    penumbra={0.5}
                    castShadow
                  />
                  
                  <HumanBodyModel
                    bodyParts={bodyParts}
                    selectedPart={selectedPart}
                    onPartClick={setSelectedPart}
                    isRotating={isRotating}
                  />
                  
                  <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={4}
                    maxDistance={20}
                    maxPolarAngle={Math.PI * 0.8}
                    minPolarAngle={Math.PI * 0.2}
                  />
                  
                  <Environment preset="studio" />
                </Canvas>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <BodyPartInfo selectedPart={selectedPart} />
            
            <Card>
              <CardHeader>
                <CardTitle>Sistemas Anatômicos</CardTitle>
                <CardDescription>Clique para visualizar estruturas específicas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {bodyParts.map((part) => (
                    <Button
                      key={part.id}
                      variant={selectedPart?.id === part.id ? "default" : "outline"}
                      className="w-full justify-start text-right"
                      onClick={() => setSelectedPart(part)}
                    >
                      <div
                        className="w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: part.color }}
                      />
                      {part.nameHe}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanBody;
