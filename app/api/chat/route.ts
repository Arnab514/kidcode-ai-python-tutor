import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function POST(req: Request) {
  try {
    const { prompt, message } = await req.json()

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const result = await model.generateContent([
      prompt, // The tutor's persona and instructions
      message, // The user's message
    ])

    const response = result.response.text()
    return NextResponse.json({ response })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Failed to process the request" }, { status: 500 })
  }
}

