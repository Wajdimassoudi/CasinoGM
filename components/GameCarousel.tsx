
import React, { useEffect, useRef } from 'react';
import type { Game } from '../types';
import { GameCard } from './GameCard';

// Since we are loading Swiper from a CDN, we need to declare it to TypeScript
declare const Swiper: any;

interface GameCarouselProps {
  games: Game[];
  onBet: (amount: number, odds: number) => void;
}

export const GameCarousel: React.FC<GameCarouselProps> = ({ games, onBet }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      new Swiper(swiperRef.current, {
        slidesPerView: 1.5,
        spaceBetween: 15,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        },
      });
    }
  }, [games]); // Re-initialize if games change

  return (
    <div className="swiper-container relative" ref={swiperRef}>
      <div className="swiper-wrapper">
        {games.map((game) => (
          <div className="swiper-slide h-auto pb-8" key={game.id}>
            <GameCard game={game} onBet={onBet} />
          </div>
        ))}
      </div>
      <div className="swiper-pagination"></div>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </div>
  );
};
