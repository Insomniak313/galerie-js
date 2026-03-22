/**
 * TP3 — Carrousel : données + fonctions du TP2, affichage et événements (DOM).
 * Les chemins d’images sont relatifs à la page HTML (ici : dossier racine du projet).
 */

const catalogue = [
  { id: 1, titre: "Prairie", categorie: "nature", fichier: "assets/nature-1.svg" },
  { id: 2, titre: "Montagne", categorie: "nature", fichier: "assets/nature-2.svg" },
  { id: 3, titre: "Quartier", categorie: "ville", fichier: "assets/ville-1.svg" },
  { id: 4, titre: "Silhouettes", categorie: "ville", fichier: "assets/ville-2.svg" },
];

function filtrerParCategorie(liste, categorie) {
  if (categorie === "toutes") {
    return liste;
  }
  return liste.filter(function (image) {
    return image.categorie === categorie;
  });
}

function trouverParId(liste, id) {
  return liste.find(function (image) {
    return image.id === id;
  });
}

let imageSelectionnee = null;

function selectionner(image) {
  imageSelectionnee = image;
  return imageSelectionnee;
}

/* ---------- Carrousel (index dans la liste affichée) ---------- */

let slides = catalogue;
let indexCourant = 0;

function afficherSlide(nouvelIndex) {
  const imgEl = document.getElementById("image-principale");
  const legendeEl = document.getElementById("legende");
  const compteurEl = document.getElementById("compteur");
  const btnPrec = document.getElementById("precedent");
  const btnSuiv = document.getElementById("suivant");

  if (slides.length === 0) {
    imgEl.removeAttribute("src");
    imgEl.alt = "";
    legendeEl.textContent = "Aucune image dans cette sélection.";
    compteurEl.textContent = "";
    btnPrec.disabled = true;
    btnSuiv.disabled = true;
    construireIndicateurs();
    return;
  }

  indexCourant = ((nouvelIndex % slides.length) + slides.length) % slides.length;
  const image = slides[indexCourant];
  selectionner(image);

  imgEl.src = image.fichier;
  imgEl.alt = image.titre;
  legendeEl.textContent = image.titre + " — " + image.categorie;
  compteurEl.textContent = String(indexCourant + 1) + " / " + String(slides.length);

  btnPrec.disabled = false;
  btnSuiv.disabled = false;

  construireIndicateurs();
}

function allerPrecedent() {
  afficherSlide(indexCourant - 1);
}

function allerSuivant() {
  afficherSlide(indexCourant + 1);
}

/**
 * Recrée les boutons-pastilles (exemple de création d’éléments dans le DOM).
 */
function construireIndicateurs() {
  const conteneur = document.getElementById("indicateurs");
  conteneur.innerHTML = "";

  for (let i = 0; i < slides.length; i++) {
    const bouton = document.createElement("button");
    bouton.type = "button";
    bouton.textContent = String(i + 1);
    bouton.setAttribute("aria-label", "Image " + String(i + 1));
    if (i === indexCourant) {
      bouton.classList.add("actif");
    }
    const index = i;
    bouton.addEventListener("click", function () {
      afficherSlide(index);
    });
    conteneur.appendChild(bouton);
  }
}

function appliquerFiltre() {
  const valeur = document.getElementById("filtre").value;
  slides = filtrerParCategorie(catalogue, valeur);
  afficherSlide(0);
}

document.getElementById("precedent").addEventListener("click", allerPrecedent);
document.getElementById("suivant").addEventListener("click", allerSuivant);
document.getElementById("filtre").addEventListener("change", appliquerFiltre);

appliquerFiltre();
