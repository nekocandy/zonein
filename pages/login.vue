<script setup lang="ts">
definePageMeta({
  layout: 'login',
})
</script>

<template>
  <div class="h-full w-full flex flex-col justify-end overflow-y-auto">
    <div class="relative max-w-7xl bg-[#4548af] mx-auto w-full rounded-t-lg py-12 px-12 flex flex-col gap-8">
      <div class="absolute top-0 left-0 right-0 w-full flex justify-center -translate-y-1/2">
        <div class="rounded-full h-24 w-24 bg-white text-center">
          <span class="text-black">Logo</span>
        </div>
      </div>

      <LoginAuth />
    </div>
  </div>
</template>

<style scoped>

</style>
