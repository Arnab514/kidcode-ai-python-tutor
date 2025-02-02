"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BotIcon as Robot, Cat, Rocket, Wand2, Award, BadgeIcon as Certificate } from "lucide-react"
import CodePlayground from "@/components/CodePlayground"
import confetti from "canvas-confetti"

const tutors = [
  {
    id: "robot",
    name: "Robo",
    icon: Robot,
    specialty: "Loops and Functions",
    color: "text-blue-500",
    prompt:
      "You are Robo, an AI tutor specializing in Python loops and functions. Your responses should be friendly, clear, and focused on helping students understand and practice these concepts. Use simple analogies and encourage hands-on coding.",
  },
  {
    id: "cat",
    name: "Whiskers",
    icon: Cat,
    specialty: "Variables and Data Types",
    color: "text-green-500",
    prompt:
      "You are Whiskers, a playful AI tutor expert in Python variables and data types. Your explanations should be fun, using cat-related analogies when possible. Encourage students to experiment with different data types and variable assignments.",
  },
  {
    id: "astronaut",
    name: "Cosmo",
    icon: Rocket,
    specialty: "Conditionals and Logic",
    color: "text-purple-500",
    prompt:
      "You are Cosmo, an AI tutor specializing in Python conditionals and logic. Use space-themed examples to explain concepts. Your responses should be engaging and encourage students to think critically about program flow and decision-making in code.",
  },
  {
    id: "wizard",
    name: "Merlin",
    icon: Wand2,
    specialty: "Advanced Concepts",
    color: "text-yellow-500",
    prompt:
      "You are Merlin, an AI tutor focusing on advanced Python concepts. Your responses should be wise and thought-provoking, challenging students to think deeper about Python programming. Use magical analogies to explain complex topics.",
  },
]

const pythonBadges = [
  { name: "Hello World", icon: "🌟" },
  { name: "Loop Master", icon: "🔁" },
  { name: "Function Wizard", icon: "🧙" },
  { name: "Data Structures Pro", icon: "🏗️" },
  { name: "Algorithm Ace", icon: "🏆" },
]

const pythonCertificates = [
  { name: "Python Basics", icon: "📜" },
  { name: "Intermediate Python", icon: "🥈" },
  { name: "Advanced Python", icon: "🥇" },
]

