import alphabet from './alphabet.json';

const alphabetMap = new Map(Object.entries(alphabet));

export const transliterate = (georgianWord: string) =>
  georgianWord
    .trim()
    .split('')
    .map((letter) =>
      alphabetMap.has(letter) ? alphabetMap.get(letter) : letter
    )
    .join('');
