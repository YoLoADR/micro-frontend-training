# TP1 : Configuration Initiale d'un Projet Micro Frontend

## Objectif
Dans ce TP, vous allez mettre en place la configuration de base d'un micro-frontend utilisant React et Webpack. Cette configuration servira de fondation pour développer des applications modulaires et indépendantes.

## Prérequis
- Node.js installé sur votre machine
- Connaissance de base de JavaScript et React
- Un éditeur de code (VS Code recommandé)

## Instructions Pas à Pas

### 1. Création du Projet
```bash
# Créez un nouveau dossier pour votre projet
mkdir marketing
cd marketing

# Initialisez un nouveau projet npm
npm init -y
```

### 2. Installation des Dépendances
```bash
# Installation des dépendances React
npm install @material-ui/core@4.11.0 @material-ui/icons@4.9.1 react@17.0.1 react-dom@17.0.1 react-router-dom@5.2.0

# Installation des dépendances de développement
npm install --save-dev @babel/core@7.12.3 @babel/plugin-transform-runtime@7.12.1 @babel/preset-env@7.12.1 @babel/preset-react@7.12.1 babel-loader@8.1.0 clean-webpack-plugin@3.0.0 css-loader@5.0.0 html-webpack-plugin@4.5.0 style-loader@2.0.0 webpack@5.88.0 webpack-cli@4.1.0 webpack-dev-server@3.11.0 webpack-merge@5.2.0
```

### 3. Configuration de Webpack
Créez un dossier `config` à la racine du projet et ajoutez les fichiers suivants :

#### webpack.common.js
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

#### webpack.dev.js
```javascript
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
```

### 4. Création des Fichiers de Base
```bash
# Créez un dossier public et src
mkdir public src

# Créez les fichiers initiaux
touch public/index.html
touch src/index.js
```

#### public/index.html
```html
<!DOCTYPE html>
<html>
  <head></head>
  <body></body>
</html>
```

#### src/index.js
```javascript
console.log('Hi there');
```

## Explications

### Pourquoi cette Configuration ?

1. **Babel Configuration**
   - Les presets React et Env permettent de transformer le code JSX et ES6+ en JavaScript compatible avec les navigateurs
   - Le plugin transform-runtime aide à gérer les polyfills de manière optimisée

2. **Webpack Configuration**
   - La séparation en fichiers common et dev permet une meilleure maintenance et extensibilité
   - Le port 8081 est défini pour éviter les conflits avec d'autres micro-frontends
   - historyApiFallback est nécessaire pour le routage côté client avec React Router

3. **Structure du Projet**
   - La structure modulaire facilite l'ajout futur de fonctionnalités
   - Le dossier public contient les assets statiques
   - Le dossier src contiendra tout le code source de l'application

## Points d'Attention

- Assurez-vous que les versions des dépendances sont compatibles entre elles
- Vérifiez que le port 8081 n'est pas déjà utilisé sur votre machine
- La configuration Webpack est minimale pour commencer, mais elle sera enrichie au fur et à mesure

## Vérification
Pour vérifier que tout fonctionne :
```bash
npm start
```
Vous devriez voir un message "Hi there" dans la console du navigateur.

## Pour Aller Plus Loin
- Explorez la documentation de Webpack pour comprendre chaque configuration
- Familiarisez-vous avec les différents loaders et plugins utilisés
- Réfléchissez à comment cette configuration pourrait évoluer pour supporter d'autres fonctionnalités

