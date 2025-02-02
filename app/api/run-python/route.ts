import { NextResponse } from "next/server"
import { exec } from "child_process"
import { writeFile, unlink } from "fs/promises"
import { v4 as uuidv4 } from "uuid"

export async function POST(req: Request) {
  const { code } = await req.json()

  // Generate a unique filename
  const filename = `${uuidv4()}.py`

  try {
    // Write the code to a temporary file
    await writeFile(filename, code)

    // Execute the Python code
    const output = await new Promise((resolve, reject) => {
      exec(`python ${filename}`, (error, stdout, stderr) => {
        if (error) {
          reject(error)
        } else {
          resolve(stdout || stderr)
        }
      })
    })

    // Delete the temporary file
    await unlink(filename)

    return NextResponse.json({ output })
  } catch (error) {
    console.error("Error running Python code:", error)
    return NextResponse.json({ error: "Error running Python code" }, { status: 500 })
  }
}

