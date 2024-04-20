// src/app.d.ts

import { SupabaseClient, Session, type User } from '@supabase/supabase-js'
import type { Database } from './types/supabase';

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient<Database>
      safeGetSession(): Promise<{ session: Session | null; user: User | null }>
    }
    interface PageData {
      session: Session | null
      user: User | null
    }
    // interface Error {}
    // interface Platform {}
  }
}
