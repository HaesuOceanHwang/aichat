'use client';

import Image from "next/image";
import Link from "next/link";
import { characters } from '@/data/characters';
import SearchComponent from '@/components/SearchComponent';
import FilterComponent, { ViewMode, SortMode } from '@/components/FilterComponent';
import { useState } from 'react';

const categories = [
  { id: 1, name: "교육/학습", iconName: "BookOpen" },
  { id: 2, name: "비즈니스/커리어", iconName: "Briefcase" },
  { id: 3, name: "취미/라이프", iconName: "Heart" },
  { id: 4, name: "건강/웰빙", iconName: "Activity" },
  { id: 5, name: "기술/과학", iconName: "Laptop" },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortMode, setSortMode] = useState<SortMode>('name');

  const filteredAndSortedCharacters = characters
    .filter(character =>
      !searchQuery || (
        character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        character.job.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortMode === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        return a.job.localeCompare(b.job);
      }
    });

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

      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 mt-8">
        <div className="flex-1 max-w-xl">
          <SearchComponent categories={categories} onSearch={setSearchQuery} />
        </div>
        <div className="ml-4">
          <FilterComponent onViewChange={setViewMode} onSortChange={setSortMode} />
        </div>
      </div>

      <div className="p-8 mt-8">
        <h2 className="text-2xl font-medium text-center mb-12 text-gray-700">대화 할 캐랙터를 선택하세요!!!</h2>
        <div className={`max-w-7xl mx-auto ${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
            : 'space-y-4'
        }`}>
          {filteredAndSortedCharacters.map((character) => (
            <Link
              key={character.id}
              href={`/chat/${character.id}`}
              className={`block group ${viewMode === 'list' ? 'w-full' : ''}`}
            >
              <div className={`bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 ${
                viewMode === 'list' ? 'flex items-center' : ''
              }`}>
                <div className={`relative ${
                  viewMode === 'list' 
                    ? 'w-24 h-24 flex-shrink-0'
                    : 'w-full pt-[100%]'
                }`}>
                  <Image
                    src={character.image}
                    alt={character.name}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <h2 className={`text-lg font-semibold ${viewMode === 'list' ? 'text-left' : 'text-center'}`}>
                    {character.name}
                  </h2>
                  <p className={`text-sm text-gray-500 ${viewMode === 'list' ? 'text-left mt-1' : 'text-center mt-1'}`}>
                    {character.job}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
