<script setup lang="ts">
import { usePageStore } from '@/stores/page';
import { columns } from '@/utils/tableColumns/projectsColumns';

usePageStore().pageData.title = ' My Projects';

const projectsLoader = useProjectsStore();
const { projectsData } = storeToRefs(projectsLoader);
const { getProjects } = projectsLoader;
await getProjects();
</script>

<template>
  <div>
    <RouterLink to="/">Back to Homepage</RouterLink>

    <DataTable v-if="projectsData" :columns="columns" :data="projectsData" />
  </div>
</template>
