import type { ColumnDef } from '@tanstack/vue-table';
import type { TaskWithProjects } from '@/utils/supaQueries';
import { RouterLink } from 'vue-router'

export const columns: ColumnDef<TaskWithProjects[0]>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-center' }, 'Name'),
    cell: ({ row }) => h( RouterLink, { to: `tasks/${ row.original.project_id }`, class: 'text-center font-medium hover:bg-muted block w-full' }, () => row.getValue( 'name') )
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('status'))
    }
  },
  {
    accessorKey: 'due_date',
    header: () => h('div', { class: 'text-left' }, 'Due Date'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('due_date'))
    }
  },
  {
    accessorKey: 'projects',
    header: () => h('div', { class: 'text-left' }, 'Project'),
    cell: ({ row }) => {
      return row.original.projects ? h( RouterLink, {
          to: `projects/${ row.original.projects.slug }`,
          class: 'text-left font-medium hover:bg-muted block w-full' },
        () => row.original.projects.name ) : '';
    }
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => h(
      'div',
      { class: 'text-left font-medium' },
      JSON.stringify( row.getValue('collaborators') )
    )
  }
]
