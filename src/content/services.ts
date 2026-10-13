import type { Locale } from "@/config/business";

export type Localized = Record<Locale, string>;

export const categoryIds = [
  "micropigmentation",
  "brows-lashes",
  "facials",
  "waxing",
  "removal",
] as const;
export type CategoryId = (typeof categoryIds)[number];

export const categories: Record<CategoryId, Localized> = {
  micropigmentation: { es: "Micropigmentación", en: "Micropigmentation" },
  "brows-lashes": { es: "Cejas y pestañas", en: "Brows & lashes" },
  facials: { es: "Tratamientos faciales", en: "Facial treatments" },
  waxing: { es: "Depilación", en: "Waxing" },
  removal: { es: "Remoción", en: "Removal" },
};

export interface Service {
  id: string;
  name: Localized;
  /** Price in MXN, as published by the studio. */
  price: number;
  description: Localized;
  includes?: Record<Locale, string[]>;
  categories: CategoryId[];
  featured?: boolean;
  image: {
    src: string;
    alt: Localized;
    /** Real client work (watermarked) vs. AI-generated illustration. */
    kind: "real" | "illustration";
  };
}

/** Source: references/service_1..5.png and https://andrestudiomx.com/info. Do not edit prices without client confirmation. */
export const services: Service[] = [
  {
    id: "microblading",
    name: { es: "Microblading inicial", en: "Initial microblading" },
    price: 3000,
    description: {
      es: "Diseñamos tu ceja pelo a pelo con las técnicas más actualizadas de forma personalizada, cuidando cada trazo según tu tipo de rostro, colorimetría y estilo.",
      en: "We design your brows hair by hair with the latest techniques, tailoring every stroke to your face shape, color tone and style.",
    },
    categories: ["micropigmentation"],
    image: {
      src: "/images/real/microblading.webp",
      alt: { es: "Resultado de microblading en cejas de una clienta", en: "Microblading result on a client's brows" },
      kind: "real",
    },
  },
  {
    id: "microshading",
    name: { es: "Microshading / hybrid brows", en: "Microshading / hybrid brows" },
    price: 3350,
    featured: true,
    description: {
      es: "Técnica combinada: trazos pelo a pelo + sombreado efecto makeup natural. Cejas más tupidas y definidas. Ideal para pieles grasas o cejas despobladas.",
      en: "Combined technique: hair strokes + soft shading for a natural makeup effect. Fuller, more defined brows. Ideal for oily skin or sparse brows.",
    },
    categories: ["micropigmentation"],
    image: {
      src: "/images/real/microshading.webp",
      alt: { es: "Resultado de cejas hybrid con microshading", en: "Hybrid brows result with microshading" },
      kind: "real",
    },
  },
  {
    id: "second-session",
    name: { es: "Segunda sesión", en: "Second session" },
    price: 1800,
    description: {
      es: "Se realiza al mes. Refuerza el pigmento, mejora la fijación y ajusta detalles de diseño o tono. Es clave para finalizar el tratamiento y obtener la garantía.",
      en: "Done one month later. Reinforces the pigment, improves retention and fine-tunes shape or tone. Key to completing the treatment and getting the guarantee.",
    },
    categories: ["micropigmentation"],
    image: {
      src: "/images/real/segunda-sesion.webp",
      alt: { es: "Cejas micropigmentadas después de la segunda sesión", en: "Micropigmented brows after the second session" },
      kind: "real",
    },
  },
  {
    id: "touch-up",
    name: { es: "Retoque anual / 6 meses", en: "Touch-up (6 months to 1 year)" },
    price: 2200,
    description: {
      es: "Se renueva el diseño y la intensidad del color para mantener tus cejas impecables. La duración varía según tu tipo de piel: de 6 meses a 1 año.",
      en: "Refreshes the shape and color intensity to keep your brows flawless. Timing depends on your skin type: from 6 months to 1 year.",
    },
    categories: ["micropigmentation"],
    image: {
      src: "/images/real/retoque.webp",
      alt: { es: "Cejas después de un retoque de micropigmentación", en: "Brows after a micropigmentation touch-up" },
      kind: "real",
    },
  },
  {
    id: "soft-shape",
    name: { es: "Soft shape (depilación y diseño)", en: "Soft shape (waxing & design)" },
    price: 250,
    description: {
      es: "Diseño de cejas personalizado con cera española o pinzas, ideal para quienes buscan unas cejas limpias, suaves y con forma natural.",
      en: "Custom brow design with Spanish wax or tweezers, ideal if you want clean, soft brows with a natural shape.",
    },
    categories: ["brows-lashes", "waxing"],
    image: {
      src: "/images/gen/soft-shape.webp",
      alt: { es: "Diseño de cejas con cera rosa", en: "Brow shaping with pink wax" },
      kind: "illustration",
    },
  },
  {
    id: "glossy-lift",
    name: { es: "Glossy lift", en: "Glossy lift" },
    price: 350,
    description: {
      es: "Laminado de cejas que peina y fija los vellos para un efecto liso y peinado todo el día. Look tipo brow gel. Duración de 3 a 4 semanas. Incluye diseño.",
      en: "Brow lamination that brushes and sets the hairs for a smooth, groomed look all day. Brow-gel effect. Lasts 3 to 4 weeks. Design included.",
    },
    categories: ["brows-lashes"],
    image: {
      src: "/images/real/glossy-lift.webp",
      alt: { es: "Cejas con laminado glossy lift", en: "Brows with glossy lift lamination" },
      kind: "real",
    },
  },
  {
    id: "velvet-brows",
    name: { es: "Velvet brows / henna", en: "Velvet brows / henna" },
    price: 450,
    featured: true,
    description: {
      es: "Realza el color de las cejas para que luzcan más pobladas y definidas.",
      en: "Enhances brow color so they look fuller and more defined.",
    },
    includes: {
      es: ["Soft shape", "Glossy lift", "Brow botox (suero vitamínico)"],
      en: ["Soft shape", "Glossy lift", "Brow botox (vitamin serum)"],
    },
    categories: ["brows-lashes"],
    image: {
      src: "/images/real/velvet-brows.webp",
      alt: { es: "Cejas con henna velvet brows", en: "Brows with velvet henna" },
      kind: "real",
    },
  },
  {
    id: "lash-lifting",
    name: { es: "Lashlifting", en: "Lash lifting" },
    price: 650,
    description: {
      es: "Levantamiento de pestañas que da la apariencia de pestañas más largas. Duración de 4 semanas.",
      en: "A lash lift that makes your lashes look longer. Lasts 4 weeks.",
    },
    categories: ["brows-lashes"],
    image: {
      src: "/images/gen/lash-lift.webp",
      alt: { es: "Pestañas durante un lashlifting", en: "Lashes during a lash lift" },
      kind: "illustration",
    },
  },
  {
    id: "glow-experience",
    name: { es: "Glow experience", en: "Glow experience" },
    price: 1650,
    featured: true,
    description: {
      es: "Minimiza poros, suaviza manchas y estimula colágeno. Piel luminosa y radiante desde la primera sesión.",
      en: "Minimizes pores, softens dark spots and stimulates collagen. Luminous, radiant skin from the first session.",
    },
    includes: {
      es: [
        "Limpieza profunda",
        "Limpieza ultrasónica",
        "Masaje desincrustante facial",
        "Vapor de ozono",
        "Extracción manual",
        "Hollywood Peel",
        "Alta frecuencia",
        "Fototerapia LED",
        "Yaman (tecnología japonesa)",
      ],
      en: [
        "Deep cleansing",
        "Ultrasonic cleansing",
        "Facial decongesting massage",
        "Ozone steam",
        "Manual extraction",
        "Hollywood Peel",
        "High frequency",
        "LED phototherapy",
        "Yaman (Japanese technology)",
      ],
    },
    categories: ["facials"],
    image: {
      src: "/images/gen/facial-glow.webp",
      alt: { es: "Clienta recibiendo un facial con mascarilla", en: "Client receiving a facial with a mask" },
      kind: "illustration",
    },
  },
  {
    id: "deep-cleansing",
    name: { es: "Limpieza profunda", en: "Deep cleansing facial" },
    price: 800,
    description: {
      es: "Elimina impurezas, puntos negros y células muertas. Incluye extracción manual, vapor y mascarilla calmante. Tu piel se ve más limpia, suave y libre de textura.",
      en: "Removes impurities, blackheads and dead skin cells. Includes manual extraction, steam and a soothing mask. Skin looks cleaner, softer and smoother.",
    },
    categories: ["facials"],
    image: {
      src: "/images/gen/facial-limpieza.webp",
      alt: { es: "Limpieza facial con espátula ultrasónica", en: "Facial cleansing with an ultrasonic spatula" },
      kind: "illustration",
    },
  },
  {
    id: "facial-yoga",
    name: { es: "Yoga facial", en: "Facial yoga" },
    price: 700,
    description: {
      es: "Lifting manual, alternativa al bótox: desinflama y realza el rostro y define la mandíbula. Incluye fototerapia LED y mascarilla personalizada.",
      en: "Manual lifting, an alternative to botox: de-puffs and lifts the face and defines the jawline. Includes LED phototherapy and a custom mask.",
    },
    categories: ["facials"],
    image: {
      src: "/images/gen/facial-yoga.webp",
      alt: { es: "Masaje facial de yoga facial", en: "Facial yoga massage" },
      kind: "illustration",
    },
  },
  {
    id: "sideburn-wax",
    name: { es: "Depilación patilla", en: "Sideburn waxing" },
    price: 200,
    description: {
      es: "Depilación con cera española para piel sensible.",
      en: "Spanish wax for sensitive skin.",
    },
    categories: ["waxing"],
    image: {
      src: "/images/gen/depilacion-patilla.webp",
      alt: { es: "Cera española rosa lista para depilar", en: "Pink Spanish wax ready for waxing" },
      kind: "illustration",
    },
  },
  {
    id: "lip-wax",
    name: { es: "Depilación bozo", en: "Upper lip waxing" },
    price: 150,
    description: {
      es: "Depilación con cera española para piel sensible.",
      en: "Spanish wax for sensitive skin.",
    },
    categories: ["waxing"],
    image: {
      src: "/images/gen/depilacion-bozo.webp",
      alt: { es: "Labios después de una depilación de bozo", en: "Lips after upper lip waxing" },
      kind: "illustration",
    },
  },
  {
    id: "brow-removal",
    name: { es: "Remoción de cejas", en: "Brow pigment removal" },
    price: 1500,
    description: {
      es: "Tecnología láser de grado médico que fragmenta el pigmento sin dañar la piel. Proceso progresivo, sin cicatrices, ideal para todo tipo de piel.",
      en: "Medical-grade laser technology that breaks down pigment without harming the skin. A gradual, scar-free process suitable for all skin types.",
    },
    categories: ["removal"],
    image: {
      src: "/images/gen/remocion-cejas.webp",
      alt: { es: "Sesión de remoción láser con protección ocular", en: "Laser removal session with eye protection" },
      kind: "illustration",
    },
  },
  {
    id: "tattoo-removal",
    name: { es: "Remoción de tatuaje", en: "Tattoo removal" },
    price: 2000,
    description: {
      es: "Tratamiento especializado que actúa desde la primera sesión y desvanece gradualmente el pigmento de forma segura, sin maltratar la piel.",
      en: "A specialized treatment that works from the first session, gradually fading the pigment safely without harming the skin.",
    },
    categories: ["removal"],
    image: {
      src: "/images/gen/remocion-tattoo.webp",
      alt: { es: "Remoción láser de tatuaje en el brazo", en: "Laser tattoo removal on an arm" },
      kind: "illustration",
    },
  },
];

/** Published add-on: adding shading to microblading costs $350 extra. */
export const shadingAddOnPrice = 350;

export const getService = (id: string) => services.find((service) => service.id === id);

export const formatPrice = (amount: number, locale: Locale) =>
  new Intl.NumberFormat(locale === "es" ? "es-MX" : "en-US", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
    currencyDisplay: "narrowSymbol",
  }).format(amount);
