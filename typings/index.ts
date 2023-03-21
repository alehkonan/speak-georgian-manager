export type Response<Data> = {
  data?: Data;
  errorMessage?: string;
};

export type Category = {
  id: number;
  name: string;
};

export type Word = {
  id: number;
  en: string;
  ka: string;
  pictureUrl: string | null;
  categoryId: number | null;
  transcription: string | null;
};

type Tense = 'past' | 'present' | 'future';
type PersonalPronoun = 'firstPerson' | 'secondPerson' | 'thirdPerson';

export type Verb = {
  id: number;
  original: string;
} & Record<Tense, Record<PersonalPronoun, number | null>>;

export type Phrase = {
  id: number;
  en: string;
  ka: string;
  transcription: string | null;
  categoryId: number | null;
};
