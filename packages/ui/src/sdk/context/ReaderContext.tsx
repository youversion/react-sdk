"use client";

import { createContext } from 'react';

type ReaderContextData = {
}

export const ReaderContext = createContext<ReaderContextData | null>(null);