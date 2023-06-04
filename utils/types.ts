import type { BSON } from 'realm-web'

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

export interface ReportData {
  _id: BSON.ObjectId
  reportId: string
  title: string
  description: string
  company: string
  createdAt: Date
  userId: string
  upvotes: any[]
  downvotes: any[]
  comments: any[]
  status: string
  disclosure: boolean
  disclosureTxn: any
}
