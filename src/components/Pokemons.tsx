import React from "react";
import { Pokemon } from "../models/Pokemon.models";
import { IonItem, IonAvatar, IonLabel, IonButton, IonIcon } from "@ionic/react";
import { heart, heartOutline } from "ionicons/icons";
import { addFavorite, removeFavorite, isFavorite } from "../services/favorites";

const PokemonItem: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  const [favorite, setFavorite] = React.useState<boolean>(isFavorite(pokemon.id));

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(pokemon.id);
      setFavorite(false);
    } else {
      addFavorite(pokemon.id);
      setFavorite(true);
    }
  };
    return(
        <IonItem>
            <IonAvatar>
                <img src={pokemon.sprites.front_default ?? undefined} />
            </IonAvatar>
            <IonLabel>
                <h1>
                    {pokemon.name}
                </h1>
                <p>
                    <p>{pokemon.types.map((t) => t.type.name).join(", ")}</p>
                </p>
            </IonLabel>
            <IonButton fill="clear" onClick={toggleFavorite}>
                <IonIcon icon={favorite ? heart : heartOutline} color="danger" />
            </IonButton>
        </IonItem>
    );
}

export default PokemonItem;