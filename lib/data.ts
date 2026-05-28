export interface Artwork {
  id: string;
  title: string;
  collection: string;
  year?: string;
  medium?: string;
  dimensions?: string;
  description?: string;
  image: string | null; // null = image à venir
  aspect?: "portrait" | "landscape" | "square" | "tall";
  comingSoon?: boolean;
}

export interface Collection {
  id: string;
  label: string;
  description: string;
  cover: string | null;
  year?: string;
  parent?: string; // for sub-collections
}

export interface Exhibition {
  id: string;
  title: string;
  location: string;
  year: string;
  description?: string;
  cover?: string | null;
  images?: string[];
}

export interface ArtEngage {
  id: string;
  title: string;
  description?: string;
  image: string | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// I. COLLECTIONS
// ─────────────────────────────────────────────────────────────────────────────

export const artworks: Artwork[] = [

  // ── 1. Infranatural ───────────────────────────────────────────────────────
  {
    id: "inf-sarbacane",
    title: "Sarbacane",
    collection: "infranatural",
    year: "2025",
    medium: "Huile sur toile",
    dimensions: "164 × 132 cm",
    image: "/artworks/sarbacane.webp",
    aspect: "portrait",
  },
  {
    id: "inf-foodchain",
    title: "On Top of the Food Chain",
    collection: "infranatural",
    year: "2026",
    medium: "Huile sur toile",
    dimensions: "164 × 200 cm",
    description: "Questionne l'humanité comme bourreau et victime de la nature.",
    image: "/artworks/on-top-of-the-food-chain.webp",
    aspect: "landscape",
  },
  {
    id: "inf-ocean",
    title: "Le Cri de l'Océan",
    collection: "infranatural",
    year: "2025",
    medium: "Acrylique sur kimono",
    dimensions: "200 × 140 cm",
    image: "/artworks/le-cri-de-l-ocean.webp",
    aspect: "portrait",
  },
  {
    id: "inf-sushis",
    title: "Sushis en déchets plastiques & Sauce soja Marée Noire",
    collection: "infranatural",
    year: "2020",
    medium: "Acrylique sur bidon plastique",
    image: "/artworks/plastic-sushis.webp",
    aspect: "landscape",
  },
  {
    id: "inf-chaleur",
    title: "Chaleur humaine",
    collection: "infranatural",
    year: "2025",
    medium: "Huile sur toile",
    image: null,
    aspect: "portrait",
  },
  {
    id: "inf-crimescene",
    title: "Crime Scene",
    collection: "infranatural",
    year: "2026",
    medium: "Huile sur toile",
    dimensions: "164 × 200 cm",
    description: "Travail en cours.",
    image: null,
    aspect: "landscape",
    comingSoon: true,
  },

  // ── 2. Objets de pouvoir domestique ───────────────────────────────────────
  {
    id: "opd-evolution",
    title: "Evolution",
    collection: "objets",
    year: "2026",
    medium: "Aquarelle sur papier",
    dimensions: "50 × 72 cm",
    image: "/artworks/evolution.webp",
    aspect: "landscape",
  },
  {
    id: "opd-christmas",
    title: "Christmas Card",
    collection: "objets",
    year: "2024",
    medium: "Aquarelle sur papier",
    dimensions: "35 × 50 cm",
    image: "/artworks/christmas-card.webp",
    aspect: "landscape",
  },
  {
    id: "opd-mefiez",
    title: "Méfiez-vous des petites filles",
    collection: "objets",
    year: "2024",
    medium: "Aquarelle sur papier",
    dimensions: "35 × 50 cm",
    image: "/artworks/mefiez-vous.webp",
    aspect: "landscape",
  },
  {
    id: "opd-barbie",
    title: "Barbie Burn Out",
    collection: "objets",
    year: "2025",
    medium: "Aquarelle sur papier",
    dimensions: "50 × 35 cm",
    image: "/artworks/barbie-burnout.webp",
    aspect: "portrait",
  },
  {
    id: "opd-boyz",
    title: "Boyz Can Do It!",
    collection: "objets",
    year: "2025",
    medium: "Aquarelle sur papier",
    dimensions: "50 × 35 cm",
    image: "/artworks/boyz-can-do-it.webp",
    aspect: "portrait",
  },

  // ── 3. JO ─────────────────────────────────────────────────────────────────
  {
    id: "jo-venus",
    title: "Spirit in Motion (Venus)",
    collection: "jo",
    year: "2024",
    medium: "Huile sur toile",
    dimensions: "98 × 198 cm",
    description: "Peinte en direct lors des Jeux Olympiques de Paris 2024.",
    image: "/artworks/spirit-in-motion.webp",
    aspect: "tall",
  },
  {
    id: "jo-leon",
    title: "Léon Marchand",
    collection: "jo",
    year: "2024",
    medium: "Huile sur toile",
    dimensions: "100 × 150 cm",
    description: "Peinte en direct lors des Jeux Olympiques de Paris 2024.",
    image: "/artworks/leon-marchand.webp",
    aspect: "landscape",
  },
  {
    id: "jo-gomarianne",
    title: "Go Marianne !",
    collection: "jo",
    year: "2024",
    medium: "Aquarelle sur papier",
    dimensions: "65 × 50 cm",
    description: "Réalisée pour l'exposition Sports'Arts.",
    image: "/artworks/go-marianne.webp",
    aspect: "landscape",
  },

  // ── 4. Marianne ───────────────────────────────────────────────────────────
  {
    id: "mar-paris",
    title: "Je suis Paris",
    collection: "marianne",
    year: "2021",
    medium: "Huile sur toile",
    dimensions: "80 × 80 cm",
    image: "/artworks/je-suis-paris.webp",
    aspect: "square",
  },
  {
    id: "mar-charlie",
    title: "Je suis Charlie",
    collection: "marianne",
    year: "2021",
    medium: "Huile sur toile",
    dimensions: "150 × 100 cm",
    image: "/artworks/je-suis-charlie.webp",
    aspect: "portrait",
  },
  {
    id: "mar-nice",
    title: "Je suis Nice",
    collection: "marianne",
    year: "2021",
    medium: "Huile sur toile",
    dimensions: "150 × 100 cm",
    image: "/artworks/je-suis-nice.webp",
    aspect: "portrait",
  },
  {
    id: "mar-enseignant",
    title: "Je suis Enseignant(e)",
    collection: "marianne",
    year: "2021",
    medium: "Huile sur toile",
    dimensions: "100 × 150 cm",
    image: "/artworks/je-suis-enseignant.webp",
    aspect: "landscape",
  },

  // ── 5A. Soignants ─────────────────────────────────────────────────────────
  {
    id: "soi-reanimation",
    title: "Réanimation",
    collection: "soignants",
    year: "2020",
    medium: "Huile sur toile",
    dimensions: "60 × 80 cm",
    description: "Exposé à l'UNESCO — Résilience Créative.",
    image: "/artworks/reanimation.webp",
    aspect: "landscape",
  },
  {
    id: "soi-urgence",
    title: "Urgences de nuit",
    collection: "soignants",
    year: "2020",
    medium: "Huile sur toile",
    dimensions: "80 × 60 cm",
    description: "Exposé à l'UNESCO — Résilience Créative.",
    image: "/artworks/urgences-de-nuit.webp",
    aspect: "portrait",
  },
  {
    id: "soi-etudiante",
    title: "L'Étudiante",
    collection: "soignants",
    year: "2020",
    medium: "Aquarelle sur papier",
    dimensions: "48 × 32 cm",
    image: "/artworks/etudiante.webp",
    aspect: "portrait",
  },
  {
    id: "soi-box8",
    title: "Box 8",
    collection: "soignants",
    year: "2020",
    medium: "Aquarelle sur papier",
    dimensions: "30 × 45 cm",
    image: "/artworks/box-8.webp",
    aspect: "landscape",
  },
  {
    id: "soi-contagion",
    title: "Contagion",
    collection: "soignants",
    year: "2020",
    medium: "Aquarelle sur papier",
    dimensions: "32 × 45 cm",
    description: "Exposé à l'UNESCO — Résilience Créative.",
    image: "/artworks/contagion.webp",
    aspect: "landscape",
  },
  {
    id: "soi-selfirmiere",
    title: "Selfirmière",
    collection: "soignants",
    year: "2020",
    medium: "Aquarelle sur papier",
    dimensions: "21 × 29 cm",
    image: "/artworks/selfirmiere.webp",
    aspect: "landscape",
  },
  {
    id: "soi-rire",
    title: "Rire",
    collection: "soignants",
    year: "2020",
    medium: "Aquarelle sur papier",
    dimensions: "29 × 21 cm",
    image: "/artworks/rire.webp",
    aspect: "portrait",
  },

  // ── 5B. Coronapéro ────────────────────────────────────────────────────────
  {
    id: "cor-femme",
    title: "Femme tatouée",
    collection: "coronapero",
    year: "2020",
    medium: "Huile sur toile",
    dimensions: "80 × 60 cm",
    image: "/artworks/femme-tatouee.webp",
    aspect: "portrait",
  },
  {
    id: "cor-bleach",
    title: "Bleach & Tonic",
    collection: "coronapero",
    year: "2020",
    medium: "Huile sur toile",
    dimensions: "80 × 80 cm",
    image: "/artworks/bleach-tonic.webp",
    aspect: "square",
  },
  {
    id: "cor-hydroxy",
    title: "Appellation Hydroxychloroquine non contrôlée",
    collection: "coronapero",
    year: "2020",
    medium: "Huile sur toile",
    image: "/artworks/appellation-hydroxychloroquine.webp",
    aspect: "tall",
  },
  {
    id: "cor-coronapero",
    title: "Coronapéro 2020",
    collection: "coronapero",
    year: "2020",
    medium: "Aquarelle sur papier",
    dimensions: "30 × 30 cm",
    image: "/artworks/coronapero-2020.webp",
    aspect: "square",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COLLECTION DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

export const collections: Collection[] = [
  {
    id: "infranatural",
    label: "Infranatural",
    description:
      "Grandes huiles sur toile qui questionnent la domination de l'humanité sur la nature. Entre photoréalisme et tension critique, une réflexion écologique et sociale.",
    cover: "/artworks/on-top-of-the-food-chain.webp",
    year: "2025–2026",
  },
  {
    id: "objets",
    label: "Objets de pouvoir domestique",
    description:
      "Une série d'aquarelles où des figures féminines sont confrontées aux objets du quotidien. En détournant les codes de la culture populaire, l'artiste révèle une violence diffuse.",
    cover: "/artworks/evolution.webp",
    year: "2024–2026",
  },
  {
    id: "jo",
    label: "JO Paris 2024",
    description:
      "Portraits réalisés en direct dans des lieux publics lors des Jeux Olympiques de Paris 2024. Peindre en public comme acte de présence et de célébration.",
    cover: null,
    year: "2024",
  },
  {
    id: "marianne",
    label: "Marianne",
    description:
      "Portraits politiques et civiques inspirés de la figure de Marianne, symbole de la République. Née après les attentats qui ont endeuillé la France.",
    cover: "/artworks/je-suis-paris.webp",
    year: "2021",
  },
  // "Il était une fois Covid" is rendered as a grouped parent in the gallery UI
  {
    id: "soignants",
    label: "Portraits de Soignants",
    description:
      "Sept portraits réalisés en hommage aux soignants pendant la pandémie. Quatre sélectionnés pour l'exposition UNESCO Résilience Créative (Paris, Dubaï).",
    cover: "/artworks/urgences-de-nuit.webp",
    year: "2020",
    parent: "covid",
  },
  {
    id: "coronapero",
    label: "Coronapéro",
    description:
      "Série humoristique et décalée créée pendant le premier confinement. Un regard satirique sur la politique et la société.",
    cover: "/artworks/femme-tatouee.webp",
    year: "2020",
    parent: "covid",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// II. EXPOSITIONS
// ─────────────────────────────────────────────────────────────────────────────

export const exhibitions: Exhibition[] = [
  {
    id: "sceaux-2026",
    title: "Installation artistique",
    location: "Mairie de Sceaux",
    year: "Mars 2026",
    cover: null,
    images: [],
  },
  {
    id: "veilleuses-2025",
    title: "Veilleuses d'Océans",
    location: "Festival de cinéma Femmes ! — La Seyne-sur-Mer",
    year: "Novembre 2025",
    description: "Installation du kimono Le cri de l'Océan dans le cadre du festival.",
    cover: "/artworks/le-cri-de-l-ocean.webp",
    images: ["/artworks/le-cri-de-l-ocean.webp"],
  },
  {
    id: "sportsarts-2024",
    title: "Sports'Arts Paris 2024",
    location: "Espace Landowski · Mairie du 17e · Centre d'Art du Plessis Robinson",
    year: "Avril – Novembre 2024",
    description: "Performances artistiques en direct lors des Jeux Olympiques de Paris 2024. Léni Whitford a réalisé des performances de peinture en direct, créant des œuvres inspirées des athlètes olympiques.",
    cover: "/artworks/expo-sportsarts-2024.webp",
    images: [
      "/artworks/expo-sportsarts-2024.webp",
      "/artworks/expo-sport-2r.webp",
      "/artworks/expo-sport-3.webp",
      "/artworks/expo-sport-4r.webp",
      "/artworks/expo-sport-5.webp",
      "/artworks/expo-sport-6.webp",
    ],
  },
  {
    id: "rugbyart-2023",
    title: "Rugby'Art",
    location: "Mairie du 17e Paris · Centre d'art L'Escale, Levallois-Perret",
    year: "Octobre – Novembre 2023",
    description: "Exposition collective dédiée à l'art et au rugby, présentée à la Mairie du 17e arrondissement et au Centre d'art L'Escale de Levallois-Perret, en marge de la Coupe du Monde de Rugby 2023.",
    cover: "/artworks/expo-rugbyart-2023.webp",
    images: [
      "/artworks/expo-rugbyart-2023.webp",
      "/artworks/expo-rugby-2.webp",
      "/artworks/expo-rugby-3.webp",
      "/artworks/expo-rugby-4.webp",
    ],
  },
  {
    id: "stepping-nice-2023",
    title: "Stepping Out of the Frame",
    location: "Galerie Lou Babazouk 2, Nice",
    year: "Février – Mars 2023",
    description: "Exposition solo présentant la série des Marianne et les Portraits de Soignants. Une invitation à sortir du cadre, à questionner l'identité et l'engagement à travers la peinture figurative.",
    cover: "/artworks/expo-nice-2023.webp",
    images: [
      "/artworks/expo-nice-2023.webp",
      "/artworks/expo-nice-2.webp",
      "/artworks/expo-nice-3.webp",
      "/artworks/expo-nice-4.webp",
    ],
  },
  {
    id: "stepping-seyne-2023",
    title: "Stepping Out of the Frame",
    location: "Galerie Pouillon, La Seyne-sur-Mer",
    year: "Mars – Avril 2023",
    description: "Deuxième volet de l'exposition solo Stepping Out of the Frame, présenté dans les espaces patrimoniaux de La Seyne-sur-Mer.",
    cover: "/artworks/expo-sablettes-2023.webp",
    images: [
      "/artworks/expo-sablettes-2023.webp",
      "/artworks/expo-sablettes-2.webp",
      "/artworks/expo-sablettes-3.webp",
      "/artworks/expo-sablettes-4.webp",
      "/artworks/expo-sablettes-5r.webp",
    ],
  },
  {
    id: "unesco-dubai-2022",
    title: "Résilience Créative",
    location: "UNESCO — Exposition Universelle, Dubaï",
    year: "Février 2022",
    description: "Sélection de 4 Portraits de Soignants dans le cadre de l'exposition internationale Creative Resilience — Art by Women in Science, à l'Exposition Universelle de Dubaï.",
    cover: "/artworks/expo-unesco-paris.webp",
    images: [
      "/artworks/expo-unesco-paris.webp",
      "/artworks/expo-unesco-2.webp",
      "/artworks/expo-unesco-3.webp",
    ],
  },
  {
    id: "unesco-paris-2021",
    title: "Résilience Créative",
    location: "UNESCO, Paris",
    year: "Novembre 2021",
    description: "Exposition des Portraits de Soignants à l'UNESCO Paris dans le cadre de Creative Resilience — Art by Women in Science. Léni Whitford représentait la France parmi les artistes internationales sélectionnées.",
    cover: "/artworks/expo-unesco-paris.webp",
    images: [
      "/artworks/expo-unesco-paris.webp",
      "/artworks/expo-unesco-2.webp",
      "/artworks/expo-unesco-3.webp",
    ],
  },
  {
    id: "marianne-casino-2021",
    title: "4 Marianne",
    location: "Casino Joa, La Seyne-sur-Mer",
    year: "Juillet – Août 2021",
    description: "Exposition de la série des 4 Marianne au Casino Joa de La Seyne-sur-Mer. Les portraits monumentaux illuminent les espaces du casino tout l'été.",
    cover: "/artworks/expo-marianne-casino.webp",
    images: [
      "/artworks/expo-marianne-casino.webp",
      "/artworks/expo-casino-2.webp",
      "/artworks/expo-casino-3r.webp",
      "/artworks/expo-casino-4.webp",
    ],
  },
  {
    id: "hopitaux-2021",
    title: "Portraits de Soignants",
    location: "Hôpitaux publics — France",
    year: "Depuis Mars 2021",
    description: "7 grands formats exposés en permanence dans les services hospitaliers publics de France, en hommage aux soignants de la crise Covid-19.",
    cover: "/artworks/reanimation.webp",
    images: [
      "/artworks/reanimation.webp",
      "/artworks/urgences-de-nuit.webp",
      "/artworks/etudiante.webp",
      "/artworks/selfirmiere.webp",
      "/artworks/box-8.webp",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// III. ART ENGAGÉ
// ─────────────────────────────────────────────────────────────────────────────

export const artEngage: ArtEngage[] = [
  {
    id: "hall-of-fame",
    title: "Hall of Fame RCT",
    description: "Portraits des joueurs du Rugby Club Toulonnais, Hall of Fame du Zénith Oméga de Toulon.",
    image: "/artworks/hall-of-fame.webp",
  },
  {
    id: "octobre-rose",
    title: "Octobre Rose",
    description: "Œuvre engagée pour la sensibilisation au cancer du sein.",
    image: "/artworks/octobre-rose.webp",
  },
  {
    id: "maltraitance",
    title: "Maltraitance",
    description: "Œuvre engagée contre les violences et la maltraitance.",
    image: null,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// IV. COMMANDES
// ─────────────────────────────────────────────────────────────────────────────

export interface Commande {
  id: string;
  title: string;
  medium?: string;
  dimensions?: string;
  year?: string;
  image: string;
  aspect?: "portrait" | "landscape" | "square";
}

export const commandes: Commande[] = [
  {
    id: "cmd-halloffame",
    title: "Hall of Fame — RCT",
    medium: "Huile sur toile",
    image: "/artworks/hall-of-fame.webp",
    aspect: "landscape",
  },
  {
    id: "cmd-fufu",
    title: "Fufu Lagarde",
    medium: "Huile sur toile",
    image: "/artworks/commande-fufu.webp",
    aspect: "portrait",
  },
  {
    id: "cmd-girado",
    title: "Julien Girado",
    medium: "Huile sur toile",
    image: "/artworks/commande-girado.webp",
    aspect: "landscape",
  },
  {
    id: "cmd-brennus",
    title: "Bouclier de Brennus",
    medium: "Aquarelle sur papier",
    image: "/artworks/commande-brennus.webp",
    aspect: "portrait",
  },
  {
    id: "cmd-badawi",
    title: "Badawi",
    medium: "Huile sur toile",
    image: "/artworks/commande-badawi.webp",
    aspect: "portrait",
  },
  {
    id: "cmd-portrait-enfant",
    title: "Portrait d'enfant",
    medium: "Aquarelle sur papier",
    image: "/artworks/commande-portrait-enfant.webp",
    aspect: "square",
  },
  {
    id: "cmd-rugbyman-enfant",
    title: "Petit rugbyman",
    medium: "Aquarelle sur papier",
    image: "/artworks/commande-petit-rugbyman.webp",
    aspect: "portrait",
  },
  {
    id: "cmd-eau",
    title: "Sans titre",
    medium: "Aquarelle sur papier",
    image: "/artworks/commande-eau.webp",
    aspect: "landscape",
  },
  {
    id: "cmd-imhoff",
    title: "Imhoff Racing",
    medium: "Aquarelle sur papier",
    image: "/artworks/commande-imhoff_racing.webp",
    aspect: "portrait",
  },
  {
    id: "cmd-leroux",
    title: "Leroux Racing",
    medium: "Aquarelle sur papier",
    image: "/artworks/commande-leroux_racing.webp",
    aspect: "portrait",
  },
  {
    id: "cmd-wes",
    title: "Wes Racing",
    medium: "Aquarelle sur papier",
    image: "/artworks/commande-wes_racing.webp",
    aspect: "portrait",
  },
  {
    id: "cmd-cedate",
    title: "Cedate Racing",
    medium: "Aquarelle sur papier",
    image: "/artworks/commande-cedate_racing.webp",
    aspect: "portrait",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

export const heroImage = "/artworks/leni-whitford-header.webp";
export const artistPortrait = "/artworks/1.png";
export const pressImage = "/artworks/29.png";

export function getArtworksByCollection(id: string): Artwork[] {
  return artworks.filter((a) => a.collection === id);
}

// Artworks with an actual image (for carousels / featured sections)
export function getVisibleArtworks(id: string): Artwork[] {
  return artworks.filter((a) => a.collection === id && a.image !== null);
}

// Homepage featured — one representative per collection
export const featuredArtworks: Artwork[] = [
  artworks.find((a) => a.id === "inf-sarbacane")!,
  artworks.find((a) => a.id === "opd-barbie")!,
  artworks.find((a) => a.id === "mar-charlie")!,
  artworks.find((a) => a.id === "soi-reanimation")!,
  artworks.find((a) => a.id === "cor-femme")!,
];
