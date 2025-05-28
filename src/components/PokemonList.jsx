import { useEffect, useState } from 'react';
import fetchPokemonBatch from './fetchPokemon';

const usePokemonList = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
 
  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        const list = await fetchPokemonBatch(150);
        if (!cancelled) setData(list);
      } catch (err) {
        console.error(err);
        if (!cancelled) setError('Failed to load Pokémon');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => { cancelled = true };
  }, []);

  return { data, error, isLoading };
};

export default usePokemonList;
