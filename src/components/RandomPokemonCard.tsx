import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from "@ionic/react";
import { Pokemon } from "../models/Pokemon.models";

interface Props {
  pokemon: Pokemon;
  onReload: () => void;
}

const RandomPokemonCard: React.FC<Props> = ({ pokemon, onReload }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Pokémon Aleatorio: {pokemon.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <img
          src={pokemon.sprites.front_default ?? undefined}
          alt={pokemon.name}
        />
        <p>Tipos: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
        <IonButton expand="block" onClick={onReload}>
          Otro Pokémon
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default RandomPokemonCard;
