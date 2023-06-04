export interface HederaPost {
  id: string
  caption: string
  image: string
  type: 'photo' | 'certificate'
  userId: string
  createdAt: string
  imageTransactionId: string
}

export interface HederaPostWithTxnId extends HederaPost {
  transactionId: string
  timestamp: Date
}
