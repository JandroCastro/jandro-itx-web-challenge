// setupTests.js
import React from "react";
import { render } from "@testing-library/react";
import { FavoritesProvider } from "@/context/FavoritesCtx";
import { CharactersProvider } from "@/context/CharactersCtx"; // Asegúrate de que la ruta sea correcta
import "@testing-library/jest-dom"; // Asegúrate de que esta línea esté presente

// Un wrapper global que envuelve con el provider necesario
const AllProviders = ({ children }) => (
  <CharactersProvider>
    <FavoritesProvider>{children}</FavoritesProvider>
  </CharactersProvider>
);

// Método para renderizar con los proveedores
const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

// Exporta para usar en tus pruebas
export * from "@testing-library/react";
export { customRender as render };
