import { Pokemon } from '../models/Pokemon.models';

const MAX_POKEMON_ID = 898;

/**
 * Fetches a random Pokémon from the PokeAPI.
 * @returns A promise that resolves to a Pokemon object or null if fetching fails.
 */
const fetchRandomPokemon = async (): Promise<Pokemon | null> => {
  const randomId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    if (!res.ok) throw new Error('Pokemon not found');
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch random Pokémon:', error);
    return null;
  }
};

/**
 * Prepares a new game round.
 * Fetches a Pokémon to guess and three other random Pokémon as incorrect options.
 * @returns A promise that resolves to an object containing the Pokémon to guess and the shuffled options, or null if it fails.
 */
export const prepareNewGame = async () => {
  const correctPokemon = await fetchRandomPokemon();
  if (!correctPokemon) return null;

  const incorrectOptions: string[] = [];
  while (incorrectOptions.length < 3) {
    const randomPokemon = await fetchRandomPokemon();
    if (randomPokemon && randomPokemon.name !== correctPokemon.name && !incorrectOptions.includes(randomPokemon.name)) {
      incorrectOptions.push(randomPokemon.name);
    }
  }

  const allOptions = [correctPokemon.name, ...incorrectOptions];
  const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);

  return {
    pokemonToGuess: correctPokemon,
    options: shuffledOptions,
  };
};
