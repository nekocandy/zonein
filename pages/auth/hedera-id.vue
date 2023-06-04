<script setup lang="ts">
definePageMeta({
  layout: 'login',
})

const isFetchingFromDatabase = ref(true)
const isLoading = ref(false)
const hederaUserId = ref('')
const name = ref('')

async function createNFTAccount() {
  const realmApp = useRealmApp()
  const { $toast } = useNuxtApp()

  if (!realmApp.currentUser) {
    $toast.error('Please login first')
    navigateTo('/login')
    return
  }

  const { data } = await useFetch('/api/hedera/nft', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: realmApp.currentUser.id,
      name: name.value || 'SomeNameBecauseInitialDoesn\'tExist',
    }),
  })

  $toast.success(`Created NFT pack for user! ID: <a target="_blank" class="text-[#222c56] underline hover:decoration-double  hover:" href="https://hashscan.io/testnet/token/${data.value?.tokenId}">${data.value?.tokenId}</a>`, {
    duration: 10000,
    pauseOnHover: true,
  })
  return data.value?.tokenId
}

async function fetchFromDatabase() {
  const { $toast } = useNuxtApp()
  const realmApp = useRealmApp()
  const userCollection = useCollection('users')

  if (!realmApp.currentUser) {
    isFetchingFromDatabase.value = false
    $toast.error('Please login first')
    navigateTo('/login')
    return
  }

  const userData = await userCollection.findOne({
    userId: realmApp.currentUser.id,
  })

  if (!userData)
    isFetchingFromDatabase.value = false

  if (userData.hederaUserId)
    navigateTo('/home')
}

async function saveToDatabase() {
  isLoading.value = true
  const { $toast } = useNuxtApp()
  if (!hederaUserId.value) {
    isLoading.value = false
    $toast.error('Please enter your Hedera Account ID')
    return
  }

  const realmApp = useRealmApp()
  const userCollection = useCollection('users')

  if (!realmApp.currentUser) {
    $toast.error('Please login first')
    navigateTo('/login')
    return
  }

  const nftPackId = await createNFTAccount()

  await userCollection.findOneAndUpdate({
    userId: realmApp.currentUser.id,
  }, {
    $set: {
      hederaUserId: hederaUserId.value,
      nftPackId,
      name: name.value,
    },
  }, {
    upsert: true,
  })

  $toast.success('Hedera Account ID saved successfully')
  navigateTo('/home')
}

onMounted(() => {
  const { $toast } = useNuxtApp()
  const realmApp = useRealmApp()

  if (!realmApp.currentUser) {
    $toast.error('Please login first')
    navigateTo('/login')
    return
  }

  fetchFromDatabase()
})
</script>

<template>
  <div class="flex items-center justify-center py-12">
    <div class="max-w-xl w-full bg-[#7e81de] rounded-xl px-12 py-8 flex flex-col gap-6 items-center justify-center">
      <h1 class="text-white text-2xl font-bold">
        Please enter your Hedera Account ID
      </h1>

      <div class="w-4/6 flex flex-col gap-4">
        <input v-model="name" class="w-full bg-[#ededff] placeholder-text-[#AAAACE] focus:outline-none py-2 px-4 rounded-md" placeholder="Enter Your Name" type="text">
        <input v-model="hederaUserId" class="w-full bg-[#ededff] placeholder-text-[#AAAACE] focus:outline-none py-2 px-4 rounded-md" placeholder="Enter Hedera ID" type="text">
      </div>

      <div class="flex flex-col gap-4 items-center w-full  px-12">
        <button class="max-w-3/6 transition-all duration-500 bg-white rounded-full font-bold text-lg py-2 px-2 text-[#2d3487] flex justify-between items-center gap-2" @click="saveToDatabase">
          <div class="rounded-full bg-[#2d3487] p-2 flex items-center justify-center">
            <Icon color="#D0D1FB" name="tabler:asterisk" :class="{ 'animate-spin': isLoading }" />
          </div>
          <div>
            Associate
          </div>

          <div />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
