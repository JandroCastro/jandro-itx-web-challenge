import React, {
  useState,
  useContext,
  useMemo,
  createContext,
  useCallback,
  useEffect,
} from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoritos")) || [];
    storedFavorites && setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = useCallback((character) => {
    setFavorites((prevState) => {
      const newArray = [...prevState];
      const index = newArray.findIndex((fav) => fav.id === character.id);

      if (index !== -1) {
        newArray.splice(index, 1);
      } else {
        newArray.push(character);
      }

      localStorage.setItem("favoritos", JSON.stringify(newArray));
      return newArray;
    });
  });

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      "useFavoritesContext must be used within a FavoritesProvider"
    );
  }
  return context;
};

export const useFavoritesSelector = (selector) => {
  const { favorites } = useFavoritesContext();
  return useMemo(() => selector(favorites), [favorites, selector]);
};
