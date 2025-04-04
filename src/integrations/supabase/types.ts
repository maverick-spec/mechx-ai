export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      community: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string
          id: string
          image_url: string | null
          likes: number | null
          tags: string[] | null
          title: string
          updated_at: string
          views: number | null
        }
        Insert: {
          author: string
          category: string
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          likes?: number | null
          tags?: string[] | null
          title: string
          updated_at?: string
          views?: number | null
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          likes?: number | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          views?: number | null
        }
        Relationships: []
      }
      conversation_messages: {
        Row: {
          content: string
          conversation_id: string | null
          id: string
          role: string
          timestamp: string | null
        }
        Insert: {
          content: string
          conversation_id?: string | null
          id?: string
          role: string
          timestamp?: string | null
        }
        Update: {
          content?: string
          conversation_id?: string | null
          id?: string
          role?: string
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversation_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string | null
          id: string
          last_message: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_message?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_message?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      premade_projects: {
        Row: {
          category: string
          created_at: string
          description: string
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          features: string[] | null
          id: string
          image_url: string
          price: number
          title: string
          views: number | null
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          features?: string[] | null
          id?: string
          image_url: string
          price: number
          title: string
          views?: number | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          features?: string[] | null
          id?: string
          image_url?: string
          price?: number
          title?: string
          views?: number | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string
          created_at: string
          description: string
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          id: string
          image_url: string
          is_featured: boolean
          project_url: string | null
          tags: string[] | null
          title: string
          views: number | null
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          image_url: string
          is_featured?: boolean
          project_url?: string | null
          tags?: string[] | null
          title: string
          views?: number | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          image_url?: string
          is_featured?: boolean
          project_url?: string | null
          tags?: string[] | null
          title?: string
          views?: number | null
        }
        Relationships: []
      }
      search_queries: {
        Row: {
          feedback: string | null
          id: string
          query: string
          results: Json | null
          timestamp: string
          user_id: string | null
        }
        Insert: {
          feedback?: string | null
          id?: string
          query: string
          results?: Json | null
          timestamp?: string
          user_id?: string | null
        }
        Update: {
          feedback?: string | null
          id?: string
          query?: string
          results?: Json | null
          timestamp?: string
          user_id?: string | null
        }
        Relationships: []
      }
      team_up: {
        Row: {
          created_at: string
          description: string
          difficulty: string
          duration: string | null
          id: string
          image_url: string | null
          open_positions: number | null
          skills_required: string[] | null
          team_size: number | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          difficulty?: string
          duration?: string | null
          id?: string
          image_url?: string | null
          open_positions?: number | null
          skills_required?: string[] | null
          team_size?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          difficulty?: string
          duration?: string | null
          id?: string
          image_url?: string | null
          open_positions?: number | null
          skills_required?: string[] | null
          team_size?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      tutorials: {
        Row: {
          category: string
          content: string
          created_at: string
          description: string
          difficulty: string
          id: string
          image_url: string | null
          tags: string[] | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          description: string
          difficulty?: string
          id?: string
          image_url?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          description?: string
          difficulty?: string
          id?: string
          image_url?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      save_search_query: {
        Args: {
          query_text: string
        }
        Returns: undefined
      }
    }
    Enums: {
      difficulty_level: "beginner" | "intermediate" | "advanced"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
