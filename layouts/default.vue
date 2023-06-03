<script setup lang="ts">

</script>

<template>
  <div class="bg-[#9c9dc8]">
    <div class="h-screen flex flex-col">
      <Navbar />
      <div class="max-w-7xl mx-auto px-2 py-4 flex-1 w-full overflow-y-hidden">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
