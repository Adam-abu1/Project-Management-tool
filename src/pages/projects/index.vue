<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';
import type { Tables } from '../../../database/types'
import { onBeforeMount, ref } from 'vue'

const projectsData = ref<Tables<'projects'>[] | null>( null );

( async () => {
  const { data, error } = await supabase
    .from( 'projects')
    .select();

  if (error) console.error(error);
  projectsData.value = data;

  console.log( projectsData.value[0]);
})();
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
  </div>
</template>
