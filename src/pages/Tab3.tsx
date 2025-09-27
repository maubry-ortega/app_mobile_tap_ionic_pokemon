import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  IonLabel,
  useIonViewWillEnter,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonToast,
  IonIcon,
} from "@ionic/react";

import { logoBitcoin } from 'ionicons/icons';
import { Badge } from "../models/Badge.models";
import PokemonItem from "../components/Pokemons";
import BadgeItem from "../components/BadgeItem";
import { getFavorites } from "../services/favorites";
import { getCoins } from "../services/wallet";
import { getAvailableBadges, getOwnedBadgeIds, buyBadge } from "../services/badges";
import "./Tab3.css";
import { Pokemon } from "../models/Pokemon.models";

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
      transform="scale(0.85) translate(1.5, 1.5)"
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
  const [ownedBadges, setOwnedBadges] = useState<Badge[]>([]);
  const [shopBadges, setShopBadges] = useState<Badge[]>([]);
  const [toastMessage, setToastMessage] = useState("");

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

    // Load badges
    const allBadges = getAvailableBadges();
    const ownedIds = await getOwnedBadgeIds();
    const userOwnedBadges = allBadges.filter(b => ownedIds.includes(b.id));
    const availableForSale = allBadges.filter(b => !ownedIds.includes(b.id));
    setOwnedBadges(userOwnedBadges);
    setShopBadges(availableForSale);
  };

  useIonViewWillEnter(() => {
    loadData();
  });

  const handleBuyBadge = async (badgeId: string) => {
    const result = await buyBadge(badgeId);
    setToastMessage(result.message);
    if (result.success) {
      loadData(); // Refresh all data
    }
  };

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

        <h2 className="section-title">Mis Medallas</h2>
        {ownedBadges.length > 0 ? (
          <IonGrid>
            <IonRow>
              {ownedBadges.map((badge) => (
                <IonCol size="4" size-md="3" size-lg="2" key={badge.id}>
                  <BadgeItem badge={badge} />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        ) : (
          <div className="ion-padding ion-text-center">
            <IonLabel>Aún no tienes medallas.</IonLabel>
          </div>
        )}

        <h2 className="section-title">Tienda de Medallas</h2>
        {shopBadges.length > 0 ? (
          <IonGrid>
            <IonRow>
              {shopBadges.map((badge) => (
                <IonCol size="6" size-md="4" size-lg="3" key={badge.id}>
                  <div className="shop-item">
                    <BadgeItem badge={badge} />
                    <IonButton 
                      size="small" 
                      onClick={() => handleBuyBadge(badge.id)}
                      disabled={coins < badge.cost}
                    >
                      Comprar ({badge.cost} 
                      <IonIcon icon={logoBitcoin} size="small" className="coin-icon-button" />)
                    </IonButton>
                  </div>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        ) : (
          <div className="ion-padding ion-text-center">
            <IonLabel>¡Has comprado todas las medallas!</IonLabel>
          </div>
        )}

        <h2 className="section-title">Mis Favoritos</h2>
        {favorites.length > 0 ? (
          <IonGrid>
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
            <IonLabel>No tienes Pokémon favoritos.</IonLabel>
          </div>
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

export default Tab3;