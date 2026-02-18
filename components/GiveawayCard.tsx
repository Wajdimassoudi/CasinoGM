
import React from 'react';
import type { Giveaway } from '../types';

interface GiveawayCardProps {
  giveaway: Giveaway;
}

export const GiveawayCard: React.FC<GiveawayCardProps> = ({ giveaway }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-purple-500/30 flex flex-col h-full">
      <img src={giveaway.image || giveaway.thumbnail} alt={giveaway.title} className="w-full h-40 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white mb-2 h-14 overflow-hidden">{giveaway.title}</h3>
        <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
          <span className="font-bold text-green-400">{giveaway.worth}</span>
          <span className="bg-purple-600/50 text-purple-200 px-2 py-1 rounded">{giveaway.type}</span>
        </div>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">{giveaway.description}</p>
        <a 
          href={giveaway.open_giveaway_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="mt-auto block w-full text-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded transition-colors duration-200"
        >
          احصل على العرض
        </a>
      </div>
    </div>
  );
};
