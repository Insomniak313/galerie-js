/**
 * TP4 — Carrousel avec jQuery (même comportement que le TP3 en JavaScript pur).
 * Chemins des images relatifs à tp4/index.html.
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

jQuery(function ($) {
  let slides = catalogue;
  let indexCourant = 0;

  function afficherSlide(nouvelIndex) {
    const $img = $("#image-principale");

    if (slides.length === 0) {
      $img.removeAttr("src").attr("alt", "");
      $("#legende").text("Aucune image dans cette sélection.");
      $("#compteur").text("");
      $("#precedent, #suivant").prop("disabled", true);
      construireIndicateurs();
      return;
    }

    indexCourant = ((nouvelIndex % slides.length) + slides.length) % slides.length;
    const image = slides[indexCourant];
    selectionner(image);

    $img.attr("src", image.fichier).attr("alt", image.titre);
    $("#legende").text(image.titre + " — " + image.categorie);
    $("#compteur").text(String(indexCourant + 1) + " / " + String(slides.length));
    $("#precedent, #suivant").prop("disabled", false);

    construireIndicateurs();
  }

  function allerPrecedent() {
    afficherSlide(indexCourant - 1);
  }

  function allerSuivant() {
    afficherSlide(indexCourant + 1);
  }

  function construireIndicateurs() {
    const $conteneur = $("#indicateurs");
    $conteneur.empty();

    for (let i = 0; i < slides.length; i++) {
      const $bouton = $("<button>", {
        type: "button",
        text: String(i + 1),
        "aria-label": "Image " + String(i + 1),
      });
      if (i === indexCourant) {
        $bouton.addClass("actif");
      }
      const index = i;
      $bouton.on("click", function () {
        afficherSlide(index);
      });
      $conteneur.append($bouton);
    }
  }

  function appliquerFiltre() {
    const valeur = $("#filtre").val();
    slides = filtrerParCategorie(catalogue, valeur);
    afficherSlide(0);
  }

  $("#precedent").on("click", allerPrecedent);
  $("#suivant").on("click", allerSuivant);
  $("#filtre").on("change", appliquerFiltre);

  appliquerFiltre();

  console.log("TP4 jQuery : carrousel initialisé.");
});
