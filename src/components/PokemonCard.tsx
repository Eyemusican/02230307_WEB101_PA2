import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import PokemonStatsCard from './PokemonStatsCard'; // Importing PokemonStatsCard component

interface PokemonCardProps {
  name: string;
  onCatch: (pokemon: any) => void;
  onRelease: (pokemon: any) => void;
  isCaught: boolean;
}

interface PokemonData {
  name: string;
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  types: { type: { name: string } }[];
  sprites: { front_default: string };
  stats: { base_stat: number, stat: { name: string } }[];
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, onCatch, onRelease, isCaught }) => {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [showStats, setShowStats] = useState(false); // State to manage whether to show stats or not

  useEffect(() => {
    fetchPokemonData();
  }, []);

  const fetchPokemonData = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => response.json())
      .then(data => {
        setPokemonData(data);
      })
      .catch(error => {
        console.error('Error fetching Pokémon data:', error);
      });
  };

  const handleCatch = () => {
    if (pokemonData) {
      onCatch(pokemonData);
    }
  };

  const handleRelease = () => {
    if (pokemonData) {
      onRelease(pokemonData);
    }
  };

  return (
    <div className="border border-gray-200 rounded-md p-4 flex flex-col items-center">
      {pokemonData && (
        <>
          <img src={pokemonData.sprites.front_default} alt={name} className="w-24 h-24 mb-2" />
          <p className="text-lg font-semibold">{name}</p>
          <div className="mt-2">
            <p>Height: {pokemonData.height}</p>
            <p>Weight: {pokemonData.weight}</p>
            <p>Abilities: {pokemonData.abilities.map(ability => ability.ability.name).join(', ')}</p>
            <p>Types: {pokemonData.types.map(type => type.type.name).join(', ')}</p>
          </div>
          <Drawer>
            <DrawerTrigger>
              <Button variant="outline" className="mt-2">Catch/Release</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>{`Do you want to ${isCaught ? 'release' : 'catch'} ${name}?`}</DrawerTitle>
              </DrawerHeader>
              <DrawerFooter>
                <Button onClick={handleCatch} disabled={isCaught}>
                  Catch
                </Button>
                <DrawerClose>
                  <Button variant="outline" onClick={handleRelease} disabled={!isCaught}>
                    Release
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          {/* Button to toggle display of stats */}
          <Button onClick={() => setShowStats(!showStats)} className="mt-2">
            {showStats ? 'Hide Stats' : 'Stats'}
          </Button>
          {/* Render PokemonStatsCard only when showStats is true */}
          {showStats && (
            <PokemonStatsCard
              image={pokemonData.sprites.front_default}
              stats={{
                hp: pokemonData.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 0,
                attack: pokemonData.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0,
                defense: pokemonData.stats.find(stat => stat.stat.name === 'defense')?.base_stat || 0,
                specialAttack: pokemonData.stats.find(stat => stat.stat.name === 'special-attack')?.base_stat || 0,
                specialDefense: pokemonData.stats.find(stat => stat.stat.name === 'special-defense')?.base_stat || 0,
                speed: pokemonData.stats.find(stat => stat.stat.name === 'speed')?.base_stat || 0,
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PokemonCard;
