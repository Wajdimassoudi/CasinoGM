
import type { Game, Giveaway } from '../types';

// تم تحديث وكيل CORS إلى بديل أكثر موثوقية لأن الوكيل السابق توقف عن العمل.
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

const FREETOGAME_API_URL = 'https://www.freetogame.com/api';
const GAMERPOWER_API_URL = 'https://www.gamerpower.com/api';

export const fetchFreeToGameGames = async (params: { platform?: string; category?: string }): Promise<Game[]> => {
  const url = new URL(`${FREETOGAME_API_URL}/games`);
  if (params.platform) url.searchParams.append('platform', params.platform);
  if (params.category) url.searchParams.append('category', params.category);

  // استخدام الوكيل الجديد مع ترميز الرابط المستهدف بشكل صحيح.
  const response = await fetch(`${CORS_PROXY}${encodeURIComponent(url.toString())}`);
  if (!response.ok) {
    console.error("FreeToGame API Error:", await response.text());
    throw new Error('Failed to fetch games from FreeToGame API');
  }
  return response.json();
};

export const fetchGamerPowerGiveaways = async (): Promise<Giveaway[]> => {
  const fullUrl = `${GAMERPOWER_API_URL}/giveaways`;
  // استخدام الوكيل الجديد مع ترميز الرابط المستهدف بشكل صحيح.
  const response = await fetch(`${CORS_PROXY}${encodeURIComponent(fullUrl)}`);
  if (!response.ok) {
    console.error("GamerPower API Error:", await response.text());
    throw new Error('Failed to fetch giveaways from GamerPower API');
  }
  return response.json();
};
