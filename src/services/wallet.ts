import { Preferences } from '@capacitor/preferences';

const COINS_KEY = 'user_coins';

export const getCoins = async (): Promise<number> => {
  const { value } = await Preferences.get({ key: COINS_KEY });
  return value ? parseInt(value, 10) : 0;
};

export const addCoins = async (amount: number): Promise<number> => {
  const currentCoins = await getCoins();
  const newTotal = currentCoins + amount;
  await Preferences.set({
    key: COINS_KEY,
    value: newTotal.toString(),
  });
  return newTotal;
};

export const spendCoins = async (amount: number): Promise<boolean> => {
  const currentCoins = await getCoins();
  if (currentCoins < amount) {
    return false;
  }
  const newTotal = currentCoins - amount;
  await Preferences.set({
    key: COINS_KEY,
    value: newTotal.toString(),
  });
  return true;
};
