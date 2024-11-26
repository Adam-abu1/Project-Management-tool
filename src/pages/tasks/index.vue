<script setup lang="ts">
import DataTable from '@/components/ui/DataTable.vue';
import { TaskWithProjects, taskWithProjectsQuery } from '@/utils/supaQueries';
import { columns } from '@/utils/tableColumns/taskColumns';

usePageStore().pageData.title = 'My Tasks';

const tasks = ref<TaskWithProjects | null>(null);

( async () => {
  const { data, error } = await taskWithProjectsQuery;
  if (error) console.error(error);
  tasks.value = data;
})();
</script>

<template>
  <div>
    <RouterLink to="/">Back to Homepage</RouterLink>

    <DataTable v-if="tasks" :columns="columns" :data="tasks" />
  </div>
</template>
