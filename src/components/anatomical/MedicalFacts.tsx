
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface MedicalFactsProps {
  facts: string[];
}

const MedicalFacts: React.FC<MedicalFactsProps> = ({ facts }) => {
  return (
    <div>
      <h4 className="font-semibold mb-3 text-purple-800">Dados Médicos</h4>
      <div className="grid gap-2">
        {facts.map((fact, index) => (
          <Badge key={index} variant="secondary" className="text-xs p-2 justify-start">
            {fact}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default MedicalFacts;
