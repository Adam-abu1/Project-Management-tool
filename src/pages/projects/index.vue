<script setup lang="ts">
import { usePageStore } from '@/stores/page';
import { columns } from '@/utils/tableColumns/projectsColumns';

usePageStore().pageData.title = ' My Projects';

const projectsLoader = useProjectsStore();
const { projectsData } = storeToRefs(projectsLoader);
const { getProjects } = projectsLoader;
await getProjects();

const  { getGroupedCollabs, groupedCollabs } = useCollabs();
getGroupedCollabs(projectsData.value ?? []);
const columnsWithCollabs = columns(groupedCollabs);
</script>

<template>
  <div>
    <RouterLink to="/">Back to Homepage</RouterLink>

    <DataTable v-if="projectsData" :columns="columnsWithCollabs" :data="projectsData" />
  </div>
</template>
