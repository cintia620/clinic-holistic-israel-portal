
import React from 'react';

interface SystemSectionProps {
  title: string;
  items: string[];
  color: string;
}

const SystemSection: React.FC<SystemSectionProps> = ({ title, items, color }) => {
  return (
    <div>
      <h4 className={`font-semibold mb-3 text-${color}-800 flex items-center gap-2`}>
        <div className={`w-2 h-2 rounded-full bg-${color}-600`} />
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <div className={`w-1 h-1 rounded-full bg-${color}-500 mt-2 flex-shrink-0`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SystemSection;
