'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'es' | 'fr' | 'de';
export type Translation = {
  id: string;
  keyword: string;
  translations: {
    [key in Language]?: string;
  };
};

interface TranslationContextType {
  translations: Translation[];
  currentLanguage: Language;
  setCurrentLanguage: (lang: Language) => void;
  addTranslation: (keyword: string, lang: Language, text: string) => void;
  updateTranslation: (id: string, lang: Language, text: string) => void;
  reorderTranslations: (newOrder: Translation[]) => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const defaultTranslations: Translation[] = [
  {
    id: '1',
    keyword: 'hello',
    translations: {
      en: 'Hello',
      es: 'Hola',
      fr: 'Bonjour',
      de: 'Hallo'
    }
  },
  {
    id: '2',
    keyword: 'goodbye',
    translations: {
      en: 'Goodbye',
      es: 'Adiós',
      fr: 'Au revoir',
      de: 'Auf Wiedersehen'
    }
  },
  {
    id: '3',
    keyword: 'thank you',
    translations: {
      en: 'Thank you',
      es: 'Gracias',
      fr: 'Merci',
      de: 'Danke'
    }
  }
];

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  useEffect(() => {
    const storedTranslations = localStorage.getItem('translations');
    if (storedTranslations) {
      setTranslations(JSON.parse(storedTranslations));
    } else {
      setTranslations(defaultTranslations);
      localStorage.setItem('translations', JSON.stringify(defaultTranslations));
    }
  }, []);

  const addTranslation = (keyword: string, lang: Language, text: string) => {
    const newTranslation: Translation = {
      id: Date.now().toString(),
      keyword,
      translations: {
        [lang]: text
      }
    };
    const updatedTranslations = [...translations, newTranslation];
    setTranslations(updatedTranslations);
    localStorage.setItem('translations', JSON.stringify(updatedTranslations));
  };

  const updateTranslation = (id: string, lang: Language, text: string) => {
    const updatedTranslations = translations.map(translation => {
      if (translation.id === id) {
        return {
          ...translation,
          translations: {
            ...translation.translations,
            [lang]: text
          }
        };
      }
      return translation;
    });
    setTranslations(updatedTranslations);
    localStorage.setItem('translations', JSON.stringify(updatedTranslations));
  };

  const reorderTranslations = (newOrder: Translation[]) => {
    setTranslations(newOrder);
    localStorage.setItem('translations', JSON.stringify(newOrder));
  };

  return (
    <TranslationContext.Provider
      value={{
        translations,
        currentLanguage,
        setCurrentLanguage,
        addTranslation,
        updateTranslation,
        reorderTranslations
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
} 