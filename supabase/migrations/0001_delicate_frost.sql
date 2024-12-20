/*
  # Create chunks table and vector similarity search

  1. New Tables
    - `chunks`
      - `id` (uuid, primary key)
      - `content` (text)
      - `embedding` (vector)
      - `metadata` (jsonb)
      - `created_at` (timestamp)
  
  2. Functions
    - `match_chunks` - Performs similarity search using cosine distance
*/

-- Enable vector extension
create extension if not exists vector;

-- Create chunks table
create table if not exists chunks (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  embedding vector(384) not null,
  metadata jsonb not null default '{}',
  created_at timestamptz default now()
);

-- Create function for similarity search
create or replace function match_chunks(
  query_embedding vector(384),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    chunks.id,
    chunks.content,
    chunks.metadata,
    1 - (chunks.embedding <=> query_embedding) as similarity
  from chunks
  where 1 - (chunks.embedding <=> query_embedding) > match_threshold
  order by chunks.embedding <=> query_embedding
  limit match_count;
end;
$$;