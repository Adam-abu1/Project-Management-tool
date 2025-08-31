import { projectsQuery, projectQuery, updateProjectQuery } from '@/utils/supaQueries';
import { useMemoize} from '@vueuse/core';
import type { Projects, Project } from '@/utils/supaQueries';

export const useProjectsStore = defineStore('projects-store', () => {
  const projectsData = ref<Projects | null>();
  const project = ref<Project | null>();

  const loadProjects = useMemoize(
    async (slug: string) => await projectsQuery
  );

  const loadProject = useMemoize(
    async (slug: string) => await projectQuery(slug)
  );

  interface ValidateCacheParams {
    ref: typeof projectsData | typeof project;
    query: typeof projectsQuery | typeof projectQuery;
    key: string;
    loaderFn: typeof loadProjects | typeof loadProject;
  }

  const validateCache = ({
    ref,
    query,
    key,
    loaderFn
  }: ValidateCacheParams ) => {
    if (ref.value) {
      const finalQuery = typeof query === 'function' ? query(key) : query;
      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(data) === JSON.stringify(ref.value)) {
          return
        } else {
          loaderFn.delete(key);
          if (!error && data) ref.value = data
        }
      });
    }
  }
  const getProject = async ( slug: string) => {
    project.value = null
    const { data, error, status } = await loadProject( slug );

    if ( error ) useErrorStore().setError({ error, customCode: status })

    if ( data ) project.value = data;

    validateCache({
      ref: project,
      query: projectQuery,
      key: slug,
      loaderFn: loadProject
    });
  };

  const getProjects = async () => {
    projectsData.value = null
    const { data, error, status } = await loadProjects('projects');

    if (error) useErrorStore().setError({ error, customCode: status })
    if (data) projectsData.value = data;

    validateCache({
      ref: projectsData,
      query: projectsQuery,
      key: 'projects',
      loaderFn: loadProjects
    });
  };

  const updateProject = async () => {
    if (!project.value) return

    const { tasks, id, ...projectProperties } = project.value;

    await updateProjectQuery(projectProperties, project.value.id);
  }
  return {
    project,
    getProject,
    projectsData,
    getProjects,
    updateProject
  }
});
