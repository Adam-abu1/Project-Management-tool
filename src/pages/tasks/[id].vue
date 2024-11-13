<script setup lang="ts">

const route = useRoute()
</script>

<template>
  <h1>This is the data about the task</h1>
  <h3>Task Route: {{ route.params.project_id }}</h3>
</template>
