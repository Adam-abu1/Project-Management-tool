<script setup lang="ts">
import { useErrorStore } from '@/stores/error';

useErrorStore().setError( {
  error: 'Page not foubnd'
});
</script>

<template>
  <div></div>
</template>
