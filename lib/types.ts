export type BuildStatus = "queued" | "in_progress" | "success" | "failed" | "canceled"

export interface BuildArtifact {
  name: string
  size: string
  url: string
}

export interface Build {
  id: string
  createdAt: string
  branch: string
  commit: string
  status: BuildStatus
  duration: number
  environment: string
  logs: string
  config: Record<string, any>
  artifacts: BuildArtifact[]
}