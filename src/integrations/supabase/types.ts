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
      affiliate_links: {
        Row: {
          affiliate_link: string
          created_at: string | null
          id: string
          influencer_id: string | null
          product_name: string
        }
        Insert: {
          affiliate_link: string
          created_at?: string | null
          id?: string
          influencer_id?: string | null
          product_name: string
        }
        Update: {
          affiliate_link?: string
          created_at?: string | null
          id?: string
          influencer_id?: string | null
          product_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_links_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_data"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "affiliate_links_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencers"
            referencedColumns: ["id"]
          },
        ]
      }
      chatbot_analytics: {
        Row: {
          created_at: string | null
          id: string
          influencer_id: string | null
          update_interval: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          influencer_id?: string | null
          update_interval: string
        }
        Update: {
          created_at?: string | null
          id?: string
          influencer_id?: string | null
          update_interval?: string
        }
        Relationships: [
          {
            foreignKeyName: "chatbot_analytics_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_data"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "chatbot_analytics_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencers"
            referencedColumns: ["id"]
          },
        ]
      }
      chatbot_config: {
        Row: {
          created_at: string | null
          id: string
          influencer_id: string | null
          spotify_client_id: string | null
          spotify_client_secret: string | null
          supabase_anon_key: string
          supabase_url: string
          twitter_api_key: string | null
          twitter_api_secret: string | null
          youtube_api_key: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          influencer_id?: string | null
          spotify_client_id?: string | null
          spotify_client_secret?: string | null
          supabase_anon_key: string
          supabase_url: string
          twitter_api_key?: string | null
          twitter_api_secret?: string | null
          youtube_api_key?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          influencer_id?: string | null
          spotify_client_id?: string | null
          spotify_client_secret?: string | null
          supabase_anon_key?: string
          supabase_url?: string
          twitter_api_key?: string | null
          twitter_api_secret?: string | null
          youtube_api_key?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chatbot_config_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: true
            referencedRelation: "influencer_data"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "chatbot_config_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: true
            referencedRelation: "influencers"
            referencedColumns: ["id"]
          },
        ]
      }
      content_chunks: {
        Row: {
          chunk_text: string
          content_vector: unknown | null
          created_at: string | null
          full_content: string | null
          id: string
          influencer_id: string | null
          video_id: string
          video_title: string
        }
        Insert: {
          chunk_text: string
          content_vector?: unknown | null
          created_at?: string | null
          full_content?: string | null
          id?: string
          influencer_id?: string | null
          video_id: string
          video_title: string
        }
        Update: {
          chunk_text?: string
          content_vector?: unknown | null
          created_at?: string | null
          full_content?: string | null
          id?: string
          influencer_id?: string | null
          video_id?: string
          video_title?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_chunks_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_data"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "content_chunks_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencers"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_logs: {
        Row: {
          bot_response: string
          created_at: string | null
          id: string
          influencer_id: string | null
          user_query: string
        }
        Insert: {
          bot_response: string
          created_at?: string | null
          id?: string
          influencer_id?: string | null
          user_query: string
        }
        Update: {
          bot_response?: string
          created_at?: string | null
          id?: string
          influencer_id?: string | null
          user_query?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_logs_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_faqs: {
        Row: {
          answer: string
          created_at: string | null
          id: string
          influencer_id: string | null
          question: string
          updated_at: string | null
        }
        Insert: {
          answer: string
          created_at?: string | null
          id?: string
          influencer_id?: string | null
          question: string
          updated_at?: string | null
        }
        Update: {
          answer?: string
          created_at?: string | null
          id?: string
          influencer_id?: string | null
          question?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "custom_faqs_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      influencer_profiles: {
        Row: {
          chatbot_tone: string | null
          chatbot_webhook_url: string | null
          created_at: string | null
          email: string
          google_sheets_url: string | null
          id: string
          ingestion_webhook_url: string | null
          name: string
          spotify_podcast_id: string | null
          twitter_handle: string | null
          updated_at: string | null
          youtube_channel_id: string | null
        }
        Insert: {
          chatbot_tone?: string | null
          chatbot_webhook_url?: string | null
          created_at?: string | null
          email: string
          google_sheets_url?: string | null
          id?: string
          ingestion_webhook_url?: string | null
          name: string
          spotify_podcast_id?: string | null
          twitter_handle?: string | null
          updated_at?: string | null
          youtube_channel_id?: string | null
        }
        Update: {
          chatbot_tone?: string | null
          chatbot_webhook_url?: string | null
          created_at?: string | null
          email?: string
          google_sheets_url?: string | null
          id?: string
          ingestion_webhook_url?: string | null
          name?: string
          spotify_podcast_id?: string | null
          twitter_handle?: string | null
          updated_at?: string | null
          youtube_channel_id?: string | null
        }
        Relationships: []
      }
      influencers: {
        Row: {
          chatbot_name: string
          created_at: string | null
          id: string
          influencer_name: string
          primary_color: string | null
          secondary_color: string | null
        }
        Insert: {
          chatbot_name: string
          created_at?: string | null
          id?: string
          influencer_name: string
          primary_color?: string | null
          secondary_color?: string | null
        }
        Update: {
          chatbot_name?: string
          created_at?: string | null
          id?: string
          influencer_name?: string
          primary_color?: string | null
          secondary_color?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          is_admin: boolean | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          is_admin?: boolean | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      webhook_configs: {
        Row: {
          created_at: string | null
          id: string
          influencer_id: string | null
          updated_at: string | null
          webhook_type: string
          webhook_url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          influencer_id?: string | null
          updated_at?: string | null
          webhook_type: string
          webhook_url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          influencer_id?: string | null
          updated_at?: string | null
          webhook_type?: string
          webhook_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "webhook_configs_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      influencer_data: {
        Row: {
          affiliate_link: string | null
          chatbot_name: string | null
          chunk_text: string | null
          influencer_id: string | null
          influencer_name: string | null
          primary_color: string | null
          product_name: string | null
          secondary_color: string | null
          supabase_anon_key: string | null
          supabase_url: string | null
          update_interval: string | null
          video_id: string | null
          video_title: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      binary_quantize:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      bytea_to_text: {
        Args: {
          data: string
        }
        Returns: string
      }
      get_embedding: {
        Args: {
          input_text: string
        }
        Returns: string
      }
      gtrgm_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_options: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      gtrgm_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_avg: {
        Args: {
          "": number[]
        }
        Returns: unknown
      }
      halfvec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      hnsw_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      http: {
        Args: {
          request: Database["public"]["CompositeTypes"]["http_request"]
        }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_delete:
        | {
            Args: {
              uri: string
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
        | {
            Args: {
              uri: string
              content: string
              content_type: string
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
      http_get:
        | {
            Args: {
              uri: string
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
        | {
            Args: {
              uri: string
              data: Json
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
      http_head: {
        Args: {
          uri: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_header: {
        Args: {
          field: string
          value: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
      }
      http_list_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: {
          uri: string
          content: string
          content_type: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_post:
        | {
            Args: {
              uri: string
              content: string
              content_type: string
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
        | {
            Args: {
              uri: string
              data: Json
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
      http_put: {
        Args: {
          uri: string
          content: string
          content_type: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_reset_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      http_set_curlopt: {
        Args: {
          curlopt: string
          value: string
        }
        Returns: boolean
      }
      ivfflat_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      l2_norm:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      l2_normalize:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      search_content_chunks: {
        Args: {
          search_query: string
        }
        Returns: {
          chunk_id: string
          influencer_id: string
          video_id: string
          video_title: string
          chunk_text: string
          similarity: number
        }[]
      }
      set_limit: {
        Args: {
          "": number
        }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: {
          "": string
        }
        Returns: string[]
      }
      sparsevec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      sparsevec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      text_to_bytea: {
        Args: {
          data: string
        }
        Returns: string
      }
      urlencode:
        | {
            Args: {
              data: Json
            }
            Returns: string
          }
        | {
            Args: {
              string: string
            }
            Returns: string
          }
        | {
            Args: {
              string: string
            }
            Returns: string
          }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown | null
        uri: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content: string | null
      }
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
