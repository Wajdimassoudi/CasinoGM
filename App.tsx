
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { GameCarousel } from './components/GameCarousel';
import { GiveawayGrid } from './components/GiveawayGrid';
import { Footer } from './components/Footer';
import { fetchFreeToGameGames, fetchGamerPowerGiveaways } from './services/gameService';
import type { Game, Giveaway } from './types';
import { Notification } from './components/Notification';

const App: React.FC = () => {
  const [balance, setBalance] = useState<number>(1000);
  const [browserGames, setBrowserGames] = useState<Game[]>([]);
  const [shooterGames, setShooterGames] = useState<Game[]>([]);
  const [strategyGames, setStrategyGames] = useState<Game[]>([]);
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchGamesData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Added a call for 'strategy' games as a substitute for the non-working opengames.dev API
      const [browserResult, shooterResult, strategyResult, giveawaysResult] = await Promise.all([
        fetchFreeToGameGames({ platform: 'browser' }),
        fetchFreeToGameGames({ category: 'shooter' }),
        fetchFreeToGameGames({ category: 'strategy' }),
        fetchGamerPowerGiveaways()
      ]);
      setBrowserGames(browserResult.slice(0, 20));
      setShooterGames(shooterResult.slice(0, 20));
      setStrategyGames(strategyResult.slice(0, 20));
      setGiveaways(giveawaysResult.slice(0, 12));
    } catch (error) {
      console.error("Failed to fetch game data:", error);
      setNotification({ message: 'فشل في تحميل البيانات. الرجاء المحاولة مرة أخرى.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGamesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBet = (amount: number, odds: number) => {
    if (balance < amount) {
      showNotification('رصيدك غير كافٍ لإتمام هذا الرهان.', 'error');
      return;
    }

    setBalance(prev => prev - amount);
    showNotification(`تم وضع رهان بقيمة ${amount} نقطة. بالتوفيق!`, 'success');

    setTimeout(() => {
      const isWin = Math.random() < (1 / odds);
      if (isWin) {
        const winnings = Math.floor(amount * odds);
        setBalance(prev => prev + winnings);
        showNotification(`تهانينا! لقد ربحت ${winnings} نقطة!`, 'success');
      } else {
        showNotification('حظ أوفر في المرة القادمة! لقد خسرت الرهان.', 'error');
      }
    }, 2000);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 font-sans">
      <Header balance={balance} />
      <main className="container mx-auto px-4 py-8">
        {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
        
        <div className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4 tracking-wider">مرحباً بك في منصة الرهان الرقمي</h1>
          <p className="text-lg text-gray-400">راهن على أفضل الألعاب المجانية واكسب النقاط!</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"></div>
          </div>
        ) : (
          <>
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6 border-r-4 border-yellow-400 pr-4">ألعاب المتصفح الرائجة</h2>
              <GameCarousel games={browserGames} onBet={handleBet} />
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6 border-r-4 border-yellow-400 pr-4">أفضل ألعاب إطلاق النار</h2>
              <GameCarousel games={shooterGames} onBet={handleBet} />
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6 border-r-4 border-yellow-400 pr-4">ألعاب استراتيجية</h2>
              <GameCarousel games={strategyGames} onBet={handleBet} />
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-6 border-r-4 border-yellow-400 pr-4">هدايا وعروض حصرية</h2>
              <GiveawayGrid giveaways={giveaways} />
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
