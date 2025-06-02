
import React, { useState } from 'react';
import Header from '@/components/Header';
import BioDigitalHuman from '@/components/BioDigitalHuman';
import AnatomicalSystemInfo from '@/components/AnatomicalSystemInfo';

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
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 font-heebo" dir="rtl">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Atlas Anatômico BioDigital Human
          </h1>
          <p className="text-lg text-gray-600">
            Modelo 3D médico interativo com precisão anatômica baseado na plataforma BioDigital Human
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BioDigitalHuman 
              onSystemSelect={setSelectedSystem}
              selectedSystem={selectedSystem}
            />
          </div>

          <div className="space-y-4">
            <AnatomicalSystemInfo selectedSystem={selectedSystem} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanBody;
