export interface VerseHighlight {
  id: string;
  usfm: string;
  color: string;
  colorId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface HighlightColor {
  id: number;
  color: string;
  label: string;
}

export const HIGHLIGHT_COLORS: HighlightColor[] = [
  { id: 0, color: "#fffe00", label: "Yellow" },
  { id: 1, color: "#5dff79", label: "Green" },
  { id: 2, color: "#00d6ff", label: "Blue" },
  { id: 3, color: "#ffc66f", label: "Orange" },
  { id: 4, color: "#ff95ef", label: "Pink" },
] as const;
