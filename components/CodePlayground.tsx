

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, Clock } from "lucide-react"

const challenges = [
  {
    id: 1,
    title: "Print Hello World",
    description: "Write a Python program that prints 'Hello, World!' to the console.",
    initialCode: "# Write your code here\n",
    expectedOutput: "Hello, World!",
  },
  {
    id: 2,
    title: "Calculate Sum",
    description: "Write a function that takes two numbers as parameters and returns their sum.",
    initialCode:
      "def sum_numbers(a, b):\n    # Write your code here\n    pass\n\n# Test your function\nprint(sum_numbers(5, 3))",
    expectedOutput: "8",
  },
]

export default function CodePlayground({ onCodeRun }) {
  const [currentChallenge, setCurrentChallenge] = useState(challenges[0])
  const [code, setCode] = useState(currentChallenge.initialCode)
  const [output, setOutput] = useState("")
  const [success, setSuccess] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleRunCode = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/run-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          expectedOutput: currentChallenge.expectedOutput,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to run code")
      }

      const data = await response.json()
      setOutput(data.output)
      setSuccess(data.success)
      onCodeRun()
    } catch (error) {
      console.error("Error:", error)
      setOutput("Error running code. Please try again.")
      setSuccess(false)
    }
    setIsLoading(false)
  }

  const handleNextChallenge = () => {
    const nextIndex = challenges.findIndex((c) => c.id === currentChallenge.id) + 1
    if (nextIndex < challenges.length) {
      setCurrentChallenge(challenges[nextIndex])
      setCode(challenges[nextIndex].initialCode)
      setOutput("")
      setSuccess(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-blue-400">{currentChallenge.title}</h3>
        <p className="text-gray-300">{currentChallenge.description}</p>
      </div>
      
      <Textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your Python code here..."
        className="font-mono h-[200px] bg-gray-900 text-gray-100 border-gray-700"
      />
      
      <div className="flex gap-2">
        <Button onClick={handleRunCode} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
          {isLoading ? "Running..." : "Run Code"}
        </Button>
        {success && (
          <Button onClick={handleNextChallenge} className="bg-blue-600 hover:bg-blue-700">
            Next Challenge
          </Button>
        )}
      </div>

      {output && (
        <Alert variant={success ? "default" : "destructive"} className={success ? "bg-green-900" : "bg-red-900"}>
          <AlertTitle className="text-white">{success ? "Success!" : "Not quite right"}</AlertTitle>
          <AlertDescription className="text-gray-200">
            {success ? (
              <CheckCircle className="w-4 h-4 inline mr-2 text-green-400" />
            ) : (
              <XCircle className="w-4 h-4 inline mr-2 text-red-400" />
            )}
            Output: {output}
          </AlertDescription>
        </Alert>
      )}

      <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
        <h3 className="text-xl font-semibold mb-2 text-yellow-400 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Coming Soon
        </h3>
        <p className="text-gray-300">We're working on exciting new features to enhance your learning experience:</p>
        <ul className="list-disc list-inside mt-2 text-gray-300">
          <li>Interactive debugging tools</li>
          <li>Code visualization</li>
          <li>Peer code review</li>
          <li>AI-powered code suggestions</li>
        </ul>
        <p className="mt-2 text-gray-300">Stay tuned for these awesome additions to help you become a Python pro!</p>
      </div>
    </div>
  )
}