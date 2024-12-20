import React, { useState } from 'react';
import { WebsiteInput } from './components/WebsiteInput';
import { Chat } from './components/Chat';
import type { ChatMessage } from './types';
import { useChat } from './hooks/useChat';

export default function App() {
  const { messages, loading, handleSendMessage, handleWebsiteProcessed } = useChat();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden flex flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Website Chat Assistant
        </h1>
        <WebsiteInput onWebsiteProcessed={handleWebsiteProcessed} />
        <div className="h-[600px] border rounded-lg">
          <Chat 
            onSendMessage={handleSendMessage} 
            messages={messages}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}