import React, { createContext, useContext, useState, useMemo } from 'react';

const PokemonContext = createContext();

export const usePokemonContext = () => useContext(PokemonContext);

export const PokemonProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortKey, setSortKey] = useState('id');
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const value = useMemo(() => ({
    searchTerm, setSearchTerm,
    selectedTypes, setSelectedTypes,
    sortKey, setSortKey,
    itemsPerPage, setItemsPerPage,
    currentPage, setCurrentPage
  }), [
    searchTerm, selectedTypes, sortKey, itemsPerPage, currentPage
  ]);

  return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>;
};
