export const usePageStore = defineStore('page-store', () => {
  const pageData = ref({
    title: '',
  });

  return {
    pageData,
  };
});

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePageStore, import.meta.hot));
}
