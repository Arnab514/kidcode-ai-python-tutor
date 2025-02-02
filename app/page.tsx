import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BotIcon as Robot, Code, Trophy, Zap, Github, Twitter, Linkedin } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-8 text-blue-400">Welcome to KidCode: AI Python Tutor</h1>
        <p className="text-xl text-center mb-12 text-blue-200">
          Learn Python basics, ace your coding skills, and join the next generation of programmers!
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-400">
                <Robot className="mr-2" />
                Interactive AI Tutors
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              Choose from four unique AI tutors, each specializing in different Python concepts. They'll guide you
              through your coding journey with personalized lessons and feedback.
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-green-400">
                <Code className="mr-2" />
                Live Code Playground
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              Practice Python in real-time with our interactive code playground. Write, run, and debug your code all in
              one place!
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-400">
                <Trophy className="mr-2" />
                Gamified Learning
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              Earn XP, level up, and collect badges as you progress. Make learning Python fun and rewarding!
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-400">
                <Zap className="mr-2" />
                Adaptive Curriculum
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              Our AI adapts to your learning pace and style, providing challenges that match your skill level and
              interests.
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-16">
          <Link href="/tutor">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg glow"
            >
              Start Learning Python Now!
            </Button>
          </Link>
        </div>

        <div className="mt-16 text-center text-blue-200">
          <h2 className="text-3xl font-bold mb-4">Why Choose KidCode?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            KidCode offers a unique, AI-powered learning experience that makes Python programming accessible and fun for
            kids. With our interactive tutors, hands-on coding exercises, and gamified learning approach, you'll be
            writing amazing Python programs in no time!
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="interactive-image">
              <Image
                src="/img01.jpg"
                alt="Python Basics"
                width={200}
                height={200}
                className="mx-auto rounded-lg"
              />
              <p className="mt-2 font-semibold">Master Python Basics</p>
            </div>
            <div className="interactive-image">
              <Image
                src="/img02.jpg"
                alt="Earn Badges"
                width={200}
                height={200}
                className="mx-auto rounded-lg"
              />
              <p className="mt-2 font-semibold">Earn Cool Badges</p>
            </div>
            <div className="interactive-image">
              <Image
                src="/img03.jpg"
                alt="Get Certified"
                width={200}
                height={200}
                className="mx-auto rounded-lg"
              />
              <p className="mt-2 font-semibold">Get Python Certified</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">KidCode: AI Python Tutor</h3>
              <p>Making Python learning fun and accessible for kids!</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400">
                <Github />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Twitter />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Linkedin />
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">© 2025 KidCode. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}