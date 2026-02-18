
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
        const results = await Promise.allSettled([
          fetchGames({ platform: 'pc' }),
          fetchGames({ platform: 'browser' }),
          fetchGiveaways(),
        ]);

        let allFailed = true;

        if (results[0].status === 'fulfilled') {
          setPcGames(results[0].value.slice(0, 20));
          allFailed = false;
        } else {
          console.error("Failed to load PC games:", results[0].reason);
        }

        if (results[1].status === 'fulfilled') {
          setBrowserGames(results[1].value.slice(0, 20));
          allFailed = false;
        } else {
          console.error("Failed to load browser games:", results[1].reason);
        }

        if (results[2].status === 'fulfilled') {
          setGiveaways(results[2].value.slice(0, 12));
          allFailed = false;
        } else {
          console.error("Failed to load giveaways:", results[2].reason);
        }

        if (allFailed) {
            showNotification('فشل تحميل البيانات. يرجى المحاولة مرة أخرى لاحقًا.', 'error');
        }

      } catch (error) {
        console.error("An unexpected error occurred while loading home page data:", error);
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

      {pcGames.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 border-r-4 border-yellow-400 pr-4">أفضل ألعاب الكمبيوتر</h2>
          <GameCarousel games={pcGames} onBet={onBet} onNavigate={handleNavigate} />
        </section>
      )}

      {browserGames.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 border-r-4 border-yellow-400 pr-4">ألعاب المتصفح الرائجة</h2>
          <GameCarousel games={browserGames} onBet={onBet} onNavigate={handleNavigate} />
        </section>
      )}

      {giveaways.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-white mb-6 border-r-4 border-yellow-400 pr-4">هدايا وعروض حصرية</h2>
          <GiveawayGrid giveaways={giveaways} />
        </section>
      )}
    </>
  );
};
