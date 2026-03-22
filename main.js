/**
 * TP2 — Fonctions sur une liste d’images (données en mémoire uniquement).
 * Pas de manipulation du DOM ici : tout se vérifie dans la console (F12).
 */

const catalogue = [
  { id: 1, titre: "Prairie", categorie: "nature", fichier: "assets/nature-1.svg" },
  { id: 2, titre: "Montagne", categorie: "nature", fichier: "assets/nature-2.svg" },
  { id: 3, titre: "Quartier", categorie: "ville", fichier: "assets/ville-1.svg" },
  { id: 4, titre: "Silhouettes", categorie: "ville", fichier: "assets/ville-2.svg" },
];

/**
 * Retourne une nouvelle liste : tout le catalogue, ou une seule catégorie.
 */
function filtrerParCategorie(liste, categorie) {
  if (categorie === "toutes") {
    return liste;
  }
  return liste.filter(function (image) {
    return image.categorie === categorie;
  });
}

/**
 * Trouve une image dans une liste à partir de son id (ou undefined si absent).
 */
function trouverParId(liste, id) {
  return liste.find(function (image) {
    return image.id === id;
  });
}

/** Image actuellement « choisie » dans le programme (donnée, pas l’écran). */
let imageSelectionnee = null;

/**
 * Enregistre l’image sélectionnée. La page ne change pas : on pourra brancher l’affichage au TP suivant.
 */
function selectionner(image) {
  imageSelectionnee = image;
  return imageSelectionnee;
}

/* --- Démonstrations dans la console (exemples d’utilisation des fonctions) --- */

const uniquementNature = filtrerParCategorie(catalogue, "nature");
console.log("Filtrage nature :", uniquementNature);

const uniquementVille = filtrerParCategorie(catalogue, "ville");
console.log("Filtrage ville :", uniquementVille);

selectionner(trouverParId(catalogue, 3));
console.log("Après sélection de l’id 3 :", imageSelectionnee);

console.log("TP2 : catalogue de", catalogue.length, "images — ouvrez la console si besoin.");
