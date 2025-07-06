<script setup lang="ts">
interface LinkProps {
  title: string;
  to?: string;
  icon: string;
}
defineProps<{
  links: LinkProps[];
}>();

const emit = defineEmits<{
  actionClicked: [string]
}>()

const emitActionClicked = (linkTitle: string) => {
  emit('actionClicked', linkTitle)
}
</script>

<template>
  <template v-for="link in links" :key="link.title">
    <RouterLink
      exactActiveClass="text-primary bg-muted"
      v-if="link.to"
      :to="link.to"
      class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </RouterLink>

    <div v-else class='nav-link cursor-pointer' @click="emitActionClicked(link.title)">
          <iconify-icon :icon="link.icon"></iconify-icon>
          <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </div>
  </template>


</template>

<style scoped>
.nav-link {
  @apply flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground
}
.router-link-active {
  background-color: black;
}
</style>
