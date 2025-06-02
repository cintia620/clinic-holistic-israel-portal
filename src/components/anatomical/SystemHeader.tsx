
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AnatomicalSystemData } from '@/types/anatomicalSystem';

interface SystemHeaderProps {
  systemInfo: AnatomicalSystemData;
}

const SystemHeader: React.FC<SystemHeaderProps> = ({ systemInfo }) => {
  const IconComponent = systemInfo.icon;
  
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-3">
        <IconComponent className="w-6 h-6" />
        {systemInfo.name}
      </CardTitle>
      <CardDescription>{systemInfo.description}</CardDescription>
    </CardHeader>
  );
};

export default SystemHeader;
