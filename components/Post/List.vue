<script setup lang="ts">
import type { HederaPostWithTxnId } from '~/utils/types'

const props = defineProps<{
  posts: HederaPostWithTxnId[]
}>()

const { $router } = useNuxtApp()
</script>

<template>
  <div v-for="post in $props.posts" :key="post.id" class="w-full bg-[#222c56] rounded-xl flex flex-col gap-4 px-6 py-6">
    <!-- avatar -->
    <div class="flex items-center">
      <div class="h-12 w-12 bg-[#d0d1fb] rounded-full" />
      <div class="bg-[#d0d1fb] -ml-2 pl-3 pr-4 text-sm py-1">
        ClassifiedUsername
      </div>
    </div>

    <!-- image -->
    <div class="flex flex-col gap-4">
      <PostImage :file-id="post.image" />

      <span class="text-xs text-white text-center">
        ( the image may look small, but hedera has limits on size )
      </span>
    </div>

    <div class="flex items-center gap-2">
      <Icon name="tabler:heart" class="h-8 w-8" color="#f63b3b" />

      <a target="_blank" :href="`https://hashscan.io/testnet/transaction/${post.transactionId}`" class="bg-white py-1 px-2 rounded-full">
        <Icon class="h-6 w-6" name="tabler:scan-eye" color="#E546D6" />
      </a>

      <div class="flex-1 w-full bg-[#01071f] rounded-xl py-2 px-4 text-white">
        <span v-if="post.caption">
          {{ post.caption }}
        </span>
        <span v-else class="text-zinc-500">// no caption</span>
      </div>

      <div>
        <div
          v-if="post.type === 'photo'"
          class="cursor-pointer w-full px-4 py-2 rounded-full text-white border-2 border-[#4ece6a] text-center text-sm"
          :class="{
            'bg-[#4ece6a]': post.type === 'photo',
          }"
        >
          Photo
        </div>

        <div
          v-else
          class="cursor-pointer w-full px-4 py-2 rounded-full text-white border-2 border-[#f8ac3b] text-center text-sm"
          :class="{
            'bg-[#f8ac3b]': post.type === 'certificate',
          }"
        >
          Certificate
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
