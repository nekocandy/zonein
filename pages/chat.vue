<script setup lang="ts">
const message = ref('')
</script>

<template>
  <div class="h-full w-full">
    <div class="h-full w-full grid grid-cols-12 gap-6">
      <div class="col-span-3 overflow-y-auto" />

      <div class="col-span-6 w-full h-full bg-[#222c56] p-6 flex flex-col gap-4">
        <div class="bg-white rounded-xl h-full">
          /
        </div>

        <div class="flex items-center gap-4">
          <input v-model="message" class="flex-1 w-full bg-white text-black rounded-xl py-2 px-4" placeholder="// enter message" type="text">
          <button>
            <Icon name="tabler:send" class="h-6 w-6" />
          </button>
        </div>
      </div>

      <div class="col-span-3" />
    </div>
  </div>
</template>

<style scoped>

</style>
