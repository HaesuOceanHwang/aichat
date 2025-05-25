'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { characters } from '@/data/characters';

interface Category {
  id: number;
  name: string;
  icon: any; // Using any for simplicity, but you might want to type this properly
}

interface SearchComponentProps {
  categories: Category[];
}

export default function SearchComponent({ categories }: SearchComponentProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
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
  );
} 