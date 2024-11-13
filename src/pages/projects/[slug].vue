<script setup lang="ts">

const route = useRoute()
</script>

<template>
  <h1>This is the data about the route</h1>
  <h3>Project Route: {{ route.params.slug }}</h3>
</template>
