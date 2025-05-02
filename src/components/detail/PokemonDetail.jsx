import React, { useEffect, useState } from 'react';
import "./detail.css"
import Loader from '../loader/loader';

const PokemonDetail = ({ pokemonName, onBack }) => {
  const [pokemon, setPokemon] = useState(null);
  const [evolution, setEvolution] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data = await res.json();
        setPokemon(data);

        const speciesRes = await fetch(data.species.url);
        const speciesData = await speciesRes.json();
        const evoRes = await fetch(speciesData.evolution_chain.url);
        const evoData = await evoRes.json();
        setEvolution(evoData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [pokemonName]);

  if (loading) return <Loader />;
  if (!pokemon) return <div>Error loading Pokémon data.</div>;

  return (
    <div className="pokemon-detail">
      <button onClick={onBack} className="back-button">← Back</button>

      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />

      <h2>Stats</h2>
      <ul>
        {pokemon.stats.map((s) => (
          <li key={s.stat.name}>{s.stat.name}: {s.base_stat}</li>
        ))}
      </ul>

      <h2>Abilities</h2>
      <ul>
        {pokemon.abilities.map((a) => (
          <li key={a.ability.name}>{a.ability.name}</li>
        ))}
      </ul>

      <h2>Moves</h2>
      <ul>
        {pokemon.moves.slice(0, 10).map((m) => (
          <li key={m.move.name}>{m.move.name}</li>
        ))}
      </ul>

      <h2>Evolution Chain</h2>
      <div className='evolution-chain'>{evolution && renderEvolution(evolution.chain)}</div>
    </div>
  );
};

const renderEvolution = (chain) => {
    if (!chain) return [];
  
    const current = <span key={chain.species.name}>{chain.species.name}</span>;
  
    if (chain.evolves_to.length > 0) {
      return [
        current,
        <span key={`${chain.species.name}-arrow`} className="arrow">➜</span>,
        ...renderEvolution(chain.evolves_to[0]),
      ];
    }
  
    return [current];
  };
  
   

export default PokemonDetail;
