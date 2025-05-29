import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useLanguage } from "~/context/LanguageContext";

export default function LanguageCurrencySection() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const [languageSelected, setLanguageSelected] =
    useState<string>(currentLanguage);
  const [currencySelected, setCurrencySelected] = useState("EUR");

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "da", name: "Dansk", flag: "🇩🇰" },
    { code: "pl", name: "Polski", flag: "🇵🇱" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "nl", name: "Nederlands", flag: "🇳🇱" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "uk", name: "українська", flag: "🇺🇦" },
  ];

  const currencies = [
    { code: "EUR", flag: "🇪🇺" },
    { code: "DKK", flag: "🇩🇰" },
    { code: "CAD", flag: "🇨🇦" },
    { code: "AUD", flag: "🇦🇺" },
    { code: "USD", flag: "🇺🇸" },
    { code: "CHF", flag: "🇨🇭" },
    { code: "RSD", flag: "🇷🇸" },
    { code: "SEK", flag: "🇸🇪" },
    { code: "GBP", flag: "🇬🇧" },
    { code: "BRL", flag: "🇧🇷" },
  ];
  return (
    <div className="w-full max-w-4xl px-4">
      <div className="bg-gray-800 p-6 mb-8">
        <h3 className="text-xl text-gray-300 mb-6 text-center">
          {t("profile.language.title")}
        </h3>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {languages.map((lang) => (
            <button
              onClick={() => {
                changeLanguage(lang.code);
                setLanguageSelected(lang.code);
              }}
              key={lang.name}
              className={`flex items-center space-x-2 p-3 rounded transition-colors ${
                languageSelected === lang.code
                  ? "bg-black"
                  : "hover:bg-gray-700"
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="text-white">{lang.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 p-6 mb-8">
        <h3 className="text-xl text-gray-300 mb-6 text-center">
          {t("profile.currency.title")}
        </h3>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {currencies.map((currency) => (
            <button
              key={currency.code}
              onClick={()=>{
                setCurrencySelected(currency.code);
              }}
              className={`flex items-center space-x-2 p-3 rounded transition-colors ${
                currencySelected === currency.code
                  ? "bg-black"
                  : "hover:bg-gray-700"
              }`}
            >
              <span className="text-xl">{currency.flag}</span>
              <span className="text-white">{currency.code}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
