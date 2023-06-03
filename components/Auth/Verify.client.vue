<script setup lang="ts">
import { HashConnect } from 'hashconnect'

// ref
const hasExtension = ref(false)

const hashConnect = new HashConnect()

// const initData = await hashConnect.init(appMetadata, 'testnet', true)

// console.log({ initData })

// hashConnect.foundExtensionEvent.once(() => {
//   console.log('Extension found')
//   hasExtension.value = true
// })

async function ConnectWallet() {

}
</script>

<template>
  <div>
    Hello
  </div>
</template>

<style scoped>

</style>
