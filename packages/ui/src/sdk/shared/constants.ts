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
