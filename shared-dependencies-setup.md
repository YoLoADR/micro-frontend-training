# TP5 : Partage des Dépendances et Intégration React

## Objectif
Optimiser notre architecture micro-frontend en partageant les dépendances communes et en intégrant proprement le micro-frontend marketing dans le container.

## 1. Partage des Dépendances

### Dans Marketing (marketing/config/webpack.dev.js)
Modifiez la configuration pour partager les dépendances :

```javascript
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');  // Ajoutez cette ligne

const devConfig = {
  // ... configuration existante ...
  plugins: [
    new ModuleFederationPlugin({
      name: 'marketing',
      filename: 'remoteEntry.js',
      exposes: {
        './MarketingApp': './src/bootstrap',
      },
      // Ajoutez cette configuration pour partager les dépendances
      shared: packageJson.dependencies,  
    }),
    // ... autres plugins ...
  ],
};
```

### Dans Container (container/config/webpack.dev.js)
```javascript
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');  // Ajoutez cette ligne

const devConfig = {
  // ... configuration existante ...
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
      },
      // À vous d'ajouter la configuration pour partager les dépendances
      // Indice : utilisez packageJson.dependencies
    }),
    // ... autres plugins ...
  ],
};
```

## 2. Intégration React

### Création du Composant Marketing (container/src/components/MarketingApp.js)
Créez un nouveau composant pour intégrer l'application marketing :

```javascript
import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';

export default () => {
  // À vous de compléter le composant
  // 1. Créez une référence avec useRef
  // 2. Utilisez useEffect pour monter l'application
  // 3. Retournez un div avec la référence

  return // Votre JSX ici;
};
```

### Intégration dans App (container/src/App.js)
Modifiez le composant App pour utiliser MarketingApp :

```javascript
import React from 'react';
import MarketingApp from './components/MarketingApp';

export default () => {
  return (
    <div>
      {/* À vous d'intégrer le composant MarketingApp */}
      {/* Ajoutez un titre et une ligne de séparation */}
    </div>
  );
};
```

## Points d'Attention

### 1. Gestion des Dépendances Partagées
- L'utilisation de `shared: packageJson.dependencies` permet :
  - La réduction de la taille du bundle
  - D'éviter les conflits de versions
  - D'assurer la cohérence entre les applications

### 2. Montage React
- La référence (useRef) est cruciale pour le montage
- useEffect gère le cycle de vie du montage
- Attention aux re-renders inutiles

## Questions de Compréhension
1. Pourquoi partageons-nous les dépendances ?
2. Comment fonctionne le montage avec useRef ?
3. Quel est le rôle de useEffect dans ce contexte ?
4. Comment les versions partagées sont-elles gérées ?

## Exercices

### 1. Gestion du Démontage
Modifiez le composant MarketingApp pour gérer proprement le démontage :
```javascript
useEffect(() => {
  // TODO: Stockez la fonction de cleanup retournée par mount
  // TODO: Appelez la fonction de cleanup dans le return de useEffect
}, []);
```

### 2. Optimisation des Dépendances Partagées
Dans les configurations webpack, testez différentes options de partage :
```javascript
shared: {
  // TODO: Configurez des versions spécifiques pour certaines dépendances
  // TODO: Ajoutez des règles de singleton pour React
}
```

## Vérification
1. Les deux applications démarrent sans erreur
2. Le marketing s'affiche correctement dans le container
3. La console ne montre pas de warning de versions
4. Le bundle ne contient pas de dépendances dupliquées

