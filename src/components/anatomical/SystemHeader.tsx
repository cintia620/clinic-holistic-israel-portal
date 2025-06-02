
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AnatomicalSystemData } from '@/types/anatomicalSystem';

interface SystemHeaderProps {
  systemInfo: AnatomicalSystemData;
}

const SystemHeader: React.FC<SystemHeaderProps> = ({ systemInfo }) => {
  return (
    <CardHeader>
      <div className="flex items-center gap-3">
        {systemInfo.icon}
        <div>
          <CardTitle className="text-xl">{systemInfo.name}</CardTitle>
          <CardDescription className="mt-2">
            {systemInfo.description}
          </CardDescription>
        </div>
      </div>
    </CardHeader>
  );
};

export default SystemHeader;
