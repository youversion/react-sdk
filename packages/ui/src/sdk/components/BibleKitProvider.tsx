"use client";

import { PropsWithChildren, ReactNode } from 'react';
import { BibleKitContext } from '../context/BibleKitContext';

type BibleKitProviderProps = {
  children: ReactNode;
  apiKey: string;
  // theme?: BibleKitTheme; Optional -> Later...
}

export function BibleKitProvider({ apiKey, children }: PropsWithChildren<BibleKitProviderProps>) {
  return (
    <BibleKitContext.Provider value={{ apiKey }}>
      {children}
    </BibleKitContext.Provider>
  )
}
