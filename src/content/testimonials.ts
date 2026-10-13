import type { Locale } from "@/config/business";

export interface Testimonial {
  author: string;
  service?: Record<Locale, string>;
  /** Original Spanish wording from Google, trimmed. English is a faithful translation. */
  quote: Record<Locale, string>;
}

/** Source: references/comments_1.png and references/Comments_2.png (Google reviews, 5 stars). */
export const testimonials: Testimonial[] = [
  {
    author: "Diana Hernandez",
    service: { es: "Microblading", en: "Microblading" },
    quote: {
      es: "Desde que llegas te hace sentir súper especial, su trabajo es excepcional. Ya tengo 3 años yendo con ella y no la cambiaría por nada.",
      en: "From the moment you arrive she makes you feel so special, her work is exceptional. I've been going to her for 3 years and wouldn't change her for anything.",
    },
  },
  {
    author: "Griss Hdz Ramirez",
    service: { es: "Microblading", en: "Microblading" },
    quote: {
      es: "Excelente trato, diseño, color. Feliz con el resultado. Utiliza materiales de calidad y te explica todo el procedimiento paso por paso.",
      en: "Excellent care, design and color. Happy with the result. She uses quality materials and explains the whole procedure step by step.",
    },
  },
  {
    author: "Cecy GT",
    quote: {
      es: "Un trato realmente personalizado, paciente y preciso. El lugar está impecable y me transmite mucha paz y armonía.",
      en: "Truly personalized, patient and precise care. The place is spotless and gives me a lot of peace and harmony.",
    },
  },
  {
    author: "Lisa Rivas",
    service: { es: "Faciales y microblading", en: "Facials & microblading" },
    quote: {
      es: "Me gusta mucho la técnica de los tratamientos faciales que hace, muy muy completos. También me hice el microblading, ¡me gustó mucho cómo me quedó!",
      en: "I really like her facial treatment technique, very, very complete. I also had microblading done and loved how it turned out!",
    },
  },
  {
    author: "Norma Angélica Herrera",
    quote: {
      es: "Desde que llegas te hacen sentir súper a gusto y el lugar es de lo más top y relajante. Cuidan mucho que te sientas cómoda y que no te duela nada.",
      en: "From the moment you arrive you feel so at ease, and the place is top-notch and relaxing. They make sure you're comfortable and that nothing hurts.",
    },
  },
  {
    author: "Ligia N. Calero",
    service: { es: "Microblading", en: "Microblading" },
    quote: {
      es: "Su trabajo con mis cejas fue excepcional, súper natural y con garantía en sus pigmentos y material. Ya es la segunda vez que me hago el microblading con ella.",
      en: "Her work on my brows was exceptional, super natural, with a guarantee on her pigments and materials. It's my second time getting microblading with her.",
    },
  },
];
