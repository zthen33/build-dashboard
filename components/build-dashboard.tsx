"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BuildList } from "@/components/build-list"
import { NewBuildForm } from "@/components/new-build-form"
import type { Build } from "@/lib/types"

interface BuildDashboardProps {
  initialBuilds: Build[]
}

export function BuildDashboard({ initialBuilds }: BuildDashboardProps) {
  const [builds, setBuilds] = useState<Build[]>(initialBuilds)
  const router = useRouter()

  const handleCreateBuild = (newBuild: Build) => {
    setBuilds([newBuild, ...builds])
  }

  const handleDeleteBuild = (id: string) => {
    setBuilds(builds.filter((build) => build.id !== id))
  }

  const viewBuildDetails = (id: string) => {
    router.push(`/builds/${id}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Build Dashboard</h1>
        <p className="text-muted-foreground">Monitor and manage your application builds</p>
      </div>

      <Tabs defaultValue="recent">
        <TabsList>
          <TabsTrigger value="recent">Recent Builds</TabsTrigger>
          <TabsTrigger value="new">New Build</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Builds</CardTitle>
              <CardDescription>View and manage your recent builds</CardDescription>
            </CardHeader>
            <CardContent>
              <BuildList builds={builds} onViewDetails={viewBuildDetails} onDeleteBuild={handleDeleteBuild} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle>Create New Build</CardTitle>
              <CardDescription>Configure and start a new build</CardDescription>
            </CardHeader>
            <CardContent>
              <NewBuildForm onBuildCreated={handleCreateBuild} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
