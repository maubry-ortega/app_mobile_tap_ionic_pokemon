import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonButton, IonImg, IonToast, IonIcon, IonGrid, IonRow, IonCol, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { cashOutline } from 'ionicons/icons';
import { getCoins, addCoins, spendCoins } from '../services/wallet';
import { prepareNewGame } from '../services/game';
import { Pokemon } from '../models/Pokemon.models';
import './Tab4.css';

const GAME_COST = 10;
const REWARD = 50;

/**
 * Tab4 Component
 * 
 * This component renders the "Who's that Pokémon?" game page.
 * It manages the game state, user interactions, and wallet integration.
 */
const Tab4: React.FC = () => {
  const [pokemonToGuess, setPokemonToGuess] = useState<Pokemon | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [coins, setCoins] = useState(0);
  const [gameInProgress, setGameInProgress] = useState(false);

  useEffect(() => {
    const fetchCoins = async () => {
      const userCoins = await getCoins();
      setCoins(userCoins);
    };
    fetchCoins();
  }, []);

  /**
   * Starts a new game round.
   * Deducts the game cost, fetches new Pokémon, and sets up the game board.
   */
  const startNewGame = async () => {
    if (coins < GAME_COST) {
      setToastMessage(`No tienes suficientes monedas. Necesitas ${GAME_COST} para jugar.`);
      return;
    }

    const couldSpend = await spendCoins(GAME_COST);
    if (couldSpend) {
      setGameInProgress(true);
      setIsRevealed(false);
      setCoins(await getCoins());

      const gameData = await prepareNewGame();
      if (gameData) {
        setPokemonToGuess(gameData.pokemonToGuess);
        setOptions(gameData.options);
      } else {
        setToastMessage('Error al iniciar el juego. Inténtalo de nuevo.');
        setGameInProgress(false);
        await addCoins(GAME_COST); // Refund
        setCoins(await getCoins());
      }
    } else {
      setToastMessage('No se pudo iniciar el juego. Revisa tu saldo.');
    }
  };

  /**
   * Handles the user's guess.
   * @param guess The name of the Pokémon the user guessed.
   */
  const handleGuess = async (guess: string) => {
    if (!pokemonToGuess) return;

    setIsRevealed(true);
    if (guess === pokemonToGuess.name) {
      await addCoins(REWARD);
      setToastMessage(`¡Correcto! Ganaste ${REWARD} monedas.`);
    } else {
      setToastMessage(`¡Incorrecto! El Pokémon era ${pokemonToGuess.name}.`);
    }
    setCoins(await getCoins());
    setTimeout(() => {
        setGameInProgress(false);
        setPokemonToGuess(null);
    }, 2000); 
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>¿Quién es ese Pokémon?</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding game-content">
        <div className="wallet-display">
          <IonIcon icon={cashOutline} />
          <span>{coins} Monedas</span>
        </div>

        {gameInProgress && pokemonToGuess ? (
          <div className="game-area">
            <IonImg 
              src={pokemonToGuess.sprites.front_default || undefined} 
              className={`pokemon-image ${!isRevealed ? 'silhouette' : 'revealed'}`}
            />
            <IonGrid>
              <IonRow>
                {options.map((name) => (
                  <IonCol size="6" key={name}>
                    <IonButton expand="block" onClick={() => handleGuess(name)} disabled={isRevealed}>
                      {name}
                    </IonButton>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </div>
        ) : (
          <div className="start-game-container">
            <IonButton size="large" onClick={startNewGame}>
              Jugar ({GAME_COST} monedas)
            </IonButton>
            <p>Adivina el Pokémon y gana {REWARD} monedas.</p>
          </div>
        )}

        <IonToast
          isOpen={!!toastMessage}
          message={toastMessage}
          duration={3000}
          onDidDismiss={() => setToastMessage('')}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
