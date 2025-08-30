import React from 'react';
import { Recommandation } from '@/types';

interface HealthTipCardProps {
  tip: Recommandation;
  compact?: boolean;
}

const HealthTipCard: React.FC<HealthTipCardProps> = ({ tip, compact = false }) => {
  const getPriorityColor = (priorite: string) => {
    switch (priorite) {
      case 'haute':
        return 'priority-haute';
      case 'moyenne':
        return 'priority-moyenne';
      case 'basse':
        return 'priority-basse';
      default:
        return 'priority-moyenne';
    }
  };

  const getCategoryColor = (categorie: string) => {
    switch (categorie) {
      case 'Nutrition':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'Activité physique':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'Sommeil':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200';
      case 'Bien-être mental':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  if (compact) {
    return (
      <div className="card p-4 animate-fade-in">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{tip.icone}</span>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 dark:text-white">
              {tip.titre}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {tip.description}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card card-hover p-6 animate-slide-up">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-2xl">{tip.icone}</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
              {tip.titre}
            </h3>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getCategoryColor(tip.categorie)}`}>
              {tip.categorie}
            </span>
          </div>
        </div>
        <span className={`status-badge ${getPriorityColor(tip.priorite)}`}>
          {tip.priorite}
        </span>
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {tip.description}
      </p>

      <div className="flex space-x-2">
        <button className="btn-primary text-sm">
          ✓ Fait
        </button>
        <button className="btn-secondary text-sm">
          Plus tard
        </button>
      </div>
    </div>
  );
};

export default HealthTipCard;
