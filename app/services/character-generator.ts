export default function characterGenerator(length: number, withLoweCase: boolean = false, withNumbers: boolean = false): string[] {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + (withLoweCase ? 'abcdefghijklmnopqrstuvwxyz' : '') + (withNumbers ? '0123456789' : '');
  const charactersLength = characters.length;
  const result = [];
  for (let i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }

  return shuffle(result);
}

const shuffle = (array: string[]) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}