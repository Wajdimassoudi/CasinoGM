
import type { Game, Giveaway } from '../types';

// استخدام نقطة النهاية /get التي تعيد كائن JSON يحتوي على الاستجابة.
const CORS_PROXY_GET = 'https://api.allorigins.win/get?url=';

const FREETOGAME_API_URL = 'https://www.freetogame.com/api';
const GAMERPOWER_API_URL = 'https://www.gamerpower.com/api';

// دالة مساعدة لمعالجة الاستجابة الملتفة من allorigins
async function fetchWithProxy<T>(url: string): Promise<T> {
  const response = await fetch(`${CORS_PROXY_GET}${encodeURIComponent(url)}`);
  if (!response.ok) {
    // هذا سيكون خطأ من الوكيل نفسه
    throw new Error(`خطأ في وكيل CORS: ${response.statusText}`);
  }

  const data = await response.json();

  // التحقق من أخطاء HTTP من واجهة برمجة التطبيقات المستهدفة، والتي أبلغ عنها الوكيل
  if (data.status.http_code >= 400) {
    throw new Error(`فشل الجلب من واجهة برمجة التطبيقات المستهدفة: ${data.status.http_code} - ${url}`);
  }

  // محتوى الاستجابة الفعلي موجود في حقل 'contents' كسلسلة نصية JSON
  if (!data.contents) {
    throw new Error('استجابة الوكيل لا تحتوي على الحقل المتوقع "contents".');
  }

  // يجب تحليل محتويات السلسلة النصية للحصول على بيانات JSON الفعلية
  return JSON.parse(data.contents);
}

export const fetchFreeToGameGames = async (params: { platform?: string; category?: string }): Promise<Game[]> => {
  const url = new URL(`${FREETOGAME_API_URL}/games`);
  if (params.platform) url.searchParams.append('platform', params.platform);
  if (params.category) url.searchParams.append('category', params.category);

  try {
    return await fetchWithProxy<Game[]>(url.toString());
  } catch (error) {
    console.error("FreeToGame API Error:", error);
    throw new Error('Failed to fetch games from FreeToGame API');
  }
};

export const fetchGamerPowerGiveaways = async (): Promise<Giveaway[]> => {
  const fullUrl = `${GAMERPOWER_API_URL}/giveaways`;
  
  try {
    return await fetchWithProxy<Giveaway[]>(fullUrl);
  } catch(error) {
    console.error("GamerPower API Error:", error);
    throw new Error('Failed to fetch giveaways from GamerPower API');
  }
};
