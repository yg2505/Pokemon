import { useMemo } from 'react';

const useFilteredPokemon = (cards, { searchTerm, selectedTypes, sortKey }) => {
  return useMemo(() => {
    if (!cards) return [];

    let filtered = cards.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedTypes.length > 0) {
      filtered = filtered.filter(p =>
        selectedTypes.every(type =>
          p.types.some(t => t.type.name === type)
        )
      );
    }

    return [...filtered].sort((a, b) =>
      sortKey === 'name' ? a.name.localeCompare(b.name) : a.id - b.id
    );
  }, [cards, searchTerm, selectedTypes, sortKey]);
};

export default useFilteredPokemon;
