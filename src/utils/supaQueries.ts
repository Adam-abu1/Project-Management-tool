import { supabase } from "@/lib/supabaseClient";
import type { QueryData } from '@supabase/supabase-js';

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

export const updateProjectQuery = (updatedProject = {}, id: number) => supabase.from( 'projects' )
  .update( updatedProject ).eq( 'id', id );

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

export const taskQueryWithProject = (id: string ) => supabase.from( 'tasks' ).select( `
  *,
    projects(
      id,
      name,
      slug
    )`
)
  .eq( 'id', id )
  .single();

export type Task = QueryData<ReturnType<typeof taskWithProjectsQuery>>;


export const profileQuery = ({column, value }: {column: string, value: string } ) => {
  return supabase.from( 'profiles' ).select().eq( column, value ).single();
}


export const groupedProfilesQuery = (userIds: string[]) => {
  return supabase.from( 'profiles' )
    .select( 'username, avatar_url, full_name, id' )
    .in( 'id', userIds );
}

export type Collabs = QueryData<ReturnType<typeof groupedProfilesQuery>>;
