<script setup lang="ts">
import type { HederaPostWithTxnId } from '~/utils/types'

const posts = ref<HederaPostWithTxnId[]>([])
const isPostsLoading = ref(true)

async function fetchPosts() {
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
        <PostUpload />
      </div>

      <div class="col-span-6 w-full h-full overflow-y-auto space-y-4">
        <PostList :posts="posts" />
      </div>

      <div />
    </div>
  </div>
</template>

<style scoped>

</style>
