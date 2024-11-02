<script setup lang="ts">
</script>

<template>
  <Suspense>
    <main>
      <h1>Welcome to the Home View</h1>
      <RouterLink  :to="{ name: '/projects/[slug]', params: { slug: 1 } }"
      >Go to project 1</RouterLink>
    </main>
    <template #fallback>
      Loading....
    </template>
  </Suspense>
</template>
