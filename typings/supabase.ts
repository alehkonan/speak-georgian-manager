export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          id: number
          name: string
          picture_url: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string
          picture_url?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          picture_url?: string | null
        }
      }
      favorites: {
        Row: {
          created_at: string
          id: number
          is_favorite: boolean
          user_id: string
          word_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          is_favorite?: boolean
          user_id: string
          word_id: number
        }
        Update: {
          created_at?: string
          id?: number
          is_favorite?: boolean
          user_id?: string
          word_id?: number
        }
      }
      phrases: {
        Row: {
          category_id: number | null
          created_at: string
          en: string
          id: number
          ka: string
          transcription: string | null
        }
        Insert: {
          category_id?: number | null
          created_at?: string
          en?: string
          id?: number
          ka?: string
          transcription?: string | null
        }
        Update: {
          category_id?: number | null
          created_at?: string
          en?: string
          id?: number
          ka?: string
          transcription?: string | null
        }
      }
      statistics: {
        Row: {
          created_at: string
          id: number
          is_learned: boolean
          listened: number
          right_answers: number
          total_answers: number
          translation_shown: number
          user_id: string
          word_id: number
          wrong_answers: number
        }
        Insert: {
          created_at?: string
          id?: number
          is_learned?: boolean
          listened?: number
          right_answers?: number
          total_answers?: number
          translation_shown?: number
          user_id: string
          word_id: number
          wrong_answers?: number
        }
        Update: {
          created_at?: string
          id?: number
          is_learned?: boolean
          listened?: number
          right_answers?: number
          total_answers?: number
          translation_shown?: number
          user_id?: string
          word_id?: number
          wrong_answers?: number
        }
      }
      "user-settings": {
        Row: {
          created_at: string | null
          id: number
          show_daily_word: boolean
          show_pictures_in_game: boolean
          show_transcription: boolean
          show_translation: boolean
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          show_daily_word?: boolean
          show_pictures_in_game?: boolean
          show_transcription?: boolean
          show_translation?: boolean
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          show_daily_word?: boolean
          show_pictures_in_game?: boolean
          show_transcription?: boolean
          show_translation?: boolean
          user_id?: string
        }
      }
      verbs: {
        Row: {
          created_at: string
          first_person_in_future_word_id: number | null
          first_person_in_past_word_id: number | null
          first_person_in_present_word_id: number | null
          id: number
          original: string
          second_person_in_future_word_id: number | null
          second_person_in_past_word_id: number | null
          second_person_in_present_word_id: number | null
          third_person_in_future_word_id: number | null
          third_person_in_past_word_id: number | null
          third_person_in_present_word_id: number | null
        }
        Insert: {
          created_at?: string
          first_person_in_future_word_id?: number | null
          first_person_in_past_word_id?: number | null
          first_person_in_present_word_id?: number | null
          id?: number
          original?: string
          second_person_in_future_word_id?: number | null
          second_person_in_past_word_id?: number | null
          second_person_in_present_word_id?: number | null
          third_person_in_future_word_id?: number | null
          third_person_in_past_word_id?: number | null
          third_person_in_present_word_id?: number | null
        }
        Update: {
          created_at?: string
          first_person_in_future_word_id?: number | null
          first_person_in_past_word_id?: number | null
          first_person_in_present_word_id?: number | null
          id?: number
          original?: string
          second_person_in_future_word_id?: number | null
          second_person_in_past_word_id?: number | null
          second_person_in_present_word_id?: number | null
          third_person_in_future_word_id?: number | null
          third_person_in_past_word_id?: number | null
          third_person_in_present_word_id?: number | null
        }
      }
      words: {
        Row: {
          category_id: number | null
          created_at: string
          id: number
          name_en: string
          name_ka: string
          picture_url: string | null
          sound_url: string | null
          transcription: string | null
        }
        Insert: {
          category_id?: number | null
          created_at?: string
          id?: number
          name_en?: string
          name_ka?: string
          picture_url?: string | null
          sound_url?: string | null
          transcription?: string | null
        }
        Update: {
          category_id?: number | null
          created_at?: string
          id?: number
          name_en?: string
          name_ka?: string
          picture_url?: string | null
          sound_url?: string | null
          transcription?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
