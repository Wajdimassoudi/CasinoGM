
import React from 'react';
import { CoinIcon } from './icons/CoinIcon';

interface HeaderProps {
  balance: number;
}

export const Header: React.FC<HeaderProps> = ({ balance }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-yellow-400 tracking-wider">
          رهان الألعاب
        </h1>
        <div className="flex items-center space-x-reverse space-x-2 bg-gray-700 px-4 py-2 rounded-full text-lg font-semibold">
          <CoinIcon className="w-6 h-6 text-yellow-400" />
          <span className="text-white">{balance.toLocaleString()}</span>
          <span className="text-gray-400 text-sm">نقطة</span>
        </div>
      </div>
    </header>
  );
};
