<script setup lang="ts">
import { Credentials } from 'realm-web'

const email = ref('')
const password = ref('')
const isLogin = ref(true)
const isLoading = ref(false)

const realmApp = useRealmApp()

async function loginUser() {
  const { $toast } = useNuxtApp()

  isLoading.value = true
  try {
    await realmApp.logIn(Credentials.emailPassword(email.value, password.value))
    $toast.success('User logged in successfully!')
    navigateTo('/auth/hedera-id')
  }
  catch (error: any) {
    $toast.error(`Error creating user - ${error.toString()}`)
  }
  finally {
    isLoading.value = false
  }
}

async function createUser() {
  const { $toast } = useNuxtApp()

  isLoading.value = true
  try {
    await realmApp.emailPasswordAuth.registerUser({ email: email.value, password: password.value })
    $toast.success('User created successfully, check your email for confirmation!')
  }
  catch (error: any) {
    $toast.error(`Error creating user - ${error.toString()}`)
  }
  finally {
    isLoading.value = false
  }
}

async function handleButtonClick() {
  if (isLogin.value)
    await loginUser()

  else
    await createUser()
}

watch(isLogin, () => {
  email.value = ''
  password.value = ''
})
</script>

<template>
  <div class="flex items-center justify-center py-12">
    <div class="max-w-xl w-full bg-[#7e81de] rounded-xl px-12 py-8 flex flex-col gap-6 items-center justify-center">
      <h1 class="text-white text-2xl font-bold">
        Welcome to ZoneIn
      </h1>

      <div class="w-4/6 flex flex-col gap-4">
        <input v-model="email" class="w-full bg-[#ededff] placeholder-text-[#AAAACE] focus:outline-none py-2 px-4 rounded-md" placeholder="Enter email" type="text">

        <input v-model="password" class="w-full bg-[#ededff] placeholder-text-[#AAAACE] focus:outline-none py-2 px-4 rounded-md " placeholder="Enter password" type="password">
      </div>

      <div class="flex flex-col gap-4 items-center w-full  px-12">
        <button class="max-w-3/6 transition-all duration-500 bg-white rounded-full font-bold text-lg py-2 px-2 text-[#2d3487] flex justify-between items-center gap-2" @click="handleButtonClick">
          <div class="rounded-full bg-[#2d3487] p-2 flex items-center justify-center">
            <Icon v-if="isLoading" color="#D0D1FB" name="tabler:circle-dotted" class="animate-spin" />
            <Icon v-else color="#D0D1FB" name="tabler:brand-gravatar" />
          </div>
          <div>
            <span v-if="isLogin">
              Login
            </span>
            <span v-else>
              Register
            </span>
          </div>

          <div />
        </button>

        <div v-if="isLogin">
          New User? <span class="text-white hover:underline cursor-pointer" @click="isLogin = false">Register!</span>
        </div>

        <div v-else>
          Already User? <span class="text-white hover:underline cursor-pointer" @click="isLogin = true">Login!</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
