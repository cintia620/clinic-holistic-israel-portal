
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import RealisticHumanModel from '@/components/RealisticHumanModel';
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

  // Proporções anatômicas baseadas no Homem Vitruviano e Atlas de Anatomia Humana
  const bodyParts: BodyPart[] = [
    {
      id: 'head',
      name: 'Head',
      nameHe: 'ראש - Caput',
      description: 'Estrutura craniana contendo o encéfalo (1,4kg), órgãos sensoriais e cavidades nasais e orais. Composta por 22 ossos: 8 do neurocranium e 14 do viscerocranium.',
      color: '#FFDBAC',
      position: [0, 0.56, 0],
      size: [1, 1, 1]
    },
    {
      id: 'chest',
      name: 'Thorax',
      nameHe: 'חזה - Thorax',
      description: 'Cavidade torácica protegida por 12 pares de costelas e esterno, contendo coração (300g), pulmões (600g cada) e mediastino. Volume: 4-6 litros.',
      color: '#FFB6C1',
      position: [0, 0.3, 0],
      size: [1.4, 1.2, 0.8]
    },
    {
      id: 'abdomen',
      name: 'Abdomen',
      nameHe: 'בטן - Abdomen',
      description: 'Cavidade abdominal com órgãos digestivos: fígado (1,5kg), intestino delgado (6m), rins (150g cada), baço (150g) e pâncreas (80g).',
      color: '#FFCCCB',
      position: [0, 0.04, 0],
      size: [1.1, 1, 0.7]
    },
    {
      id: 'leftArm',
      name: 'Membrum Superius Sinistrum',
      nameHe: 'זרוע שמאל - Brachium',
      description: 'Membro superior esquerdo: úmero (36cm), rádio e ulna (26cm), 8 ossos do carpo, 5 metacarpos, 14 falanges. Total: 30 ossos e 39 músculos.',
      color: '#FFDBAC',
      position: [-0.26, 0.36, 0],
      size: [0.25, 1.8, 0.25]
    },
    {
      id: 'rightArm',
      name: 'Membrum Superius Dextrum',
      nameHe: 'זרוע ימין - Brachium',
      description: 'Membro superior direito: úmero (36cm), rádio e ulna (26cm), 8 ossos do carpo, 5 metacarpos, 14 falanges. Total: 30 ossos e 39 músculos.',
      color: '#FFDBAC',
      position: [0.26, 0.36, 0],
      size: [0.25, 1.8, 0.25]
    },
    {
      id: 'leftLeg',
      name: 'Membrum Inferius Sinistrum',
      nameHe: 'רגל שמאל - Crus',
      description: 'Membro inferior esquerdo: fêmur (48cm - maior osso), tíbia (37cm), fíbula (36cm), patela, 7 ossos do tarso, 5 metatarsos, 14 falanges.',
      color: '#FFDBAC',
      position: [-0.07, -0.26, 0],
      size: [0.35, 2.2, 0.35]
    },
    {
      id: 'rightLeg',
      name: 'Membrum Inferius Dextrum',
      nameHe: 'רגל ימין - Crus',
      description: 'Membro inferior direito: fêmur (48cm - maior osso), tíbia (37cm), fíbula (36cm), patela, 7 ossos do tarso, 5 metatarsos, 14 falanges.',
      color: '#FFDBAC',
      position: [0.07, -0.26, 0],
      size: [0.35, 2.2, 0.35]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 font-heebo" dir="rtl">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Atlas Anatômico Digital 3D - Corpus Humanum
          </h1>
          <p className="text-lg text-gray-600">
            Modelo anatômico realista baseado em atlas médicos de Gray e Netter - Explore cada sistema do corpo humano
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="h-[700px]">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Modelo Anatômico 3D Realista - Atlas Médico</CardTitle>
                  <Button
                    onClick={() => setIsRotating(!isRotating)}
                    variant={isRotating ? "default" : "outline"}
                  >
                    {isRotating ? "עצור סיבוב" : "התחל סיבוב"}
                  </Button>
                </div>
                <CardDescription>
                  Baseado em estudos anatômicos de cadáveres e imagens médicas de alta resolução
                </CardDescription>
              </CardHeader>
              <CardContent className="h-full p-0">
                <Canvas 
                  camera={{ position: [0, 0, 2], fov: 60 }}
                  shadows
                >
                  {/* Iluminação médica especializada para visualização anatômica */}
                  <ambientLight intensity={0.4} />
                  <directionalLight 
                    position={[5, 5, 2]} 
                    intensity={1.5} 
                    castShadow
                    shadow-mapSize-width={4096}
                    shadow-mapSize-height={4096}
                    shadow-camera-near={0.1}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                  />
                  <pointLight position={[-5, 5, 5]} intensity={0.8} color="#ffffff" />
                  <pointLight position={[5, -5, -5]} intensity={0.6} color="#87CEEB" />
                  <spotLight 
                    position={[0, 8, 0]} 
                    intensity={0.8} 
                    angle={Math.PI / 4}
                    penumbra={0.3}
                    castShadow
                  />
                  
                  <RealisticHumanModel
                    bodyParts={bodyParts}
                    selectedPart={selectedPart}
                    onPartClick={setSelectedPart}
                    isRotating={isRotating}
                  />
                  
                  <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={1}
                    maxDistance={8}
                    maxPolarAngle={Math.PI * 0.85}
                    minPolarAngle={Math.PI * 0.15}
                    enableDamping={true}
                    dampingFactor={0.05}
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
                <CardDescription>Atlas interativo baseado em livros de medicina</CardDescription>
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
