'use client';

import { useParams, useRouter } from 'next/navigation';
import { characters } from '@/app/page';
import { useState } from 'react';
import Image from 'next/image';

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const characterId = parseInt(params.id as string);
  const character = characters.find(c => c.id === characterId);
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'ai'}>>([]);
  const [inputMessage, setInputMessage] = useState('');

  if (!character) {
    return <div>Character not found</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setMessages(prev => [...prev, { text: inputMessage, sender: 'user' }]);
    setInputMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: `안녕하세요! 저는 ${character.name}입니다. 무엇을 도와드릴까요?`, 
        sender: 'ai' 
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Back button - Moved outside the main content */}
      <button
        onClick={() => router.push('/')}
        className="fixed top-6 left-6 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors z-20 bg-white/80 px-4 py-2 rounded-lg shadow-sm backdrop-blur-sm"
      >
        <Image
          src="/arrow-left.svg"
          alt="Go back"
          width={24}
          height={24}
          className="text-current"
        />
        <span>Go back</span>
      </button>

      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source src="/chat-background.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto p-4 h-screen flex flex-col">
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4 flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden relative flex-shrink-0">
            <Image
              src={character.image}
              alt={character.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">{character.name}</h1>
            <p className="text-sm text-gray-500">{character.job}</p>
          </div>
        </div>
        
        <div className="flex-1 bg-white rounded-lg shadow-lg p-4 mb-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.sender === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="메시지를 입력하세요..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              전송
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 