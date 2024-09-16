"use client";

import { CharactersProvider } from "@/context/CharactersCtx";
import { FavoritesProvider } from "@/context/FavoritesCtx";
import ErrorBoundary from "./ErrorBoundary";

export function Providers({ children }) {
  return (
    <ErrorBoundary>
      <CharactersProvider>
        <FavoritesProvider>{children}</FavoritesProvider>
      </CharactersProvider>
    </ErrorBoundary>
  );
}
