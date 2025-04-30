"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal, Play, Download, Trash2, ExternalLink } from "lucide-react"
import { formatDistanceToNow } from "@/lib/utils"
import { getBuildStatusBadge } from "@/lib/build-utils"
import type { Build } from "@/lib/types"

interface BuildListProps {
  builds: Build[]
  onViewDetails: (id: string) => void
  onDeleteBuild: (id: string) => void
}

export function BuildList({ builds, onViewDetails, onDeleteBuild }: BuildListProps) {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const toggleSort = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
  }

  const sortedBuilds = [...builds].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime()
    const dateB = new Date(b.createdAt).getTime()
    return sortDirection === "asc" ? dateA - dateB : dateB - dateA
  })

  const handleDeleteBuild = async (id: string) => {
    try {
      const response = await fetch(`/api/builds/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        onDeleteBuild(id)
      } else {
        console.error("Failed to delete build")
      }
    } catch (error) {
      console.error("Error deleting build:", error)
    }
  }

  const handleRestartBuild = async (id: string) => {
    try {
      const response = await fetch(`/api/builds/${id}/restart`, {
        method: "POST",
      })

      if (response.ok) {
        const newBuild = await response.json()
        // You could add the new build to the list here
        // or refresh the list
        window.location.reload()
      }
    } catch (error) {
      console.error("Error restarting build:", error)
    }
  }

  return (
    <div>
      {builds.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <p className="text-muted-foreground mb-4">No builds found</p>
          <Button variant="outline">Create your first build</Button>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Build ID</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Commit</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={toggleSort}
                    className="flex items-center gap-1 p-0 h-auto font-medium"
                  >
                    Date
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedBuilds.map((build) => (
                <TableRow
                  key={build.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onViewDetails(build.id)}
                >
                  <TableCell className="font-mono text-xs">#{build.id.substring(0, 8)}</TableCell>
                  <TableCell>{build.branch}</TableCell>
                  <TableCell className="font-mono text-xs">{build.commit.substring(0, 7)}</TableCell>
                  <TableCell>{formatDistanceToNow(build.createdAt)}</TableCell>
                  <TableCell>{getBuildStatusBadge(build.status)}</TableCell>
                  <TableCell>{build.duration}s</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            onViewDetails(build.id)
                          }}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRestartBuild(build.id)
                          }}
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Rebuild
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Download className="mr-2 h-4 w-4" />
                          Download logs
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteBuild(build.id)
                          }}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete build
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
