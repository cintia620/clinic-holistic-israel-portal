
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text } from '@react-three/drei';
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

  const bodyParts: BodyPart[] = [
    {
      id: 'head',
      name: 'Head',
      nameHe: 'ראש',
      description: 'המוח והמערכת העצבית המרכזית',
      color: '#FFB6C1',
      position: [0, 2.5, 0],
      size: [0.8, 0.8, 0.8]
    },
    {
      id: 'chest',
      name: 'Chest',
      nameHe: 'חזה',
      description: 'הלב, הריאות ומערכת הנשימה',
      color: '#87CEEB',
      position: [0, 1.2, 0],
      size: [1.2, 1, 0.6]
    },
    {
      id: 'abdomen',
      name: 'Abdomen',
      nameHe: 'בטן',
      description: 'מערכת העיכול והכבד',
      color: '#98FB98',
      position: [0, 0, 0],
      size: [1, 0.8, 0.5]
    },
    {
      id: 'leftArm',
      name: 'Left Arm',
      nameHe: 'זרוע שמאל',
      description: 'שרירים, עצמות ומפרקים',
      color: '#DDA0DD',
      position: [-1.5, 1.2, 0],
      size: [0.3, 1.5, 0.3]
    },
    {
      id: 'rightArm',
      name: 'Right Arm',
      nameHe: 'זרוע ימין',
      description: 'שרירים, עצמות ומפרקים',
      color: '#DDA0DD',
      position: [1.5, 1.2, 0],
      size: [0.3, 1.5, 0.3]
    },
    {
      id: 'leftLeg',
      name: 'Left Leg',
      nameHe: 'רגל שמאל',
      description: 'שרירים, עצמות ומערכת הדם',
      color: '#F0E68C',
      position: [-0.4, -1.5, 0],
      size: [0.4, 2, 0.4]
    },
    {
      id: 'rightLeg',
      name: 'Right Leg',
      nameHe: 'רגל ימין',
      description: 'שרירים, עצמות ומערכת הדם',
      color: '#F0E68C',
      position: [0.4, -1.5, 0],
      size: [0.4, 2, 0.4]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 font-heebo" dir="rtl">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            מודל תלת-ממדי של גוף האדם
          </h1>
          <p className="text-lg text-gray-600">
            לחץ על חלקי הגוף השונים כדי ללמוד עליהם
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>מודל אינטראקטיבי</CardTitle>
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
                  <ambientLight intensity={0.6} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} />
                  
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
                <CardTitle>חלקי הגוף</CardTitle>
                <CardDescription>לחץ על החלקים להדגשה</CardDescription>
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
