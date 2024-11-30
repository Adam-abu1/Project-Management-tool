<script setup lang="ts">
import { useErrorStore } from '@/stores/error';

useErrorStore().setError( {
  error: 'Page not found',
  customCode: 404
} );
</script>

<template>
  <div></div>
</template>
