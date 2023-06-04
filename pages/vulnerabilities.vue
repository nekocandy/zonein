<script setup lang="ts">
import type { HederaPostWithTxnId } from '~/utils/types'

const posts = ref<HederaPostWithTxnId[]>([])
const isPostsLoading = ref(true)

async function fetchPosts() {
  isPostsLoading.value = true
  const response = await useFetch('/api/hedera/posts')

  if (!response.data.value)
    await response.refresh()

  // @ts-expect-error serialized shit
  posts.value = response.data.value!
  isPostsLoading.value = false
}

await fetchPosts()
</script>

<template>
  <div class="h-full w-full">
    <div class="h-full w-full grid grid-cols-12 gap-6">
      <div class="col-span-3 overflow-y-auto">
        <VulnerabilityUserInfo />
      </div>

      <div class="col-span-6 w-full h-full overflow-y-auto space-y-4">
        <div v-if="isPostsLoading" class="flex justify-center items-center gap-2">
          <Icon name="tabler:circle-dotted" class="animate-spin text-zinc-600 h-8 w-8" />
          <span class="font-bold text-zinc-500">Loading data from Hedera!</span>
        </div>
        <div v-else-if="!isPostsLoading && !posts.length" class="flex justify-center items-center gap-2">
          <Icon name="tabler:medical-cross-off" class="text-zinc-600 h-8 w-8" />
          <span class="font-bold text-zinc-500">No posts added, be the first one!</span>
        </div>
        <div v-else class="h-full w-full space-y-4" />
      </div>

      <div />
    </div>
  </div>
</template>

<style scoped>

</style>
