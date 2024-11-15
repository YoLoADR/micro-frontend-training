// Imports nécessaires de React et des outils de gestion d'historique
import React from 'react';
import ReactDOM from 'react-dom';
// history permet de gérer la navigation entre les pages
// - createMemoryHistory : stocke l'historique en mémoire (idéal pour les micro-frontends)
// - createBrowserHistory : utilise l'historique du navigateur (pour le développement isolé)
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

// Fonction principale pour monter l'application
// Avantages du montage configurable :
// - Permet à l'app parente de contrôler la navigation (onNavigate)
// - Gère l'authentification de manière centralisée (onSignIn)
// - Flexible sur l'historique utilisé (defaultHistory)
// - Peut démarrer sur une page spécifique (initialPath)
const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
  // Crée l'historique de navigation
  // Avantage de createMemoryHistory :
  // - Isole la navigation de chaque micro-frontend
  // - Évite les conflits avec l'URL du navigateur
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath],
  });

  // Synchronise la navigation avec l'application parente
  // Crucial pour maintenir une navigation cohérente
  if (onNavigate) {
    history.listen(onNavigate);
  }

  // Monte l'application React dans l'élément DOM fourni
  ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);

  // Retourne une fonction pour synchroniser la navigation
  // depuis l'application parente vers cette application
  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      // Évite les boucles infinies en vérifiant si le chemin a changé
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

// Mode développement isolé
// Avantages :
// - Permet de développer l'auth indépendamment
// - Utilise l'historique du navigateur pour un développement plus naturel
// - Facilite les tests et le débogage
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root');
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// Export de la fonction mount pour utilisation dans le container
// Cette approche modulaire permet :
// - Une intégration flexible dans différents contextes
// - Un contrôle précis du comportement de l'application
// - Une séparation claire des responsabilités
export { mount };
