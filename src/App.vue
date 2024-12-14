<script setup lang='ts'>
const errorStore = useErrorStore();

onErrorCaptured(( error ) => {
  errorStore.setError( { error } );
  return false;
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
