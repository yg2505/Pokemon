import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { PokemonProvider } from './components/context/contextPokemon.jsx';
import { FavoritesProvider } from './components/context/contextFav.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FavoritesProvider>
      <PokemonProvider>
        <App />
      </PokemonProvider>
    </FavoritesProvider>
  </StrictMode>
);
