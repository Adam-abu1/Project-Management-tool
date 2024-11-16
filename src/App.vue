<script  lang="ts">


</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Suspense v-if="Component" :timeout="0">
      <AuthLayout>
        <Component :is="Component" :key="route.name" ></Component>
        <template #fallback>
          <div>
            Loading....
          </div>
        </template>
      </AuthLayout>
    </Suspense>
  </RouterView>
</template>
