import { supabase } from '../config/supabase';
import type { Chunk } from '../types';

export async function storeChunks(chunks: Chunk[]) {
  const { error } = await supabase
    .from('chunks')
    .insert(chunks);

  if (error) throw error;
}

export async function searchSimilarChunks(embedding: number[], limit: number = 5) {
  const { data, error } = await supabase.rpc('match_chunks', {
    query_embedding: embedding,
    match_threshold: 0.7,
    match_count: limit
  });

  if (error) throw error;
  return data as Chunk[];
}