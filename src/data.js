export const filterData = (data, condition) => {
<<<<<<< HEAD
    return data.filter(
        (pokemon) => pokemon.type[0] !== condition && pokemon.type[1] !== condition
    );
};

export const sortData = (data, sortBy, sortOrder) => {
    if (sortOrder === "Menor-nº" || sortOrder === "A-Z") {
        return data.sort((a, b) => {
            if (a[sortBy] > b[sortBy]) {
                return 1;
            }
            return -1;
        });
    } else if (sortOrder === "Maior-nº" || sortOrder === "Z-A") {
        return data.sort((a, b) => {
            if (a[sortBy] > b[sortBy]) {
                return -1;
            }
            return 1;
        });
    }
};
=======
  return data.filter(
    (pokemon) => pokemon.type[0] !== condition && pokemon.type[1] !== condition
  );
};

export const sortData = (data, sortBy, sortOrder) => {
  if (sortOrder === "Menor-nº" || sortOrder === "A-Z") {
    return data.sort((a, b) => {
      if (a[sortBy] > b[sortBy]) {
        return 1;
      }
      return -1;
    });
  } else if (sortOrder === "Maior-nº" || sortOrder === "Z-A") {
    return data.sort((a, b) => {
      if (a[sortBy] > b[sortBy]) {
        return -1;
      }
      return 1;
    });
  }
};
>>>>>>> 63e294d853ebc816735b5d0d93717422a01b8fff
