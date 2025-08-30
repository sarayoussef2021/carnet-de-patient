import React, { useState, useMemo } from 'react';
import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import AppointmentCard from '@/components/AppointmentCard';
import FilterTabs from '@/components/FilterTabs';
import { RendezVous } from '@/types';
import rendezvousData from '@/data/rendezvous.json';

interface RendezVousPageProps {
  rendezvous: RendezVous[];
}

const RendezVousPage: React.FC<RendezVousPageProps> = ({ rendezvous }) => {
  const [activeFilter, setActiveFilter] = useState('Tous');

  const filters = ['Tous', 'À venir', 'Passés'];

  const filteredAppointments = useMemo(() => {
    switch (activeFilter) {
      case 'À venir':
        return rendezvous.filter(rdv => rdv.statut === 'a_venir');
      case 'Passés':
        return rendezvous.filter(rdv => rdv.statut === 'passe');
      default:
        return rendezvous;
    }
  }, [rendezvous, activeFilter]);

  const sortedAppointments = useMemo(() => {
    return [...filteredAppointments].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      
      if (activeFilter === 'À venir') {
        return dateA - dateB; // Plus proche en premier
      } else if (activeFilter === 'Passés') {
        return dateB - dateA; // Plus récent en premier
      } else {
        // Pour "Tous", on met les à venir en premier, puis les passés
        if (a.statut !== b.statut) {
          return a.statut === 'a_venir' ? -1 : 1;
        }
        return a.statut === 'a_venir' ? dateA - dateB : dateB - dateA;
      }
    });
  }, [filteredAppointments, activeFilter]);

  const getCounts = () => {
    return {
      'Tous': rendezvous.length,
      'À venir': rendezvous.filter(rdv => rdv.statut === 'a_venir').length,
      'Passés': rendezvous.filter(rdv => rdv.statut === 'passe').length,
    };
  };

  const getEmptyStateMessage = () => {
    switch (activeFilter) {
      case 'À venir':
        return {
          icon: '📅',
          title: 'Aucun rendez-vous à venir',
          message: 'Vous n\'avez pas de rendez-vous programmés pour le moment.'
        };
      case 'Passés':
        return {
          icon: '📋',
          title: 'Aucun rendez-vous passé',
          message: 'Votre historique de rendez-vous est vide.'
        };
      default:
        return {
          icon: '🏥',
          title: 'Aucun rendez-vous',
          message: 'Vous n\'avez pas encore de rendez-vous enregistrés.'
        };
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              📅 Mes rendez-vous
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Gérez vos consultations médicales passées et à venir
            </p>
          </div>
          <button className="btn-primary mt-4 sm:mt-0">
            + Nouveau rendez-vous
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 text-xl">📅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">À venir</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {getCounts()['À venir']}
                </p>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400 text-xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Passés</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {getCounts()['Passés']}
                </p>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400 text-xl">🏥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {getCounts()['Tous']}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <FilterTabs
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          counts={getCounts()}
        />

        {/* Appointments List */}
        {sortedAppointments.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                showDetails={true}
              />
            ))}
          </div>
        ) : (
          <div className="card p-12 text-center">
            <span className="text-6xl mb-4 block">{getEmptyStateMessage().icon}</span>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {getEmptyStateMessage().title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {getEmptyStateMessage().message}
            </p>
            <button className="btn-primary">
              Prendre un rendez-vous
            </button>
          </div>
        )}

        {/* Quick Actions */}
        {sortedAppointments.length > 0 && (
          <div className="card p-6 bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">
              Actions rapides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button className="flex items-center space-x-2 p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <span>📞</span>
                <span className="text-sm font-medium">Appeler un médecin</span>
              </button>
              <button className="flex items-center space-x-2 p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <span>📧</span>
                <span className="text-sm font-medium">Envoyer un message</span>
              </button>
              <button className="flex items-center space-x-2 p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <span>📄</span>
                <span className="text-sm font-medium">Télécharger historique</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Simuler un fetch d'API avec les données JSON
  const rendezvous = rendezvousData.rendezvous;

  return {
    props: {
      rendezvous,
    },
  };
};

export default RendezVousPage;
