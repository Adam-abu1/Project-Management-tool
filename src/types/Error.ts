import type { PostrgrestError } from '@supabase/supabase-js';

export interface CustomError extends Error {
  customCode?: number
}

export interface ExtendedPostgresError extends PostrgrestError {
  statusCode?: number
}
