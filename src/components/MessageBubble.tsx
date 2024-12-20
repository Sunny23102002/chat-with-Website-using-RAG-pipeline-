import React from 'react';
import { Bot } from 'lucide-react';
import type { ChatMessage } from '../types';

interface Props {
  message: ChatMessage;
}

export function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-900'
        }`}
      >
        {!isUser && <Bot className="h-5 w-5 mb-1 inline-block mr-2" />}
        {message.content}
      </div>
    </div>
  );
}