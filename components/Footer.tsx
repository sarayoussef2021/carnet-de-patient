import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-2xl">🏥</span>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Carnet de Patient
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Suivi médical numérique
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <span>© 2025 Carnet Patient</span>
            <span>•</span>
            <span>Données sécurisées</span>
            <span>•</span>
            <span>Confidentiel</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-center text-gray-400 dark:text-gray-500">
            
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
