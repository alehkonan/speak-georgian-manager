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
