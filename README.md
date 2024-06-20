This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Overview
This project is a simple Pokedex application built with React. It allows users to search for Pokémon by name, catch and release them, and view their details and stats. The app utilizes various React components and state management with Zustand.

## Getting Started
First, run the development server:

```bash
npm run dev

In browser;
localhost:3000/home


## Functionality

Search: You can type a Pokémon's name in the search box to find it quickly. The app looks up the Pokémon's details from the PokeAPI and shows you the matching ones.

Catch and Release: If you find a Pokémon you want to keep, click "Catch." It adds the Pokémon to your collection. If you change your mind later, you can release it by clicking "Release" in the Drawer.

View Details: Clicking on a Pokémon card shows its details like height, weight, abilities, and types. This helps you learn more about each Pokémon.

View Stats: You can see a Pokémon's stats like HP, Attack, Defense, etc., by clicking "Stats." The stats are color-coded: below 50% is red, and above 50% is green.

Pagination: The app splits Pokémon into pages of 12 to avoid showing too many at once. You can go to different pages using the buttons at the bottom.

Drawer: Caught Pokémon are stored in the Drawer. You can open it to see all the Pokémon you've caught and decide whether to release any of them. It keeps your main screen tidy meaning once you caught the pokemon and refreash the page, the caught pokemon would be still  be there.

## Libraries Used

- **React**: For building the user interface.
- **Shadui**: Provides UI components like buttons, inputs, badges, drawers, and pagination.
- **Zustand**: For state management, allowing the app to manage caught Pokémon.
- **clsx**: For composing class names, used in styling components.
- **tailwind-merge**: For merging Tailwind CSS classes.


