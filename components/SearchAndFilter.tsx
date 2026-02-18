
import React, { useState } from 'react';

interface SearchAndFilterProps {
  onSearch: (params: { platform: string, category: string }) => void;
}

const platforms = [
  { value: 'all', label: 'جميع المنصات' },
  { value: 'pc', label: 'كمبيوتر (PC)' },
  { value: 'browser', label: 'متصفح (Browser)' },
];

const categories = [
    { value: 'all', label: 'جميع الفئات' },
    { value: 'mmo', label: 'MMO' },
    { value: 'mmorpg', label: 'MMORPG' },
    { value: 'shooter', label: 'Shooter' },
    { value: 'strategy', label: 'Strategy' },
    { value: 'moba', label: 'MOBA' },
    { value: 'card', label: 'Card Games' },
    { value: 'racing', label: 'Racing' },
    { value: 'sports', label: 'Sports' },
    { value: 'social', label: 'Social' },
    { value: 'fighting', label: 'Fighting' },
];

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ onSearch }) => {
  const [platform, setPlatform] = useState('all');
  const [category, setCategory] = useState('all');

  const handleSearch = () => {
    onSearch({ platform, category });
  };

  return (
    <section className="bg-gray-800/70 p-6 rounded-lg mb-12 backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label htmlFor="platform" className="block text-sm font-medium text-gray-300 mb-1">المنصة</label>
          <select 
            id="platform" 
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2 focus:ring-yellow-400 focus:border-yellow-400"
          >
            {platforms.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">الفئة</label>
          <select 
            id="category" 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2 focus:ring-yellow-400 focus:border-yellow-400"
          >
            {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <button 
          onClick={handleSearch}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-md transition-colors duration-200 h-10"
        >
          بحث
        </button>
      </div>
    </section>
  );
};
