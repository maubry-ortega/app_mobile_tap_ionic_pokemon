import React from "react";
import { IonList } from "@ionic/react";
import { Pokemon } from "../models/Pokemon.models";
import PokemonItem from "./Pokemons";

interface Props {
  pokemons: Pokemon[];
}

const PokemonList: React.FC<Props> = ({ pokemons }) => {
  return (
    <IonList>
      {pokemons.map((poke, idx) => (
        <PokemonItem key={idx} pokemon={poke} />
      ))}
    </IonList>
  );
};

export default PokemonList;
