
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const SystemNotFound: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <p className="text-gray-500">Sistema não encontrado</p>
      </CardContent>
    </Card>
  );
};

export default SystemNotFound;
