
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Notification } from './components/Notification';
import { HomePage } from './views/HomePage';
import { GameDetailView } from './views/GameDetailView';
import { SearchResultsView } from './views/SearchResultsView';

export type View = 
  | { name: 'home' }
  | { name: 'gameDetail'; id: number }
  | { name: 'searchResults'; params: { platform: string, category: string }};

const App: React.FC = () => {
  const [balance, setBalance] = useState<number>(1000);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [view, setView] = useState<View>({ name: 'home' });

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

  const renderContent = () => {
    switch(view.name) {
      case 'home':
        return <HomePage setView={setView} onBet={handleBet} showNotification={showNotification} />;
      case 'gameDetail':
        return <GameDetailView gameId={view.id} setView={setView} onBet={handleBet} />;
      case 'searchResults':
        return <SearchResultsView params={view.params} setView={setView} onBet={handleBet} />;
      default:
        return <HomePage setView={setView} onBet={handleBet} showNotification={showNotification} />;
    }
  }

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 font-sans">
      <Header balance={balance} />
      <main className="container mx-auto px-4 py-8">
        {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
