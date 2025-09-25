import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonLabel,
  useIonViewWillEnter,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";

import { Pokemon } from "../models/Pokemon.models";
import PokemonItem from "../components/Pokemons";
import { getFavorites } from "../services/favorites";
import { getCoins } from "../services/wallet";
import "./Tab3.css";

const GoldCoinIcon = () => (
  <svg
    className="coin-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="#FFD700"
  >
    <path d="M10 18a8 8 0 100-16 8 8 0 000 16z" />
    <path
      fill="#FBBF24"
      d="M10 18a8 8 0 100-16 8 8 0 000 16z"
      transform="scale(0.85)"
      transform-origin="center"
    />
    <text
      x="50%"
      y="50%"
      textAnchor="middle"
      dy=".3em"
      fill="#A16207"
      fontSize="9"
      fontWeight="bold"
    >
      P
    </text>
  </svg>
);

const Tab3: React.FC = () => {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);
  const [coins, setCoins] = useState(0);

  const loadData = async () => {
    // Load coins
    const currentCoins = await getCoins();
    setCoins(currentCoins);

    // Load favorites
    const favoriteIds = getFavorites();
    const pokes: Pokemon[] = await Promise.all(
      favoriteIds.map(async (id: number) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return res.json();
      })
    );
    setFavorites(pokes);
  };

  useIonViewWillEnter(() => {
    loadData();
  });

  return (
    <IonPage>
      <IonContent>
        <div className="wallet-card">
          <h2 className="wallet-title">My Wallet</h2>
          <div className="coin-balance">
            <GoldCoinIcon />
            <span>{coins}</span>
          </div>
        </div>

        <h2 className="favorites-title">My Favorites</h2>

        {favorites.length > 0 ? (
          <IonGrid className="pokedex-grid">
            <IonRow>
              {favorites.map((poke) => (
                <IonCol size="6" size-md="4" size-lg="3" key={poke.id}>
                  <PokemonItem pokemon={poke} />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        ) : (
          <div className="ion-padding ion-text-center">
            <IonLabel>You have no favorite Pokémon yet.</IonLabel>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
