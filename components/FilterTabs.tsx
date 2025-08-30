import React from 'react';

interface FilterTabsProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  counts?: { [key: string]: number };
}

const FilterTabs: React.FC<FilterTabsProps> = ({ 
  filters, 
  activeFilter, 
  onFilterChange, 
  counts 
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
            activeFilter === filter
              ? 'bg-primary-600 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {filter}
          {counts && counts[filter] !== undefined && (
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              activeFilter === filter
                ? 'bg-white bg-opacity-20 text-white'
                : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
            }`}>
              {counts[filter]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
