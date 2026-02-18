
import React from 'react';
import type { Giveaway } from '../types';
import { GiveawayCard } from './GiveawayCard';

interface GiveawayGridProps {
  giveaways: Giveaway[];
}

export const GiveawayGrid: React.FC<GiveawayGridProps> = ({ giveaways }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {giveaways.map(giveaway => (
        <GiveawayCard key={giveaway.id} giveaway={giveaway} />
      ))}
    </div>
  );
};
