<route lang="yaml">
meta:
  layout: app
</route>

<script setup lang="ts">
const auth = useAuthStore()
const router = useRouter()
await auth.reAuthenticate()
  
const logout = async () => {
  await authStore.logout()
  router.push('/')
}
</script>

<template>  
<div class="app-layout h-full">
  <AppNav />
  <DaisyFlex col items-center justify-center class="h-full gap-2 text-center -mt-16 pt-16">
    <DaisyText size="7xl">App Home</DaisyText>
    <DaisyText size="4xl">You have arrived!</DaisyText>
    <DaisyText class="mt-5">You logged in like a boss.</DaisyText>
    <RouterLink to="/">
      <DaisyButton primary>Return to Home</DaisyButton>
    </RouterLink>
  </DaisyFlex>
</div>
</template>
