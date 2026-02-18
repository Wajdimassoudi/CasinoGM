
import React, { useState, useEffect, useRef } from 'react';
import { fetchGameById } from '../services/gameService';
import type { GameDetails } from '../types';
import type { View } from '../App';

declare const Swiper: any;

interface GameDetailViewProps {
  gameId: number;
  setView: (view: View) => void;
  onBet: (amount: number, odds: number) => void;
}

export const GameDetailView: React.FC<GameDetailViewProps> = ({ gameId, setView, onBet }) => {
  const [game, setGame] = useState<GameDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    const loadGameData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchGameById(gameId);
        setGame(data);
      } catch (e) {
        setError('فشل في تحميل تفاصيل اللعبة. يرجى المحاولة مرة أخرى.');
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    loadGameData();
  }, [gameId]);

  useEffect(() => {
    if (game && game.screenshots && swiperRef.current) {
      new Swiper(swiperRef.current, {
        loop: true,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      });
    }
  }, [game]);

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

  if (!game) {
    return <p className="text-center">لم يتم العثور على اللعبة.</p>;
  }

  return (
    <div className="animate-fade-in">
      <button onClick={() => setView({ name: 'home' })} className="mb-6 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
        &larr; العودة إلى الرئيسية
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <img src={game.thumbnail} alt={game.title} className="rounded-lg w-full shadow-lg" />
           <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                <a href={game.game_url} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-4 rounded transition-colors duration-200 text-lg">
                    العب الآن
                </a>
           </div>
        </div>

        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold text-white mb-2">{game.title}</h1>
          <div className="flex items-center space-x-reverse space-x-4 mb-4 text-sm text-gray-400">
            <span>{game.developer}</span>
            <span>&bull;</span>
            <span>{game.release_date}</span>
          </div>
          <p className="text-gray-300 leading-relaxed">{game.description}</p>
        </div>
      </div>

      {game.screenshots && game.screenshots.length > 0 && (
        <div className="my-8">
          <h2 className="text-2xl font-bold text-white mb-4">لقطات الشاشة</h2>
          <div className="swiper-container relative" ref={swiperRef} style={{height: '400px'}}>
            <div className="swiper-wrapper">
              {game.screenshots.map(ss => (
                <div className="swiper-slide" key={ss.id}>
                  <img src={ss.image} alt="Screenshot" className="w-full h-full object-contain rounded-lg"/>
                </div>
              ))}
            </div>
            <div className="swiper-pagination"></div>
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
          </div>
        </div>
      )}

      {game.minimum_system_requirements && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">متطلبات النظام الدنيا</h2>
          <div className="bg-gray-800 p-4 rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div><strong>نظام التشغيل:</strong> {game.minimum_system_requirements.os}</div>
            <div><strong>المعالج:</strong> {game.minimum_system_requirements.processor}</div>
            <div><strong>الذاكرة:</strong> {game.minimum_system_requirements.memory}</div>
            <div><strong>الرسوميات:</strong> {game.minimum_system_requirements.graphics}</div>
            <div className="sm:col-span-2"><strong>التخزين:</strong> {game.minimum_system_requirements.storage}</div>
          </div>
        </div>
      )}
    </div>
  );
};
