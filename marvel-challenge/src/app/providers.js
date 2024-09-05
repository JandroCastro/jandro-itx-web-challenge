"use client";

import { CharactersProvider } from "@/context/CharactersCtx";
import { FavoritesProvider } from "@/context/FavoritesCtx";

export function Providers({ children }) {
  return (
    <CharactersProvider>
      <FavoritesProvider>{children}</FavoritesProvider>
    </CharactersProvider>
  );
}
