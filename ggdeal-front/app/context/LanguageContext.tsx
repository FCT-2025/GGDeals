// context/LanguageContext.tsx
import { createContext, useContext, useState } from "react";
import type { i18n } from "i18next";

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (lng: string) => Promise<void>;
  i18nInstance: i18n;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ 
  children, 
  i18nInstance 
}: { 
  children: React.ReactNode; 
  i18nInstance: i18n 
}) => {
  const [currentLanguage, setCurrentLanguage] = useState(
    i18nInstance.language.split("-")[0] || "en"
  );

  const changeLanguage = async (lng: string) => {
    await i18nInstance.changeLanguage(lng);
    setCurrentLanguage(lng);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, i18nInstance }}>
      {children}
    </LanguageContext.Provider>
  );
};