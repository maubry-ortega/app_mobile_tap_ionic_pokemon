export const FAVORITES_KEY = "favorite_pokemons";

export const getFavorites = (): number[] => {
  const data = localStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
};

export const addFavorite = (id: number) => {
  const favorites = getFavorites();
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

export const removeFavorite = (id: number) => {
  let favorites = getFavorites();
  favorites = favorites.filter((favId) => favId !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const isFavorite = (id: number): boolean => {
  return getFavorites().includes(id);
};
