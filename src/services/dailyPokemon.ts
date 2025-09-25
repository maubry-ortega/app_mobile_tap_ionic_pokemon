const DAILY_KEY = "pokemon_del_dia";

export const setDailyPokemon = (id: number) => {
  const today = new Date().toISOString().split("T")[0];
  localStorage.setItem(DAILY_KEY, JSON.stringify({ id, date: today, found: false }));
};

export const getDailyPokemon = (): { id: number; date: string; found: boolean } | null => {
  const data = localStorage.getItem(DAILY_KEY);
  return data ? JSON.parse(data) : null;
};

export const markDailyAsFound = () => {
  const daily = getDailyPokemon();
  if (daily) {
    daily.found = true;
    localStorage.setItem(DAILY_KEY, JSON.stringify(daily));
  }
};
