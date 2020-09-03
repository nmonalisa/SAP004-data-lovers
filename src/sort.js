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