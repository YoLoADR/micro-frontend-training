// Importe les outils nécessaires
// merge : permet de combiner plusieurs configurations webpack
const { merge } = require('webpack-merge');

// Plugin pour générer automatiquement le fichier HTML de l'application
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Plugin pour le Module Federation qui permet de partager du code entre applications
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

// Importe la configuration commune à tous les environnements
const commonConfig = require('./webpack.common');

// Récupère les dépendances listées dans package.json
const packageJson = require('../package.json');

// Configuration spécifique pour l'environnement de développement
const devConfig = {
  // Mode développement pour de meilleurs messages d'erreur
  mode: 'development',

  output: {
    // URL où l'application sera servie en développement
    publicPath: 'http://localhost:8082/',
  },

  devServer: {
    // Port sur lequel l'application sera accessible
    port: 8082,
    // Gestion des routes pour les applications single-page
    historyApiFallback: {
      historyApiFallback: true,
    },
  },

  plugins: [
    // Configuration du Module Federation
    new ModuleFederationPlugin({
      // Nom unique de ce micro-frontend
      name: 'auth',
      // Fichier généré qui permet aux autres apps d'importer ce code
      filename: 'remoteEntry.js',
      // Définit quels fichiers peuvent être partagés
      exposes: {
        './AuthApp': './src/bootstrap',
      },
      // Partage les dépendances communes pour éviter les doublons
      shared: packageJson.dependencies,
    }),

    // Génère le fichier HTML en utilisant le template
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

// Combine la config commune avec celle de développement
module.exports = merge(commonConfig, devConfig);
