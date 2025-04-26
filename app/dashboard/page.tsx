"use client";

import { useTranslation } from "../src/context/TranslationContext";
import { Language } from "../src/constants/languages";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import Navigation from "../src/components/Navigation";
import { Translation } from "../src/types/Translation";

export default function Dashboard() {
  const {
    translations,
    updateTranslation,
    reorderTranslations,
    addTranslation,
    deleteTranslation,
  } = useTranslation();

  const [newKeyword, setNewKeyword] = useState("");
  const [newTranslations, setNewTranslations] = useState({
    en: "",
    es: "",
    fr: "",
    de: "",
  });

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(translations);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    reorderTranslations(items);
  };

  const handleAddTranslation = () => {
    if (
      newKeyword &&
      Object.values(newTranslations).some((val) => val.trim() !== "")
    ) {
      const filtered: Partial<Record<Language, string>> = {};
      (["en", "es", "fr", "de"] as Language[]).forEach((lang) => {
        const t = newTranslations[lang];
        if (t.trim()) filtered[lang] = t;
      });

      addTranslation(newKeyword, filtered);

      setNewKeyword("");
      setNewTranslations({ en: "", es: "", fr: "", de: "" });
    }
  };

  const handleTranslationChange = (lang: Language, value: string) => {
    setNewTranslations((prev) => ({
      ...prev,
      [lang]: value,
    }));
  };

  const handelDeleteTranslation = (translation: Translation) => {
    deleteTranslation(translation.id);
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navigation />

      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 mb-8">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6 relative inline-block after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-[var(--primary)] after:rounded">
            Add New Translation
          </h2>
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm text-[var(--text-muted)]">
                Keyword
              </label>
              <input
                type="text"
                placeholder="Keyword"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                className="w-full bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)] px-4 py-3 rounded-lg text-base transition-all focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-10"
              />
            </div>

            <form action={handleAddTranslation}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-sm text-[var(--text-muted)]">
                    English
                  </label>
                  <input
                    type="text"
                    placeholder="English translation"
                    value={newTranslations.en}
                    onChange={(e) =>
                      handleTranslationChange("en", e.target.value)
                    }
                    className="w-full bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)] px-4 py-3 rounded-lg text-base transition-all focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-10"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm text-[var(--text-muted)]">
                    Spanish
                  </label>
                  <input
                    type="text"
                    placeholder="Spanish translation"
                    value={newTranslations.es}
                    onChange={(e) =>
                      handleTranslationChange("es", e.target.value)
                    }
                    className="w-full bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)] px-4 py-3 rounded-lg text-base transition-all focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-10"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm text-[var(--text-muted)]">
                    French
                  </label>
                  <input
                    type="text"
                    placeholder="French translation"
                    value={newTranslations.fr}
                    onChange={(e) =>
                      handleTranslationChange("fr", e.target.value)
                    }
                    className="w-full bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)] px-4 py-3 rounded-lg text-base transition-all focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-10"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm text-[var(--text-muted)]">
                    German
                  </label>
                  <input
                    type="text"
                    placeholder="German translation"
                    value={newTranslations.de}
                    onChange={(e) =>
                      handleTranslationChange("de", e.target.value)
                    }
                    className="w-full bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)] px-4 py-3 rounded-lg text-base transition-all focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-10"
                  />
                </div>
              </div>
            </form>

            <div className="flex justify-end">
              <button
                onClick={handleAddTranslation}
                className="bg-[var(--primary)] text-[var(--background)] px-6 py-3 rounded-lg text-base font-semibold transition-all hover:bg-[var(--primary-light)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-50"
              >
                Add Translation
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6 relative inline-block after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-[var(--primary)] after:rounded">
            Translations
          </h2>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="translations">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {translations.map((translation, index) => (
                    <Draggable
                      key={translation.id}
                      draggableId={translation.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                        >
                          <div className="flex-1">
                            <div className="text-xl font-bold text-[var(--foreground)] mb-4 flex justify-between">
                              <span>{translation.keyword}</span>
                              <button
                                onClick={() =>
                                  handelDeleteTranslation(translation)
                                }
                                className="bg-[var(--primary)] text-[var(--background)] px-6 py-3 rounded-lg text-base font-semibold transition-all hover:bg-[var(--primary-light)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-50 cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                              {(["en", "es", "fr", "de"] as Language[]).map(
                                (lang) => (
                                  <input
                                    key={lang}
                                    type="text"
                                    value={
                                      (
                                        translation.translations as Record<
                                          Language,
                                          string
                                        >
                                      )[lang] || ""
                                    }
                                    onChange={(e) =>
                                      updateTranslation(
                                        translation.id,
                                        lang,
                                        e.target.value
                                      )
                                    }
                                    placeholder={`${lang.toUpperCase()} translation`}
                                    className="bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)] px-4 py-3 rounded-lg text-base transition-all focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-10"
                                  />
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}
