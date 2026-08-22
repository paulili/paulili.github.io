/* ==================================================================
   config.js — TOUT SE MODIFIE ICI

   C'est le seul fichier que tu as besoin de toucher.
   Ne modifie jamais script.js : c'est le moteur.

   Repères rapides :
     · les textes d'accueil ............ GAME.intro
     · les journées .................... GAME.days
     · les tentatives avant révélation .. GAME.answerAttempts
     · les mots de passe ............... voir « MOTS DE PASSE » plus bas
     · la page finale .................. GAME.finale

   Les marqueurs  ⚠️  signalent ce qui reste à remplir (assets à
   déposer, contenu à écrire).
   ================================================================== */

const GAME = {

  /* ---------------- Identité du site ---------------- */

  title: "Archives célestes",
  subtitle: "Un fragment par nuit",
  rootName: "archives",


  /* ---------------- Comparaison des mots de passe ---------------- */

  matching: {
    ignoreCase: true,
    ignoreSpaces: true,
    ignoreAccents: true,
    ignorePunctuation: false
  },


  /* ---------------- Tentatives avant révélation ----------------

     Réglage par défaut pour TOUTES les questions (puzzle simple ou
     étape d'un questionnaire à plusieurs questions) :
       max     → nombre d'essais ratés avant que la réponse
                 s'affiche automatiquement et qu'un bouton
                 "Continuer" apparaisse.
       hintAt / hintText → optionnel, affiche un indice après un
                 certain nombre d'essais ratés, avant la révélation.

     Une question précise peut écraser ce réglage via son propre
     champ `attempts: { max, hintAt, hintText }` (voir le 24 août,
     4e question, qui a un réglage spécial : indice après 3 essais,
     réponse après 7).
  */

  answerAttempts: {
    max: 5
  },


  /* ---------------- Introduction ---------------- */

  intro: {
    /* Ces deux champs alimentent la tuile "prologue" en tête de la
       liste des archives. */
    folderName: "MISSION",
    date: "Avant le 20 août",

    title: "Avant de commencer",
    blocks: [
      { type: "text", value: "⚠️ Petite précision avant de commencer : tu es informaticien, donc si jamais tu galères techniquement quelque part, essaie déjà de trouver la solution par toi-même. Et si vraiment rien ne fonctionne… contacte le service support (aka moi, hehe)." },
      { type: "embed", source: "https://drive.google.com/file/d/1FS_9_TniSJDAM2jJnBwTmMJH8y_A6btO/preview", link: "https://drive.google.com/file/d/1FS_9_TniSJDAM2jJnBwTmMJH8y_A6btO/view?usp=sharing" },
      { type: "file", source: "assets/documents/lettre_intro.pdf", label: "Ouvrir la lettre" }
    ],
    startLabel: "Entrer dans les archives"
  },


  /* ==================================================================
     LES JOURNÉES

     TYPES DE PUZZLE disponibles pour un jour :

       1. Puzzle simple (par défaut) : puzzle.blocks + fragment.password
          → un champ de saisie classique.

       2. Pendu : puzzle.type = "hangman", puzzle.word = le mot à
          deviner (utilisé aussi comme fragment.password).

       3. Questions à la suite : puzzle.steps = [ { prompt, password,
          attempts? }, ... ]. Un des steps peut être une question de
          type date : { prompt, type: "date", answer: "JJ/MM" }
          (l'année n'est pas vérifiée). Une fois toutes les étapes
          réussies, le fragment s'ouvre automatiquement.

     TYPES DE BLOCS pour puzzle.blocks / fragment.blocks :
       text, letter, quote, image, gallery, video, audio, code,
       divider, signature. (voir script.js pour le détail des champs)
     ================================================================== */

  days: [

    /* ============================ JOUR 1 — 2008 ============================ */
    {
      id: 1,
      date: "20 août",
      folderName: "2008",
      subtitle: "Le premier vol",
      entryPassword: null,          // premier jour : dossier ouvert

      puzzle: {
        title: "Retrouve le vol",
        intro: "",
        blocks: [
          { type: "embed", source: "https://drive.google.com/file/d/1eVD5Z9fFdnPndlShFp5MMtBNBmvJn2aE/preview", link: "https://drive.google.com/file/d/1eVD5Z9fFdnPndlShFp5MMtBNBmvJn2aE/view?usp=sharing" },
          { type: "image", source: "assets/vol2008.png", caption: "Regarde bien cette image." }
        ],
        hints: [],
        promptLabel: "Quel est le numéro de mon vol ?"
      },

      fragment: {
        name: "FRAGMENT1",
        label: "Fragment 01",
        password: "BF720",
        blocks: [
          { type: "image", source: "assets/2008.jpeg" }
        ]
      }
    },

    /* ============================ JOUR 2 — 2108 (pendu) ============================ */
    {
      id: 2,
      date: "21 août",
      folderName: "2108",
      entryPassword: null,          // dossiers non verrouillés

      puzzle: {
        type: "hangman",
        word: "rromani",
        title: "Un mot à deviner",
        intro: "Devine le mot lettre par lettre.",
        blocks: [],
        hints: [],
        promptLabel: "Devine le mot pour ouvrir le fragment"
      },

      fragment: {
        name: "FRAGMENT2",
        label: "Fragment 02",
        password: "rromani",
        blocks: [
          { type: "image", source: "assets/2108.jpeg" }
        ]
      }
    },

    /* ============================ JOUR 3 — 2208 ============================ */
    {
      id: 3,
      date: "22 août",
      folderName: "2208",
      entryPassword: null,          // dossiers non verrouillés

      puzzle: {
        title: "Une énigme t'attend",
        intro: "",
        blocks: [
          { type: "text", value: "Recherche le nom du restaurant où on a mangé le soir de la fin des cours — le soir où l'on s'est avoué nos sentiments." }
        ],
        hints: [],
        promptLabel: "La réponse ouvre le fragment"
      },

      fragment: {
        name: "FRAGMENT3",
        label: "Fragment 03",
        password: "Barto",
        blocks: [
          { type: "image", source: "assets/2208.jpeg" }
        ]
      }
    },

    /* ============================ JOUR 4 — 2308 ============================ */
    {
      id: 4,
      date: "23 août",
      folderName: "2308",
      entryPassword: null,          // dossiers non verrouillés

      puzzle: {
        title: "Une énigme t'attend",
        intro: "Alors, quelle est la réponse ?",
        blocks: [
          { type: "embed", source: "https://drive.google.com/file/d/13J6AgAwkLa2-DOWvbKTpU70CJQnfqJxk/preview", link: "https://drive.google.com/file/d/13J6AgAwkLa2-DOWvbKTpU70CJQnfqJxk/view?usp=sharing" }
        ],
        hints: [],
        promptLabel: "Réponds par le chiffre"
      },

      fragment: {
        name: "FRAGMENT4",
        label: "Fragment 04",
        password: "13",
        blocks: [
          { type: "text", value: "Une image juste comme ça pour te faire rire haha" },
          { type: "image", source: "assets/2308.jpeg" }
        ]
      }
    },

    /* ============================ JOUR 5 — 2408 (4 questions) ============================ */
    {
      id: 5,
      date: "24 août",
      folderName: "2408",
      entryPassword: null,          // dossiers non verrouillés

      puzzle: {
        title: "Une journée à quatre souvenirs",
        intro: "Quatre questions t'attendent, l'une après l'autre.",
        blocks: [],
        hints: [],
        promptLabel: "Commencer les questions",

        steps: [
          {
            prompt: "Qu'avions nous mangé la première fois que l'on s'est revus ?",
            password: "sushi"
          },
          {
            prompt: "Où étions-nous ?",
            password: "Au Monoprix de Chatelet"
          },
          {
            prompt: "Quel jour était-ce ?",
            type: "date",
            answer: "17/02"           // JJ/MM — l'année n'est pas vérifiée
          },
          {
            prompt: "Qu'avais-tu apporté ?",
            password: "un cadeau adopt",
            attempts: { max: 7, hintAt: 3, hintText: "une boîte rose lol" }
          }
        ]
      },

      fragment: {
        name: "FRAGMENT5",
        label: "Fragment 05",
        password: null,   // non utilisé : le fragment s'ouvre après les 4 questions
        blocks: [
          { type: "gallery", sources: ["assets/2408-1.jpeg", "assets/2408-2.jpeg"] }
        ]
      }
    },

    /* ============================ JOUR 6 — 2508 ============================ */
    {
      id: 6,
      date: "25 août",
      folderName: "2508",
      entryPassword: null,          // dossiers non verrouillés

      puzzle: {
        title: "Quel est ce lac ?",
        intro: "Tu as le droit de tricher.",
        blocks: [
          { type: "text", value: "Je suis née d'une blessure creusée dans la terre, à la fin des années soixante, pour devenir vingt ans plus tard un miroir d'eau. Une rame de métro s'arrête à mon nom, sur la ligne huit. Un hiver, mes cygnes ont porté un mal qui a fermé mes eaux aux pêcheurs pendant trois ans. Quel lac suis-je ?" }
        ],
        hints: [],
        promptLabel: "La réponse ouvre le fragment"
      },

      fragment: {
        name: "FRAGMENT6",
        label: "Fragment 06",
        password: "Lac de Créteil",
        blocks: [
          { type: "image", source: "assets/2508.jpeg" }
        ]
      }
    },

    /* ============================ JOUR 7 — 2608 (3 questions) ============================ */
    {
      id: 7,
      date: "26 août",
      folderName: "2608",
      entryPassword: null,          // dossiers non verrouillés

      puzzle: {
        title: "Trois indices, un lien",
        intro: "",
        blocks: [],
        hints: [],
        promptLabel: "Commencer les questions",

        steps: [
          {
            prompt: "Quel député français est né le 19 décembre 1871 et est mort le 1er avril 1935 ?",
            password: "Pierre Renaudel"
          },
          {
            prompt: "Quel est le nom de la berline routière diesel produite entre 2004 et 2010, qui existe en deux versions principales de moteurs six cylindres (2,5 litres, 177ch en phase 1), reconnue pour son confort et sa performance routière ?",
            password: ["BMW 525d E60", "BMW 525d", "525d E60", "E60"]
          },
          {
            prompt: "Quel est le lien de ces deux éléments avec le numéro 6 ?",
            password: "notre premier bisou"
          }
        ]
      },

      fragment: {
        name: "FRAGMENT7",
        label: "Fragment 07",
        password: null,
        blocks: [
          { type: "gallery", sources: ["assets/2608-1.jpeg", "assets/2608-2.jpeg", "assets/2608-3.jpeg", "assets/2608-4.jpeg"] },
          { type: "video", source: "assets/2608-5.mp4" }
        ]
      }
    },

    /* ============================ JOUR 8 — 2708 ============================ */
    {
      id: 8,
      date: "27 août",
      folderName: "2708",
      entryPassword: null,          // dossiers non verrouillés

      puzzle: {
        title: "Reconnais l'endroit",
        intro: "",
        blocks: [
          { type: "image", source: "assets/capturedecranparc.png", caption: "De quel endroit s'agit-il ?" }
        ],
        hints: [],
        promptLabel: "La réponse ouvre le fragment"
      },

      fragment: {
        name: "FRAGMENT8",
        label: "Fragment 08",
        password: "Lac Daumesnil",
        blocks: [
          { type: "gallery", sources: ["assets/2708-1.jpeg", "assets/2708-2.jpeg", "assets/2708-3.jpeg", "assets/2708-4.jpeg", "assets/2708-5.jpeg"] },
          { type: "video", source: "assets/2708-6.mp4" }
        ]
      }
    },

    /* ============================ JOUR 9 — 2808 ============================ */
    {
      id: 9,
      date: "28 août",
      folderName: "2808",
      entryPassword: null,          // dossiers non verrouillés

      puzzle: {
        title: "Une énigme t'attend",
        intro: "",
        blocks: [
          { type: "text", value: "Quel est l'évènement qui reliait nos deux assemblées ?" }
        ],
        hints: [],
        promptLabel: "La réponse ouvre le fragment"
      },

      fragment: {
        name: "FRAGMENT9",
        label: "Fragment 09",
        password: "la campagne de rromani",
        blocks: [
          { type: "gallery", sources: ["assets/2808-1.jpeg", "assets/2808-2.jpeg", "assets/2808-3.jpeg"] },
          { type: "video", source: "assets/2808-4.mp4" }
        ]
      }
    },

    /* ============================ JOUR 10 — 2908 ============================ */
    {
      id: 10,
      date: "29 août",
      folderName: "2908",
      entryPassword: null,          // dossiers non verrouillés

      puzzle: {
        title: "Une énigme t'attend",
        intro: "",
        blocks: [
          { type: "text", value: "Quelles sont les fleurs préférées de ta Bien-Aimée ?" }
        ],
        hints: [],
        promptLabel: "La réponse ouvre le fragment"
      },

      fragment: {
        name: "FRAGMENT10",
        label: "Fragment 10",
        password: "les pivoines",
        blocks: [
          { type: "image", source: "assets/2908.jpeg" }
        ]
      }
    },

    /* ============================ JOUR 11 — 2908 bis ============================ */
    {
      id: 11,
      date: "29 août",
      folderName: "2908B",
      subtitle: "Suite du 29 août",
      entryPassword: null,          // dossiers non verrouillés

      puzzle: {
        title: "Une énigme t'attend",
        intro: "",
        blocks: [
          { type: "quote", value: "You're always in my brain, and I take the blame\nNo matter if it's wrong or right\nI'm on a one-way train, and it's far away, but you're still on my mind" },
          { type: "text", value: "Ces quelques paroles appartiennent à une chanson d'un groupe dont tu as déjà entendu parler. Quel est le nom du groupe ?" }
        ],
        hints: [],
        promptLabel: "La réponse ouvre le fragment"
      },

      fragment: {
        name: "FRAGMENT11",
        label: "Fragment 11",
        password: ["The Neighbourhood", "The NBHD"]
        blocks: [
          { type: "gallery", sources: ["assets/2908b-1.jpeg", "assets/2908b-2.jpeg"] },
          { type: "video", source: "assets/2908b-3.mp4" },
          { type: "video", source: "assets/2908b-4.mp4" }
        ]
      }
    },

    /* ============================ JOUR 12 — 3008 ============================ */
    {
      id: 12,
      date: "30 août",
      folderName: "3008",
      entryPassword: null,          // dossiers non verrouillés

      puzzle: {
        title: "Que représentent ces éléments ?",
        intro: "(la réponse tient en 3 lettres)",
        blocks: [
          { type: "image", source: "assets/bulletinPC.png" }
        ],
        hints: [],
        promptLabel: "La réponse ouvre le fragment"
      },

      fragment: {
        name: "FRAGMENT12",
        label: "Fragment 12",
        password: "BTS",
        blocks: [
          { type: "gallery", sources: ["assets/3008-1.jpeg", "assets/3008-2.jpeg", "assets/3008-3.jpeg"] },
          { type: "video", source: "assets/3008-4.mp4" }
        ]
      }
    },

    /* ============================ JOUR 13 — 3108 ============================ */
    {
      id: 13,
      date: "31 août",
      folderName: "3108",
      entryPassword: null,          // dossiers non verrouillés

      puzzle: {
        title: "Une énigme t'attend",
        intro: "De quel matériau est faite une outre ? (voir les références du Guide)",
        blocks: [
          { type: "embed", source: "https://drive.google.com/file/d/1Hy_jCn8ExqjaGIdPl9OflVMJTHaSbwKI/preview", link: "https://drive.google.com/file/d/1Hy_jCn8ExqjaGIdPl9OflVMJTHaSbwKI/view?usp=drive_link" }
        ],
        hints: [],
        promptLabel: "La réponse ouvre le fragment"
      },

      fragment: {
        name: "FRAGMENT13",
        label: "Fragment 13",
        password: "peaux d'animaux",
        blocks: [
          { type: "video", source: "assets/txtjour3108.mp4" }
        ]
      }
    },

    /* ============================ JOUR 14 — 0109 ============================ */
    {
      id: 14,
      date: "1er septembre",
      folderName: "0109",
      entryPassword: null,          // dossiers non verrouillés

      puzzle: {
        title: "Devine le lieu",
        intro: "",
        blocks: [
          { type: "text", value: "J'ai porté des couronnes avant de porter des chefs-d'œuvre. Mes murs ont vu des rois y dormir, avant de voir le monde entier y défiler. Une pyramide de verre garde aujourd'hui l'entrée de mes trésors les plus anciens. Qui suis-je ?" }
        ],
        hints: [],
        promptLabel: "La réponse ouvre le fragment"
      },

      fragment: {
        name: "FRAGMENT14",
        label: "Fragment 14",
        password: "Musée du Louvre",
        blocks: [
          { type: "gallery", sources: ["assets/0109-1.jpeg", "assets/0109-2.jpeg", "assets/0109-3.jpeg", "assets/0109-4.jpeg", "assets/0109-5.jpeg", "assets/0109-6.jpeg", "assets/0109-7.jpeg", "assets/0109-8.jpeg", "assets/0109-9.jpeg", "assets/0109-10.jpeg"] }
        ]
      }
    },

    /* ============================ JOUR 15 — 0109 bis ============================ */
    {
      id: 15,
      date: "1er septembre",
      folderName: "0109B",
      subtitle: "Suite du 1er septembre",
      entryPassword: null,          // dossiers non verrouillés

      puzzle: {
        title: "Une énigme t'attend",
        intro: "",
        blocks: [
          { type: "text", value: "Quel endroit nous a rapprochés pendant qu'on était loin de nos maisons ?" }
        ],
        hints: ["Suis la chronologie."],
        promptLabel: "La réponse ouvre le fragment"
      },

      fragment: {
        name: "FRAGMENT15",
        label: "Fragment 15",
        password: "Assemblée Internationale à Bucarest",
        blocks: [
          { type: "gallery", sources: ["assets/0109b-1.jpeg", "assets/0109b-2.jpeg", "assets/0109b-3.jpeg", "assets/0109b-4.jpeg", "assets/0109b-5.jpeg", "assets/0109b-6.jpeg", "assets/0109b-7.jpeg", "assets/0109b-8.jpeg", "assets/0109b-9.jpeg", "assets/0109b-10.jpeg"] }
        ]
      }
    },

    /* ============================ JOUR 16 — 0209 ============================ */
    {
      id: 16,
      date: "2 septembre",
      folderName: "0209",
      entryPassword: null,          // dossiers non verrouillés

      puzzle: {
        title: "Une énigme t'attend",
        intro: "",
        blocks: [
          { type: "text", value: "Quel autre endroit me procure des sensations comme toi ?" }
        ],
        hints: ["Suis la chronologie."],
        promptLabel: "La réponse ouvre le fragment"
      },

      fragment: {
        name: "FRAGMENT16",
        label: "Fragment 16",
        password: "Europa-Park",
        blocks: [
          { type: "gallery", sources: ["assets/0209-1.jpeg", "assets/0209-2.jpeg", "assets/0209-3.jpeg"] },
          { type: "video", source: "assets/0209-4.mp4" },
          { type: "video", source: "assets/0209-5.mp4" },
          { type: "video", source: "assets/0209-6.mp4" }
        ]
      }
    },

    /* ============================ JOUR 17 — 0309 ============================ */
    {
      id: 17,
      date: "3 septembre",
      folderName: "0309",
      entryPassword: null,          // dossiers non verrouillés

      puzzle: {
        title: "La dernière énigme",
        intro: "",
        blocks: [
          { type: "text", value: "Quel est le fragment le plus récent qui nous rapproche le plus de Jéhovah ?" }
        ],
        hints: [],
        promptLabel: "La réponse ouvre le fragment"
      },

      fragment: {
        name: "FRAGMENT17",
        label: "Fragment 17",
        password: "la visite du Béthel",
        blocks: [
          { type: "gallery", sources: ["assets/0309-1.jpeg", "assets/0309-2.jpeg", "assets/0309-3.jpeg", "assets/0309-4.jpeg", "assets/0309-5.jpeg"] }
        ]
      }
    }

  ],


  /* ---------------- Page finale ---------------- */

  finale: {
    folderName: "TOUJOURS",
    label: "Le message",
    teaser: "Les fragments sont réunis.",
    title: "On se dit la suite en vrai",
    blocks: [
      { type: "text", value: "On en parle en face to face haha (surtout parce que j'ai eu un peu la flemme de finir, sorry)" },

      { type: "signature", value: "Paula" }
    ]
  }
};
