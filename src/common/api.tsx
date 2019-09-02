const fetchCharacters = async (page: number, character: string, filterParams: any) => {
  const fetchUrl = getFetchUrl(page, character, filterParams);
  try {
    const response = await fetch(fetchUrl);
    const json = await response.json();
    return json;
  } catch (err) {
    return new Error(err);
  }
};

const getFetchUrl = (page, character, filterParams) => {
  if (character) {
    const currentPage = page <= filterParams.filteredPages
      ? page
      : 1;
    return `https://rickandmortyapi.com/api/character/?page=${currentPage}&name=${character}`;
  }
  if (page) {
    return `https://rickandmortyapi.com/api/character/?page=${page}`;
  }
  return 'https://rickandmortyapi.com/api/character';
};

export default fetchCharacters;
