export default async function fetchPokemonBatch(limit = 150) {
  const baseRes = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const { results } = await baseRes.json();

  const batchSize = 10;
  const allData = [];

  for (let i = 0; i < results.length; i += batchSize) {
    const batch = results.slice(i, i + batchSize);
    const data = await Promise.all(
      batch.map(p => fetch(p.url).then(res => res.json()))
    );
    allData.push(...data);
  }

  return allData;
}
