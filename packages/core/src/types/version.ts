import { Language } from "./language.js";

export interface Version {
  id: number;
  abbreviation: string;
  copyright: string;
  language: Language;
  local_abbreviation: string;
  local_title: string;
  info: string;
  info_url: string;
  title: string;
}
