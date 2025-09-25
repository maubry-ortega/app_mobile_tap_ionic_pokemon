import React, { useState } from "react";
import { IonChip, IonButton } from "@ionic/react";
import "./PokemonFilters.css";

interface Props {
  types: string[];
  generations: number[];
  onTypeSelect: (type: string) => void;
  onGenerationSelect: (gen: number) => void;
  onClear: () => void;
}

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

const PokemonFilters: React.FC<Props> = ({
  types,
  generations,
  onTypeSelect,
  onGenerationSelect,
  onClear,
}) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedGen, setSelectedGen] = useState<number | null>(null);

  const handleTypeClick = (type: string) => {
    setSelectedType(type);
    setSelectedGen(null); // Clear other filter
    onTypeSelect(type);
  };

  const handleGenClick = (gen: number) => {
    setSelectedGen(gen);
    setSelectedType(null); // Clear other filter
    onGenerationSelect(gen);
  };

  const handleClear = () => {
    setSelectedType(null);
    setSelectedGen(null);
    onClear();
  };

  return (
    <div className="filters-container">
      <div className="filter-group">
        <span className="filter-label">Types</span>
        <div className="chips-container">
          {types.map((type) => (
            <IonChip
              key={type}
              className={`type-chip ${selectedType === type ? "selected" : ""}`}
              style={{ "--background": typeColorMap[type] }}
              onClick={() => handleTypeClick(type)}
            >
              {type}
            </IonChip>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-label">Generations</span>
        <div className="chips-container">
          {generations.map((gen) => (
            <IonChip
              key={gen}
              className={`type-chip ${selectedGen === gen ? "selected" : ""}`}
              color="medium"
              onClick={() => handleGenClick(gen)}
            >
              Gen {gen}
            </IonChip>
          ))}
        </div>
      </div>

      {(selectedType || selectedGen) && (
        <IonButton
          className="clear-filters-button"
          size="small"
          fill="outline"
          onClick={handleClear}
        >
          Clear Filters
        </IonButton>
      )}
    </div>
  );
};

export default PokemonFilters;
