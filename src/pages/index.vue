<script setup lang="ts">

usePageStore().pageData.title = 'Homepage';
</script>

<template>
  <Suspense>
    <main>
      <h1>Welcome to the Home View</h1>
    </main>
    <template #fallback>
      Loading....
    </template>
  </Suspense>
</template>
