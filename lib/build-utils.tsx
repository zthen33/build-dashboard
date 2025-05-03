import { Badge } from "@/components/ui/badge"
import type { BuildStatus } from "@/lib/types"

export function getBuildStatusBadge(status: BuildStatus) {
  switch (status) {
    case "success":
      return (
        <Badge className="bg-green-500 hover:bg-green-600 text-sm px-3 py-1">
          Success
        </Badge>
      )
    case "failed":
      return (
        <Badge variant="destructive" className="text-sm px-3 py-1">
          Failed
        </Badge>
      )
    case "in_progress":
      return (
        <Badge variant="default" className="text-sm px-3 py-1">
          In Progress
        </Badge>
      )
    case "queued":
      return (
        <Badge variant="secondary" className="text-sm px-3 py-1">
          Queued
        </Badge>
      )
    case "canceled":
      return (
        <Badge variant="outline" className="text-sm px-3 py-1">
          Canceled
        </Badge>
      )
    default:
      return (
        <Badge variant="outline" className="text-sm px-3 py-1">
          {status}
        </Badge>
      )
  }
}