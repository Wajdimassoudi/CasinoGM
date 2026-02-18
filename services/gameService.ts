
import type { Game, Giveaway } from '../types';

// تم التبديل إلى وكيل CORS جديد وأكثر استقرارًا
const CORS_PROXY = 'https://corsproxy.io/?';

const FREETOGAME_API_URL = 'https://www.freetogame.com/api';
const GAMERPOWER_API_URL = 'https://www.gamerpower.com/api';

/**
 * دالة مساعدة لجلب البيانات عبر وكيل CORS.
 * هذا يتجاوز قيود المتصفح الأمنية (CORS) عند استدعاء واجهات برمجة التطبيقات مباشرة من جانب العميل.
 * @param url الرابط الكامل لواجهة برمجة التطبيقات المستهدفة
 * @returns Promise يحل إلى بيانات JSON المطلوبة
 */
async function fetchWithProxy<T>(url: string): Promise<T> {
  // يقوم الوكيل بتمرير الطلب إلى الرابط المستهدف.
  const proxyUrl = `${CORS_PROXY}${encodeURIComponent(url)}`;
  
  const response = await fetch(proxyUrl);
  
  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`خطأ أثناء الجلب من الوكيل للرابط: ${url}`, {
        status: response.status,
        statusText: response.statusText,
        body: errorBody,
    });
    throw new Error(`فشل جلب البيانات عبر الوكيل: ${response.statusText}`);
  }
  
  return response.json();
}

export const fetchFreeToGameGames = async (params: { platform?: string; category?: string }): Promise<Game[]> => {
  const url = new URL(`${FREETOGAME_API_URL}/games`);
  if (params.platform) url.searchParams.append('platform', params.platform);
  if (params.category) url.searchParams.append('category', params.category);

  try {
    return await fetchWithProxy<Game[]>(url.toString());
  } catch (error) {
    console.error("FreeToGame API Error:", error);
    // إعادة إرسال الخطأ ليتم التعامل معه في واجهة المستخدم
    throw new Error('فشل جلب الألعاب من FreeToGame API');
  }
};

export const fetchGamerPowerGiveaways = async (): Promise<Giveaway[]> => {
  const fullUrl = `${GAMERPOWER_API_URL}/giveaways`;
  
  try {
    return await fetchWithProxy<Giveaway[]>(fullUrl);
  } catch(error) {
    console.error("GamerPower API Error:", error);
    // إعادة إرسال الخطأ ليتم التعامل معه في واجهة المستخدم
    throw new Error('فشل جلب الهدايا من GamerPower API');
  }
};
