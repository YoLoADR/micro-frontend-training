// Importe la fonction 'mount' depuis l'application Marketing
// Cette fonction permet d'afficher l'application Marketing dans notre page
import { mount } from 'marketing/MarketingApp';

// Importe les outils nécessaires de React :
// - useRef : pour créer une référence à un élément HTML
// - useEffect : pour exécuter du code quand le composant s'affiche
import React, { useRef, useEffect } from 'react';

// Crée et exporte un nouveau composant React
export default () => {
  // Crée une référence (comme un pointeur) vers l'endroit où on veut
  // afficher l'application Marketing
  const ref = useRef(null);

  // useEffect s'exécute quand le composant est affiché dans la page
  useEffect(() => {
    // Appelle la fonction mount en lui donnant l'élément HTML où
    // afficher l'application Marketing
    mount(ref.current);
  });

  // Crée un div vide avec notre référence
  // C'est ici que l'application Marketing sera affichée
  return <div ref={ref} />;
};
