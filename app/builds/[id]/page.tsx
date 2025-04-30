import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BuildDetail } from "@/components/build-detail"
import { getBuildById } from "@/lib/data"

export const dynamic = "force-dynamic"

interface PageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const build = await getBuildById(params.id)

  if (!build) {
    return {
      title: "Build Not Found",
    }
  }

  return {
    title: `Build #${build.id.substring(0, 8)}`,
    description: `Build details for ${build.branch} branch`,
  }
}

export default async function BuildPage({ params }: PageProps) {
  const build = await getBuildById(params.id)

  if (!build) {
    notFound()
  }

  return (
    <main className="container mx-auto py-10">
      <BuildDetail build={build} />
    </main>
  )
}
