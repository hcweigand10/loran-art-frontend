export default (name: string) => {
  switch (name) {
    case "Small Walls":
      return 2;
    case "Medium Walls":
      return 3;
    case "Large Walls":
      return 4;
    case "Sculptures":
      return 5;
    case "Toys":
      return 6;
    case "Whistles":
      return 7;
    case "Wholesale":
      return 8;
    case "Planes":
      return 9;
    case "Past Works":
      return 10;
    default:
      return 2;
  }
};
