
import {create} from 'zustand';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonStore {
  caughtPokemon: Pokemon[];
  addPokemon: (pokemon: Pokemon) => void;
  removePokemon: (pokemon: Pokemon) => void;
}

export const useStore = create<PokemonStore>((set) => ({
  caughtPokemon: JSON.parse(localStorage.getItem('caughtPokemon') || '[]'),
  addPokemon: (pokemon) =>
    set((state) => {
      const updatedCaughtPokemon = [...state.caughtPokemon, pokemon];
      localStorage.setItem('caughtPokemon', JSON.stringify(updatedCaughtPokemon));
      return { caughtPokemon: updatedCaughtPokemon };
    }),
  removePokemon: (pokemon) =>
    set((state) => {
      const updatedCaughtPokemon = state.caughtPokemon.filter((p) => p.name !== pokemon.name);
      localStorage.setItem('caughtPokemon', JSON.stringify(updatedCaughtPokemon));
      return { caughtPokemon: updatedCaughtPokemon };
    }),
}));
