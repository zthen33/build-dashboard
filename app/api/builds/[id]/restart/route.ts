import { NextResponse } from "next/server"
import { mockBuilds } from "@/lib/mock-data"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const build = mockBuilds.find((build) => build.id === params.id)

  if (!build) {
    return NextResponse.json({ error: "Build not found" }, { status: 404 })
  }

  // In a real app, you would restart the build in your CI/CD system
  const newBuild = {
    ...build,
    id: Math.random().toString(36).substring(2, 15),
    createdAt: new Date().toISOString(),
    status: "queued",
    duration: 0,
    logs: "",
    artifacts: [],
  }

  return NextResponse.json(newBuild)
}
