/* Ce tableau gardera les réponses du chatbot après le chargement du JSON. */
var donneesChatbot = [];

/* Cette fonction ouvre et ferme le menu du petit écran. */
function ouvrirMenu() {
  var boutonMenu = document.getElementById("bouton-menu-petit-ecran");
  var menuPetitEcran = document.getElementById("menu-petit-ecran");
  var iconeMenu;
  var liensPetitEcran;
  var i;

  if (boutonMenu == null || menuPetitEcran == null) {
    return;
  }

  boutonMenu.onclick = function () {
    iconeMenu = boutonMenu.getElementsByTagName("i")[0];

    if (menuPetitEcran.className.indexOf("actif") != -1) {
      menuPetitEcran.classList.remove("actif");

      if (iconeMenu != null) {
        iconeMenu.className = "icone icone-menu";
      }
    } else {
      menuPetitEcran.classList.add("actif");

      if (iconeMenu != null) {
        iconeMenu.className = "icone icone-fermer";
      }
    }
  };

  liensPetitEcran = menuPetitEcran.getElementsByTagName("a");

  for (i = 0; i < liensPetitEcran.length; i++) {
    liensPetitEcran[i].onclick = function () {
      iconeMenu = boutonMenu.getElementsByTagName("i")[0];
      menuPetitEcran.classList.remove("actif");

      if (iconeMenu != null) {
        iconeMenu.className = "icone icone-menu";
      }
    };
  }
}

/* Cette fonction met en valeur le lien de la page ouverte. */
function mettreLienActif() {
  var pageActuelle = window.location.pathname.split("/").pop();
  var liens = document.querySelectorAll(".navigation-entete a, .menu-petit-ecran a");
  var hrefLien;
  var i;

  if (pageActuelle == "") {
    pageActuelle = "index.html";
  }

  for (i = 0; i < liens.length; i++) {
    hrefLien = liens[i].getAttribute("href");

    if (hrefLien == pageActuelle) {
      liens[i].classList.add("actif");
    }
  }
}

/* Cette fonction fait tourner les images de la page d'accueil. */
function changerSlideAccueil() {
  var diapositives = document.querySelectorAll(".diapo-accueil");
  var numeroDiapositive = 0;
  var i;

  if (diapositives.length == 0) {
    return;
  }

  setInterval(function () {
    for (i = 0; i < diapositives.length; i++) {
      diapositives[i].classList.remove("actif");
    }

    numeroDiapositive = numeroDiapositive + 1;

    if (numeroDiapositive >= diapositives.length) {
      numeroDiapositive = 0;
    }

    diapositives[numeroDiapositive].classList.add("actif");
  }, 5000);
}

/* Cette fonction ouvre et ferme les réponses de la FAQ. */
function gererFaq() {
  var boutonsFaq = document.querySelectorAll(".titre-faq");
  var blocParent;
  var tousLesBlocs;
  var dejaOuvert;
  var i;
  var j;

  for (i = 0; i < boutonsFaq.length; i++) {
    boutonsFaq[i].onclick = function () {
      blocParent = this.parentElement;
      tousLesBlocs = document.querySelectorAll(".bloc-faq");
      dejaOuvert = blocParent.className.indexOf("actif") != -1;

      for (j = 0; j < tousLesBlocs.length; j++) {
        tousLesBlocs[j].classList.remove("actif");
      }

      if (dejaOuvert == false) {
        blocParent.classList.add("actif");
      }
    };
  }
}

/* Cette petite fonction ajoute un zéro si nécessaire. */
function ajouterZero(nombre) {
  if (nombre < 10) {
    return "0" + nombre;
  }

  return "" + nombre;
}

