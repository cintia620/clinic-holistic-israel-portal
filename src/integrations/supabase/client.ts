// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xdgkectogpfoobjmdjrg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkZ2tlY3RvZ3Bmb29iam1kanJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3Njg4MjYsImV4cCI6MjA2MjM0NDgyNn0.ajUvoSULOlPJ-RNl5jM8XnPPF8bey9SnSQpEpPOtwH0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);