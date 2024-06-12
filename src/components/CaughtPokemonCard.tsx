// Displays details of a caught Pokémon, including its name, height, weight, abilities, and types.

// Provides an option to release the Pokémon through a Drawer component.
"use client";
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

interface CaughtPokemonCardProps {
  name: string;
  onRelease: (pokemon: any) => void;
}

interface PokemonData {
  name: string;
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  types: { type: { name: string } }[];
  sprites: { front_default: string };
}

const CaughtPokemonCard: React.FC<CaughtPokemonCardProps> = ({ name, onRelease }) => {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

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
              <Button variant="outline" className="mt-2">Release</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>{`Do you want to release ${name}?`}</DrawerTitle>
              </DrawerHeader>
              <DrawerFooter>
                <Button variant="outline" onClick={handleRelease}>
                  Release
                </Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </div>
  );
};

export default CaughtPokemonCard;
