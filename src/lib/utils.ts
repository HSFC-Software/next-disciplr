export function generateNumberBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getInitials(name: string) {
  name = name.trim();
  const nameArray = name.split(" ");
  const firstInitial = nameArray[0].charAt(0);
  if (nameArray.length === 1) return firstInitial;

  const lastInitial = nameArray[nameArray.length - 1].charAt(0);
  return firstInitial + lastInitial;
}
