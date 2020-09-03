export const filterData = (data, condition) => {
  return data.filter(pokemon => {
    return pokemon.type[0] !== condition && pokemon.type[1] !== condition
  });
};