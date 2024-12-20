export interface WebsiteContent {
  url: string;
  title: string;
  content: string;
  metadata: Record<string, any>;
  timestamp: Date;
}

export interface Chunk {
  id: string;
  content: string;
  embedding: number[];
  metadata: {
    url: string;
    title: string;
    position: number;
  };
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}