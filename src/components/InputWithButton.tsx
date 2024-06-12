
"use client";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PokemonCard from "@/components/PokemonCard";
import CaughtPokemonCard from "@/components/CaughtPokemonCard";
import { useStore } from "../store/store"; // Importing the Zustand store

interface Pokemon {
  name: string;
  url: string;
}

export default function InputWithButton() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 12;
  const { caughtPokemon, addPokemon, removePokemon } = useStore(); // Using the Zustand store

  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetchPokemonForPage(currentPage);
    } else {
      searchPokemon(searchTerm.trim());
    }
  }, [currentPage, searchTerm]);

  const fetchPokemonForPage = (page: number) => {
    setLoading(true);
    const offset = (page - 1) * itemsPerPage;
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`)
      .then(response => response.json())
      .then(data => {
        setPokemonList(data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching Pokémon:', error);
        setLoading(false);
      });
  };

  const searchPokemon = (term: string) => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${term.toLowerCase()}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Pokemon not found");
        }
        return response.json();
      })
      .then(data => {
        setPokemonList([data]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error searching Pokémon:', error);
        setPokemonList([]);
        setLoading(false);
      });
  };

  const handleCatchPokemon = (pokemon: Pokemon) => {
    addPokemon(pokemon); // Updating state using Zustand
  };

  const handleReleasePokemon = (pokemon: Pokemon) => {
    removePokemon(pokemon); // Updating state using Zustand
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return (
    <div className="flex justify-center items-start min-h-screen pt-8 relative">
      <Badge className="absolute top-9 left-1"> 
        <Badge variant="destructive">POKEDEX</Badge>
      </Badge>
      <div className="flex flex-col w-full max-w-screen-lg items-center space-y-4 ml-auto mr-auto">
        <div className="flex space-x-2">
          <Input 
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
            type="text" 
            placeholder="Search by name" 
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Button 
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
            type="submit"
            onClick={() => handleSearch(searchTerm)}
          >
            Search
          </Button>
          <Drawer>
            <DrawerTrigger>
              <Button variant="outline">Caught Pokémon</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Caught Pokémon</DrawerTitle>
              </DrawerHeader>
              <div className="p-4">
                {caughtPokemon.length === 0 ? (
                  <p>No Pokémon caught yet.</p>
                ) : (
                  <div className="grid grid-cols-3 gap-4">
                    {caughtPokemon.map((pokemon, index) => (
                      <CaughtPokemonCard
                        key={index}
                        name={pokemon.name}
                        onRelease={handleReleasePokemon}
                      />
                    ))}
                  </div>
                )}
              </div>
              <DrawerFooter>
                <DrawerClose>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        {loading ? (
          <p>Loading Pokémon...</p>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-4">
              {pokemonList.map((pokemon, index) => (
                <PokemonCard
                  key={index}
                  name={pokemon.name}
                  onCatch={handleCatchPokemon}
                  onRelease={handleReleasePokemon}
                  isCaught={caughtPokemon.some((p) => p.name === pokemon.name)}
                />
              ))}
            </div>
            {pokemonList.length > 0 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() => handlePageChange(currentPage + 1)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>
    </div>
  );
}
