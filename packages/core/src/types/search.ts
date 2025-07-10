export type SearchResultItem = {
  /** USFM identifier for the verse or passage */
  usfm: string;
};

export type SearchBookFilter = {
  /** Number of matches in this book */
  count: number;
  /** Book identifier in USFM code (e.g. "PSA") */
  usfm: string;
};

export type SearchCanonFilter = {
  /** Number of matches in this testament/section */
  count: number;
  /** Canonical section identifier (e.g. "ot", "nt") */
  section: string;
};

export type SearchFilters = {
  /** Book-level match counts */
  books: SearchBookFilter[];
  /** Canonical testament/section match counts */
  canons: SearchCanonFilter[];
};

export interface SearchResponse {
  /** Individual matches returned for the page */
  data: SearchResultItem[];
  /** Suggestions for alternative spellings */
  did_you_mean: string[];
  /** Aggregated match counts used for faceting */
  filters: SearchFilters;
  /** Whether there is another page of results */
  next_page: boolean;
  /** Page size requested/returned */
  page_size: number;
  /** Original query string */
  query: string;
  /** Suggestion for an alternative query (if any) */
  search_instead_for: string | null;
  /** High-level inferred user intent */
  user_intent: string;
}
