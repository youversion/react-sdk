import { useMemo } from "react";

export type Language = {
  iso: string;
  name: string;
};

export const LANGUAGES: Language[] = [
  { iso: "*", name: "All Languages" },
  { iso: "ar", name: "Arabic (Standard)" },
  { iso: "da", name: "Danish" },
  { iso: "de", name: "German" },
  { iso: "en", name: "English" },
  { iso: "eu", name: "Basque" },
  { iso: "fi", name: "Finnish" },
  { iso: "tl", name: "Tagalog" },
  { iso: "fr", name: "French" },
  { iso: "hi", name: "Hindi" },
  { iso: "hu", name: "Hungarian" },
  { iso: "it", name: "Italian" },
  { iso: "ja", name: "Japanese" },
  { iso: "la", name: "Latin" },
  { iso: "lv", name: "Latvian" },
  { iso: "nl", name: "Dutch" },
  { iso: "no", name: "Norwegian Bokmål" },
  { iso: "mg", name: "Malgache" },
  { iso: "pl", name: "Polish" },
  { iso: "ru", name: "Russian" },
  { iso: "es", name: "Spanish" },
  { iso: "sq", name: "Albanian (Standard)" },
  { iso: "sv", name: "Swedish" },
  { iso: "uk", name: "Ukrainian" },
];

interface BibleVersionLanguageFilterProps {
  selectedLanguage: string;
  onLanguageChange: (languageIso: string) => void;
  className?: string;
}

export function BibleVersionLanguageFilter({
  selectedLanguage,
  onLanguageChange,
  className = "",
}: BibleVersionLanguageFilterProps) {
  const sortedLanguages = useMemo(() => {
    return [...LANGUAGES].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  return (
    <div className={`relative ${className}`}>
      <select
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="w-full p-2 pr-8 text-sm border border-gray-200 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        aria-label="Select language"
      >
        {sortedLanguages.map((language) => (
          <option key={language.iso} value={language.iso}>
            {language.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
