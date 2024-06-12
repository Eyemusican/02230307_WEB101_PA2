"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";

interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

interface PokemonStatsCardProps {
  image: string;
  stats: PokemonStats;
}

// Function to get the color class based on the percentage
const getColorClass = (percentage: number) => {
  return percentage >= 50 ? 'bg-green-500' : 'bg-red-500';
};

const PokemonStatsCard: React.FC<PokemonStatsCardProps> = ({ image, stats }) => {
  const maxStatValue = 100; // Assuming 100 is the max value for the stats

  const statValues = [
    { name: 'HP', value: stats.hp },
    { name: 'Attack', value: stats.attack },
    { name: 'Defense', value: stats.defense },
    { name: 'Special Attack', value: stats.specialAttack },
    { name: 'Special Defense', value: stats.specialDefense },
    { name: 'Speed', value: stats.speed }
  ];

  return (
    <div className="border border-gray-200 rounded-md p-4 flex flex-col items-center">
      <img src={image} alt="Pokemon" className="w-24 h-24 mb-2" />
      <div className="mt-2 w-full">
        {statValues.map((stat, index) => {
          const percentage = (stat.value / maxStatValue) * 100;
          return (
            <div key={index} className="mb-2 w-full">
              <p>{stat.name}: {stat.value}</p>
              <Progress
                value={percentage}
                className={`w-full ${getColorClass(percentage)}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonStatsCard;
