
import React, { useState } from 'react';
import type { Game } from '../types';

interface GameCardProps {
  game: Game;
  onBet: (amount: number, odds: number) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onBet }) => {
  const [betAmount, setBetAmount] = useState<number>(50);
  const odds1 = (Math.random() * 2 + 1.5).toFixed(2);
  const odds2 = (Math.random() * 2 + 1.5).toFixed(2);

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-yellow-400/20 h-full flex flex-col">
      <img src={game.thumbnail} alt={game.title} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2 truncate">{game.title}</h3>
        <p className="text-gray-400 text-sm mb-4 flex-grow">{game.short_description}</p>
        <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
          <span className="bg-gray-700 px-2 py-1 rounded">{game.genre}</span>
          <span className="bg-gray-700 px-2 py-1 rounded">{game.platform}</span>
        </div>
        <div className="mt-auto">
           <div className="flex items-center justify-center mb-3">
              <label htmlFor={`bet-${game.id}`} className="text-sm text-gray-300 ml-2">مبلغ الرهان:</label>
              <input 
                id={`bet-${game.id}`}
                type="number" 
                value={betAmount} 
                onChange={(e) => setBetAmount(Math.max(10, parseInt(e.target.value) || 10))}
                className="w-20 bg-gray-700 text-white text-center rounded border border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
                min="10"
                step="10"
              />
           </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <button onClick={() => onBet(betAmount, parseFloat(odds1))} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded transition-colors duration-200">
              <span>الفريق الأزرق</span>
              <span className="block text-xs text-blue-200">x{odds1}</span>
            </button>
            <button onClick={() => onBet(betAmount, parseFloat(odds2))} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-2 rounded transition-colors duration-200">
              <span>الفريق الأحمر</span>
              <span className="block text-xs text-red-200">x{odds2}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
