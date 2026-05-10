# Site vitrine - Département Informatique EFREI

## Présentation

Ce projet est un site vitrine réalisé en **HTML**, **CSS** et **JavaScript** pour le département informatique de l'EFREI.

Le site présente :

- l'accueil du département
- les formations
- l'équipe pédagogique et la recherche
- la vie étudiante
- les partenariats et la professionnalisation
- le contact, les admissions et une présentation de l'équipe projet

## Technologies utilisées

- **HTML5**
- **CSS3**
- **JavaScript**

Aucun framework n'est utilisé.

## Auteurs

- **Rayen BOUAOUINA** - Développeur, Chef de projet
- **Rayan OUMEZZAOUCHE** - Développeur

## Structure du projet

```text
SITE_TI402_Prog_WEB_OUMEZZAOUCHE_BOUAOUINA/
├── css/
│   └── styles.css
├── data/
│   └── intents-chatbot.json
├── html/
│   ├── index.html
│   ├── formations.html
│   ├── equipe.html
│   ├── vie-etudiante.html
│   ├── partenariats.html
│   └── contact.html
├── img/
│   └── images et logos du site
├── js/
│   └── script.js
└── README.md
```

## Pages du site

- **Accueil** : `/html/index.html`
- **Formations** : `/html/formations.html`
- **Équipe et Recherche** : `/html/equipe.html`
- **Vie Étudiante** : `/html/vie-etudiante.html`
- **Partenariats** : `/html/partenariats.html`
- **Contact** : `/html/contact.html`

## Fonctionnalités

- navigation responsive
- carrousel simple sur la page d'accueil
- FAQ avec ouverture/fermeture en JavaScript
- formulaire de contact
- téléchargement des données du formulaire au format JSON
- petit chatbot local basé sur un fichier JSON
- cartes partenaires cliquables

## Lancement du projet

### Méthode simple

Ouvrir le fichier :

```text
html/index.html
```

### Méthode recommandée

Pour que le **chatbot** fonctionne correctement, il est préférable de lancer le site avec un **serveur local** sur l'IDE.


## Formulaire de contact

Le formulaire de contact ne repose pas sur un backend.

Quand l'utilisateur envoie le formulaire :

- un fichier **JSON** est généré automatiquement
- le fichier est téléchargé dans le navigateur
- il faut ensuite le ranger dans le dossier voulu si nécessaire (Impossible de faire autrement sans Node.js)

Le nom du fichier suit le format :

```text
Nom_JJ-MM-AAAA_HH-MM-SS.json
```

## Chatbot

Le chatbot utilise le fichier :

```text
data/intents-chatbot.json
```

Il répond à quelques questions simples sur :

- les formations
- les admissions
- le campus
- les partenariats

## Remarques

- Le projet a été conçu dans un style volontairement simple et compréhensible.
- Le code contient quelques commentaires pour faciliter la lecture.
- Le site est valide W3C avec une structure HTML5 pensée pour rester propre et cohérente.
