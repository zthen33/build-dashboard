import { NextResponse } from "next/server"
import { mockBuilds } from "@/lib/mock-data"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const build = mockBuilds.find((build) => build.id === params.id)

  if (!build) {
    return NextResponse.json({ error: "Build not found" }, { status: 404 })
  }

  return NextResponse.json(build)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  // In a real app, you would delete from a database or cancel a build in your CI/CD system
  const buildExists = mockBuilds.some((build) => build.id === params.id)

  if (!buildExists) {
    return NextResponse.json({ error: "Build not found" }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
