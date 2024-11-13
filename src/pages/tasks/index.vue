<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';
import type { Tables } from '../../../database/types';
import type { ColumnDef } from '@tanstack/vue-table';
import DataTable from '@/components/ui/DataTable.vue';
import { RouterLink } from 'vue-router';

const tasks = ref<Tables<'tasks'>[] | null>(null);


( async () => {
  const { data, error } = await supabase
    .from( 'tasks')
    .select();

  if (error) console.error(error);
  tasks.value = data;

  console.log( 'sdfsf',tasks.value);
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
    accessorKey: 'project_id',
    header: () => h('div', { class: 'text-left' }, 'Project'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('project_id'))
    }
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
    <h1>Tasks Page</h1>
    <RouterLink to="/">Back to Homepage</RouterLink>

    <h2 v-for="task in tasks" :key="task.id">
      <RouterLink  :to="{ name: '/tasks/[id]', params: { id: task.id } }">
        {{ task.name }}
      </RouterLink>
    </h2>

    <DataTable v-if="tasks" :columns="columns" :data="tasks" />
  </div>
</template>
