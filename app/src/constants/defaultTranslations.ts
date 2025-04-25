import { Translation } from "../types/Translation";

export const defaultTranslations: Translation[] = [
  {
    id: "1",
    keyword: "hello",
    translations: {
      en: "Hello",
      es: "Hola",
      fr: "Bonjour",
      de: "Hallo",
    },
  },
  {
    id: "2",
    keyword: "goodbye",
    translations: {
      en: "Goodbye",
      es: "Adiós",
      fr: "Au revoir",
      de: "Auf Wiedersehen",
    },
  },
  {
    id: "3",
    keyword: "thank you",
    translations: {
      en: "Thank you",
      es: "Gracias",
      fr: "Merci",
      de: "Danke",
    },
  },
];
