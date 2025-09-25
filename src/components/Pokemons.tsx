import React from "react";
import { Pokemon } from "../models/Pokemon.models";
import { IonButton, IonIcon, IonChip } from "@ionic/react";
import { heart, heartOutline } from "ionicons/icons";
import { addFavorite, removeFavorite, isFavorite } from "../services/favorites";
import "./Pokemons.css";

const typeColorMap: { [key: string]: string } = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

const PokemonItem: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  const [favorite, setFavorite] = React.useState<boolean>(
    isFavorite(pokemon.id)
  );

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    if (favorite) {
      removeFavorite(pokemon.id);
      setFavorite(false);
    } else {
      addFavorite(pokemon.id);
      setFavorite(true);
    }
  };

  const primaryType = pokemon.types[0].type.name;
  const backgroundColor = typeColorMap[primaryType] || "#A8A77A";

  return (
    <div className="pokemon-card-item" style={{ background: backgroundColor }}>
      <IonButton fill="clear" className="fav-button" onClick={toggleFavorite}>
        <IonIcon icon={favorite ? heart : heartOutline} color="light" />
      </IonButton>
      <img
        src={
          pokemon.sprites.other?.["official-artwork"]?.front_default ??
          pokemon.sprites.front_default ??
          undefined
        }
        alt={pokemon.name}
      />
      <div>
        <h2 className="pokemon-name-list">{pokemon.name}</h2>
        <div className="types-container-list">
          {pokemon.types.map((t) => (
            <IonChip key={t.type.name}>{t.type.name}</IonChip>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonItem;
