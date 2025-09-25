import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
  IonSpinner,
  IonChip,
  IonButton,
  IonToast,
  useIonViewWillEnter,
  IonIcon,
} from "@ionic/react";
import { Pokemon, PokemonSpecies } from "../models/Pokemon.models";
import { getDailyPokemon, setDailyPokemon } from "../services/dailyPokemon";
import { getCoins, spendCoins } from "../services/wallet";
import { refresh } from "ionicons/icons";
import "./Tab1.css";

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

const REROLL_COST = 100;

const Tab1: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [funFact, setFunFact] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const [loading, setLoading] = useState<boolean>(true);
  const [coins, setCoins] = useState(0);
  const [toastMessage, setToastMessage] = useState("");

  const loadDailyPokemon = async (force = false) => {
    setLoading(true);
    const today = new Date().toISOString().split("T")[0];
    let daily = getDailyPokemon();

    if (force || !daily || daily.date !== today) {
      const total = 1025;
      const randomId = Math.floor(Math.random() * total) + 1;
      setDailyPokemon(randomId);
      daily = getDailyPokemon();
    }

    if (daily) {
      try {
        const [pokemonRes, speciesRes] = await Promise.all([
          fetch(`https://pokeapi.co/api/v2/pokemon/${daily.id}`),
          fetch(`https://pokeapi.co/api/v2/pokemon-species/${daily.id}`),
        ]);

        if (!pokemonRes.ok || !speciesRes.ok) {
          throw new Error("Failed to fetch Pokémon data");
        }

        const pokemonData: Pokemon = await pokemonRes.json();
        const speciesData: PokemonSpecies = await speciesRes.json();

        setPokemon(pokemonData);

        const primaryType = pokemonData.types[0].type.name;
        setBackgroundColor(typeColorMap[primaryType] || "#ffffff");

        const fact = speciesData.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        );
        setFunFact(
          fact
            ? fact.flavor_text.replace(new RegExp("[\n\f]", "g"), " ")
            : "No fun fact available."
        );
      } catch (error) {
        console.error("Failed to load Pokémon data", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const loadInitialData = async () => {
    setCoins(await getCoins());
    await loadDailyPokemon();
  };

  useIonViewWillEnter(() => {
    loadInitialData();
  });

  const handleReroll = async () => {
    const success = await spendCoins(REROLL_COST);
    if (success) {
      setCoins(await getCoins());
      await loadDailyPokemon(true);
    } else {
      setToastMessage(`You don't have enough coins. Cost: ${REROLL_COST} 💰`);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen style={{ "--background": backgroundColor }}>
        {loading ? (
          <div className="spinner-container">
            <IonSpinner name="bubbles" color="light" />
          </div>
        ) : (
          pokemon && (
            <div className="pokemon-container">
              <IonCard className="pokemon-card">
                <img
                  src={
                    pokemon.sprites.other?.["official-artwork"]?.front_default ??
                    (pokemon.sprites.front_default || undefined)
                  }
                  alt={pokemon.name}
                />
                <IonCardContent>
                  <h1 className="pokemon-name">{pokemon.name}</h1>
                  <div className="types-container">
                    {pokemon.types.map((t) => (
                      <IonChip
                        key={t.type.name}
                        style={{ "--background": typeColorMap[t.type.name] }}
                      >
                        {t.type.name}
                      </IonChip>
                    ))}
                  </div>
                  <div className="info-container">
                    <p>
                      <strong>Weight:</strong> {pokemon.weight / 10} kg
                    </p>
                    <p>
                      <strong>Height:</strong> {pokemon.height / 10} m
                    </p>
                  </div>
                  <div className="stats-container">
                    <h2>Base Stats</h2>
                    {pokemon.stats.map((s) => (
                      <div key={s.stat.name} className="stat-row">
                        <span>{s.stat.name.replace("-", " ")}</span>
                        <span>{s.base_stat}</span>
                      </div>
                    ))}
                  </div>
                  <div className="fun-fact">
                    <h2>Fun Fact</h2>
                    <p>{funFact}</p>
                  </div>

                  <IonButton
                    expand="block"
                    fill="outline"
                    color="light"
                    onClick={handleReroll}
                    disabled={coins < REROLL_COST}
                    style={{ marginTop: "20px" }}
                  >
                    <IonIcon icon={refresh} slot="start" />
                    New Pokémon (Cost: {REROLL_COST})
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </div>
          )
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

export default Tab1;
