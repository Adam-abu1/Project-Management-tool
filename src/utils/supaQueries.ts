import { supabase } from "@/lib/supabaseClient";
import type { QueryData } from '@supabase/supabase-js';

export const taskWithProjectsQuery = supabase.from('tasks')
  .select(`
    *,
    projects(
      id,
      name,
      slug
    )`
  );

export type TaskWithProjects = QueryData<typeof taskWithProjectsQuery>;


export const projectsQuery = supabase.from( 'projects').select();
export type Projects = QueryData<typeof projectsQuery>;

export const projectQuery = ( slug: string ) => supabase.from( 'projects' ).select( `
  *,
  tasks (
    id,
    name,
    status,
    due_date
  )
`)
  .eq( 'slug', slug )
  .single();

export type Project = QueryData<ReturnType<typeof projectQuery>>