export default function TutorPage() {
  const [selectedTutor, setSelectedTutor] = useState(tutors[0])
  const [tutorChats, setTutorChats] = useState(Object.fromEntries(tutors.map((tutor) => [tutor.id, []])))
  const [input, setInput] = useState("")
  const [progress, setProgress] = useState(0)
  const [level, setLevel] = useState(1)
  const [xp, setXp] = useState(0)
  const [badges, setBadges] = useState([])
  const [certificates, setCertificates] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const chatContainerRef = useRef(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      const scrollTimeout = setTimeout(() => {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth'
        })
      }, 100) // Small delay to ensure content is rendered
      
      return () => clearTimeout(scrollTimeout)
    }
  }, [tutorChats, selectedTutor.id]) // Watch for chat updates and tutor changes

  useEffect(() => {
    // Simulating progress update
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer)
          return 100
        }
        return prevProgress + 10
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleSendMessage = async () => {
    if (input.trim()) {
      setIsLoading(true)
      const newMessage = { role: "user", content: input }
      setTutorChats((prevChats) => ({
        ...prevChats,
        [selectedTutor.id]: [...prevChats[selectedTutor.id], newMessage],
      }))

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: selectedTutor.prompt,
            message: input,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to get response from AI")
        }

        const data = await response.json()
        setTutorChats((prevChats) => ({
          ...prevChats,
          [selectedTutor.id]: [...prevChats[selectedTutor.id], { role: "assistant", content: data.response }],
        }))
        gainXP(10)
      } catch (error) {
        console.error("Error:", error)
        setTutorChats((prevChats) => ({
          ...prevChats,
          [selectedTutor.id]: [
            ...prevChats[selectedTutor.id],
            { role: "assistant", content: "Sorry, I'm having trouble responding right now. Please try again later." },
          ],
        }))
      }

      setIsLoading(false)
      setInput("")
    }
  }

  const gainXP = (amount) => {
    setXp((prevXP) => {
      const newXP = prevXP + amount
      if (newXP >= 100) {
        setLevel((prevLevel) => {
          const newLevel = prevLevel + 1
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          })
          addBadge(pythonBadges[Math.floor(Math.random() * pythonBadges.length)])
          if (newLevel % 5 === 0) {
            addCertificate(pythonCertificates[Math.floor(Math.random() * pythonCertificates.length)])
          }
          return newLevel
        })
        return newXP - 100
      }
      return newXP
    })
  }

  const addBadge = (badge) => {
    setBadges((prevBadges) => [...prevBadges, badge])
  }

  const addCertificate = (certificate) => {
    setCertificates((prevCertificates) => [...prevCertificates, certificate])
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-400">Learn Python with {selectedTutor.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="chat" className="bg-gray-800 rounded-lg shadow-lg p-4">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="chat" className="text-lg text-blue-400">
                Chat with Tutor
              </TabsTrigger>
              <TabsTrigger value="playground" className="text-lg text-blue-400">
                Code Playground
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="chat"
              className="border border-gray-700 rounded-lg p-4 h-[500px] flex flex-col bg-gray-900"
            >
              <div className="flex items-center mb-4 p-2 bg-gray-800 rounded-lg">
                <Avatar className={`w-10 h-10 ${selectedTutor.color} mr-3`}>
                  <AvatarFallback>
                    <selectedTutor.icon className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-blue-400">{selectedTutor.name}</h3>
                  <p className="text-sm text-gray-400">{selectedTutor.specialty}</p>
                </div>
              </div>
              <div ref={chatContainerRef} className="flex-grow overflow-auto mb-4 space-y-4 custom-scrollbar">
                {tutorChats[selectedTutor.id].map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.role === "user" ? "bg-blue-900 text-blue-100" : "bg-gray-800 text-gray-100"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message here..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="text-lg bg-gray-800 text-white"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send"}
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="playground">
              <CodePlayground onCodeRun={() => gainXP(5)} />
            </TabsContent>
          </Tabs>
        </div>
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg shadow-lg p-4">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Choose Your Tutor</h2>
            <div className="grid gap-4">
              {tutors.map((tutor) => (
                <Button
                  key={tutor.id}
                  variant={selectedTutor.id === tutor.id ? "default" : "outline"}
                  className={`flex items-center justify-start gap-4 h-16 ${
                    selectedTutor.id === tutor.id ? "bg-blue-900 text-blue-100" : "bg-gray-700 text-gray-200"
                  }`}
                  onClick={() => {
                    setSelectedTutor(tutor)
                    setInput("")
                  }}
                >
                  <Avatar className={`w-10 h-10 ${tutor.color}`}>
                    <AvatarFallback>
                      <tutor.icon className="w-6 h-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="font-semibold">{tutor.name}</div>
                    <div className="text-sm text-gray-400">{tutor.specialty}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-4">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Your Progress</h3>
            <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
              <div
                className="bg-blue-600 h-4 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Level {level}</span>
              <span className="text-lg">XP: {xp}/100</span>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2 text-blue-400">Badges</h4>
              <div className="flex flex-wrap gap-2">
                {badges.map((badge, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-900 text-blue-100 p-2">
                    <Award className="w-4 h-4 mr-1 text-yellow-400" />
                    {badge.icon} {badge.name}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2 text-blue-400">Certificates</h4>
              <div className="flex flex-wrap gap-2">
                {certificates.map((cert, index) => (
                  <Badge key={index} variant="secondary" className="bg-purple-900 text-purple-100 p-2">
                    <Certificate className="w-4 h-4 mr-1 text-yellow-400" />
                    {cert.icon} {cert.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}