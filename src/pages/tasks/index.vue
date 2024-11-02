<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';
import type { Tables } from '../../../database/types'
import { ref } from 'vue'

const tasksData = ref<Tables<'tasks'>[] | null>( null );

( async () => {
  const { data, error } = await supabase
    .from( 'tasks')
    .select();

  if (error) console.error(error);
  tasksData.value = data;

  console.log( tasksData.value[0]);
})();
</script>

<template>
  <div>
    <h1>Tasks Page</h1>
    <RouterLink to="/">Back to Homepage</RouterLink>

    <h2 v-for="task in tasksData" :key="task.id">
      <RouterLink  :to="{ name: '/tasks/[project_id]', params: { project_id: task.project_id } }">
        {{ task.name }}
      </RouterLink>
    </h2>
  </div>
</template>
