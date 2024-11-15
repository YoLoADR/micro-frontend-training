# TP6 : Configuration de Production

## Objectif
Configurer l'environnement de production pour le container et le marketing, en ajoutant la gestion du cache et les URLs de production.

## 1. Container : Configuration de Production

### Configuration Webpack Production (container/config/webpack.prod.js)
```javascript
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

// L'URL de production sera fournie via une variable d'environnement
const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: 'production',
  output: {
    // Ajoutez le hachage pour la gestion du cache
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        // À vous de compléter l'URL de production pour le marketing
        // Indice : utilisez la variable domain
        marketing: // Votre configuration ici
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
```

### Mise à Jour du package.json (container/package.json)
```json
{
  "scripts": {
    "start": "webpack serve --config config/webpack.dev.js",
    // Ajoutez le script de build
    "build": "webpack --config config/webpack.prod.js"
  }
}
```

### Optimisation Webpack Common (container/config/webpack.common.js)
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
  // Déplacez le HtmlWebpackPlugin dans la configuration commune
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
```

### Configuration Dev Mise à Jour (container/config/webpack.dev.js)
```javascript
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
      },
      shared: packageJson.dependencies,
    }),
    // HtmlWebpackPlugin déplacé dans webpack.common.js
  ],
};

module.exports = merge(commonConfig, devConfig);
```

## 2. Marketing : Configuration de Production

### Configuration Webpack Production (marketing/config/webpack.prod.js)
```javascript
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const commonConfig = require('./webpack.common');

const prodConfig = {
  mode: 'production',
  output: {
    // À vous d'ajouter la configuration pour le cache busting
    // Indice : utilisez le même format que dans le container
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'marketing',
      filename: 'remoteEntry.js',
      exposes: {
        './MarketingApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
```

### Mise à Jour package.json (marketing/package.json)
```json
{
  "scripts": {
    "start": "webpack serve --config config/webpack.dev.js",
    // À vous d'ajouter le script de build
  }
}
```

## Points d'Attention

1. Gestion du Cache
- Utilisation de contenthash pour invalider le cache quand le contenu change
- Les noms de fichiers uniques sont générés en production

2. Variables d'Environnement
- `PRODUCTION_DOMAIN` doit être défini pour le build de production
- Les URLs de production doivent pointer vers les bons chemins

3. Optimisation
- Le HtmlWebpackPlugin est maintenant dans la configuration commune
- Les dépendances sont toujours partagées en production

## Vérification
Pour tester la configuration de production :

1. Pour le marketing :
```bash
npm run build
```
- Vérifiez que les fichiers sont générés dans le dossier dist
- Vérifiez que le remoteEntry.js est présent

2. Pour le container :
```bash
PRODUCTION_DOMAIN=http://your-domain.com npm run build
```
- Vérifiez que les fichiers sont générés avec des hashes
- Vérifiez que les URLs de production sont correctement configurées

