<script setup lang="ts">
const props = defineProps({
  fileId: String,
})

const imageId = ref('')

async function getImageData(fileId: string) {
  const { refresh, data } = await useFetch('/api/content', {
    query: {
      fileId,
    },
    method: 'GET',
    server: false,
    lazy: true,
  })

  if (!data.value)
    await refresh()

  const imageElement = document.getElementById(imageId.value)
  imageElement?.setAttribute('src', data.value?.fileContents || 'no-data-from-hedera')
  imageElement?.setAttribute('alt', 'function has been invoked')
}

onMounted(async () => {
  imageId.value = createId()
  await getImageData(props.fileId!)
})
</script>

<template>
  <img :id="imageId" class="mx-auto" src="" alt="Loading...">
</template>

<style scoped>

</style>
