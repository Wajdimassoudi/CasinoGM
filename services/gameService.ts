
import type { Game, Giveaway, GameDetails } from '../types';

/**
 * Fetches a list of games based on provided filters.
 * @param params An object containing filters like platform or category.
 * @returns A promise that resolves to an array of games.
 */
export const fetchGames = async (params: { platform?: string; category?: string }): Promise<Game[]> => {
  const query = new URLSearchParams({
    source: 'freetogame',
    endpoint: 'games',
    ...params
  }).toString();

  const response = await fetch(`/api/games?${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch games');
  }
  return response.json();
};

/**
 * Fetches detailed information for a single game by its ID.
 * @param id The ID of the game to fetch.
 * @returns A promise that resolves to the detailed game object.
 */
export const fetchGameById = async (id: number): Promise<GameDetails> => {
   const query = new URLSearchParams({
    source: 'freetogame',
    endpoint: 'game',
    id: id.toString(),
  }).toString();
  
  const response = await fetch(`/api/games?${query}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch details for game ${id}`);
  }
  return response.json();
};

/**
 * Fetches the latest list of game giveaways.
 * @returns A promise that resolves to an array of giveaways.
 */
export const fetchGiveaways = async (): Promise<Giveaway[]> => {
  const query = new URLSearchParams({
    source: 'gamerpower',
    endpoint: 'giveaways',
  }).toString();

  const response = await fetch(`/api/games?${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch giveaways');
  }
  return response.json();
};
