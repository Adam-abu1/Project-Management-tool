import { projectsQuery } from '@/utils/supaQueries';
import { useMemoize} from '@vueuse/core';
import type { Projects } from '@/utils/supaQueries';

export const useProjectsStore = defineStore('projects-store', () => {
  const projectsData = ref<Projects>([]);
  const loadProjects = useMemoize(
    async (key: string) => await projectsQuery
  );

  const validateCache = () => {
    if (projectsData.value?.length) {
      projectsQuery.then(({ data, error }) => {
        if (JSON.stringify(data) === JSON.stringify(projectsData.value)) {
          return
        } else {
          loadProjects.delete('projects');
          if (!error && data) projectsData.value = data
        }
      });
    }
  }

  const getProjects = async () => {

    const { data, error, status } = await loadProjects('projects');

    if (error) useErrorStore().setError({ error, customCode: status })
    if (data) projectsData.value = data;

    validateCache();
  };

  return {
    projectsData,
    getProjects
  }
});
