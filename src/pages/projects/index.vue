<script setup lang="ts">
import { usePageStore } from '@/stores/page';
import { Projects, projectsQuery } from '@/utils/supaQueries';
import { columns } from '@/utils/tableColumns/projectsColumns';

usePageStore().pageData.title = ' My Projects';

const projectsData = ref<Projects | null>( null );

const getProjects = async () => {
  const { data, error, status } = await projectsQuery

  if (error) useErrorStore().setError({ error, customCode: status })
  projectsData.value = data;
  console.log(projectsData.value)
};

await getProjects();
</script>

<template>
  <div>
    <RouterLink to="/">Back to Homepage</RouterLink>

    <DataTable v-if="projectsData" :columns="columns" :data="projectsData" />
  </div>
</template>
