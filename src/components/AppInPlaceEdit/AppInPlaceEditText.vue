<script setup lang="ts">
const value = defineModel();
defineEmits(['commit']);
</script>

<template>
  <input
    type='text'
    class="w-full bg-gray-800 bg-transparent focus:outline-none focus:border-none focus:bg-gray-800 focus:rounded-md"
    v-model="value"
    @blur="$emit('commit')"
    @keyup.enter="($event.target as HTMLInputElement).blur()"
  >
</template>
