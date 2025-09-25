import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonLabel,
} from "@ionic/react";

import { Pokemon } from "../models/Pokemon.models";
import PokemonItem from "../components/Pokemons";
import { getFavorites } from "../services/favorites";

const Tab3: React.FC = () => {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const favoriteIds = getFavorites();
    const pokes: Pokemon[] = await Promise.all(
      favoriteIds.map(async (id: number) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return res.json();
      })
    );
    setFavorites(pokes);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Favoritos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {favorites.length > 0 ? (
          <IonList>
            {favorites.map((poke, idx) => (
              <PokemonItem key={idx} pokemon={poke} />
            ))}
          </IonList>
        ) : (
          <IonLabel>No tienes favoritos todavía</IonLabel>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
