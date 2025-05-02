import React, { useState } from 'react';
import usePokemonList from './PokemonList';
import PokemonCard from './PokemonCard';
import PokemonDetail from './detail/PokemonDetail.jsx';
import ErrorBoundary from '../error';
import { usePokemonContext } from './context/contextPokemon.jsx';
import TypeDropdown from './typeDropdown/typeDropdown.jsx';
import useFilteredPokemon from './filteredPokemon';
import { useFavorites } from './context/contextFav.jsx';
import Loader from "./loader/loader.jsx"
 

const PokemonPage = () => {
  const { data: cards, isLoading, error } = usePokemonList();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
 
  const { isFavorite } = useFavorites();

  const {
    searchTerm,
    setSearchTerm,
    selectedTypes,
    setSelectedTypes,
    sortKey,
    setSortKey,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
  } = usePokemonContext();

  const filteredSorted = useFilteredPokemon(cards, {
    searchTerm,
    selectedTypes,
    sortKey,
  });

  const filteredWithFavorites = showFavoritesOnly
    ? filteredSorted.filter((pokemon) => isFavorite(pokemon.id))
    : filteredSorted;

  const totalPages = Math.ceil(filteredWithFavorites.length / itemsPerPage);
  const paginated = filteredWithFavorites.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRandomClick = () => {
    if (cards.length === 0) return;
    const random = cards[Math.floor(Math.random() * cards.length)];
    setSelectedPokemon(random.name);
  };

 

  if (selectedPokemon) {
    return (
      <PokemonDetail
        pokemonName={selectedPokemon}
        onBack={() => setSelectedPokemon(null)}
      />
    );
  }

  return (
    <div>
      <header className="header">
        <h1>Pokédex</h1>
        <button onClick={handleRandomClick} className="random-btn">
          🎲 Random Pokémon
        </button>
      </header>

      <div className="controls">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="search-input"
        />

        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="type-dropdown"
        >
          <option value="id">Sort by ID</option>
          <option value="name">Sort by Name</option>
        </select>

        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="type-dropdown"
        >
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="50">50 per page</option>
        </select>

        <TypeDropdown
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
        />

        <label style={{ marginLeft: '10px', marginTop: '10px' }}>
          <input
            type="checkbox"
            checked={showFavoritesOnly}
            onChange={() => setShowFavoritesOnly((prev) => !prev)}
          />
          {' '}Show Favorites Only
        </label>
      </div>

      <ErrorBoundary>
        {isLoading ? (
          <Loader/>
        ) : error ? (
          <div className="error">{error}</div>
        ) : filteredWithFavorites.length === 0 ? (
          <div className="empty-state">No Pokémon match your filters.</div>
        ) : (
          <>
            <div className="container">
              {paginated.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  onClick={() => setSelectedPokemon(pokemon.name)}
                />
              ))}
            </div>

            <div className="pagination">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index + 1}
                  className={index + 1 === currentPage ? 'active' : ''}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>

             
          </>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default PokemonPage;
