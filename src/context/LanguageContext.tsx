import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";

export type Language = "en" | "ar";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  isArabic: boolean;
};

const LanguageContext =
  createContext<LanguageContextType | null>(null);

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguageState] =
    useState<Language>(() => {
      const savedLanguage =
        localStorage.getItem("crocodile-language");

      return savedLanguage === "ar"
        ? "ar"
        : "en";
    });

  useEffect(() => {
    localStorage.setItem(
      "crocodile-language",
      language
    );

    /*
     * نغير لغة الصفحة فقط.
     *
     * مهم:
     * لا نغير document.documentElement.dir
     *
     * لأننا نريد أن يظل ترتيب الـ Navbar
     * والـ layout كما هو في الإنجليزي.
     */
    document.documentElement.lang =
      language;
  }, [language]);

  function setLanguage(
    newLanguage: Language
  ) {
    setLanguageState(newLanguage);
  }

  function toggleLanguage() {
    setLanguageState((current) =>
      current === "en"
        ? "ar"
        : "en"
    );
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isArabic:
          language === "ar",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context =
    useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}