<script setup lang='ts'>

import { useAuthStore } from '@/stores/auth';

const errorStore = useErrorStore();

onErrorCaptured(( error ) => {
  errorStore.setError( { error } );
  return false;
});

onMounted(() => {
  useAuthStore().trackAuthChanges()
});
</script>

<template>
  <AuthLayout>
    <AppErrorPage v-if="errorStore.activeError" />

    <RouterView v-else v-slot='{ Component, route }'>
      <Suspense v-if='Component' :timeout='0'>
        <Component :is='Component' :key='route.name'></Component>
        <template #fallback>
          <div>
            Loading....
          </div>
        </template>

      </Suspense>
    </RouterView>
  </AuthLayout>
</template>
