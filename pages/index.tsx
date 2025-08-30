import React from 'react';
import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import AppointmentCard from '@/components/AppointmentCard';
import HealthTipCard from '@/components/HealthTipCard';
import { RendezVous, Recommandation } from '@/types';
import rendezvousData from '@/data/rendezvous.json';
import recommandationsData from '@/data/recommandations.json';
import dossierData from '@/data/dossier.json';

interface HomeProps {
  dernierRendezVous: RendezVous | null;
  prochainRendezVous: RendezVous | null;
  recommandationDuJour: Recommandation;
  prenomPatient: string;
}

const Home: React.FC<HomeProps> = ({ 
  dernierRendezVous, 
  prochainRendezVous, 
  recommandationDuJour, 
  prenomPatient 
}) => {
  const getCurrentTime = () => {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="card p-8 text-center bg-gradient-to-r from-primary-50 to-medical-50 dark:from-primary-900 dark:to-medical-900">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {getCurrentTime()}, {prenomPatient} ! 👋
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Bienvenue sur votre carnet de santé numérique
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600 dark:text-blue-400 text-xl">📅</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Rendez-vous</h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
              {prochainRendezVous ? '1' : '0'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">à venir</p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-600 dark:text-green-400 text-xl">💊</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Traitements</h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">2</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">en cours</p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-purple-600 dark:text-purple-400 text-xl">💡</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Conseils</h3>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">10</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">disponibles</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Derniers rendez-vous */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              📅 Vos rendez-vous
            </h2>
            
            {prochainRendezVous && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Prochain rendez-vous
                </h3>
                <AppointmentCard appointment={prochainRendezVous} showDetails={false} />
              </div>
            )}
            
            {dernierRendezVous && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Dernier rendez-vous
                </h3>
                <AppointmentCard appointment={dernierRendezVous} showDetails={false} />
              </div>
            )}
            
            {!prochainRendezVous && !dernierRendezVous && (
              <div className="card p-8 text-center">
                <span className="text-4xl mb-4 block">📅</span>
                <p className="text-gray-500 dark:text-gray-400">
                  Aucun rendez-vous récent
                </p>
              </div>
            )}
          </div>

          {/* Recommandation du jour */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              💡 Conseil santé du jour
            </h2>
            <HealthTipCard tip={recommandationDuJour} />
            
            {/* Actions rapides */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Actions rapides
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="card p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <span className="text-2xl block mb-2">📋</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Mon dossier
                  </span>
                </button>
                <button className="card p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <span className="text-2xl block mb-2">📞</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Urgences
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Rappels importants */}
        <div className="card p-6 bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-700">
          <div className="flex items-start space-x-3">
            <span className="text-yellow-600 dark:text-yellow-400 text-xl">⚠️</span>
            <div>
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                Rappels importants
              </h3>
              <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                <li>• Prendre votre traitement quotidien (Lisinopril)</li>
                <li>• Vaccination grippe à prévoir (novembre 2024)</li>
                <li>• Contrôle annuel chez votre médecin traitant</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Simuler un fetch d'API avec les données JSON
  const rendezvous = rendezvousData.rendezvous;
  const recommandationDuJour = recommandationsData.recommandationDuJour;
  const prenomPatient = dossierData.patient.prenom;

  // Trouver le dernier rendez-vous passé
  const rendezVousPasses = rendezvous
    .filter(rdv => rdv.statut === 'passe')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const dernierRendezVous = rendezVousPasses.length > 0 ? rendezVousPasses[0] : null;

  // Trouver le prochain rendez-vous
  const rendezVousAVenir = rendezvous
    .filter(rdv => rdv.statut === 'a_venir')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const prochainRendezVous = rendezVousAVenir.length > 0 ? rendezVousAVenir[0] : null;

  return {
    props: {
      dernierRendezVous,
      prochainRendezVous,
      recommandationDuJour,
      prenomPatient,
    },
  };
};

export default Home;
