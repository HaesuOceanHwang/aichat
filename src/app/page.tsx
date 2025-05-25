'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import { Search, BookOpen, Briefcase, Heart, Activity, Laptop } from 'lucide-react';
import { characters } from '@/data/characters';

const categories = [
  { id: 1, name: "교육/학습", icon: BookOpen },
  { id: 2, name: "비즈니스/커리어", icon: Briefcase },
  { id: 3, name: "취미/라이프", icon: Heart },
  { id: 4, name: "건강/웰빙", icon: Activity },
  { id: 5, name: "기술/과학", icon: Laptop },
];

export default function Home() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="relative text-center py-16 px-4 space-y-4 bg-white/30 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-black/10 z-10"></div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-50"
          >
            <source src="/background.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative z-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] mb-2">
            당신과 교감하는 단 하나의 AI
          </h1>
          <div className="inline-block bg-black/40 backdrop-blur-sm rounded-2xl px-6 py-3">
            <p className="text-2xl md:text-3xl font-bold text-white tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              그 관계를 시작합니다.
            </p>
          </div>
        </div>
      </div>

      <div className="relative max-w-3xl mx-auto px-4 -mt-8">
        <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
          <div className="relative">
            <input
              type="text"
              placeholder="AI 캐릭터 검색하기"
              className={`w-full px-12 py-4 rounded-xl border bg-white shadow-lg text-lg transition-all duration-300 ${
                isSearchFocused 
                  ? 'border-indigo-500 shadow-indigo-100' 
                  : 'border-gray-200'
              }`}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => {
                setTimeout(() => {
                  if (!searchQuery) setIsSearchFocused(false);
                }, 200);
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          {isSearchFocused && (
            <div className="absolute top-full left-0 right-0 bg-white mt-2 rounded-xl shadow-lg border border-gray-100 p-2 z-10">
              <div className="flex flex-wrap gap-1.5">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-colors text-sm"
                      onClick={() => {
                        setSearchQuery(category.name);
                        setIsSearchFocused(false);
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 mt-8">
        <h2 className="text-2xl font-medium text-center mb-12 text-gray-700">대화 할 캐랙터를 선택하세요!!!</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {characters
            .filter(character => 
              !searchQuery || 
              character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              character.job.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((character) => (
              <Link
                key={character.id}
                href={`/chat/${character.id}`}
                className="block group"
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                  <div className="relative w-full pt-[100%]">
                    <Image
                      src={character.image}
                      alt={character.name}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-center">{character.name}</h2>
                    <p className="text-sm text-gray-500 text-center mt-1">{character.job}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
