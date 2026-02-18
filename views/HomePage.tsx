
import React, { useState, useEffect } from 'react';
import { GameCarousel } from '../components/GameCarousel';
import { GiveawayGrid } from '../components/GiveawayGrid';
import { SearchAndFilter } from '../components/SearchAndFilter';
import { fetchGames, fetchGiveaways } from '../services/gameService';
import type { Game, Giveaway } from '../types';
import type { View } from '../App';

interface HomePageProps {
  setView: (view: View) => void;
  onBet: (amount: number, odds: number) => void;
  showNotification: (message: string, type: 'success' | 'error') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setView, onBet, showNotification }) => {
  const [pcGames, setPcGames] = useState<Game[]>([]);
  const [browserGames, setBrowserGames] = useState<Game[]>([]);
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadHomePageData = async () => {
      setIsLoading(true);
      try {
        const [pcResult, browserResult, giveawaysResult] = await Promise.all([
          fetchGames({ platform: 'pc' }),
          fetchGames({ platform: 'browser' }),
          fetchGiveaways(),
        ]);
        setPcGames(pcResult.slice(0, 20));
        setBrowserGames(browserResult.slice(0, 20));
        setGiveaways(giveawaysResult.slice(0, 12));
      } catch (error) {
        console.error("Failed to load home page data:", error);
        showNotification('فشل تحميل البيانات. يرجى المحاولة مرة أخرى لاحقًا.', 'error');
      } finally {
        setIsLoading(false);
      }
    };
    loadHomePageData();
  }, [showNotification]);

  const handleNavigate = (id: number) => {
    setView({ name: 'gameDetail', id });
  };
  
  const handleSearch = (params: { platform: string, category: string }) => {
    setView({ name: 'searchResults', params });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-12 animate-fade-in-down">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4 tracking-wider">مرحباً بك في منصة الرهان الرقمي</h1>
        <p className="text-lg text-gray-400">راهن على أفضل الألعاب المجانية واكسب النقاط!</p>
      </div>
      
      <SearchAndFilter onSearch={handleSearch} />

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6 border-r-4 border-yellow-400 pr-4">أفضل ألعاب الكمبيوتر</h2>
        <GameCarousel games={pcGames} onBet={onBet} onNavigate={handleNavigate} />
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6 border-r-4 border-yellow-400 pr-4">ألعاب المتصفح الرائجة</h2>
        <GameCarousel games={browserGames} onBet={onBet} onNavigate={handleNavigate} />
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-6 border-r-4 border-yellow-400 pr-4">هدايا وعروض حصرية</h2>
        <GiveawayGrid giveaways={giveaways} />
      </section>
    </>
  );
};
