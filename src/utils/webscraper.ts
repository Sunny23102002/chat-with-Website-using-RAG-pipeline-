import * as cheerio from 'cheerio';
import { generateEmbedding } from './embeddings';
import { storeChunks } from './vectorStore';
import { fetchWithCorsProxy } from './corsProxy';
import type { Chunk } from '../types';

export async function scrapeWebsite(url: string): Promise<string> {
  try {
    const html = await fetchWithCorsProxy(url);
    const $ = cheerio.load(html);

    // Remove non-content elements
    $('script, style, noscript, iframe, img, svg, header, footer, nav').remove();
    
    // Get main content areas
    const mainContent = $('main, article, [role="main"]').text() || $('body').text();

    // Clean up the text
    return mainContent
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, ' ')
      .trim();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to scrape website: ${message}`);
  }
}

export function chunkText(text: string, maxChunkSize: number = 500): string[] {
  if (!text) return [];
  
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const chunks: string[] = [];
  let currentChunk = '';

  for (const sentence of sentences) {
    if (currentChunk.length + sentence.length > maxChunkSize) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += ' ' + sentence;
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

export async function processWebsiteContent(url: string): Promise<void> {
  try {
    const content = await scrapeWebsite(url);
    if (!content) {
      throw new Error('No content extracted from website');
    }

    const textChunks = chunkText(content);
    if (textChunks.length === 0) {
      throw new Error('No text chunks generated from content');
    }

    const chunks: Chunk[] = await Promise.all(
      textChunks.map(async (text, index) => {
        const embedding = await generateEmbedding(text);
        return {
          id: crypto.randomUUID(),
          content: text,
          embedding,
          metadata: {
            url,
            position: index,
          },
        };
      })
    );

    await storeChunks(chunks);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to process website: ${message}`);
  }
}