"use client";

import { createContext } from 'react';

type BibleKitContextData = {
  appId: string;
}

export const BibleKitContext = createContext<BibleKitContextData | null>(null);