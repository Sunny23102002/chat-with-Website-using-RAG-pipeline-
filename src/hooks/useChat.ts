import { useState } from 'react';
import type { ChatMessage } from '../types';
import { generateEmbedding } from '../utils/embeddings';
import { searchSimilarChunks } from '../utils/vectorStore';
import { generateResponse } from '../utils/llm';

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const handleWebsiteProcessed = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Website processed successfully! You can now ask questions about its content.',
      },
    ]);
  };

  const handleSendMessage = async (content: string) => {
    setLoading(true);
    setMessages((prev) => [...prev, { role: 'user', content }]);

    try {
      const queryEmbedding = await generateEmbedding(content);
      const relevantChunks = await searchSimilarChunks(queryEmbedding);
      const response = await generateResponse(
        content,
        relevantChunks.map(chunk => chunk.content)
      );

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: response },
      ]);
    } catch (error) {
      console.error('Error processing message:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, there was an error processing your message.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    handleSendMessage,
    handleWebsiteProcessed,
  };
}