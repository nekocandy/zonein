<script setup lang="ts">
import type { ChatMessage, ChatMessageWithTxnId } from '~/utils/types'

const message = ref('')
const messages = ref<ChatMessageWithTxnId[]>([])

async function submitMessage() {
  if (!message.value)
    return

  const realm = useRealmApp()
  const { $toast } = useNuxtApp()
  const userId = realm.currentUser?.id

  const messageData: ChatMessage = {
    id: createId(),
    message: message.value,
    userId: userId!,
    fromMe: true,

  }

  const { data } = await useFetch('/api/hedera/chat/add', {
    method: 'PUT',
    body: JSON.stringify(messageData),
  })
  messages.value.push(data.value)
  message.value = ''
  $toast.success(`Transaction ID: <a target="_blank" class="text-[#222c56] underline hover:decoration-double  hover:" href="https://hashscan.io/testnet/transaction/${data.value.transactionId}">${data.value.transactionId}</a>`, {
    duration: 10000,
    pauseOnHover: true,
  })
}
</script>

<template>
  <div class="h-full w-full">
    <div class="h-full w-full grid grid-cols-12 gap-6">
      <div class="col-span-3 overflow-y-auto" />

      <div class="col-span-6 w-full h-full bg-[#222c56] p-6 flex flex-col gap-4">
        <div class="bg-white rounded-xl h-full py-2 overflow-y-auto">
          <div
            v-for="msg in messages" :key="msg.id" class="chat" :class="{
              'chat-start': !msg.fromMe,
              'chat-end': msg.fromMe,
            }"
          >
            <div class="chat-bubble">
              {{ msg.message }}
            </div>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <input v-model="message" class="flex-1 w-full bg-white text-black rounded-xl py-2 px-4" placeholder="// enter message" type="text">
          <button @click="submitMessage">
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
