/* ==================================================================
   config.js — TOUT SE MODIFIE ICI

   C'est le seul fichier que tu as besoin de toucher.
   Ne modifie jamais script.js : c'est le moteur.

   Repères rapides :
     · les textes d'accueil ............ GAME.intro
     · les journées .................... GAME.days
     · les mots de passe ............... voir « MOTS DE PASSE » ci-dessous
     · la page finale .................. GAME.finale

   Les marqueurs  ⚠️  signalent ce qui reste à remplir.
   ================================================================== */

const GAME = {

  /* ---------------- Identité du site ---------------- */

  title: "Archives célestes",
  subtitle: "Un fragment par nuit",

  /* Nom affiché à la racine du chemin, en haut de l'écran. */
  rootName: "archives",


  /* ---------------- Comparaison des mots de passe ----------------

     Passe une option à false si tu veux être plus stricte.
     Avec la configuration par défaut, ces trois saisies sont
     acceptées pour le mot de passe "13papillons" :
        13papillons   ·   13 Papillons   ·   13 PAPILLONS
  */

  matching: {
    ignoreCase: true,        // majuscules ignorées
    ignoreSpaces: true,      // espaces ignorés
    ignoreAccents: true,     // é = e
    ignorePunctuation: false // true = tirets, apostrophes et points ignorés
  },


  /* ---------------- Introduction ----------------

     Premier écran découvert en arrivant.
     Les « blocks » acceptent les types décrits plus bas.
  */

  intro: {
    title: "Avant de commencer",
    blocks: [
      { type: "text", value: "⚠️ [TEXTE D'INTRODUCTION — À AJOUTER]" },
      { type: "text", value: "Chaque nuit, une archive s'ouvre. Une énigme la garde. La résoudre libère un fragment, et le fragment porte la clé de la nuit suivante." },

      /* Décommente pour ajouter une photo ou une vidéo :
      { type: "image", source: "assets/images/nous.jpg", caption: "légende facultative" },
      { type: "video", source: "assets/videos/intro.mp4", poster: "assets/images/poster.jpg" },
      */

      { type: "signature", value: "Paula" }
    ],
    startLabel: "Entrer dans les archives"
  },


  /* ==================================================================
     LES JOURNÉES

     Une entrée par jour, dans l'ordre chronologique.
     Copie un bloc entier pour ajouter une journée.

     Champs d'une journée :
       id ............. numéro unique, sert de clé de sauvegarde
       date ........... texte affiché ("20 août")
       folderName ..... nom du dossier ("2008"), apparaît dans l'URL
       subtitle ....... une ligne d'ambiance sous le nom, facultatif
       entryPassword .. mot de passe pour ouvrir le dossier du jour
                        (null pour le premier jour, qui est ouvert)
       puzzle ......... l'énigme
       fragment ....... ce qu'on découvre après l'avoir résolue

     ------------------------------------------------------------------
     MOTS DE PASSE — comment fonctionne la chaîne

       fragment.password   = la réponse à l'énigme du jour
                             (ouvre le dossier FRAGMENTX)

       entryPassword       = la clé qui ouvre le dossier du jour

     Le mot de passe révélé à la fin d'un fragment est celui du jour
     SUIVANT : le moteur va le chercher tout seul dans
     days[suivant].entryPassword. Tu ne l'écris donc qu'une fois.
     ------------------------------------------------------------------

     TYPES DE BLOCS disponibles pour puzzle.blocks et fragment.blocks :

       { type: "text",    value: "un paragraphe" }
       { type: "letter",  value: "un texte en écriture manuscrite" }
       { type: "quote",   value: "une phrase mise en exergue" }
       { type: "image",   source: "assets/images/x.jpg", caption: "…" }
       { type: "gallery", sources: ["assets/images/a.jpg", "assets/images/b.jpg"] }
       { type: "video",   source: "assets/videos/x.mp4", poster: "assets/images/x.jpg" }
       { type: "audio",   source: "assets/audio/x.mp3", label: "Écoute" }
       { type: "code",    value: "UN INDICE EN GROSSES LETTRES" }
       { type: "divider" }
       { type: "signature", value: "Paula" }

     Mélanger plusieurs blocs suffit à faire une énigme « mixed ».
     ================================================================== */

  days: [

    /* ============================ JOUR 1 ============================ */
    {
      id: 1,
      date: "20 août",
      folderName: "2008",
      subtitle: "Le premier vol",
      entryPassword: null,          // premier jour : dossier ouvert

      puzzle: {
        title: "Une énigme t'attend",
        intro: "Prends ton temps. La réponse est un mot.",
        blocks: [
          { type: "text", value: "⚠️ [ÉNIGME DU 20 AOÛT — CONTENU À AJOUTER]" },

          /* Exemples à décommenter le moment venu :
          { type: "video",  source: "assets/videos/avion.mp4", poster: "assets/images/avion.jpg" },
          { type: "image",  source: "assets/images/indice1.jpg", caption: "Regarde bien la date." },
          { type: "audio",  source: "assets/audio/message.mp3", label: "Un message vocal" },
          { type: "letter", value: "Mon amour,\n\nTu te souviens de ce jour…" },
          { type: "code",   value: "TOULOUSE" },
          */
        ],

        /* Indices facultatifs, révélés un par un à la demande.
           Retire le tableau ou laisse-le vide pour ne rien proposer. */
        hints: [
          "⚠️ [PREMIER INDICE — À AJOUTER]"
        ],

        promptLabel: "La réponse ouvre le fragment"
      },

      fragment: {
        name: "FRAGMENT1",
        label: "Fragment 01",
        password: "avion",          // ⚠️ RÉPONSE À L'ÉNIGME — à remplacer
        blocks: [
          { type: "text", value: "⚠️ [FRAGMENT 1 — CONTENU À AJOUTER]" },

          /* Exemples :
          { type: "quote", value: "le premier mot du message final" },
          { type: "image", source: "assets/images/fragment1.jpg" },
          */
        ]
      }
    },

    /* ============================ JOUR 2 ============================ */
    {
      id: 2,
      date: "21 août",
      folderName: "2108",
      subtitle: "⚠️ [THÈME DU JOUR 2]",
      entryPassword: "lune",        // ⚠️ révélé à la fin du FRAGMENT1

      puzzle: {
        title: "Une énigme t'attend",
        intro: "",
        blocks: [
          { type: "text", value: "⚠️ [ÉNIGME DU 21 AOÛT — CONTENU À AJOUTER]" }
        ],
        hints: [],
        promptLabel: "La réponse ouvre le fragment"
      },

      fragment: {
        name: "FRAGMENT2",
        label: "Fragment 02",
        password: "etoile",         // ⚠️ à remplacer
        blocks: [
          { type: "text", value: "⚠️ [FRAGMENT 2 — CONTENU À AJOUTER]" }
        ]
      }
    },

    /* ============================ JOUR 3 ============================ */
    {
      id: 3,
      date: "22 août",
      folderName: "2208",
      subtitle: "⚠️ [THÈME DU JOUR 3]",
      entryPassword: "constellation", // ⚠️ révélé à la fin du FRAGMENT2

      puzzle: {
        title: "Une énigme t'attend",
        intro: "",
        blocks: [
          { type: "text", value: "⚠️ [ÉNIGME DU 22 AOÛT — CONTENU À AJOUTER]" }
        ],
        hints: [],
        promptLabel: "La réponse ouvre le fragment"
      },

      fragment: {
        name: "FRAGMENT3",
        label: "Fragment 03",
        password: "orion",          // ⚠️ à remplacer
        blocks: [
          { type: "text", value: "⚠️ [FRAGMENT 3 — CONTENU À AJOUTER]" }
        ]
      }
    }

    /* Pour ajouter une journée : copie un bloc ci-dessus, incrémente
       l'id, change la date et le folderName, et renseigne son
       entryPassword — c'est lui qui sera révélé au fragment précédent. */

  ],


  /* ---------------- Page finale ----------------

     Devient accessible quand tous les fragments sont ouverts.
     Elle apparaît alors en bas de la liste des archives.
  */

  finale: {
    folderName: "TOUJOURS",
    label: "Le message",
    teaser: "Les fragments sont réunis.",
    title: "⚠️ [TITRE DU MESSAGE FINAL]",
    blocks: [
      { type: "text", value: "⚠️ [MESSAGE FINAL — CONTENU À AJOUTER]" },

      /* Exemples :
      { type: "video", source: "assets/videos/final.mp4", poster: "assets/images/final.jpg" },
      { type: "letter", value: "Mon amour,\n\n…" },
      { type: "gallery", sources: ["assets/images/1.jpg", "assets/images/2.jpg", "assets/images/3.jpg"] },
      */

      { type: "signature", value: "Paula" }
    ]
  }
};
