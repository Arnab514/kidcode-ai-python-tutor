import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function POST(req: Request) {
  try {
    const { code, expectedOutput } = await req.json()

    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `
      You are a Python code executor and validator. 
      Execute the following Python code and provide the output.
      Then, compare the output to the expected output and determine if they match.
      
      Code:
      ${code}
      
      Expected Output:
      ${expectedOutput}
      
      Respond in the following JSON format:
      {
        "output": "The actual output of the code",
        "success": true/false (whether the actual output matches the expected output)
      }
    `

    const result = await model.generateContent(prompt)
    const response = result.response.text()

    // Parse the JSON response from Gemini
    const parsedResponse = JSON.parse(response)

    return NextResponse.json(parsedResponse)
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Failed to process the request" }, { status: 500 })
  }
}

