import React from "react";
import {
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

interface Props {
  types: string[];
  generations: number[];
  onTypeSelect: (type: string) => void;
  onGenerationSelect: (gen: number) => void;
}

const PokemonFilters: React.FC<Props> = ({
  types,
  generations,
  onTypeSelect,
  onGenerationSelect,
}) => {
  return (
    <>
      <IonItem>
        <IonLabel>Filtrar por Tipo</IonLabel>
        <IonSelect
          placeholder="Selecciona un tipo"
          onIonChange={(e) => onTypeSelect(e.detail.value)}
        >
          {types.map((t, idx) => (
            <IonSelectOption key={idx} value={t}>
              {t}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>

      <IonItem>
        <IonLabel>Filtrar por Generación</IonLabel>
        <IonSelect
          placeholder="Selecciona una generación"
          onIonChange={(e) => onGenerationSelect(e.detail.value)}
        >
          {generations.map((g, idx) => (
            <IonSelectOption key={idx} value={g}>
              Generación {g}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
    </>
  );
};

export default PokemonFilters;
