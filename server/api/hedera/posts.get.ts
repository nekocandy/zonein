import { AccountId, Client, PrivateKey, TopicId, TopicMessageQuery } from '@hashgraph/sdk'
import type { HederaPostWithTxnId } from '~/utils/types'
import { HEDERA } from '~/utils/constants'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const operatorId = AccountId.fromString(config.hedera.operator.accountId)
  const operatorPrivateKey = PrivateKey.fromString(config.hedera.operator.privateKey)
  const topicId = TopicId.fromString(HEDERA.POSTS_TOPIC)

  const client = Client.forTestnet().setOperator(operatorId, operatorPrivateKey)

  const postsList: HederaPostWithTxnId[] = []

  try {
    new TopicMessageQuery()
      .setTopicId(topicId)
      .setStartTime(0)
      .subscribe(
        client,
        errorMessage => console.error('Error while fetching posts from topic: ', errorMessage),
        (message) => {
          // eslint-disable-next-line n/prefer-global/buffer
          const jsonMessage = JSON.parse(Buffer.from(message.contents).toString('utf-8'))
          postsList.push({
            ...jsonMessage,
            timestamp: message.consensusTimestamp.toDate(),
            transactionId: message.initialTransactionId
              ? message.initialTransactionId.toString()
              : 'no-id',
          })
        },
      )

    await new Promise(resolve => setTimeout(resolve, 3000))

    return postsList
  }
  catch (error: any) {
    console.error(error)

    throw createError({
      statusCode: 500,
      message: error.message,
    })
  }
})
