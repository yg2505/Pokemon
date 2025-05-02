// src/components/Loader.jsx
import React from 'react';
import './loader.css';

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="spinner"></div>
      <p>Loading Pokémon...</p>
    </div>
  );
};

export default Loader;
