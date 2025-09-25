import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";

import { Pokemon } from "../models/Pokemon.models";
import { getDailyPokemon, setDailyPokemon } from "../services/dailyPokemon";

const Tab1: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    loadDailyPokemon();
  }, []);

  const loadDailyPokemon = async () => {
    const today = new Date().toISOString().split("T")[0];
    let daily = getDailyPokemon();

    // si no hay Pokémon guardado hoy, generamos uno nuevo
    if (!daily || daily.date !== today) {
      const total = 1025;
      const randomId = Math.floor(Math.random() * total) + 1;
      setDailyPokemon(randomId);
      daily = getDailyPokemon();
    }

    if (daily) {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${daily.id}`);
      const data = await res.json();
      setPokemon(data);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pokémon del Día</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {pokemon && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{pokemon.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <img
                src={pokemon.sprites.front_default ?? undefined}
                alt={pokemon.name}
              />
              <p>Tipos: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
              <p>Peso: {pokemon.weight}</p>
              <p>Altura: {pokemon.height}</p>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
