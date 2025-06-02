
import React from 'react';
import Header from '@/components/Header';
import BioDigitalHuman from '@/components/BioDigitalHuman';

const HumanBody = () => {
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

        <div className="max-w-7xl mx-auto">
          <BioDigitalHuman />
        </div>
      </div>
    </div>
  );
};

export default HumanBody;
