<script setup lang="ts">
const fileUploadElement = ref<HTMLInputElement>()
const documentType = ref<'photo' | 'certificate'>('photo')
const file = ref<File>()
const base64Image = ref<string | null>()

function toggleDocumentType() {
  documentType.value = documentType.value === 'photo' ? 'certificate' : 'photo'
}

function selectFileToUpload() {
  fileUploadElement.value?.click()
}

function onFileChange(event: any) {
  file.value = event.target.files[0]
}

watch(file, async (file) => {
  if (file) {
    const base64: string = await toBase64(file) as string
    base64Image.value = base64
  }
})
</script>

<template>
  <div v-auto-animate class="h-full w-full flex flex-col gap-4">
    <div class="bg-[#222c56] rounded-xl flex flex-col gap-6 py-4 px-6 text-white">
      <!-- upload here text -->
      <div class="flex items-center justify-center gap-2">
        <Icon class="h-6 w-6" name="tabler:cloud-upload" />
        <span>Upload Here</span>
      </div>

      <!-- documentType -->
      <div class="w-full flex items-center justify-center gap-2">
        <div
          class="cursor-pointer w-full px-4 py-2 rounded-full text-white border-2 border-[#4ece6a] text-center text-sm"
          :class="{
            'bg-[#4ece6a]': documentType === 'photo',
          }"
          @click="toggleDocumentType"
        >
          Photo
        </div>

        <div
          class="cursor-pointer w-full px-4 py-2 rounded-full text-white border-2 border-[#f8ac3b] text-center text-sm"
          :class="{
            'bg-[#f8ac3b]': documentType === 'certificate',
          }"
          @click="toggleDocumentType"
        >
          Certificate
        </div>
      </div>

      <!-- caption -->
      <div class="h-full w-full px-2">
        <textarea placeholder="// Enter caption here" class="placeholder-text-[#9EA2B0] placeholder:text-sm resize-none w-full p-2 bg-[#37488c] rounded-md focus:outline-none" />
      </div>

      <!-- upload button -->
      <div class="w-full -mt-3">
        <input ref="fileUploadElement" accept="image/png, image/gif, image/jpeg" type="file" max="1" class="hidden" @change="onFileChange">
        <button class="px-4 border-white border text-md py-2 rounded-lg w-full bg-[#01071f] flex items-center justify-center gap-2 text-[#70799B]" @click="selectFileToUpload">
          <Icon class="h-6 w-6" name="tabler:script-plus" />
          Upload
        </button>
      </div>
    </div>

    <div v-if="base64Image" class="bg-[#222c56] rounded-xl flex flex-col gap-4 py-6 px-6 text-white">
      <div>Preview: </div>
      <img :src="base64Image" :alt="base64Image">
    </div>

    <button v-if="base64Image" class="bg-[#222c56] w-full py-4 text-white rounded-xl">
      <Icon class="h-6 w-6" name="tabler:world-upload" />
      Upload & Post
    </button>
  </div>
</template>

<style scoped>

</style>
