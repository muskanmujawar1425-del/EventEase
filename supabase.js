// ==========================================
// EventEase - Supabase Configuration
// ==========================================

const SUPABASE_URL = "https://kgmwlufrixgyrzyrxeku.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_bQ5LDAmHHONHZG8yi0urDw_be2QGxDr";

// Create the EventEase Supabase client
const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);