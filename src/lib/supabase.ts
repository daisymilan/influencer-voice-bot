
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://xgzbjcydvymjrligdfxi.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnemJqY3lkdnltanJsaWdkZnhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0ODA4MTgsImV4cCI6MjA1NDA1NjgxOH0.iacpOHhGFxhYk_88oOHLDKmJObTNyjvs1tpuYZRbN0w";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL:', supabaseUrl);
  console.error('Supabase Anon Key:', supabaseAnonKey);
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
