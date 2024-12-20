// List of CORS proxies to try
const CORS_PROXIES = [
  'https://corsproxy.io/?',
  'https://api.allorigins.win/raw?url=',
];

export async function fetchWithCorsProxy(url: string): Promise<string> {
  let lastError: Error | null = null;

  // Try each proxy until one works
  for (const proxy of CORS_PROXIES) {
    try {
      const response = await fetch(proxy + encodeURIComponent(url));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.text();
    } catch (error) {
      lastError = error as Error;
      continue; // Try next proxy
    }
  }

  throw new Error(`Failed to fetch URL with all proxies: ${lastError?.message}`);
}