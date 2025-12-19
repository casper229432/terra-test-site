import React, { createContext, useContext, useMemo, useState, ReactNode } from "react";

export type LanguageCode = "zh" | "en";

type LanguageContextType = {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
};

const STORAGE_KEY = "terra_language";
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function normalizeLanguage(raw: string | null): LanguageCode {
  if (raw === "zh" || raw === "en") return raw;
  return "zh"; // ✅ 預設中文（如果你要預設英文，改成 "en"）
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    if (typeof window === "undefined") return "zh";
    return normalizeLanguage(localStorage.getItem(STORAGE_KEY));
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const value = useMemo(() => ({ language, setLanguage }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
};
