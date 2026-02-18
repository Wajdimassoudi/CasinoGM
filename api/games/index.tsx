
// This is a Vercel Serverless Function that acts as a dynamic backend proxy.
// It intelligently fetches data based on query parameters from the frontend.
// This server-side execution avoids all browser CORS issues.

export default async function handler(req: any, res: any) {
  const { source, endpoint, ...params } = req.query;

  const FREETOGAME_API_URL = 'https://www.freetogame.com/api';
  const GAMERPOWER_API_URL = 'https://www.gamerpower.com/api';

  let targetUrl = '';

  // Construct the target URL based on the 'source' query parameter
  switch (source) {
    case 'freetogame':
      const f2gParams = new URLSearchParams(params as Record<string, string>).toString();
      targetUrl = `${FREETOGAME_API_URL}/${endpoint}?${f2gParams}`;
      break;
    case 'gamerpower':
       const gpParams = new URLSearchParams(params as Record<string, string>).toString();
      targetUrl = `${GAMERPOWER_API_URL}/${endpoint}?${gpParams}`;
      break;
    default:
      return res.status(400).json({ message: 'Invalid API source specified' });
  }

  try {
    // Add a User-Agent header to mimic a browser request, preventing blocks from the API provider.
    const apiResponse = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      }
    });

    if (!apiResponse.ok) {
      console.error(`Error fetching from ${targetUrl}:`, apiResponse.status, apiResponse.statusText);
      throw new Error(`Failed to fetch from external API: ${apiResponse.statusText}`);
    }

    const data = await apiResponse.json();

    // Cache successful responses for 1 hour on Vercel's Edge Network
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json(data);

  } catch (error: any) {
    console.error(`Error in API route for URL: ${targetUrl}`, error);
    res.status(500).json({ message: error.message || 'An internal server error occurred.' });
  }
}
