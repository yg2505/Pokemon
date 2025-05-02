// components/PokemonCard.jsx
import React from 'react';
import FavoriteButton from './fav/fav.jsx';
 

const PokemonCard = ({ pokemon, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(pokemon.name) 
    }
  };

  return (
    <div className="card" onClick={handleClick}>
      <FavoriteButton id={pokemon.id} />

      <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
      <h4>{pokemon.id}</h4>
      <h1>{pokemon.name}</h1>
      <div>
        {pokemon.types.map((t) => (
          <span className="type" key={t.type.name}>{t.type.name}</span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
