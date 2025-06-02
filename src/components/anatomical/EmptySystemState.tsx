
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

const EmptySystemState: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações do Sistema</CardTitle>
        <CardDescription>
          Selecione um sistema anatômico para ver informações detalhadas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center text-gray-500 py-8">
          <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
          Clique em um sistema para acessar dados médicos especializados
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptySystemState;
