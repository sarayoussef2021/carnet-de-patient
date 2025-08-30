import React, { useState, useMemo } from 'react';
import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import HealthTipCard from '@/components/HealthTipCard';
import FilterTabs from '@/components/FilterTabs';
import { Recommandation, Categorie } from '@/types';
import recommandationsData from '@/data/recommandations.json';

interface RecommandationsPageProps {
  recommandations: Recommandation[];
  categories: Categorie[];
}

const RecommandationsPage: React.FC<RecommandationsPageProps> = ({ 
  recommandations, 
  categories 
}) => {
  const [activeFilter, setActiveFilter] = useState('Toutes');
  const [priorityFilter, setPriorityFilter] = useState('Toutes');

  const categoryFilters = ['Toutes', ...categories.map(cat => cat.nom)];
  const priorityFilters = ['Toutes', 'Haute', 'Moyenne', 'Basse'];

  const filteredRecommendations = useMemo(() => {
    let filtered = recommandations;

    // Filtrer par catégorie
    if (activeFilter !== 'Toutes') {
      filtered = filtered.filter(rec => rec.categorie === activeFilter);
    }

    // Filtrer par priorité
    if (priorityFilter !== 'Toutes') {
      filtered = filtered.filter(rec => rec.priorite === priorityFilter.toLowerCase());
    }

    return filtered;
  }, [recommandations, activeFilter, priorityFilter]);

  const sortedRecommendations = useMemo(() => {
    return [...filteredRecommendations].sort((a, b) => {
      // Trier par priorité d'abord
      const priorityOrder = { 'haute': 0, 'moyenne': 1, 'basse': 2 };
      const priorityDiff = priorityOrder[a.priorite] - priorityOrder[b.priorite];
      
      if (priorityDiff !== 0) return priorityDiff;
      
      // Puis par ordre alphabétique
      return a.titre.localeCompare(b.titre);
    });
  }, [filteredRecommendations]);

  const getCategoryCounts = () => {
    const counts: { [key: string]: number } = { 'Toutes': recommandations.length };
    
    categories.forEach(cat => {
      counts[cat.nom] = recommandations.filter(rec => rec.categorie === cat.nom).length;
    });
    
    return counts;
  };

  const getPriorityCounts = () => {
    const counts: { [key: string]: number } = { 'Toutes': recommandations.length };
    
    priorityFilters.slice(1).forEach(priority => {
      counts[priority] = recommandations.filter(rec => 
        rec.priorite === priority.toLowerCase()
      ).length;
    });
    
    return counts;
  };

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find(cat => cat.nom === categoryName);
    return category?.icone || '💡';
  };

  const getEmptyStateMessage = () => {
    if (activeFilter !== 'Toutes' && priorityFilter !== 'Toutes') {
      return {
        icon: '🔍',
        title: 'Aucune recommandation trouvée',
        message: `Aucune recommandation ${activeFilter.toLowerCase()} de priorité ${priorityFilter.toLowerCase()}.`
      };
    } else if (activeFilter !== 'Toutes') {
      return {
        icon: getCategoryIcon(activeFilter),
        title: `Aucune recommandation ${activeFilter.toLowerCase()}`,
        message: `Aucune recommandation disponible pour la catégorie ${activeFilter}.`
      };
    } else if (priorityFilter !== 'Toutes') {
      return {
        icon: '⭐',
        title: `Aucune recommandation de priorité ${priorityFilter.toLowerCase()}`,
        message: `Aucune recommandation avec cette priorité.`
      };
    }
    
    return {
      icon: '💡',
      title: 'Aucune recommandation',
      message: 'Aucune recommandation santé disponible pour le moment.'
    };
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              💡 Recommandations santé
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Conseils personnalisés pour améliorer votre bien-être
            </p>
          </div>
          <button className="btn-primary mt-4 sm:mt-0">
            ⭐ Mes favoris
          </button>
        </div>

        {/* Stats par catégorie */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div key={category.nom} className="card p-4 text-center">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2"
                style={{ backgroundColor: `${category.couleur}20` }}
              >
                <span className="text-2xl">{category.icone}</span>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                {category.nom}
              </h3>
              <p 
                className="text-lg font-bold mt-1"
                style={{ color: category.couleur }}
              >
                {getCategoryCounts()[category.nom]}
              </p>
            </div>
          ))}
        </div>

        {/* Filtres par catégorie */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Filtrer par catégorie
          </h3>
          <FilterTabs
            filters={categoryFilters}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={getCategoryCounts()}
          />
        </div>

        {/* Filtres par priorité */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Filtrer par priorité
          </h3>
          <FilterTabs
            filters={priorityFilters}
            activeFilter={priorityFilter}
            onFilterChange={setPriorityFilter}
            counts={getPriorityCounts()}
          />
        </div>

        {/* Résultats */}
        <div className="flex justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400">
            {sortedRecommendations.length} recommandation{sortedRecommendations.length > 1 ? 's' : ''} trouvée{sortedRecommendations.length > 1 ? 's' : ''}
          </p>
          
          {(activeFilter !== 'Toutes' || priorityFilter !== 'Toutes') && (
            <button 
              onClick={() => {
                setActiveFilter('Toutes');
                setPriorityFilter('Toutes');
              }}
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
            >
              ✕ Effacer les filtres
            </button>
          )}
        </div>

        {/* Liste des recommandations */}
        {sortedRecommendations.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedRecommendations.map((recommendation) => (
              <HealthTipCard
                key={recommendation.id}
                tip={recommendation}
                compact={false}
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
            <button 
              onClick={() => {
                setActiveFilter('Toutes');
                setPriorityFilter('Toutes');
              }}
              className="btn-primary"
            >
              Voir toutes les recommandations
            </button>
          </div>
        )}

        {/* Conseils d'utilisation */}
        {sortedRecommendations.length > 0 && (
          <div className="card p-6 bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700">
            <div className="flex items-start space-x-3">
              <span className="text-green-600 dark:text-green-400 text-xl">💚</span>
              <div>
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                  Conseils pour bien utiliser vos recommandations
                </h3>
                <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
                  <li>• Commencez par les recommandations de haute priorité</li>
                  <li>• Intégrez progressivement les conseils dans votre routine</li>
                  <li>• Marquez comme "Fait" les actions que vous avez accomplies</li>
                  <li>• Consultez régulièrement pour de nouveaux conseils</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Actions rapides */}
        <div className="card p-6 bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">
            Actions rapides
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center space-x-2 p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <span>📋</span>
              <span className="text-sm font-medium">Plan personnalisé</span>
            </button>
            <button className="flex items-center space-x-2 p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <span>📊</span>
              <span className="text-sm font-medium">Mes progrès</span>
            </button>
            <button className="flex items-center space-x-2 p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <span>🔔</span>
              <span className="text-sm font-medium">Rappels</span>
            </button>
            <button className="flex items-center space-x-2 p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <span>📧</span>
              <span className="text-sm font-medium">Partager</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Simuler un fetch d'API avec les données JSON
  const recommandations = recommandationsData.recommandations;
  const categories = recommandationsData.categories;

  return {
    props: {
      recommandations,
      categories,
    },
  };
};

export default RecommandationsPage;
