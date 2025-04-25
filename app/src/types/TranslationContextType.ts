import { Language } from "../constants/languages";
import { Translation } from "./Translation";

export interface TranslationContextType {
  translations: Translation[];
  currentLanguage: Language;
  setCurrentLanguage: (lang: Language) => void;
  addTranslation: (
    keyword: string,
    translations: Partial<Record<Language, string>>
  ) => void;
  updateTranslation: (id: string, lang: Language, text: string) => void;
  reorderTranslations: (newOrder: Translation[]) => void;
}
