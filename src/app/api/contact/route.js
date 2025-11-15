import { NextResponse } from 'next/server'

export async function POST(request) {
  const { name, email, message } = await request.json()

  // In a real-world application, you would send an email or save the data to a database.
  console.log({ name, email, message })

  return NextResponse.json({ success: true })
}
