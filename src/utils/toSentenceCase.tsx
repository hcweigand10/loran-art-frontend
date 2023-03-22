export default (s: string) => {
  const words = s.split("-")
  return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
}