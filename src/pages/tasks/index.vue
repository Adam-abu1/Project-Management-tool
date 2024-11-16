<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';
import type { Tables } from '../../../database/types';
import type { ColumnDef } from '@tanstack/vue-table';
import DataTable from '@/components/ui/DataTable.vue';
import { RouterLink } from 'vue-router';import { usePageStore } from '@/stores/page';

usePageStore().pageData.title = 'My Tasks';

const tasks = ref<Tables<'tasks'>[] | null>(null);


( async () => {
  const { data, error } = await supabase
    .from( 'tasks')
    .select(`
    *,
    projects(
      id,
      name,
      slug
    )`
    );

  if (error) console.error(error);
  tasks.value = data;

  console.log( 'sdfsf',data);
})();


const columns: ColumnDef<Tables<'tasks'>>[] = [
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
    cell: ({ row }) => h( RouterLink, {
      to: `projects/${ row.original.projects.slug }`,
      class: 'text-left font-medium hover:bg-muted block w-full' },
      () => row.getValue( 'projects').name )
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      console.log(row.getValue('collaborators') )
      return h(
        'div',
        { class: 'text-left font-medium' },
        JSON.stringify( row.getValue('collaborators') )
      )
    }
  }
]
</script>

<template>
  <div>
    <RouterLink to="/">Back to Homepage</RouterLink>

    <DataTable v-if="tasks" :columns="columns" :data="tasks" />
  </div>
</template>
