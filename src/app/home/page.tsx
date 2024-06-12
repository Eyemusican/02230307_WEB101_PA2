// "use client";
// import { useState, useEffect } from 'react';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer";

// export default function InputWithButton() {
//   const [pokemonList, setPokemonList] = useState([]);
//   const [caughtPokemon, setCaughtPokemon] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAllPokemon();
//   }, []);

//   const fetchAllPokemon = () => {
//     fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
//       .then(response => response.json())
//       .then(data => {
//         setPokemonList(data.results);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching Pokémon:', error);
//         setLoading(false);
//       });
//   };

//   const handleCatchPokemon = (pokemon) => {
//     setCaughtPokemon((prevCaught) => [...prevCaught, pokemon]);
//   };

//   const handleReleasePokemon = (pokemon) => {
//     setCaughtPokemon((prevCaught) =>
//       prevCaught.filter((p) => p.name !== pokemon.name)
//     );
//   };

//   return (
//     <div className="flex justify-center items-start min-h-screen pt-8 relative">
//       <Badge className="absolute top-9 left-1"> 
//         <Badge variant="destructive">POKEDEX</Badge>
//       </Badge>
//       <div className="flex flex-col w-full max-w-screen-lg items-center space-y-4 ml-auto mr-auto">
//         <Input 
//           className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
//           type="text" 
//           placeholder="Search by name" 
//         />
//         <Button 
//           className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
//           type="submit"
//         >
//           Search
//         </Button>
//         {loading ? (
//           <p>Loading Pokémon...</p>
//         ) : (
//           <div className="grid grid-cols-3 gap-4">
//             {pokemonList.map((pokemon, index) => (
//               <PokemonCard
//                 key={index}
//                 name={pokemon.name}
//                 onCatch={handleCatchPokemon}
//                 onRelease={handleReleasePokemon}
//                 isCaught={caughtPokemon.some((p) => p.name === pokemon.name)}
//               />
//             ))}
//           </div>
//         )}
//         <Drawer>
//           <DrawerTrigger>
//             <Button variant="outline">Caught Pokémon</Button>
//           </DrawerTrigger>
//           <DrawerContent>
//             <DrawerHeader>
//               <DrawerTitle>Caught Pokémon</DrawerTitle>
//             </DrawerHeader>
//             <div className="p-4">
//               {caughtPokemon.length === 0 ? (
//                 <p>No Pokémon caught yet.</p>
//               ) : (
//                 <div className="grid grid-cols-3 gap-4">
//                   {caughtPokemon.map((pokemon, index) => (
//                     <PokemonCard key={index} name={pokemon.name} />
//                   ))}
//                 </div>
//               )}
//             </div>
//             <DrawerFooter>
//               <DrawerClose>
//                 <Button variant="outline">Close</Button>
//               </DrawerClose>
//             </DrawerFooter>
//           </DrawerContent>
//         </Drawer>
//       </div>
//     </div>
//   );
// }

// const PokemonCard = ({ name, onCatch, onRelease, isCaught }) => {
//   const [pokemonData, setPokemonData] = useState(null);

//   useEffect(() => {
//     fetchPokemonData();
//   }, []);

//   const fetchPokemonData = () => {
//     fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
//       .then(response => response.json())
//       .then(data => {
//         setPokemonData(data);
//       })
//       .catch(error => {
//         console.error('Error fetching Pokémon data:', error);
//       });
//   };

//   const handleCatch = () => {
//     if (pokemonData) {
//       onCatch(pokemonData);
//     }
//   };

//   const handleRelease = () => {
//     if (pokemonData) {
//       onRelease(pokemonData);
//     }
//   };

//   return (
//     <div className="border border-gray-200 rounded-md p-4 flex flex-col items-center">
//       {pokemonData && (
//         <>
//           <img src={pokemonData.sprites.front_default} alt={name} className="w-24 h-24 mb-2" />
//           <p className="text-lg font-semibold">{name}</p>
//           <div className="mt-2">
//             <p>Height: {pokemonData.height}</p>
//             <p>Weight: {pokemonData.weight}</p>
//             <p>Abilities: {pokemonData.abilities.map(ability => ability.ability.name).join(', ')}</p>
//             <p>Types: {pokemonData.types.map(type => type.type.name).join(', ')}</p>
//           </div>
//           <Drawer>
//             <DrawerTrigger>
//               <Button variant="outline" className="mt-2">Catch/Release</Button>
//             </DrawerTrigger>
//             <DrawerContent>
//               <DrawerHeader>
//                 <DrawerTitle>{`Do you want to ${isCaught ? 'release' : 'catch'} ${name}?`}</DrawerTitle>
//               </DrawerHeader>
//               <DrawerFooter>
//                 <Button onClick={handleCatch} disabled={isCaught}>
//                   Catch
//                 </Button>
//                 <DrawerClose>
//                   <Button variant="outline" onClick={handleRelease} disabled={!isCaught}>
//                     Release
//                   </Button>
//                 </DrawerClose>
//               </DrawerFooter>
//             </DrawerContent>
//           </Drawer>
//         </>
//       )}
//     </div>
//   );
// };
// pages/index.tsx
// pages/index.tsx


// Renders the InputWithButton component within a div, representing the homepage.
import InputWithButton from "@/components/InputWithButton";

export default function Home() {
  return (
    <div>
      <InputWithButton />
    </div>
  );
}


