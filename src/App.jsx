import React from 'react';
import './App.css';
import PokemonPage from './components/PokemonPage';
import PokemonDetail from './components/detail/PokemonDetail';

const App = () => {
  return (
    <main>
      <PokemonPage />
      <PokemonDetail />
    </main>
  );
};

export default App;