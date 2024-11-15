# TP4 : Mise en place de l'Application Container

## Objectif
Créer l'application container et configurer le Module Federation pour permettre l'importation de micro-frontends.

## 1. Création de la Structure
```bash
container/
├── config/
│   ├── webpack.common.js
│   ├── webpack.dev.js
│   └── webpack.prod.js
├── public/
│   └── index.html
└── src/
    ├── App.js
    ├── bootstrap.js
    └── index.js
```

## 2. Configuration des Fichiers

### Package.json
```json
{
  "name": "container",
  "version": "1.0.0",
  "scripts": {
    "start": "webpack serve --config config/webpack.dev.js"
  },
  "dependencies": {
    "@material-ui/core": "^4.11.0",
    "@material-ui/icons": "^4.9.1",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-router-dom": "^5.2.0"
  },
  "devDependencies": {
    "@babel/core": "^7.12.3",
    "@babel/plugin-transform-runtime": "^7.12.1",
    "@babel/preset-env": "^7.12.1",
    "@babel/preset-react": "^7.12.1",
    "babel-loader": "^8.1.0",
    "clean-webpack-plugin": "^3.0.0",
    "css-loader": "^5.0.0",
    "html-webpack-plugin": "^4.5.0",
    "style-loader": "^2.0.0",
    "webpack": "^5.88.0",
    "webpack-cli": "^4.1.0",
    "webpack-dev-server": "^3.11.0",
    "webpack-merge": "^5.2.0"
  }
}
```

### Webpack Common (config/webpack.common.js)
Configuration de base pour Babel et React :
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
};
```

### Webpack Dev (config/webpack.dev.js)
Configuration du Module Federation :
```javascript
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    // À vous de compléter la configuration du ModuleFederationPlugin
    // Indice : vous devez configurer :
    // - name: le nom de votre application
    // - remotes: l'import du micro-frontend marketing
    new ModuleFederationPlugin({
      // Votre configuration ici
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
```

### Point de Montage (public/index.html)
```html
<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

### Bootstrap de l'Application

#### src/index.js
```javascript
import('./bootstrap');
```

#### src/bootstrap.js
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.querySelector('#root'));
```

#### src/App.js
À vous de compléter ce fichier :
```javascript
import React from 'react';
// Importez la fonction mount depuis le micro-frontend marketing
// Indice : import { mount } from 'marketing/MarketingApp';

// Pour l'instant, affichez juste un titre
export default () => {
  // À vous de développer le composant
  return <h1>Hi there!</h1>;
};
```

### Marketing : Mise à Jour pour Module Federation (marketing/config/webpack.dev.js)
```javascript
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    // À vous de compléter la configuration du ModuleFederationPlugin
    // Indice : vous devez :
    // - Donner un nom au module ('marketing')
    // - Spécifier le nom du fichier remote ('remoteEntry.js')
    // - Exposer le point d'entrée de l'application ('./MarketingApp')
    new ModuleFederationPlugin({
      // Votre configuration ici
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
```

## Points d'Attention
1. Les ports doivent être différents :
   - Container: 8080
   - Marketing: 8081

2. Ordre de démarrage important :
   1. Démarrez d'abord Marketing (`cd marketing && npm start`)
   2. Puis démarrez Container (`cd container && npm start`)

3. Vérification des imports :
   - Regardez dans la console si l'import du marketing fonctionne
   - Vérifiez que le remoteEntry.js est bien généré

## Exercice
Dans App.js du container, utilisez la fonction mount importée du marketing pour afficher le contenu du micro-frontend marketing.

## Questions de Compréhension
1. Pourquoi avons-nous besoin de séparer index.js et bootstrap.js ?
2. À quoi sert le ModuleFederationPlugin ?
3. Comment le container sait-il où trouver le code du marketing ?
4. Que se passe-t-il si le marketing n'est pas disponible ?

