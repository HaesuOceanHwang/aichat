'use client';

import { useState } from 'react';
import { Search, BookOpen, Briefcase, Heart, Activity, Laptop } from 'lucide-react';
import { characters } from '@/data/characters';
import Link from 'next/link';
import Image from 'next/image';

interface Category {
  id: number;
  name: string;
  iconName: string;
}

interface SearchComponentProps {
  categories: Category[];
  onSearch: (query: string) => void;
}

const iconMap = {
  'BookOpen': BookOpen,
  'Briefcase': Briefcase,
  'Heart': Heart,
  'Activity': Activity,
  'Laptop': Laptop,
};

export default function SearchComponent({ categories, onSearch }: SearchComponentProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter characters based on search query
  const filteredCharacters = characters.filter(character => 
    searchQuery && (
      character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      character.job.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="relative max-w-3xl mx-auto px-4 -mt-8">
      <div className={`relative transition-all duration-300 ${isSearchFocused || searchQuery ? 'scale-105' : ''}`}>
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="AI 캐릭터 검색하기"
            className={`w-full px-12 py-4 rounded-xl border bg-white shadow-lg text-lg transition-all duration-300 ${
              isSearchFocused || searchQuery
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
            onChange={handleSearchChange}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </form>

        {(isSearchFocused || searchQuery) && (
          <div className="absolute top-full left-0 right-0 bg-white mt-2 rounded-xl shadow-lg border border-gray-100 p-2 z-10">
            {!searchQuery && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {categories.map((category) => {
                  const Icon = iconMap[category.iconName as keyof typeof iconMap];
                  return (
                    <button
                      key={category.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-colors text-sm"
                      onClick={() => {
                        setSearchQuery(category.name);
                        onSearch(category.name);
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{category.name}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {searchQuery && (
              <div className="mt-2 max-h-96 overflow-y-auto">
                {filteredCharacters.length > 0 ? (
                  <div className="grid grid-cols-1 gap-2">
                    {filteredCharacters.map((character) => (
                      <Link
                        key={character.id}
                        href={`/chat/${character.id}`}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => {
                          setSearchQuery('');
                          onSearch('');
                          setIsSearchFocused(false);
                        }}
                      >
                        <div className="relative w-12 h-12 flex-shrink-0">
                          <Image
                            src={character.image}
                            alt={character.name}
                            fill
                            className="object-contain"
                            sizes="48px"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{character.name}</h3>
                          <p className="text-sm text-gray-500">{character.job}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-4">검색 결과가 없습니다</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 