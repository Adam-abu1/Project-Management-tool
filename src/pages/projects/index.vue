<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';
import type { Tables } from '../../../database/types';
import { h, ref } from 'vue';
import type { ColumnDef } from '@tanstack/vue-table';
import DataTable from '@/components/ui/DataTable.vue';

const projectsData = ref<Tables<'projects'>[] | null>( null );

( async () => {
  const { data, error } = await supabase
    .from( 'projects')
    .select();

  if (error) console.error(error);
  projectsData.value = data;

  console.log( projectsData.value[0]);
})();

const columns: ColumnDef<Tables<'projects'>>[] = [
  {
    accessorKey: 'name',
    header: () => h( 'div', { class: 'text-left' }, 'Name' ),
    cell: ( { row } ) => h( 'div', { class: 'text-left font-medium' }, row.getValue( 'name' ) )
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('status'))
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
    <h1>Projects Page</h1>
    <RouterLink to="/">Back to Homepage</RouterLink>

    <h2 v-for="project in projectsData" :key="project.id">
      <RouterLink  :to="{ name: '/projects/[slug]', params: { slug: project.slug } }">
        {{ project.name }}
      </RouterLink>
    </h2>

    <DataTable v-if="projectsData" :columns="columns" :data="projectsData" />
  </div>
</template>
