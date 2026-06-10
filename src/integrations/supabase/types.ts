export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      custom_exams: {
        Row: {
          category: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_published: boolean
          question_ids: Json
          time_limit_minutes: number | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_published?: boolean
          question_ids?: Json
          time_limit_minutes?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_published?: boolean
          question_ids?: Json
          time_limit_minutes?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      custom_mcqs: {
        Row: {
          category: string | null
          correct_index: number
          created_at: string
          created_by: string | null
          explanation: string | null
          id: string
          is_published: boolean
          options: Json
          question: string
          subject: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          correct_index?: number
          created_at?: string
          created_by?: string | null
          explanation?: string | null
          id?: string
          is_published?: boolean
          options?: Json
          question: string
          subject?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          correct_index?: number
          created_at?: string
          created_by?: string | null
          explanation?: string | null
          id?: string
          is_published?: boolean
          options?: Json
          question?: string
          subject?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      daily_mcq_responses: {
        Row: {
          created_at: string
          daily_mcq_id: string
          id: string
          is_correct: boolean
          selected_index: number
          user_id: string
        }
        Insert: {
          created_at?: string
          daily_mcq_id: string
          id?: string
          is_correct: boolean
          selected_index: number
          user_id: string
        }
        Update: {
          created_at?: string
          daily_mcq_id?: string
          id?: string
          is_correct?: boolean
          selected_index?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_mcq_responses_daily_mcq_id_fkey"
            columns: ["daily_mcq_id"]
            isOneToOne: false
            referencedRelation: "daily_mcqs"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_mcqs: {
        Row: {
          correct_index: number
          created_at: string
          created_by: string | null
          explanation: string | null
          for_date: string
          id: string
          options: Json
          question: string
        }
        Insert: {
          correct_index: number
          created_at?: string
          created_by?: string | null
          explanation?: string | null
          for_date?: string
          id?: string
          options: Json
          question: string
        }
        Update: {
          correct_index?: number
          created_at?: string
          created_by?: string | null
          explanation?: string | null
          for_date?: string
          id?: string
          options?: Json
          question?: string
        }
        Relationships: []
      }
      exam_attempts: {
        Row: {
          answers: Json | null
          category: string | null
          correct_count: number
          created_at: string
          exam_type: string
          id: string
          score: number
          set_id: string | null
          skipped_count: number
          time_taken_seconds: number | null
          title: string | null
          total_questions: number
          user_id: string
          wrong_count: number
        }
        Insert: {
          answers?: Json | null
          category?: string | null
          correct_count?: number
          created_at?: string
          exam_type: string
          id?: string
          score?: number
          set_id?: string | null
          skipped_count?: number
          time_taken_seconds?: number | null
          title?: string | null
          total_questions?: number
          user_id: string
          wrong_count?: number
        }
        Update: {
          answers?: Json | null
          category?: string | null
          correct_count?: number
          created_at?: string
          exam_type?: string
          id?: string
          score?: number
          set_id?: string | null
          skipped_count?: number
          time_taken_seconds?: number | null
          title?: string | null
          total_questions?: number
          user_id?: string
          wrong_count?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          current_streak: number
          full_name: string | null
          id: string
          is_online: boolean | null
          last_active: string | null
          last_attempt_date: string | null
          longest_streak: number
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          current_streak?: number
          full_name?: string | null
          id: string
          is_online?: boolean | null
          last_active?: string | null
          last_attempt_date?: string | null
          longest_streak?: number
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          current_streak?: number
          full_name?: string | null
          id?: string
          is_online?: boolean | null
          last_active?: string | null
          last_attempt_date?: string | null
          longest_streak?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          awarded_at: string
          badge_code: string
          id: string
          user_id: string
        }
        Insert: {
          awarded_at?: string
          badge_code: string
          id?: string
          user_id: string
        }
        Update: {
          awarded_at?: string
          badge_code?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_daily_mcq_leaderboard: {
        Args: never
        Returns: {
          correct_count: number
          first_correct_at: string
          full_name: string
          total_answered: number
          user_id: string
        }[]
      }
      get_daily_mcq_responders: {
        Args: { _mcq_id: string }
        Returns: {
          created_at: string
          full_name: string
          is_correct: boolean
          selected_index: number
          user_id: string
        }[]
      }
      get_leaderboard: {
        Args: never
        Returns: {
          attempts: number
          avg_pct: number
          best_pct: number
          full_name: string
          total_score: number
          user_id: string
        }[]
      }
      get_set_ranking: {
        Args: { _set_id: string }
        Returns: {
          attempts: number
          best_pct: number
          best_score: number
          full_name: string
          user_id: string
        }[]
      }
      get_today_daily_mcq: {
        Args: never
        Returns: {
          correct_index: number
          correct_responses: number
          explanation: string
          id: string
          my_correct: boolean
          my_selected: number
          options: Json
          question: string
          total_responses: number
        }[]
      }
      get_today_daily_mcqs: {
        Args: never
        Returns: {
          correct_index: number
          correct_responses: number
          created_at: string
          explanation: string
          id: string
          my_correct: boolean
          my_selected: number
          options: Json
          question: string
          total_responses: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      update_streak: {
        Args: never
        Returns: {
          current_streak: number
          longest_streak: number
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
