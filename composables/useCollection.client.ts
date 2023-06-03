export function useCollection(collectionName: string) {
  const realmApp = useRealmApp()

  const client = realmApp.currentUser?.mongoClient('mongodb-atlas')

  const db = client?.db('zonein')

  if (!db)
    throw new Error('No db')

  return db.collection(collectionName)
}
