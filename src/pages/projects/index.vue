<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';
import type { Tables } from '../../../database/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { RouterLink } from 'vue-router';import { usePageStore } from '@/stores/page';

usePageStore().pageData.title = ' My Projects';

const projectsData = ref<Tables<'projects'>[] | null>( null );

( async () => {
  const { data, error } = await supabase
    .from( 'projects')
    .select();

  if (error) console.error(error);
  projectsData.value = data;
})();

const columns: ColumnDef<Tables<'projects'>>[] = [
  {
    accessorKey: 'name',
    header: () => h( 'div', { class: 'text-left' }, 'Name' ),
    cell: ( { row } ) => h( RouterLink, { to: `projects/${row.original.slug}`, class: 'text-left font-medium hover:bg-muted block w-full' }, () => row.getValue( 'name' ) )
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, () => row.getValue('status'))
    }
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium' },
        JSON.stringify(row.getValue('collaborators'))
      )
    }
  }
]
</script>

<template>
  <div>
    <RouterLink to="/">Back to Homepage</RouterLink>

    <DataTable v-if="projectsData" :columns="columns" :data="projectsData" />
  </div>
</template>
