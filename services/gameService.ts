
import type { Game, Giveaway } from '../types';

const FREETOGAME_API_URL = 'https://www.freetogame.com/api';
const GAMERPOWER_API_URL = 'https://www.gamerpower.com/api';

export const fetchFreeToGameGames = async (params: { platform?: string; category?: string }): Promise<Game[]> => {
  const url = new URL(`${FREETOGAME_API_URL}/games`);
  if (params.platform) url.searchParams.append('platform', params.platform);
  if (params.category) url.searchParams.append('category', params.category);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Failed to fetch games from FreeToGame API');
  }
  return response.json();
};

export const fetchGamerPowerGiveaways = async (): Promise<Giveaway[]> => {
  const response = await fetch(`${GAMERPOWER_API_URL}/giveaways`);
  if (!response.ok) {
    throw new Error('Failed to fetch giveaways from GamerPower API');
  }
  return response.json();
};
