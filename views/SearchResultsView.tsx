
import React, { useState, useEffect } from 'react';
import { fetchGames } from '../services/gameService';
import type { Game } from '../types';
import type { View } from '../App';
import { GameCard } from '../components/GameCard';

interface SearchResultsViewProps {
  params: { platform: string; category: string };
  setView: (view: View) => void;
  onBet: (amount: number, odds: number) => void;
}

export const SearchResultsView: React.FC<SearchResultsViewProps> = ({ params, setView, onBet }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSearchResults = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const validParams: { platform?: string; category?: string } = {};
        if (params.platform && params.platform !== 'all') validParams.platform = params.platform;
        if (params.category && params.category !== 'all') validParams.category = params.category;
        
        const results = await fetchGames(validParams);
        setGames(results);
      } catch (e) {
        setError('فشل في جلب نتائج البحث. يرجى المحاولة مرة أخرى.');
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    loadSearchResults();
  }, [params]);

  const handleNavigate = (id: number) => {
    setView({ name: 'gameDetail', id });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="animate-fade-in">
      <button onClick={() => setView({ name: 'home' })} className="mb-6 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
        &larr; العودة إلى الرئيسية
      </button>
      <h1 className="text-3xl font-bold text-white mb-6">نتائج البحث</h1>
      
      {games.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {games.map(game => (
            <GameCard key={game.id} game={game} onBet={onBet} onNavigate={handleNavigate} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-8">لم يتم العثور على ألعاب تطابق بحثك.</p>
      )}
    </div>
  );
};
