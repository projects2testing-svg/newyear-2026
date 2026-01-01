import { connectToDatabase } from '../../../lib/mongodb'

export async function POST(request) {
  try {
    const { name, grateful, challenge, moment, leaveBehind, intention, word, language } = await request.json()

    // Validate required fields
    if (!grateful || !challenge || !moment || !leaveBehind || !intention || !word) {
      return Response.json(
        { error: 'All reflection questions are required' },
        { status: 400 }
      )
    }

    const { db } = await connectToDatabase()
    const collection = db.collection('HappyNewYear2026')

    const reflection = {
      name: name || null, // optional
      grateful,
      challenge,
      moment,
      leaveBehind,
      intention,
      word,
      language: language || 'en', // store selected language
      timestamp: new Date(),
    }

    const result = await collection.insertOne(reflection)

    return Response.json(
      {
        message: 'Reflection saved successfully',
        id: result.insertedId
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error saving reflection:', error)
    return Response.json(
      { error: 'Failed to save reflection' },
      { status: 500 }
    )
  }
}
