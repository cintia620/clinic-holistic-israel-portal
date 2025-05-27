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

  // Anatomically proportioned body parts based on human anatomy
  const bodyParts: BodyPart[] = [
    {
      id: 'head',
      name: 'Head',
      nameHe: 'ראש',
      description: 'המוח, גולגולת ואיברי החושים - מרכז הבקרה של הגוף',
      color: '#FFCCCB',
      position: [0, 2.8, 0],
      size: [1, 1, 1] // Sphere radius will be calculated
    },
    {
      id: 'chest',
      name: 'Chest',
      nameHe: 'חזה',
      description: 'כלוב הצלעות, הלב והריאות - מרכז מערכת הנשימה והדם',
      color: '#FF6B6B',
      position: [0, 1.5, 0],
      size: [1.4, 1.2, 0.8] // Wider chest, anatomical proportions
    },
    {
      id: 'abdomen',
      name: 'Abdomen',
      nameHe: 'בטן',
      description: 'מערכת העיכול, הכבד, הכליות ואיברים חיוניים',
      color: '#4ECDC4',
      position: [0, 0.2, 0],
      size: [1.1, 1, 0.7] // Slightly narrower than chest
    },
    {
      id: 'leftArm',
      name: 'Left Arm',
      nameHe: 'זרוע שמאל',
      description: 'עצמות, שרירים, עצבים וכלי דם - כלי לפעילות ויצירה',
      color: '#95E1D3',
      position: [-1.3, 1.8, 0],
      size: [0.25, 1.8, 0.25] // More realistic arm proportions
    },
    {
      id: 'rightArm',
      name: 'Right Arm',
      nameHe: 'זרוע ימין',
      description: 'עצמות, שרירים, עצבים וכלי דם - כלי לפעילות ויצירה',
      color: '#95E1D3',
      position: [1.3, 1.8, 0],
      size: [0.25, 1.8, 0.25]
    },
    {
      id: 'leftLeg',
      name: 'Left Leg',
      nameHe: 'רגל שמאל',
      description: 'עצם הירך, השוק, שרירים חזקים - תומכת במשקל ובתנועה',
      color: '#A8E6CF',
      position: [-0.35, -1.3, 0],
      size: [0.35, 2.2, 0.35] // Stronger, longer legs
    },
    {
      id: 'rightLeg',
      name: 'Right Leg',
      nameHe: 'רגל ימין',
      description: 'עצם הירך, השוק, שרירים חזקים - תומכת במשקל ובתנועה',
      color: '#A8E6CF',
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
            מודל אנטומי תלת-ממדי של גוף האדם
          </h1>
          <p className="text-lg text-gray-600">
            חקר את מבנה הגוף האנושי - לחץ על חלקי הגוף השונים כדי ללמוד על האנטומיה והפיזיולוגיה
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>מודל אנטומי אינטראקטיבי</CardTitle>
                  <Button
                    onClick={() => setIsRotating(!isRotating)}
                    variant={isRotating ? "default" : "outline"}
                  >
                    {isRotating ? "עצור סיבוב" : "התחל סיבוב"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="h-full p-0">
                <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                  <ambientLight intensity={0.4} />
                  <pointLight position={[10, 10, 10]} intensity={0.8} />
                  <pointLight position={[-10, -10, -10]} intensity={0.3} />
                  <directionalLight position={[5, 5, 5]} intensity={0.5} />
                  
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
                    minDistance={3}
                    maxDistance={15}
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
                <CardTitle>מערכות הגוף</CardTitle>
                <CardDescription>לחץ על החלקים להדגשה אנטומית</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {bodyParts.map((part) => (
                    <Button
                      key={part.id}
                      variant={selectedPart?.id === part.id ? "default" : "outline"}
                      className="w-full justify-start"
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
