import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonSearchbar,
  IonToast,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonGrid,
  IonRow,
  IonCol,
  IonSpinner,
} from "@ionic/react";

import { Pokemon } from "../models/Pokemon.models";
import PokemonItem from "../components/Pokemons";
import PokemonFilters from "../components/PokemonFilters";
import { getDailyPokemon, markDailyAsFound } from "../services/dailyPokemon";
import { addCoins } from "../services/wallet";
import "./Tab2.css";

const Tab2: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[] | null>(
    null
  );
  const [searchText, setSearchText] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [nextUrl, setNextUrl] = useState<string | null>(
    "https://pokeapi.co/api/v2/pokemon?limit=30&offset=0"
  );
  const [isLoading, setIsLoading] = useState(false);

  const types: string[] = [
    "normal",
    "fire",
    "water",
    "grass",
    "electric",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dark",
    "dragon",
    "steel",
    "fairy",
  ];
  const generations: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async (event?: CustomEvent<void>) => {
    if (!nextUrl || isLoading) return;
    setIsLoading(true);

    try {
      const response = await fetch(nextUrl);
      const data = await response.json();
      setNextUrl(data.next);

      const list: Pokemon[] = await Promise.all(
        data.results.map(async (p: { url: string }) => {
          const res = await fetch(p.url);
          return res.json();
        })
      );

      setPokemons((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const newList = list.filter((p) => !existingIds.has(p.id));
        return [...prev, ...newList];
      });
    } catch (error) {
      console.error("Failed to load pokemon list", error);
      setToastMessage("Could not load more Pokémon.");
    }

    setIsLoading(false);
    if (event) {
      (event.target as HTMLIonInfiniteScrollElement).complete();
    }
  };

  const filterByType = async (type: string) => {
    setIsLoading(true);
    setFilteredPokemons([]);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await response.json();
      const pokes: Pokemon[] = await Promise.all(
        data.pokemon.map(async (p: any) => {
          const res = await fetch(p.pokemon.url);
          return res.json();
        })
      );
      setFilteredPokemons(pokes);
    } catch (error) {
      setToastMessage(`Failed to filter by type: ${type}`);
      setFilteredPokemons(null);
    }
    setIsLoading(false);
  };

  const filterByGeneration = async (gen: number) => {
    setIsLoading(true);
    setFilteredPokemons([]);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/generation/${gen}`
      );
      if (!response.ok) {
        throw new Error(`API request for generation ${gen} failed`);
      }
      const data = await response.json();
      const pokes: (Pokemon | null)[] = await Promise.all(
        data.pokemon_species.map(async (p: { name: string; url: string }) => {
          const id = p.url.split("/").filter(Boolean).pop();
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          if (!res.ok) {
            console.warn(`Failed to fetch pokemon with ID/URL: ${id} / ${p.url}`);
            return null;
          }
          return res.json();
        })
      );
      setFilteredPokemons(pokes.filter(Boolean) as Pokemon[]);
    } catch (error) {
      console.error(error);
      setToastMessage(`Failed to filter by generation: ${gen}`);
      setFilteredPokemons(null);
    }
    setIsLoading(false);
  };

  const handleSearch = async () => {
    if (!searchText.trim()) {
      clearFilters();
      return;
    }
    setIsLoading(true);
    setFilteredPokemons([]);
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchText.toLowerCase().trim()}`
      );
      if (!res.ok) {
        setToastMessage(`Pokémon "${searchText}" not found.`);
        setFilteredPokemons(null);
      } else {
        const pokemon = await res.json();
        setFilteredPokemons([pokemon]);
      }
    } catch (error) {
      setToastMessage("An error occurred during search.");
      setFilteredPokemons(null);
    }
    setIsLoading(false);
  };

  const clearFilters = () => {
    setFilteredPokemons(null);
    setSearchText("");
  };

  const currentList = (filteredPokemons ?? pokemons).filter((p) =>
    filteredPokemons ? true : p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleFound = async (pokemon: Pokemon) => {
    const daily = getDailyPokemon();
    if (daily && !daily.found && daily.id === pokemon.id) {
      markDailyAsFound();
      const newBalance = await addCoins(50);
      setToastMessage(
        `🎉 You found the daily Pokémon! You earned 50 coins. New balance: ${newBalance} 💰`
      );
    }
  };

  return (
    <IonPage>
      <IonContent>
        <h1 className="pokedex-title">Pokédex</h1>
        <IonSearchbar
          value={searchText}
          onIonInput={(e) => setSearchText(e.detail.value!)}
          onIonClear={clearFilters}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search by name or ID"
        />

        <PokemonFilters
          types={types}
          generations={generations}
          onTypeSelect={filterByType}
          onGenerationSelect={filterByGeneration}
          onClear={clearFilters}
        />

        {isLoading && (!pokemons.length || filteredPokemons) ? (
          <div className="ion-text-center" style={{ marginTop: "20px" }}>
            <IonSpinner name="bubbles" />
          </div>
        ) : (
          <>
            <IonGrid className="pokedex-grid">
              <IonRow>
                {currentList.map((poke, idx) => (
                  <IonCol size="6" size-md="4" size-lg="3" key={poke.id}>
                    <div onClick={() => handleFound(poke)}>
                      <PokemonItem pokemon={poke} />
                    </div>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>

            {!filteredPokemons && (
              <IonInfiniteScroll
                onIonInfinite={(e) => loadPokemons(e)}
                threshold="100px"
                disabled={!nextUrl || isLoading}
              >
                <IonInfiniteScrollContent
                  loadingSpinner="bubbles"
                  loadingText="Cargando más Pokémon..."
                />
              </IonInfiniteScroll>
            )}
          </>
        )}

        <IonToast
          isOpen={!!toastMessage}
          message={toastMessage}
          duration={3000}
          onDidDismiss={() => setToastMessage("")}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
