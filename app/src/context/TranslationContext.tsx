"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { TranslationContextType } from "../types/TranslationContextType";
import { Translation } from "../types/Translation";
import { Language } from "../constants/languages";
import { defaultTranslations } from "../constants/defaultTranslations";

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

export function TranslationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");

  useEffect(() => {
    const storedTranslations = localStorage.getItem("translations");
    if (storedTranslations) {
      setTranslations(JSON.parse(storedTranslations));
    } else {
      setTranslations(defaultTranslations);
      localStorage.setItem("translations", JSON.stringify(defaultTranslations));
    }
  }, []);

  const addTranslation = (
    keyword: string,
    translationsObj: Partial<Record<Language, string>>
  ) => {
    const newTranslation: Translation = {
      id: Date.now().toString(),
      keyword,
      translations: { ...translationsObj },
    };
    const updated = [...translations, newTranslation];
    setTranslations(updated);
    localStorage.setItem("translations", JSON.stringify(updated));
  };

  const updateTranslation = (id: string, lang: Language, text: string) => {
    const updatedTranslations = translations.map((translation) => {
      if (translation.id === id) {
        return {
          ...translation,
          translations: {
            ...translation.translations,
            [lang]: text,
          },
        };
      }
      return translation;
    });
    setTranslations(updatedTranslations);
    localStorage.setItem("translations", JSON.stringify(updatedTranslations));
  };

  const deleteTranslation = (translation: string) => {
    const updatedTranslations = translations.filter((t) => t.id != translation);
    setTranslations(updatedTranslations);
    localStorage.setItem("translations", JSON.stringify(updatedTranslations));
  };

  const reorderTranslations = (newOrder: Translation[]) => {
    setTranslations(newOrder);
    localStorage.setItem("translations", JSON.stringify(newOrder));
  };

  return (
    <TranslationContext.Provider
      value={{
        translations,
        currentLanguage,
        setCurrentLanguage,
        addTranslation,
        updateTranslation,
        reorderTranslations,
        deleteTranslation,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
