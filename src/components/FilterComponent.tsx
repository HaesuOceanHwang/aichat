'use client';

import { useState } from 'react';
import Image from 'next/image';

export type ViewMode = 'grid' | 'list';
export type SortMode = 'name' | 'job';

interface FilterComponentProps {
  onViewChange: (mode: ViewMode) => void;
  onSortChange: (mode: SortMode) => void;
}

export default function FilterComponent({ onViewChange, onSortChange }: FilterComponentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedView, setSelectedView] = useState<ViewMode>('grid');
  const [selectedSort, setSelectedSort] = useState<SortMode>('name');

  const handleOptionSelect = (view: ViewMode | null, sort: SortMode | null) => {
    if (view) {
      setSelectedView(view);
      onViewChange(view);
    }
    if (sort) {
      setSelectedSort(sort);
      onSortChange(sort);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Image
          src="/filter.svg"
          alt="Filter"
          width={24}
          height={24}
          className="text-gray-600"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          <div className="px-4 py-2 text-sm font-semibold text-gray-500">보기 방식</div>
          <button
            onClick={() => handleOptionSelect('grid', null)}
            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
              selectedView === 'grid' ? 'text-blue-600' : 'text-gray-700'
            }`}
          >
            그리드 보기
          </button>
          <button
            onClick={() => handleOptionSelect('list', null)}
            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
              selectedView === 'list' ? 'text-blue-600' : 'text-gray-700'
            }`}
          >
            리스트 보기
          </button>
          
          <div className="border-t my-2"></div>
          
          <div className="px-4 py-2 text-sm font-semibold text-gray-500">정렬 기준</div>
          <button
            onClick={() => handleOptionSelect(null, 'name')}
            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
              selectedSort === 'name' ? 'text-blue-600' : 'text-gray-700'
            }`}
          >
            이름순
          </button>
          <button
            onClick={() => handleOptionSelect(null, 'job')}
            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
              selectedSort === 'job' ? 'text-blue-600' : 'text-gray-700'
            }`}
          >
            직업순
          </button>
        </div>
      )}
    </div>
  );
} 