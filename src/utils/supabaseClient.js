import { createClient } from '@supabase/supabase-js';
import { Supabase_key, Supabase_url } from './Config';


const supabaseUrl = Supabase_url;
const supabaseAnonKey = Supabase_key; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
