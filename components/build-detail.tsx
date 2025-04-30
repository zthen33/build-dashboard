"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowUpRight, Clock, Download, GitBranch, GitCommit, Play, Server, Trash2 } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { getBuildStatusBadge } from "@/lib/build-utils"
import type { Build } from "@/lib/types"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface BuildDetailProps {
  build: Build
}

export function BuildDetail({ build }: BuildDetailProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteBuild = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/builds/${build.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        router.push("/")
      } else {
        console.error("Failed to delete build")
        setIsDeleting(false)
      }
    } catch (error) {
      console.error("Error deleting build:", error)
      setIsDeleting(false)
    }
  }

  const handleRestartBuild = async () => {
    try {
      const response = await fetch(`/api/builds/${build.id}/restart`, {
        method: "POST",
      })

      if (response.ok) {
        const newBuild = await response.json()
        router.push(`/builds/${newBuild.id}`)
      }
    } catch (error) {
      console.error("Error restarting build:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Build Details</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Build #{build.id.substring(0, 8)}</CardTitle>
              <CardDescription>{formatDate(build.createdAt)}</CardDescription>
            </div>
            {getBuildStatusBadge(build.status)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <GitBranch className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Branch:</span>
                <span>{build.branch}</span>
              </div>
              <div className="flex items-center gap-2">
                <GitCommit className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Commit:</span>
                <span className="font-mono">{build.commit}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Duration:</span>
                <span>{build.duration} seconds</span>
              </div>
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Environment:</span>
                <span>{build.environment}</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Button className="w-full justify-start" onClick={handleRestartBuild}>
                <Play className="mr-2 h-4 w-4" />
                Rebuild
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Download logs
              </Button>
              {build.status === "success" && (
                <Button variant="outline" className="w-full justify-start">
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  View deployment
                </Button>
              )}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full justify-start">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete build
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the build and all associated data.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteBuild} disabled={isDeleting}>
                      {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="logs">
        <TabsList>
          <TabsTrigger value="logs">Build Logs</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="artifacts">Artifacts</TabsTrigger>
        </TabsList>
        <TabsContent value="logs">
          <Card>
            <CardContent className="p-4">
              <pre className="bg-black text-green-400 p-4 rounded-md overflow-auto h-[400px] text-sm font-mono">
                {build.logs}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="config">
          <Card>
            <CardContent className="p-4">
              <pre className="bg-muted p-4 rounded-md overflow-auto h-[400px] text-sm font-mono">
                {JSON.stringify(build.config, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="artifacts">
          <Card>
            <CardContent className="p-4">
              {build.artifacts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <p className="text-muted-foreground">No artifacts available for this build</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {build.artifacts.map((artifact, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{artifact.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {artifact.size}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


