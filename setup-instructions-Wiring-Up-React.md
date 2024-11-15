# TP2 : Implémentation du Montage Conditionnel

## Objectif
Dans ce TP, nous allons mettre en place un système de montage conditionnel qui permettra à notre micro-frontend de fonctionner à la fois en mode isolé (développement) et en mode intégré (production).

## Contexte
Le montage conditionnel est un concept clé des micro-frontends qui permet de :
- Développer et tester l'application de manière isolée
- Intégrer l'application dans un container
- Gérer différents environnements (développement vs production)

## Instructions Pas à Pas

### 1. Modification du Point de Montage
Modifiez le fichier `public/index.html` :

```html
<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <div id="_marketing-dev-root"></div>
  </body>
</html>
```

**Explications:**
- L'ID `_marketing-dev-root` est unique pour éviter les conflits avec d'autres micro-frontends
- Le préfixe `_marketing` indique clairement l'appartenance au module marketing
- Le suffixe `-dev-root` indique qu'il s'agit du point de montage de développement

### 2. Création du Fichier Bootstrap
Créez un nouveau fichier `src/bootstrap.js` :

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

// Mount function to start up the app
const mount = (el) => {
  ReactDOM.render(<h1>Hi there!</h1>, el);
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

**Explications:**
- La fonction `mount` encapsule la logique de rendu de l'application
- La vérification de `process.env.NODE_ENV` permet un comportement différent en développement
- L'export de `mount` permet son utilisation par le container
- Le montage conditionnel permet le développement isolé

### 3. Modification du Point d'Entrée
Modifiez le fichier `src/index.js` :

```javascript
import('./bootstrap');
```

**Explications:**
- L'import dynamique permet un chargement asynchrone du code
- Cette approche est plus flexible pour la gestion des dépendances
- Elle facilite également le code splitting

## Points d'Attention

### Nommage des IDs
- Utilisez des IDs uniques et descriptifs
- Préfixez les IDs avec le nom de votre micro-frontend
- Évitez les conflits potentiels avec d'autres applications

### Fonction Mount
- La fonction mount doit être pure et réutilisable
- Elle ne doit pas avoir d'effets de bord
- Elle doit accepter l'élément de montage comme paramètre

### Développement vs Production
- Le code doit fonctionner différemment selon l'environnement
- En développement : montage automatique
- En production : export de la fonction mount

## Vérification
Pour tester votre implémentation :

```bash
npm start
```

Vous devriez voir :
1. Le message "Hi there!" s'afficher dans le navigateur
2. Aucune erreur dans la console
3. Le montage se faire automatiquement en développement

## Exercices Supplémentaires
1. Modifiez le contenu rendu pour inclure plus d'éléments React
2. Ajoutez des paramètres à la fonction mount pour la rendre plus flexible
3. Implémentez une fonction unmount pour le nettoyage

## Questions de Compréhension
- Pourquoi avons-nous besoin d'un montage conditionnel ?
- Quel est le rôle de la fonction mount ?
- Pourquoi utilisons-nous un import dynamique dans index.js ?
- Comment cette architecture facilite-t-elle l'intégration avec un container ?

