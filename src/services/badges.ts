import { Preferences } from '@capacitor/preferences';
import { Badge } from '../models/Badge.models';
import { getCoins, spendCoins } from './wallet';

const OWNED_BADGES_KEY = 'owned_badges';

// Sample badges for the shop
const availableBadges: Badge[] = [
  { id: 'boulder', name: 'Medalla Roca', image: '/assets/badges/boulder.png', cost: 100 },
  { id: 'cascade', name: 'Medalla Cascada', image: '/assets/badges/cascade.png', cost: 150 },
  { id: 'thunder', name: 'Medalla Trueno', image: '/assets/badges/thunder.png', cost: 200 },
  { id: 'rainbow', name: 'Medalla Arcoíris', image: '/assets/badges/rainbow.png', cost: 250 },
  { id: 'soul', name: 'Medalla Alma', image: '/assets/badges/soul.png', cost: 300 },
  { id: 'marsh', name: 'Medalla Pantano', image: '/assets/badges/marsh.png', cost: 350 },
  { id: 'volcano', name: 'Medalla Volcán', image: '/assets/badges/volcano.png', cost: 400 },
  { id: 'earth', name: 'Medalla Tierra', image: '/assets/badges/earth.png', cost: 500 },
];

/**
 * Gets the list of all available badges in the shop.
 * @returns A promise that resolves to an array of Badge objects.
 */
export const getAvailableBadges = (): Badge[] => {
  return availableBadges;
};

/**
 * Gets the IDs of the badges owned by the user.
 * @returns A promise that resolves to an array of badge IDs.
 */
export const getOwnedBadgeIds = async (): Promise<string[]> => {
  const { value } = await Preferences.get({ key: OWNED_BADGES_KEY });
  return value ? JSON.parse(value) : [];
};

/**
 * Buys a badge for the user.
 * Checks for sufficient coins, spends them, and adds the badge to the user's collection.
 * @param badgeId The ID of the badge to buy.
 * @returns A promise that resolves to a boolean indicating if the purchase was successful.
 */
export const buyBadge = async (badgeId: string): Promise<{ success: boolean; message: string }> => {
  const badge = availableBadges.find(b => b.id === badgeId);
  if (!badge) {
    return { success: false, message: 'Medalla no encontrada.' };
  }

  const ownedIds = await getOwnedBadgeIds();
  if (ownedIds.includes(badgeId)) {
    return { success: false, message: 'Ya posees esta medalla.' };
  }

  const currentCoins = await getCoins();
  if (currentCoins < badge.cost) {
    return { success: false, message: 'No tienes suficientes monedas.' };
  }

  const spent = await spendCoins(badge.cost);
  if (spent) {
    const newOwnedIds = [...ownedIds, badgeId];
    await Preferences.set({ key: OWNED_BADGES_KEY, value: JSON.stringify(newOwnedIds) });
    return { success: true, message: `¡Has comprado la ${badge.name}!` };
  } else {
    return { success: false, message: 'Error al realizar la compra.' };
  }
};
