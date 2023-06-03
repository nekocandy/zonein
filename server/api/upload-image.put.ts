import { AccountId, Client, FileCreateTransaction, Hbar, PrivateKey, PublicKey } from '@hashgraph/sdk'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { image } = JSON.parse(body)

  const config = useRuntimeConfig()

  const operatorId = AccountId.fromString(config.hedera.operator.accountId)
  const operatorPrivateKey = PrivateKey.fromString(config.hedera.operator.privateKey)
  const fileKey = PrivateKey.fromString(config.hedera.file.privateKey)
  const filePublicKey = PublicKey.fromString(config.hedera.file.publicKey)

  const client = Client.forTestnet().setOperator(operatorId, operatorPrivateKey)

  try {
    const fileCreateTransaction = new FileCreateTransaction()
      .setKeys([filePublicKey])
      .setContents(image)
      .setMaxTransactionFee(new Hbar(2))
      .freezeWith(client)

    const signTx = await fileCreateTransaction.sign(fileKey)
    const submitTx = await signTx.execute(client)
    const receipt = await submitTx.getReceipt(client)

    const newFileId = receipt.fileId
    const transactionId = submitTx.transactionId

    return {
      transactionId: transactionId.toString(),
      fileId: newFileId!.toString(),
    }
  }
  catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message,
    })
  }
})