/* Cette fonction prépare un texte pour en faire un nom de fichier. */
function nettoyerNomFichier(texte) {
  var resultat = texte;

  resultat = resultat.replace(/ /g, "_");
  resultat = resultat.replace(/[\\/:*?"<>|]/g, "-");

  return resultat;
}

/* Cette fonction crée le nom du fichier JSON du formulaire. */
function creerNomFichierContact(nomUtilisateur) {
  var dateActuelle = new Date();
  var jour = ajouterZero(dateActuelle.getDate());
  var mois = ajouterZero(dateActuelle.getMonth() + 1);
  var annee = dateActuelle.getFullYear();
  var heure = ajouterZero(dateActuelle.getHours());
  var minute = ajouterZero(dateActuelle.getMinutes());
  var seconde = ajouterZero(dateActuelle.getSeconds());

  return nettoyerNomFichier(nomUtilisateur) + "_" + jour + "-" + mois + "-" + annee + "_" + heure + "-" + minute + "-" + seconde + ".json";
}

/* Cette fonction crée l'objet à enregistrer depuis le formulaire. */
function preparerMessageContact(formulaire) {
  var dateActuelle = new Date();
  var jour = ajouterZero(dateActuelle.getDate());
  var mois = ajouterZero(dateActuelle.getMonth() + 1);
  var annee = dateActuelle.getFullYear();
  var heure = ajouterZero(dateActuelle.getHours());
  var minute = ajouterZero(dateActuelle.getMinutes());
  var seconde = ajouterZero(dateActuelle.getSeconds());

  return {
    nom: formulaire.querySelector('input[name="nom"]').value,
    courriel: formulaire.querySelector('input[name="courriel"]').value,
    telephone: formulaire.querySelector('input[name="telephone"]').value,
    sujet: formulaire.querySelector('select[name="sujet"]').value,
    message: formulaire.querySelector('textarea[name="message"]').value,
    date: jour + "/" + mois + "/" + annee,
    heure: heure + ":" + minute + ":" + seconde
  };
}

/* Cette fonction lance le téléchargement du fichier JSON. */
function telechargerFichierJson(messageContact, nomFichier) {
  var contenuJson = JSON.stringify(messageContact, null, 2);
  var fichier = new Blob([contenuJson], { type: "application/json" });
  var lien = document.createElement("a");

  lien.href = URL.createObjectURL(fichier);
  lien.download = nomFichier;
  document.body.appendChild(lien);
  lien.click();
  document.body.removeChild(lien);
  URL.revokeObjectURL(lien.href);
}

/* Cette fonction montre un message d'aide sous le formulaire. */
function afficherMessageTelechargement(nomFichier) {
  var zoneMessage = document.getElementById("message-telechargement");

  if (zoneMessage == null) {
    return;
  }

  zoneMessage.innerHTML = "Le fichier <strong>" + nomFichier + "</strong> a été téléchargé. Pensez à l'enregistrer dans le dossier data du projet.";
  zoneMessage.style.display = "block";
}

/* Cette fonction vérifie les champs importants avant l'envoi. */
function verifierFormulaireContact() {
  var formulaire = document.getElementById("formulaire-contact");
  var champNom;
  var champCourriel;
  var champMessage;
  var boutonEnvoi;
  var nouveauMessage;
  var nomFichier;
  var zoneMessage;

  if (formulaire == null) {
    return;
  }

  formulaire.onsubmit = function (evenement) {
    evenement.preventDefault();

    champNom = formulaire.querySelector('input[name="nom"]');
    champCourriel = formulaire.querySelector('input[name="courriel"]');
    champMessage = formulaire.querySelector('textarea[name="message"]');
    zoneMessage = document.getElementById("message-telechargement");

    if (champNom == null || champCourriel == null || champMessage == null) {
      alert("Le formulaire est incomplet.");
      return false;
    }

    if (champNom.value == "" || champCourriel.value == "" || champMessage.value == "") {
      alert("Merci de remplir les champs obligatoires.");
      return false;
    }

    nouveauMessage = preparerMessageContact(formulaire);
    nomFichier = creerNomFichierContact(nouveauMessage.nom);
    telechargerFichierJson(nouveauMessage, nomFichier);
    afficherMessageTelechargement(nomFichier);

    if (zoneMessage != null) {
      zoneMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    alert("Le message a bien été préparé. Enregistrez le fichier téléchargé dans le dossier data du projet.");

    formulaire.reset();
    mettreSujetDepuisLien();

    boutonEnvoi = formulaire.querySelector('button[type="submit"]');

    if (boutonEnvoi != null) {
      boutonEnvoi.disabled = false;
      boutonEnvoi.innerHTML = '<i class="icone icone-envoi"></i> Envoyer le message';
    }

    return false;
  };
}

/* Cette fonction remplit le sujet si on arrive depuis un autre bouton. */
function mettreSujetDepuisLien() {
  var listeSujet = document.getElementById("champ-sujet");
  var recherche = window.location.search;
  var morceaux;
  var partie;
  var valeur;
  var i;

  if (listeSujet == null || recherche == "") {
    return;
  }

  if (recherche.charAt(0) == "?") {
    recherche = recherche.substring(1);
  }

  morceaux = recherche.split("&");

  for (i = 0; i < morceaux.length; i++) {
    partie = morceaux[i].split("=");

    if (partie[0] == "sujet" && partie.length > 1) {
      valeur = decodeURIComponent(partie[1].replace(/\+/g, " "));
      listeSujet.value = valeur;
    }
  }
}

/* Cette fonction ajoute un message dans la boîte du chatbot. */
function afficherMessageChatbot(message, typeMessage) {
  var boiteChatbot = document.getElementById("boite-chatbot");
  var ligneMessage;
  var blocMessage;

  if (boiteChatbot == null) {
    return;
  }

  ligneMessage = document.createElement("div");
  ligneMessage.className = "ligne-chatbot " + typeMessage;

  blocMessage = document.createElement("div");
  blocMessage.className = "message-chatbot";
  blocMessage.innerHTML = message;

  ligneMessage.appendChild(blocMessage);
  boiteChatbot.appendChild(ligneMessage);
  boiteChatbot.scrollTop = boiteChatbot.scrollHeight;
}

/* Cette fonction cherche une réponse simple selon le message saisi. */
function chercherReponseChatbot(messageUtilisateur) {
  var messageMinuscule = messageUtilisateur.toLowerCase();
  var reponse = "Je n'ai pas encore la réponse exacte. Vous pouvez me demander des informations sur les formations, les admissions, la vie étudiante, les partenariats ou le contact.";
  var i;
  var j;
  var reponsesPossibles;
  var numeroReponse;

  for (i = 0; i < donneesChatbot.length; i++) {
    for (j = 0; j < donneesChatbot[i].patterns.length; j++) {
      if (messageMinuscule.indexOf(donneesChatbot[i].patterns[j].toLowerCase()) != -1) {
        reponsesPossibles = donneesChatbot[i].responses;
        numeroReponse = Math.floor(Math.random() * reponsesPossibles.length);
        reponse = reponsesPossibles[numeroReponse];
        return reponse;
      }
    }
  }

  return reponse;
}

/* Cette fonction envoie le message utilisateur au chatbot. */
function envoyerMessageChatbot() {
  var champChatbot = document.getElementById("champ-chatbot");
  var messageUtilisateur;
  var reponseBot;

  if (champChatbot == null) {
    return;
  }

  messageUtilisateur = champChatbot.value;
  messageUtilisateur = messageUtilisateur.replace(/^\s+|\s+$/g, "");

  if (messageUtilisateur == "") {
    return;
  }

  afficherMessageChatbot(messageUtilisateur, "utilisateur");
  reponseBot = chercherReponseChatbot(messageUtilisateur);
  afficherMessageChatbot(reponseBot, "bot");
  champChatbot.value = "";
}

/* Cette fonction prépare le chatbot et charge ses réponses JSON. */
function chargerChatbot() {
  var champChatbot = document.getElementById("champ-chatbot");
  var boutonChatbot = document.getElementById("bouton-chatbot");

  if (champChatbot == null || boutonChatbot == null) {
    return;
  }

  boutonChatbot.onclick = function () {
    envoyerMessageChatbot();
  };

  champChatbot.onkeydown = function (evenement) {
    if (evenement.key == "Enter") {
      evenement.preventDefault();
      envoyerMessageChatbot();
    }
  };

  afficherMessageChatbot("Bonjour ! Je peux vous renseigner sur les formations, les admissions, la vie étudiante, les partenariats et les contacts.", "bot");

  fetch("../data/intents-chatbot.json")
    .then(function (reponse) {
      if (reponse.ok == false) {
        throw new Error("Le fichier JSON du chatbot est introuvable.");
      }

      return reponse.json();
    })
    .then(function (donnees) {
      if (donnees.intents != null) {
        donneesChatbot = donnees.intents;
      }
    })
    .catch(function () {
      afficherMessageChatbot("Le chatbot utilise pour le moment ses réponses par défaut. Vous pouvez quand même poser une question courte.", "bot");
    });
}

window.onload = function () {
  /* On prépare les interactions principales au chargement de la page. */
  ouvrirMenu();
  mettreLienActif();
  changerSlideAccueil();
  gererFaq();
  mettreSujetDepuisLien();
  verifierFormulaireContact();
  chargerChatbot();
};
