
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getSystemInfo } from '@/data/anatomicalSystems';
import SystemHeader from '@/components/anatomical/SystemHeader';
import SystemSection from '@/components/anatomical/SystemSection';
import MedicalFacts from '@/components/anatomical/MedicalFacts';
import EmptySystemState from '@/components/anatomical/EmptySystemState';
import SystemNotFound from '@/components/anatomical/SystemNotFound';

interface AnatomicalSystemInfoProps {
  selectedSystem: string | null;
}

const AnatomicalSystemInfo: React.FC<AnatomicalSystemInfoProps> = ({ 
  selectedSystem 
}) => {
  if (!selectedSystem) {
    return <EmptySystemState />;
  }

  const systemInfo = getSystemInfo(selectedSystem);
  
  if (!systemInfo) {
    return <SystemNotFound />;
  }

  return (
    <Card className="max-h-[600px] overflow-y-auto">
      <SystemHeader systemInfo={systemInfo} />
      <CardContent className="space-y-6">
        <SystemSection 
          title="Estruturas Anatômicas"
          items={systemInfo.structures}
          color="blue"
        />

        <SystemSection 
          title="Funções Fisiológicas"
          items={systemInfo.functions}
          color="green"
        />

        <SystemSection 
          title="Distúrbios Comuns"
          items={systemInfo.disorders}
          color="red"
        />

        <MedicalFacts facts={systemInfo.facts} />
      </CardContent>
    </Card>
  );
};

export default AnatomicalSystemInfo;
