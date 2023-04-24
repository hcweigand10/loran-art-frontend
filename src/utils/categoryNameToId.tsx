export default (name: string) => {
  switch (name) {
    case "Wall Art":
      return 1;
    case "Sculptures":
      return 2;
    case "Toys":
      return 3;
    case "Whistles":
      return 4;
    case "Planes":
      return 5;
    case "Wholesale":
      return 6;
    default:
      return 1;
  }
};
