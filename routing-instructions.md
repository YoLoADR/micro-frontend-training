# TP3 : Implémentation du Routing et des Composants

## Objectif
Dans ce TP, nous allons mettre en place le routing de l'application et créer les composants principaux en utilisant Material-UI.

## Prérequis
- Avoir complété le TP2
- Connaissance de base de React Router
- Familiarité avec Material-UI

## Instructions Pas à Pas

### 1. Configuration de l'Application Principale
Créez le fichier `src/App.js` :

```javascript
import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';

import Landing from './components/Landing';
import Pricing from './components/Pricing';

export default () => {
  return (
    <div>
      <StylesProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/pricing" component={Pricing} />
            <Route path="/" component={Landing} />
          </Switch>
        </BrowserRouter>
      </StylesProvider>
    </div>
  );
};
```

**Explications:**
- StylesProvider isole les styles Material-UI pour éviter les conflits
- BrowserRouter gère la navigation côté client
- Switch assure qu'une seule route est rendue à la fois
- Les routes sont organisées du plus spécifique au plus général

### 2. Mise à Jour du Bootstrap
Modifiez le fichier `src/bootstrap.js` :

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Mount function to start up the app
const mount = (el) => {
  ReactDOM.render(<App />, el);
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing-dev-root');

  if (devRoot) {
    mount(devRoot);
  }
}

// We are running through container
// and we should export the mount function
export { mount };
```

### 3. Création des Composants
Créez les fichiers composants dans le dossier `src/components/` :

#### Landing.js
[Contenu du premier document fourni]

#### Pricing.js
[Contenu du second document fourni]

## Points d'Attention

### Isolation des Styles
- StylesProvider est crucial pour éviter les conflits de styles
- Utilisez des classes CSS uniques pour votre micro-frontend
- Évitez les styles globaux qui pourraient affecter d'autres parties de l'application

### Routing
- Les routes doivent être relatives au point de montage
- Considérez l'utilisation future dans le container
- Gérez correctement l'historique de navigation

### Composants
- Maintenez une cohérence visuelle avec Material-UI
- Utilisez des composants modulaires et réutilisables
- Suivez les bonnes pratiques React

## Vérification
Pour tester votre implémentation :

```bash
npm start
```

Vérifiez que :
1. La navigation entre les pages fonctionne
2. Les styles sont correctement appliqués
3. Les composants s'affichent comme prévu
4. Aucun conflit de style n'est présent

## Exercices Supplémentaires

1. Ajoutez une nouvelle route et un nouveau composant
2. Implémentez une navigation partagée
3. Ajoutez des transitions entre les pages
4. Créez un système de thème personnalisé

## Questions de Compréhension

1. Pourquoi utilisons-nous StylesProvider ?
2. Comment le routing fonctionne-t-il dans un contexte de micro-frontend ?
3. Quels sont les avantages d'utiliser Material-UI dans ce contexte ?
4. Comment gérer les conflits potentiels avec d'autres micro-frontends ?

## Ressources Additionnelles

- Documentation Material-UI
- Documentation React Router
- Guides sur les micro-frontends
- Best practices pour l'isolation des styles

