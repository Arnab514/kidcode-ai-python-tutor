"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function ConfigPage() {
  const [apiKey, setApiKey] = useState("")
  const { toast } = useToast()

  const handleSaveApiKey = () => {
    // In a real application, you would securely store the API key
    // For this example, we'll just show a toast notification
    toast({
      title: "API Key Saved",
      description: "Your API key has been successfully saved.",
    })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Configuration</h1>
      <div className="max-w-md mx-auto">
        <div className="mb-4">
          <Label htmlFor="api-key">AI API Key</Label>
          <Input
            id="api-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your AI API key"
          />
        </div>
        <Button onClick={handleSaveApiKey}>Save API Key</Button>
      </div>
    </div>
  )
}

