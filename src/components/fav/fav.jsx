// components/fav.jsx
import React from 'react';
import { useFavorites } from '../context/contextFav.jsx';
import './fav.css';

const FavoriteButton = ({ id, onClick }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleClick = (e) => {
    e.stopPropagation(); // prevent bubbling to card click
    toggleFavorite(id);
    if (onClick) onClick(); // optional extra handler if needed
  };

  return (
    <button
      onClick={handleClick}
      className={`favorite-button ${isFavorite(id) ? 'active' : ''}`}
      aria-label="Toggle favorite"
    >
      {isFavorite(id) ? '★' : '☆'}
    </button>
  );
};

export default FavoriteButton;
