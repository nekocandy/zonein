import { AccountId, Client, PrivateKey, TokenCreateTransaction, TokenSupplyType, TokenType } from '@hashgraph/sdk'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { userId, name } = body

  const config = useRuntimeConfig()

  const operatorId = AccountId.fromString(config.hedera.operator.accountId)
  const operatorPrivateKey = PrivateKey.fromString(config.hedera.operator.privateKey)
  const fileKey = PrivateKey.fromString(config.hedera.file.privateKey)

  const client = Client.forTestnet().setOperator(operatorId, operatorPrivateKey)

  try {
    const createdNFT = new TokenCreateTransaction()
      .setTokenName(`ZoneIN-NFT-${userId}`)
      .setTokenSymbol(`ZIN-${userId}`)
      .setTokenMemo(`ZoneIN Certifications NFT for ${name}`)
      .setTokenType(TokenType.NonFungibleUnique)
      .setDecimals(0)
      .setInitialSupply(0)
      .setTreasuryAccountId(operatorId)
      .setSupplyType(TokenSupplyType.Finite)
      .setMaxSupply(100)
      .setSupplyKey(fileKey)
      .freezeWith(client)

    const signTx = await createdNFT.sign(operatorPrivateKey)
    const txResponse = await signTx.execute(client)
    const receipt = await txResponse.getReceipt(client)

    const tokenId = receipt.tokenId!

    return {
      tokenId: tokenId.toString(),
    }
  }
  catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message,
    })
  }
})
