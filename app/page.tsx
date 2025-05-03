import type { Metadata } from "next"
import { BuildDashboard } from "@/components/build-dashboard"
import { getBuilds } from "@/lib/data"

export const metadata: Metadata = {
  title: "Build Dashboard",
  description: "Monitor and manage your application builds",
}

export default async function Page() {
  const builds = await getBuilds()

  return (
    <main className="container mx-auto py-10">
      <BuildDashboard initialBuilds={builds} />
    </main>
  )
}
