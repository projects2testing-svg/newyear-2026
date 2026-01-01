import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB

let cachedClient = null
let cachedDb = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  if (!uri) {
    throw new Error('Please add your MongoDB URI to .env.local')
  }

  const client = new MongoClient(uri)

  await client.connect()
  const db = client.db(dbName)

  cachedClient = client
  cachedDb = db

  return { client, db }
}
