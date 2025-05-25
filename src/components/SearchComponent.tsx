'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { characters } from '@/data/characters';

interface Category {
  id: number;
  name: string;
  iconName: string;
  jobs: string[];
}

interface SearchComponentProps {
  categories: Category[];
  onSearch: (query: string) => void;
}

export default function SearchComponent({ categories, onSearch }: SearchComponentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter characters based on search query and selected category
  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    character.job.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
    setIsDropdownOpen(true);
  };

  const handleCategoryClick = (category: Category) => {
    setSearchQuery('');
    onSearch(category.name);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="캐릭터 또는 직업을 검색하세요..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <Image
            src="/search.svg"
            alt="Search"
            width={20}
            height={20}
            className="text-gray-400"
          />
        </div>
      </div>

      {isDropdownOpen && (searchQuery || filteredCharacters.length > 0) && (
        <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {categories.map(category => {
            const categoryCharacters = filteredCharacters.filter(
              character => category.jobs.includes(character.job)
            );

            if (categoryCharacters.length === 0) return null;

            return (
              <div key={category.id} className="py-2">
                <div className="px-4 py-2 text-sm font-semibold text-gray-500 bg-gray-50">
                  {category.name}
                </div>
                {categoryCharacters.map((character) => (
                  <button
                    key={character.id}
                    onClick={() => {
                      setSearchQuery(character.name);
                      onSearch(character.name);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    <div className="text-sm font-medium text-gray-900">{character.name}</div>
                    <div className="text-xs text-gray-500">{character.job}</div>
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
} 