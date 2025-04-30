import { NextResponse } from "next/server"
import { mockBuilds } from "@/lib/mock-data"

export async function GET() {
  // In a real app, you would fetch from a database or external API
  return NextResponse.json(mockBuilds)
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate the build data
    if (!data.repository || !data.branch || !data.buildCommand) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, you would create a new build in your database or trigger a build in your CI/CD system
    const newBuild = {
      id: Math.random().toString(36).substring(2, 15),
      createdAt: new Date().toISOString(),
      branch: data.branch,
      commit: data.commit || "main",
      status: "queued",
      duration: 0,
      environment: data.environment || "development",
      logs: "",
      config: {
        buildCommand: data.buildCommand,
        installCommand: data.installCommand || "npm install",
        framework: "nextjs",
        nodeVersion: "18.x",
      },
      artifacts: [],
    }

    return NextResponse.json(newBuild, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create build" }, { status: 500 })
  }
}
