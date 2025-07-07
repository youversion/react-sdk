import { createContext } from 'react';

type BibleKitContextData = {
  apiKey: string;
}

export const BibleKitContext = createContext<BibleKitContextData | null>(null);