import React from 'react';
import { RendezVous } from '@/types';

interface AppointmentCardProps {
  appointment: RendezVous;
  showDetails?: boolean;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ 
  appointment, 
  showDetails = true 
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (statut: string) => {
    return statut === 'a_venir' ? 'status-a-venir' : 'status-passe';
  };

  return (
    <div className="card card-hover p-6 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
            <span className="text-primary-600 dark:text-primary-400 text-xl">👨‍⚕️</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
              {appointment.medecin}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {appointment.specialite}
            </p>
          </div>
        </div>
        <span className={`status-badge ${getStatusColor(appointment.statut)}`}>
          {appointment.statut === 'a_venir' ? 'À venir' : 'Passé'}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-500 dark:text-gray-400">📅</span>
          <span className="text-gray-700 dark:text-gray-300">
            {formatDate(appointment.date)}
          </span>
          {appointment.heure && (
            <>
              <span className="text-gray-400">•</span>
              <span className="text-gray-700 dark:text-gray-300">
                {appointment.heure}
              </span>
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-500 dark:text-gray-400">🏥</span>
          <span className="text-gray-700 dark:text-gray-300">
            {appointment.type}
          </span>
        </div>

        {showDetails && (
          <>
            <div className="flex items-start space-x-2 text-sm">
              <span className="text-gray-500 dark:text-gray-400 mt-0.5">📍</span>
              <span className="text-gray-700 dark:text-gray-300">
                {appointment.lieu}
              </span>
            </div>
            
            {appointment.notes && (
              <div className="flex items-start space-x-2 text-sm">
                <span className="text-gray-500 dark:text-gray-400 mt-0.5">📝</span>
                <span className="text-gray-700 dark:text-gray-300">
                  {appointment.notes}
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {appointment.statut === 'a_venir' && (
        <div className="flex space-x-2">
          <button className="btn-primary text-sm">
            Modifier
          </button>
          <button className="btn-secondary text-sm">
            Annuler
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
