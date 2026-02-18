
import type { Game, Giveaway } from '../types';

// استخدام وكيل CORS لتجاوز قيود المتصفح لجلب البيانات من جانب العميل.
const CORS_PROXY = 'https://thingproxy.freeboard.io/fetch/';

const FREETOGAME_API_URL = 'https://www.freetogame.com/api';
const GAMERPOWER_API_URL = 'https://www.gamerpower.com/api';

export const fetchFreeToGameGames = async (params: { platform?: string; category?: string }): Promise<Game[]> => {
  const url = new URL(`${FREETOGAME_API_URL}/games`);
  if (params.platform) url.searchParams.append('platform', params.platform);
  if (params.category) url.searchParams.append('category', params.category);

  // استخدام الوكيل لتجنب أخطاء CORS
  const response = await fetch(`${CORS_PROXY}${url.toString()}`);
  if (!response.ok) {
    console.error("FreeToGame API Error:", await response.text());
    throw new Error('Failed to fetch games from FreeToGame API');
  }
  return response.json();
};

export const fetchGamerPowerGiveaways = async (): Promise<Giveaway[]> => {
  // استخدام الوكيل لتجنب أخطاء CORS
  const response = await fetch(`${CORS_PROXY}${GAMERPOWER_API_URL}/giveaways`);
  if (!response.ok) {
    console.error("GamerPower API Error:", await response.text());
    throw new Error('Failed to fetch giveaways from GamerPower API');
  }
  return response.json();
};
