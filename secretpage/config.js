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
      entryPassword: "⚠️mot-de-passe-jour3",  // ⚠️ révélé à la fin du FRAGMENT2

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
        password: "⚠️reponse-jour3",         // ⚠️ à remplacer
        blocks: [
          { type: "text", value: "⚠️ [FRAGMENT 3 — CONTENU À AJOUTER]" }
        ]
      }
    },

    /* ============================ JOUR 4 ============================ */
    {
      id: 4,
      date: "23 août",
      folderName: "2308",
      subtitle: "⚠️ [THÈME DU JOUR 4]",
      entryPassword: "⚠️mot-de-passe-jour4",  // ⚠️ révélé à la fin du FRAGMENT3

      puzzle: {
        title: "Une énigme t'attend",
        intro: "",
        blocks: [
          { type: "text", value: "⚠️ [ÉNIGME DU 23 AOÛT — CONTENU À AJOUTER]" }
        ],
        hints: [],
        promptLabel: "La réponse ouvre le fragment"
      },

      fragment: {
        name: "FRAGMENT4",
        label: "Fragment 04",
        password: "⚠️reponse-jour4",         // ⚠️ à remplacer
        blocks: [
          { type: "text", value: "⚠️ [FRAGMENT 4 — CONTENU À AJOUTER]" }
        ]
      }
    },

    /* ============================ JOUR 5 ============================ */
    {
      id: 5,
      date: "24 août",
      folderName: "2408",
      subtitle: "⚠️ [THÈME DU JOUR 5]",
      entryPassword: "⚠️mot-de-passe-jour5",  // ⚠️ révélé à la fin du FRAGMENT4

      puzzle: {
        title: "Une énigme t'attend",
        intro: "",
        blocks: [
          { type: "text", value: "⚠️ [ÉNIGME DU 24 AOÛT — CONTENU À AJOUTER]" }
        ],
        hints: [],
        promptLabel: "La réponse ouvre le fragment"
      },

      fragment: {
        name: "FRAGMENT5",
        label: "Fragment 05",
        password: "⚠️reponse-jour5",         // ⚠️ à remplacer
        blocks: [
          { type: "text", value: "⚠️ [FRAGMENT 5 — CONTENU À AJOUTER]" }
        ]
      }
    },

    /* ============================ JOUR 6 ============================ */
    {
      id: 6,
      date: "25 août",
      folderName: "2508",
      subtitle: "⚠️ [THÈME DU JOUR 6]",
      entryPassword: "⚠️mot-de-passe-jour6",  // ⚠️ révélé à la fin du FRAGMENT5

      puzzle: {
        title: "Une énigme t'attend",
        intro: "",
        blocks: [
          { type: "text", value: "⚠️ [ÉNIGME DU 25 AOÛT — CONTENU À AJOUTER]" }
        ],
        hints: [],
        promptLabel: "La réponse ouvre le fragment"
      },

      fragment: {
        name: "FRAGMENT6",
        label: "Fragment 06",
        password: "⚠️reponse-jour6",         // ⚠️ à remplacer
        blocks: [
          { type: "text", value: "⚠️ [FRAGMENT 6 — CONTENU À AJOUTER]" }
        ]
      }
    },

    /* ============================ JOUR 7 ============================ */
    {
      id: 7,
      date: "26 août",
      folderName: "2608",
      subtitle: "⚠️ [THÈME DU JOUR 7]",
      entryPassword: "⚠️mot-de-passe-jour7",  // ⚠️ révélé à la fin du FRAGMENT6

      puzzle: {
        title: "Une énigme t'attend",
        intro: "",
        blocks: [
          { type: "text", value: "⚠️ [ÉNIGME DU 26 AOÛT — CONTENU À AJOUTER]" }
        ],
        hints: [],
        promptLabel: "La réponse ouvre le fragment"
      },

      fragment: {
        name: "FRAGMENT7",
        label: "Fragment 07",
        password: "⚠️reponse-jour7",         // ⚠️ à remplacer
        blocks: [
          { type: "text", value: "⚠️ [FRAGMENT 7 — CONTENU À AJOUTER]" }
        ]
      }
    },

    /* ============================ JOUR 8 ============================ */
    {
      id: 8,
      date: "27 août",
      folderName: "2708",
      subtitle: "⚠️ [THÈME DU JOUR 8]",
      entryPassword: "⚠️mot-de-passe-jour8",  // ⚠️ révélé à la fin du FRAGMENT7

      puzzle: {
        title: "Une énigme t'attend",
        intro: "",
        blocks: [
          { type: "text", value: "⚠️ [ÉNIGME DU 27 AOÛT — CONTENU À AJOUTER]" }
        ],
        hints: [],
        promptLabel: "La réponse ouvre le fragment"
      },

      fragment: {
        name: "FRAGMENT8",
        label: "Fragment 08",
        password: "⚠️reponse-jour8",         // ⚠️ à remplacer
        blocks: [
          { type: "text", value: "⚠️ [FRAGMENT 8 — CONTENU À AJOUTER]" }
        ]
      }
    },

    /* ============================ JOUR 9 ============================ */
    {
      id: 9,
      date: "28 août",
      folderName: "2808",
      subtitle: "⚠️ [THÈME DU JOUR 9]",
      entryPassword: "⚠️mot-de-passe-jour9",  // ⚠️ révélé à la fin du FRAGMENT8

      puzzle: {
        title: "Une énigme t'attend",
        intro: "",
        blocks: [
          { type: "text", value: "⚠️ [ÉNIGME DU 28 AOÛT — CONTENU À AJOUTER]" }
        ],
        hints: [],
        promptLabel: "La réponse ouvre le fragment"
      },

      fragment: {
        name: "FRAGMENT9",
        label: "Fragment 09",
        password: "⚠️reponse-jour9",         // ⚠️ à remplacer
        blocks: [
          { type: "text", value: "⚠️ [FRAGMENT 9 — CONTENU À AJOUTER]" }
        ]
      }
    },

    /* ============================ JOUR 10 ============================ */
    {
      id: 10,
      date: "29 août",
      folderName: "2908",
      subtitle: "⚠️ [THÈME DU JOUR 10]",
      entryPassword: "⚠️mot-de-passe-jour10",  // ⚠️ révélé à la fin du FRAGMENT9

      puzzle: {
        title: "Une énigme t'attend",
        intro: "",
        blocks: [
          { type: "text", value: "⚠️ [ÉNIGME DU 29 AOÛT — CONTENU À AJOUTER]" }
        ],
        hints: [],
        promptLabel: "La réponse ouvre le fragment"
      },

      fragment: {
        name: "FRAGMENT10",
        label: "Fragment 10",
        password: "⚠️reponse-jour10",         // ⚠️ à remplacer
        blocks: [
          { type: "text", value: "⚠️ [FRAGMENT 10 — CONTENU À AJOUTER]" }
        ]
      }
    },

    /* ============================ JOUR 11 ============================ */
    {
      id: 11,
      date: "30 août",
      folderName: "3008",
      subtitle: "⚠️ [THÈME DU JOUR 11]",
      entryPassword: "⚠️mot-de-passe-jour11",  // ⚠️ révélé à la fin du FRAGMENT10

      puzzle: {
        title: "Une énigme t'attend",
        intro: "",
        blocks: [
          { type: "text", value: "⚠️ [ÉNIGME DU 30 AOÛT — CONTENU À AJOUTER]" }
        ],
        hints: [],
        promptLabel: "La réponse ouvre le fragment"
      },

      fragment: {
        name: "FRAGMENT11",
        label: "Fragment 11",
        password: "⚠️reponse-jour11",         // ⚠️ à remplacer
        blocks: [
          { type: "text", value: "⚠️ [FRAGMENT 11 — CONTENU À AJOUTER]" }
        ]
      }
    },

    /* ============================ JOUR 12 ============================ */
    {
      id: 12,
      date: "31 août",
      folderName: "3108",
      subtitle: "⚠️ [THÈME DU JOUR 12]",
      entryPassword: "⚠️mot-de-passe-jour12",  // ⚠️ révélé à la fin du FRAGMENT11

      puzzle: {
        title: "Une énigme t'attend",
        intro: "",
        blocks: [
          { type: "text", value: "⚠️ [ÉNIGME DU 31 AOÛT — CONTENU À AJOUTER]" }
        ],
        hints: [],
        promptLabel: "La réponse ouvre le fragment"
      },

      fragment: {
        name: "FRAGMENT12",
        label: "Fragment 12",
        password: "⚠️reponse-jour12",         // ⚠️ à remplacer
        blocks: [
          { type: "text", value: "⚠️ [FRAGMENT 12 — CONTENU À AJOUTER]" }
        ]
      }
    },

    /* ============================ JOUR 13 ============================ */
    {
      id: 13,
      date: "1er septembre",
      folderName: "0109",
      subtitle: "⚠️ [THÈME DU JOUR 13]",
      entryPassword: "⚠️mot-de-passe-jour13",  // ⚠️ révélé à la fin du FRAGMENT12

      puzzle: {
        title: "Une énigme t'attend",
        intro: "",
        blocks: [
          { type: "text", value: "⚠️ [ÉNIGME DU 1ER SEPTEMBRE — CONTENU À AJOUTER]" }
        ],
        hints: [],
        promptLabel: "La réponse ouvre le fragment"
      },

      fragment: {
        name: "FRAGMENT13",
        label: "Fragment 13",
        password: "⚠️reponse-jour13",         // ⚠️ à remplacer
        blocks: [
          { type: "text", value: "⚠️ [FRAGMENT 13 — CONTENU À AJOUTER]" }
        ]
      }
    },

    /* ============================ JOUR 14 ============================ */
    {
      id: 14,
      date: "2 septembre",
      folderName: "0209",
      subtitle: "⚠️ [THÈME DU JOUR 14]",
      entryPassword: "⚠️mot-de-passe-jour14",  // ⚠️ révélé à la fin du FRAGMENT13

      puzzle: {
        title: "Une énigme t'attend",
        intro: "",
        blocks: [
          { type: "text", value: "⚠️ [ÉNIGME DU 2 SEPTEMBRE — CONTENU À AJOUTER]" }
        ],
        hints: [],
        promptLabel: "La réponse ouvre le fragment"
      },

      fragment: {
        name: "FRAGMENT14",
        label: "Fragment 14",
        password: "⚠️reponse-jour14",         // ⚠️ à remplacer
        blocks: [
          { type: "text", value: "⚠️ [FRAGMENT 14 — CONTENU À AJOUTER]" }
        ]
      }
    },

    /* ============================ JOUR 15 ============================ */
    {
      id: 15,
      date: "3 septembre",
      folderName: "0309",
      subtitle: "⚠️ [THÈME DU JOUR 15]",
      entryPassword: "⚠️mot-de-passe-jour15",  // ⚠️ révélé à la fin du FRAGMENT14

      puzzle: {
        title: "Une énigme t'attend",
        intro: "",
        blocks: [
          { type: "text", value: "⚠️ [ÉNIGME DU 3 SEPTEMBRE — CONTENU À AJOUTER]" }
        ],
        hints: [],
        promptLabel: "La réponse ouvre le fragment"
      },

      fragment: {
        name: "FRAGMENT15",
        label: "Fragment 15",
        password: "⚠️reponse-jour15",         // ⚠️ à remplacer
        blocks: [
          { type: "text", value: "⚠️ [FRAGMENT 15 — CONTENU À AJOUTER]" }
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
