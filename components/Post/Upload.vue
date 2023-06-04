<script setup lang="ts">
const fileUploadElement = ref<HTMLInputElement>()
const documentType = ref<'photo' | 'certificate'>('photo')
const caption = ref<string>('')
const file = ref<File>()
const base64Image = ref<string | null>()
const uploadClicked = ref(false)
const isFileUploading = ref(false)
const isPostUploading = ref(false)

function toggleDocumentType() {
  documentType.value = documentType.value === 'photo' ? 'certificate' : 'photo'
}

function selectFileToUpload() {
  fileUploadElement.value?.click()
}

function onFileChange(event: any) {
  file.value = event.target.files[0]
}

async function uploadFile() {
  if (!base64Image.value)
    return

  isFileUploading.value = true

  const hederaResponse = await useFetch('/api/upload-image', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image: base64Image.value,
      documentType: documentType.value,
    }),
  })

  isFileUploading.value = false

  return {
    fileId: hederaResponse.data.value!.fileId,
    transactionId: hederaResponse.data.value!.transactionId,
  }
}

async function uploadPost() {
  const { $toast } = useNuxtApp()
  uploadClicked.value = true
  isPostUploading.value = true

  const uploadedData = await uploadFile()
  if (!uploadedData)
    return

  const { fileId, transactionId } = uploadedData

  $toast.success(`Created File with ID: ${fileId}`)
  $toast.success(`Transaction ID: <a target="_blank" class="text-[#222c56] underline hover:decoration-double  hover:" href="https://hashscan.io/testnet/transaction/${transactionId}">${transactionId}</a>`, {
    duration: 10000,
    pauseOnHover: true,
  })

  const realmApp = useRealmApp()

  const postId = createId()
  const post = {
    id: postId,
    caption: caption.value,
    image: fileId,
    type: documentType.value,
    userId: realmApp.currentUser!.id,
    createdAt: new Date(),
    imageTransactionId: transactionId,
  }

  const addPostToTopic = await useFetch('/api/hedera/post/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })

  $toast.success(`Post added to Topic | ID: <a target="_blank" class="text-[#222c56] underline hover:decoration-double  hover:" href="https://hashscan.io/testnet/transaction/${addPostToTopic.data.value}">${addPostToTopic.data.value}</a>`, {
    duration: 10000,
    pauseOnHover: true,
  })

  const postsCollection = useCollection('posts')
  await postsCollection.insertOne({
    ...post,
    transactionId: addPostToTopic.data.value,
  })

  $toast.success('Post uploaded successfully')
}

watch(file, async (file) => {
  if (file) {
    const base64: string = await toBase64(file) as string
    base64Image.value = base64
  }
})
</script>

<template>
  <div v-auto-animate class="h-full w-full flex flex-col gap-2">
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
        <textarea v-model="caption" placeholder="// Enter caption here" class="placeholder-text-[#9EA2B0] placeholder:text-sm resize-none w-full p-2 bg-[#37488c] rounded-md focus:outline-none" />
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

    <button v-if="base64Image && !uploadClicked" class="bg-[#222c56] w-full py-4 text-white rounded-xl" @click="uploadPost">
      <Icon class="h-6 w-6" name="tabler:world-upload" />
      Upload & Post
    </button>

    <div v-if="uploadClicked" class="bg-[#222c56] rounded-xl flex flex-col gap-4 py-4 px-6 text-white">
      <div class="flex items-center gap-2">
        <Icon v-if="isFileUploading" name="tabler:circle-dotted" class="h-6 w-6 animate-spin" />
        <Icon v-else name="tabler:circle-check" class="h-6 w-6" />
        <span class="text-sm">Uploading File</span>
      </div>

      <div class="flex items-center gap-2">
        <Icon v-if="isFileUploading" name="tabler:circle-dotted" class="h-6 w-6 animate-spin" />
        <Icon v-else name="tabler:circle-check" class="h-6 w-6" />
        <span class="text-sm">Uploading File & Post</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
