import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, IonList } from '@ionic/react';
import './Tab2.css';
import React, { useState } from 'react';

import { Pokemon } from '../models/Pokemon.models';
import PokemonItem from '../components/Pokemons';

const Tab2: React.FC = () => {

  const [poke, setPoke] = useState<Pokemon[]>([]); 

  useIonViewDidEnter(() => {
  const loadData = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
  const data = await response.json();

  const fullPokemonList: Pokemon[] = await Promise.all(
    data.results.map(async (p: { url: string }) => {
      const res = await fetch(p.url);
      return res.json(); // esto sí es un objeto tipo `Pokemon`
    })
  );

  setPoke(fullPokemonList);
};

  loadData();
});
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {poke.map((poke, idx) => <PokemonItem key={idx} pokemon={poke} />)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
