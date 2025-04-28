import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [cards, setCards] = useState([])
  const [filteredCards, setFilteredCards] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
        const data = await res.json()

        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url)
            return await res.json()
          })
        )

        setCards(pokemonDetails)
        setFilteredCards(pokemonDetails)
      } catch (err) {
        console.error('Error fetching Pokémon:', err)
        setError('Failed to fetch Pokémon')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    let filtered = cards

    if (searchTerm) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some((typeInfo) => typeInfo.type.name === typeFilter)
      )
    }

    setFilteredCards(filtered)
  }, [searchTerm, typeFilter, cards])

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div>
      <header className="header">
        <h1>Pokédex</h1>
      </header>

      <div className="controls">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="type-dropdown"
        >
          <option value="all">All Types</option>
          <option value="grass">Grass</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="bug">Bug</option>
          <option value="normal">Normal</option>
          <option value="poison">Poison</option>
          <option value="electric">Electric</option>
          <option value="ground">Ground</option>
          <option value="fairy">Fairy</option>
          <option value="fighting">Fighting</option>
          <option value="psychic">Psychic</option>
          <option value="rock">Rock</option>
          <option value="ghost">Ghost</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="steel">Steel</option>
          <option value="flying">Flying</option>
        </select>
      </div>

      {filteredCards.length === 0 ? (
        <div className="empty-state">No Pokémon match your search.</div>
      ) : (
        <div className="container">
          {filteredCards.map((card) => (
            <div key={card.id} className="card">
              <img
                src={card.sprites.other["dream_world"].front_default}
                alt={card.name}
              />

              <h1>{card.name}</h1>
              <div>
                {card.types.map((typeInfo) => (
                  <div key={typeInfo.type.name} className="type">
                    {typeInfo.type.name}
                  </div>
                ))}
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App;
