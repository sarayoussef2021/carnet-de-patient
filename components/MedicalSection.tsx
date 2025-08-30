import React, { useState } from 'react';

interface MedicalSectionProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

const MedicalSection: React.FC<MedicalSectionProps> = ({
  title,
  icon,
  children,
  collapsible = true,
  defaultExpanded = true
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="card animate-fade-in">
      <div 
        className={`flex items-center justify-between p-6 ${
          collapsible ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700' : ''
        } transition-colors duration-200`}
        onClick={() => collapsible && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
            <span className="text-primary-600 dark:text-primary-400 text-lg">{icon}</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
        </div>
        {collapsible && (
          <span className={`text-gray-400 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}>
            ▼
          </span>
        )}
      </div>
      
      {isExpanded && (
        <div className="px-6 pb-6 animate-slide-up">
          {children}
        </div>
      )}
    </div>
  );
};

export default MedicalSection;
