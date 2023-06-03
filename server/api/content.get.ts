import { AccountId, Client, FileContentsQuery, PrivateKey } from '@hashgraph/sdk'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const fileId = query.fileId as string

  if (!fileId) {
    throw createError({
      statusCode: 400,
      message: 'Missing token or tokenId',
    })
  }

  const config = useRuntimeConfig()

  const operatorId = AccountId.fromString(config.hedera.operator.accountId)
  const operatorPrivateKey = PrivateKey.fromString(config.hedera.operator.privateKey)

  const client = Client.forTestnet().setOperator(operatorId, operatorPrivateKey)
  try {
    const fileContentQuery = await new FileContentsQuery()
      .setFileId(fileId)
      .execute(client)

    const fileContents = fileContentQuery.toString()

    return {
      fileContents,
    }
  }
  catch (error: any) {
    if (error.message.includes('INVALID_FILE_ID')) {
      throw createError({
        statusCode: 404,
        message: 'File not found',
      })
    }

    console.error(error)

    throw createError({
      statusCode: 500,
      message: error.message,
    })
  }
})
