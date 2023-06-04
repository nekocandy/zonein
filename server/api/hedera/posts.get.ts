import { AccountId, Client, PrivateKey, TopicId, TopicMessageQuery } from '@hashgraph/sdk'

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
  const topicId = TopicId.fromString(HEDERA.POSTS_TOPIC)

  const client = Client.forTestnet().setOperator(operatorId, operatorPrivateKey)

  const postsList: any[] = []

  try {
    new TopicMessageQuery()
      .setTopicId(topicId)
      .setStartTime(0)
      .subscribe(
        client,
        errorMessage => console.error('Error while fetching posts from topic: ', errorMessage),
        (message) => {
        // console.log(Buffer.from(message.contents).toString("utf-8"));
        // messagesList.push(Buffer.from(message.contents).toString("utf-8"));
          postsList.push({
            // eslint-disable-next-line n/prefer-global/buffer
            contents: Buffer.from(message.contents).toString('utf-8'),
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
