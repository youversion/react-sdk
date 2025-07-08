"use client";

import { PropsWithChildren, ReactNode } from 'react';
import { BibleKitContext } from '../context/BibleKitContext';

type BibleKitProviderProps = {
  children: ReactNode;
  appId: string;
  // theme?: BibleKitTheme; Optional -> Later...
}

export function BibleKitProvider({ appId, children }: PropsWithChildren<BibleKitProviderProps>) {
  return (
    <BibleKitContext.Provider value={{ appId }}>
      {children}
    </BibleKitContext.Provider>
  )
}
