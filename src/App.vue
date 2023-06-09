<script setup lang="ts">
useHead({
  title: 'Feathers-Pinia + Vite',
  meta: [
    {
      name: 'description',
      content: 'Feathers-Pinia + Vue + Vite for the perfect Single Page App experience',
    },
  ],
  link: [],
})

</script>

<template>
  <Suspense>
    <RouterView />
    
    <!-- loading state via #fallback slot -->
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
