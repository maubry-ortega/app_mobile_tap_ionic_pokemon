import React from "react";
import { Pokemon } from "../models/Pokemon.models";
import { IonItem, IonAvatar, IonLabel } from "@ionic/react";

const PokemonItem: React.FC<{pokemon: Pokemon}> = ({pokemon}) => {
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
                    {pokemon.types.map.name}
                </p>
            </IonLabel>
        </IonItem>
    );
}

export default PokemonItem;