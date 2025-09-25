import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonSearchbar,
  IonToast,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";

import { Pokemon } from "../models/Pokemon.models";
import PokemonItem from "../components/Pokemons";
import PokemonFilters from "../components/PokemonFilters";
import { getDailyPokemon, markDailyAsFound } from "../services/dailyPokemon";

const Tab2: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[] | null>(null);
  const [searchText, setSearchText] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [nextUrl, setNextUrl] = useState<string | null>(
    "https://pokeapi.co/api/v2/pokemon?limit=30&offset=0"
  );

  const types: string[] = [
    "normal","fire","water","grass","electric","ice","fighting","poison",
    "ground","flying","psychic","bug","rock","ghost","dark","dragon","steel","fairy"
  ];
  const generations: number[] = [1,2,3,4,5,6,7,8,9];

  useEffect(() => {
    loadPokemons();
  }, []);

  // 🔹 Scroll infinito para cargar todos
  const loadPokemons = async (event?: CustomEvent<void>) => {
    if (!nextUrl) return;

    const response = await fetch(nextUrl);
    const data = await response.json();
    setNextUrl(data.next);

    const list: Pokemon[] = await Promise.all(
      data.results.map(async (p: { url: string }) => {
        const res = await fetch(p.url);
        return res.json();
      })
    );

    setPokemons((prev) => [...prev, ...list]);

    if (event) {
      (event.target as HTMLIonInfiniteScrollElement).complete();
    }
  };

  // 🔹 Filtrar por tipo
  const filterByType = async (type: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.json();

    const pokes: Pokemon[] = await Promise.all(
      data.pokemon.map(async (p: any) => {
        const res = await fetch(p.pokemon.url);
        return res.json();
      })
    );
    setFilteredPokemons(pokes);
  };

  // 🔹 Filtrar por generación
  const filterByGeneration = async (gen: number) => {
    const response = await fetch(`https://pokeapi.co/api/v2/generation/${gen}`);
    const data = await response.json();

    const pokes: Pokemon[] = await Promise.all(
      data.pokemon_species.map(async (p: any) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${p.name}`);
        return res.json();
      })
    );
    setFilteredPokemons(pokes);
  };

  // 🔹 Buscar dentro de la lista activa
  const currentList = (filteredPokemons ?? pokemons).filter((p) =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // 🔹 Encontrar al Pokémon del día
  const handleFound = (pokemon: Pokemon) => {
    const daily = getDailyPokemon();
    if (daily && !daily.found && daily.id === pokemon.id) {
      markDailyAsFound();
      setToastMessage(`🎉 ¡Encontraste al Pokémon del día! Ganas 50 monedas 💰`);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pokédex</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Búsqueda */}
        <IonSearchbar
          value={searchText}
          onIonInput={(e) => setSearchText(e.detail.value!)}
          placeholder="Buscar Pokémon"
        />

        {/* Filtros */}
        <PokemonFilters
          types={types}
          generations={generations}
          onTypeSelect={filterByType}
          onGenerationSelect={filterByGeneration}
        />

        {/* Lista */}
        <IonList>
          {currentList.map((poke, idx) => (
            <div key={idx} onClick={() => handleFound(poke)}>
              <PokemonItem pokemon={poke} />
            </div>
          ))}
        </IonList>

        {/* Scroll infinito solo si no hay filtro */}
        {!filteredPokemons && (
          <IonInfiniteScroll
            onIonInfinite={(e) => loadPokemons(e)}
            threshold="100px"
            disabled={!nextUrl}
          >
            <IonInfiniteScrollContent
              loadingSpinner="bubbles"
              loadingText="Cargando más Pokémon..."
            />
          </IonInfiniteScroll>
        )}

        {/* Mensaje de recompensa */}
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
