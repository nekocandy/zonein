<script setup lang="ts">
// post, blog, resume Generator, hacker news,  global chat, Vulnerabilities
const paths = [
  {
    name: 'Post',
    path: '/post',
    icon: 'tabler:photo',
  },
  {
    name: 'Blog',
    path: '/blog',
    icon: 'tabler:book',
  },
  {
    name: 'Resume Generator',
    path: '/resume',
    icon: 'tabler:address-book',
  },
  {
    name: 'Hacker News',
    path: '/hacker-news',
    icon: 'tabler:news',
  },
  {
    name: 'Global Chat',
    path: '/chat',
    icon: 'tabler:gps',
  },
  {
    name: 'Vulnerabilities',
    path: '/vulnerabilities',
    icon: 'tabler:world-exclamation',
  },
]
</script>

<template>
  <div class="bg-[#4548af] py-4">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <div class="flex gap-4 items-center">
        <div
          class="h-10 w-10 mr-2 bg-[#d0d1fb] rounded-full bg-center bg-cover" :style="{
            backgroundImage: 'url(/favicon.png)',
          }"
        />

        <div>
          <Icon class="h-8 w-8 text-white" name="tabler:user-circle" />
        </div>
        <div class="p-3 bg-[#242798] rounded-full flex items-center justify-center">
          <Icon class="h-5 w-5 text-white" name="tabler:transfer-out" />
        </div>
      </div>

      <div>
        <input class="px-4 py-2 text-md focus:outline-none bg-[#d0d1fb] rounded-full text-center placeholder-text-[#898BC7]" placeholder="Search" type="text">
      </div>

      <div>
        <div class="flex items-center gap-6">
          <NuxtLink
            v-for="path in paths" :key="path.path" :href="path.path" :class="{
              'bg-[#d0d1fb] p-2 rounded-full': $route.path.startsWith(path.path),
            }"
          >
            <Icon class="h-8 w-8 text-white" :name="path.icon" :class="{ 'text-[#222C56]': $route.path.startsWith(path.path) }" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
