import React from 'react';
import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import MedicalSection from '@/components/MedicalSection';
import { DossierMedical, Antecedent, Allergie, Traitement, Vaccination } from '@/types';
import dossierData from '@/data/dossier.json';

interface DossierPageProps {
  dossier: DossierMedical;
}

const DossierPage: React.FC<DossierPageProps> = ({ dossier }) => {
  const formatDate = (dateString: string) => {
    if (dateString === 'Antécédent familial' || dateString === 'Information patient') {
      return dateString;
    }
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  const AntecedentItem: React.FC<{ antecedent: Antecedent }> = ({ antecedent }) => (
    <div className="border-l-4 border-blue-400 pl-4 py-3 bg-blue-50 dark:bg-blue-900 rounded-r-lg mb-3">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-900 dark:text-white">{antecedent.description}</h4>
        <span className="text-xs bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
          {antecedent.type}
        </span>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p>📅 {formatDate(antecedent.date)}</p>
        <p>👨‍⚕️ {antecedent.medecin}</p>
      </div>
    </div>
  );

  const AllergieItem: React.FC<{ allergie: Allergie }> = ({ allergie }) => (
    <div className="border-l-4 border-red-400 pl-4 py-3 bg-red-50 dark:bg-red-900 rounded-r-lg mb-3">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-900 dark:text-white">{allergie.substance}</h4>
        <span className={`text-xs px-2 py-1 rounded-full ${
          allergie.severite === 'Modérée' 
            ? 'bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200'
            : allergie.severite === 'Légère'
            ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
            : 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200'
        }`}>
          {allergie.severite}
        </span>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p>🏷️ {allergie.type}</p>
        <p>⚠️ {allergie.reaction}</p>
        <p>📅 Découverte: {formatDate(allergie.dateDecouverte)}</p>
      </div>
    </div>
  );

  const TraitementItem: React.FC<{ traitement: Traitement }> = ({ traitement }) => (
    <div className={`border-l-4 pl-4 py-3 rounded-r-lg mb-3 ${
      traitement.statut === 'En cours'
        ? 'border-green-400 bg-green-50 dark:bg-green-900'
        : 'border-gray-400 bg-gray-50 dark:bg-gray-800'
    }`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-900 dark:text-white">{traitement.medicament}</h4>
        <span className={`text-xs px-2 py-1 rounded-full ${
          traitement.statut === 'En cours'
            ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
        }`}>
          {traitement.statut}
        </span>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p>💊 {traitement.posologie}</p>
        <p>🎯 {traitement.indication}</p>
        <p>📅 Du {formatDate(traitement.dateDebut)} {traitement.dateFin ? `au ${formatDate(traitement.dateFin)}` : '(en cours)'}</p>
        <p>👨‍⚕️ {traitement.medecin}</p>
      </div>
    </div>
  );

  const VaccinationItem: React.FC<{ vaccination: Vaccination }> = ({ vaccination }) => {
    const isRappelDue = new Date(vaccination.rappel) <= new Date();
    
    return (
      <div className={`border-l-4 pl-4 py-3 rounded-r-lg mb-3 ${
        isRappelDue 
          ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900'
          : 'border-purple-400 bg-purple-50 dark:bg-purple-900'
      }`}>
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium text-gray-900 dark:text-white">{vaccination.vaccin}</h4>
          {isRappelDue && (
            <span className="text-xs bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full">
              Rappel dû
            </span>
          )}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>💉 Fait le: {formatDate(vaccination.date)}</p>
          <p>🔄 Rappel: {formatDate(vaccination.rappel)}</p>
          <p>📍 {vaccination.lieu}</p>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              📋 Mon dossier médical
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Informations médicales et historique de santé
            </p>
          </div>
          <button className="btn-primary mt-4 sm:mt-0">
            📄 Exporter le dossier
          </button>
        </div>

        {/* Patient Info */}
        <div className="card p-6 bg-gradient-to-r from-primary-50 to-medical-50 dark:from-primary-900 dark:to-medical-900">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">👤</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {dossier.patient.prenom} {dossier.patient.nom}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Né(e) le {formatDate(dossier.patient.dateNaissance)}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <span>🆔</span>
              <span className="text-gray-700 dark:text-gray-300">{dossier.patient.numeroSecu}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🩸</span>
              <span className="text-gray-700 dark:text-gray-300">Groupe {dossier.patient.groupeSanguin}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>👨‍⚕️</span>
              <span className="text-gray-700 dark:text-gray-300">{dossier.patient.medecinTraitant}</span>
            </div>
          </div>
        </div>

        {/* Medical Sections */}
        <div className="space-y-6">
          {/* Antécédents */}
          <MedicalSection title="Antécédents médicaux" icon="📚">
            {dossier.antecedents.length > 0 ? (
              <div>
                {dossier.antecedents.map((antecedent) => (
                  <AntecedentItem key={antecedent.id} antecedent={antecedent} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                Aucun antécédent médical enregistré
              </p>
            )}
          </MedicalSection>

          {/* Allergies */}
          <MedicalSection title="Allergies" icon="⚠️">
            {dossier.allergies.length > 0 ? (
              <div>
                {dossier.allergies.map((allergie) => (
                  <AllergieItem key={allergie.id} allergie={allergie} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                Aucune allergie connue
              </p>
            )}
          </MedicalSection>

          {/* Traitements */}
          <MedicalSection title="Traitements en cours" icon="💊">
            {dossier.traitements.length > 0 ? (
              <div>
                {dossier.traitements.map((traitement) => (
                  <TraitementItem key={traitement.id} traitement={traitement} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                Aucun traitement en cours
              </p>
            )}
          </MedicalSection>

          {/* Vaccinations */}
          <MedicalSection title="Vaccinations" icon="💉">
            {dossier.vaccinations.length > 0 ? (
              <div>
                {dossier.vaccinations.map((vaccination) => (
                  <VaccinationItem key={vaccination.id} vaccination={vaccination} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                Aucune vaccination enregistrée
              </p>
            )}
          </MedicalSection>
        </div>

        {/* Actions */}
        <div className="card p-6 bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">
            Actions sur le dossier
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center space-x-2 p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <span>➕</span>
              <span className="text-sm font-medium">Ajouter info</span>
            </button>
            <button className="flex items-center space-x-2 p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <span>✏️</span>
              <span className="text-sm font-medium">Modifier</span>
            </button>
            <button className="flex items-center space-x-2 p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <span>📧</span>
              <span className="text-sm font-medium">Partager</span>
            </button>
            <button className="flex items-center space-x-2 p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <span>🖨️</span>
              <span className="text-sm font-medium">Imprimer</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Simuler un fetch d'API avec les données JSON
  const dossier = dossierData as DossierMedical;

  return {
    props: {
      dossier,
    },
  };
};

export default DossierPage;
