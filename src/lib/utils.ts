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

export function uuidv4() {
  let uuid = "",
    random;
  for (let i = 0; i < 32; i++) {
    random = (Math.random() * 16) | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += "-";
    }
    uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }
  return uuid;
}

export function generateRandomHash(length: number) {
  length = length || 5;

  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let hash = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    hash += characters.charAt(randomIndex);
  }

  return hash;
}
