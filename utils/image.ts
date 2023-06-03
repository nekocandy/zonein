export function toBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })
}

export function b64toBlob(b64Data: string,
  contentType = '',
  sliceSize = 512) {
  // eslint-disable-next-line n/prefer-global/buffer
  const byteCharacters = Buffer.from(b64Data, 'base64').toString('binary')
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++)
      byteNumbers[i] = slice.charCodeAt(i)

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}
