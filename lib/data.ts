import { mockBuilds } from "@/lib/mock-data"
import type { Build } from "@/lib/types"

// In a real app, these functions would fetch data from an API or database
export async function getBuilds(): Promise<Build[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockBuilds
}

export async function getBuildById(id: string): Promise<Build | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockBuilds.find((build) => build.id === id)
}
