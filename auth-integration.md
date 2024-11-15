# TP8 : Authentification et Navigation Multi-Apps

## Objectif
Ajouter un nouveau micro-frontend pour l'authentification avec une navigation synchronisée entre les applications.

## 1. Création du Micro-Frontend Auth

### Configuration Webpack (auth/config/webpack.dev.js)
```javascript
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const devConfig = {
  mode: 'development',
  output: {
    // À vous de configurer le publicPath
    // Indice : utilisez l'URL complète avec le port 8082
  },
  devServer: {
    port: 8082,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        // Exposez l'application Auth
        // Indice : même format que pour Marketing
      },
      shared: // Partagez les dépendances
    }),
  ],
};
```

### Point de Montage (auth/src/bootstrap.js)
```javascript
import { createMemoryHistory, createBrowserHistory } from 'history';

const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath],
  });

  // À vous d'implémenter :
  // 1. L'écoute des changements de navigation
  // 2. Le rendu de l'App avec les bonnes props
  // 3. Le retour de la fonction onParentNavigate

  return {
    onParentNavigate({ pathname: nextPathname }) {
      // Synchronisez la navigation
    },
  };
};
```

## 2. Container : Intégration de l'Auth

### Configuration (container/src/App.js)
```javascript
import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Progress from './components/Progress';

// Importez les applications en lazy loading
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => /* Complétez l'import */);

export default () => {
  // Ajoutez l'état d'authentification
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            onSignOut={() => setIsSignedIn(false)}
            isSignedIn={isSignedIn}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              {/* Configurez les routes pour Auth et Marketing */}
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
```

### Composant Auth (container/src/components/AuthApp.js)
```javascript
import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    // À vous d'implémenter la logique de montage
    // Indice : similaire à MarketingApp mais avec onSignIn
  }, []);

  return <div ref={ref} />;
};
```

## 3. Synchronisation de la Navigation

### Dans Marketing (marketing/src/bootstrap.js)
```javascript
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath],
  });

  // Implémentez la synchronisation de la navigation
  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      // Synchronisez avec le parent
    },
  };
};
```

## Points d'Attention

1. Routes et Navigation
- Les URLs d'authentification doivent commencer par /auth
- Utilisez memory history pour les micro-frontends
- Utilisez browser history pour le container

2. État d'Authentification
- L'état doit être géré au niveau du container
- Propagez l'état via les props
- Gérez la déconnexion dans le header

3. Lazy Loading
- Utilisez Suspense pour le chargement asynchrone
- Affichez un indicateur de progression pendant le chargement
- Gérez les erreurs potentielles

## Vérification

1. Authentification
```bash
# Démarrez les trois applications
cd auth && npm start
cd marketing && npm start
cd container && npm start
```

2. Testez :
- La navigation entre les pages
- Le processus de connexion/inscription
- La synchronisation de la navigation
- L'état d'authentification
- Le lazy loading

