# TP7 : Gestion des Styles et Navigation en Production

## Objectif
Configurer une gestion robuste des styles pour la production et ajouter une navigation commune avec un header.

## 1. Configuration des Chemins de Production

### Container (container/config/webpack.prod.js)
```javascript
const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    // Ajoutez le chemin public pour la production
    publicPath: '/container/latest/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        // Modifiez l'URL pour inclure le nouveau chemin
        marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};
```

### Marketing (marketing/config/webpack.prod.js)
```javascript
const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    // À vous d'ajouter le chemin public pour la production
    // Indice : utilisez le format /marketing/latest/
    publicPath: // Votre configuration ici
  },
  // ... reste de la configuration
};
```

## 2. Gestion des Styles

### Container App (container/src/App.js)
```javascript
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import MarketingApp from './components/MarketingApp';
import Header from './components/Header';

// Créez un préfixe unique pour les classes CSS du container
const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

export default () => {
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          {/* Intégrez le Header et MarketingApp */}
          {/* À vous de compléter */}
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
```

### Marketing App (marketing/src/App.js)
```javascript
import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Landing from './components/Landing';
import Pricing from './components/Pricing';

// À vous de créer un préfixe unique pour les classes CSS du marketing
// Indice : utilisez 'ma' comme préfixe
const generateClassName = // Votre configuration ici

export default () => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        {/* Configurez vos routes ici */}
      </StylesProvider>
    </div>
  );
};
```

## 3. Création du Header (container/src/components/Header.js)
```javascript
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

// Styles fournis...

export default function Header({ signedIn, onSignOut }) {
  const classes = useStyles();

  const onClick = () => {
    if (signedIn && onSignOut) {
      onSignOut();
    }
  };

  return (
    <React.Fragment>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          {/* À vous d'implémenter :
              1. Le logo/titre qui redirige vers la page d'accueil
              2. Le bouton de connexion/déconnexion
          */}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
```

## Points d'Attention

1. Préfixes CSS
- Utilisez des préfixes uniques pour chaque application
- `co` pour container
- `ma` pour marketing
- Évite les collisions de noms de classes en production

2. Chemins de Production
- Les chemins publics doivent être cohérents
- Format : `/{app-name}/latest/`
- Important pour le chargement des assets

3. Navigation
- Le Header doit être accessible dans toute l'application
- Les liens doivent utiliser RouterLink pour la navigation
- La gestion de l'état de connexion doit être propagée

## Vérification

1. En Développement
```bash
npm start
```
- Vérifiez que les styles sont correctement appliqués
- Testez la navigation entre les pages
- Vérifiez que le header reste cohérent

2. En Production
```bash
npm run build
```
- Vérifiez les préfixes des classes générées
- Confirmez les chemins des assets
- Testez la navigation complète

