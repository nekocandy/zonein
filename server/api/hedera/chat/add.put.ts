import { AccountId, Client, PrivateKey, TopicId, TopicMessageSubmitTransaction } from '@hashgraph/sdk'

import { HEDERA } from '~/utils/constants'

export default defineEventHandler(async (event) => {
  const insertionData = await readBody(event)

  if (!insertionData) {
    throw createError({
      statusCode: 400,
      message: 'Missing insertion data',
    })
  }

  const config = useRuntimeConfig()

  const operatorId = AccountId.fromString(config.hedera.operator.accountId)
  const operatorPrivateKey = PrivateKey.fromString(config.hedera.operator.privateKey)
  const topicId = TopicId.fromString(HEDERA.CHAT_TOPIC)

  const client = Client.forTestnet().setOperator(operatorId, operatorPrivateKey)

  try {
    const sendResponse = await new TopicMessageSubmitTransaction({
      topicId,
      message: JSON.stringify(insertionData),
    }).execute(client)

    return sendResponse.transactionId.toString()
  }
  catch (error: any) {
    console.error(error)

    throw createError({
      statusCode: 500,
      message: error.message,
    })
  }
})
