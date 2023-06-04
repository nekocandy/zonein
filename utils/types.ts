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

export interface ChatMessage {
  id: string
  message: string
  userId: string
  fromMe: boolean
}

export interface ChatMessageWithTxnId extends ChatMessage {
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
  status: 'ongoing' | 'resolved'
  disclosure: boolean
  disclosureTxn: any
}
