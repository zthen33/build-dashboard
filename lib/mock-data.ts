import type { Build } from "@/lib/types"

export const mockBuilds: Build[] = [
  {
    id: "1234567890abcdef",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    branch: "main",
    commit: "7f8d9e2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e",
    status: "success",
    duration: 124,
    environment: "production",
    logs: `> build-app@1.0.0 build
> next build

info  - Loaded env from /app/.env
info  - Linting and checking validity of types...
info  - Creating an optimized production build...
info  - Compiled successfully
info  - Collecting page data...
info  - Generating static pages (0/5)
info  - Generating static pages (1/5)
info  - Generating static pages (2/5)
info  - Generating static pages (3/5)
info  - Generating static pages (4/5)
info  - Generating static pages (5/5)
info  - Finalizing page optimization...

Route (app)                              Size     First Load JS
┌ ○ /                                    5.3 kB         87.4 kB
├ ○ /_not-found                          0 B            82.1 kB
├ λ /api/builds                          0 B            82.1 kB
└ λ /api/deployments                     0 B            82.1 kB
+ First Load JS shared by all            82.1 kB
  ├ chunks/938-d45e49d9c6a7a1ff.js       26.8 kB
  ├ chunks/fd9d1056-d5d8d8df7e6a1e50.js  53.3 kB
  └ other shared chunks                  2 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)

Build completed in 12.4s`,
    config: {
      framework: "nextjs",
      nodeVersion: "18.x",
      buildCommand: "npm run build",
      installCommand: "npm install",
      outputDirectory: ".next",
      rootDirectory: "",
    },
    artifacts: [
      { name: "build-output.zip", size: "14.2 MB", url: "#" },
      { name: "build-logs.txt", size: "24.5 KB", url: "#" },
    ],
  },
  {
    id: "2345678901bcdefg",
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    branch: "feature/new-dashboard",
    commit: "1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s",
    status: "failed",
    duration: 78,
    environment: "development",
    logs: `> build-app@1.0.0 build
> next build

info  - Loaded env from /app/.env
info  - Linting and checking validity of types...
info  - Creating an optimized production build...
Failed to compile.

./components/dashboard/chart.tsx:42:10
Type error: Property 'datasets' does not exist on type 'ChartData'.

  40 |   const chartData = {
  41 |     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
> 42 |     datasets: [
     |          ^
  43 |       {
  44 |         label: 'Sales',
  45 |         data: [12, 19, 3, 5, 2, 3],

Error: Command "npm run build" exited with 1`,
    config: {
      framework: "nextjs",
      nodeVersion: "18.x",
      buildCommand: "npm run build",
      installCommand: "npm install",
      outputDirectory: ".next",
      rootDirectory: "",
    },
    artifacts: [{ name: "build-logs.txt", size: "18.3 KB", url: "#" }],
  },
  {
    id: "3456789012cdefgh",
    createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(), // 4 hours ago
    branch: "fix/auth-issue",
    commit: "9s8r7q6p5o4n3m2l1k0j9i8h7g6f5e4d3c2b1a",
    status: "success",
    duration: 98,
    environment: "staging",
    logs: `> build-app@1.0.0 build
> next build

info  - Loaded env from /app/.env
info  - Linting and checking validity of types...
info  - Creating an optimized production build...
info  - Compiled successfully
info  - Collecting page data...
info  - Generating static pages (0/3)
info  - Generating static pages (1/3)
info  - Generating static pages (2/3)
info  - Generating static pages (3/3)
info  - Finalizing page optimization...

Route (app)                              Size     First Load JS
┌ ○ /                                    5.3 kB         87.4 kB
├ ○ /_not-found                          0 B            82.1 kB
└ λ /api/auth                            0 B            82.1 kB
+ First Load JS shared by all            82.1 kB
  ├ chunks/938-d45e49d9c6a7a1ff.js       26.8 kB
  ├ chunks/fd9d1056-d5d8d8df7e6a1e50.js  53.3 kB
  └ other shared chunks                  2 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)

Build completed in 9.8s`,
    config: {
      framework: "nextjs",
      nodeVersion: "18.x",
      buildCommand: "npm run build",
      installCommand: "npm install",
      outputDirectory: ".next",
      rootDirectory: "",
    },
    artifacts: [
      { name: "build-output.zip", size: "12.8 MB", url: "#" },
      { name: "build-logs.txt", size: "22.1 KB", url: "#" },
    ],
  },
  {
    id: "4567890123defghi",
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 minutes ago
    branch: "main",
    commit: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9",
    status: "in_progress",
    duration: 45,
    environment: "production",
    logs: `> build-app@1.0.0 build
> next build

info  - Loaded env from /app/.env
info  - Linting and checking validity of types...
info  - Creating an optimized production build...
info  - Compiled successfully
info  - Collecting page data...
info  - Generating static pages (0/5)
info  - Generating static pages (1/5)
info  - Generating static pages (2/5)
...`,
    config: {
      framework: "nextjs",
      nodeVersion: "18.x",
      buildCommand: "npm run build",
      installCommand: "npm install",
      outputDirectory: ".next",
      rootDirectory: "",
    },
    artifacts: [],
  },
  {
    id: "5678901234efghij",
    createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(), // 6 hours ago
    branch: "feature/analytics",
    commit: "z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g",
    status: "success",
    duration: 112,
    environment: "development",
    logs: `> build-app@1.0.0 build
> next build

info  - Loaded env from /app/.env
info  - Linting and checking validity of types...
info  - Creating an optimized production build...
info  - Compiled successfully
info  - Collecting page data...
info  - Generating static pages (0/4)
info  - Generating static pages (1/4)
info  - Generating static pages (2/4)
info  - Generating static pages (3/4)
info  - Generating static pages (4/4)
info  - Finalizing page optimization...

Route (app)                              Size     First Load JS
┌ ○ /                                    5.3 kB         87.4 kB
├ ○ /analytics                           8.2 kB         95.3 kB
├ ○ /_not-found                          0 B            82.1 kB
└ λ /api/analytics                       0 B            82.1 kB
+ First Load JS shared by all            82.1 kB
  ├ chunks/938-d45e49d9c6a7a1ff.js       26.8 kB
  ├ chunks/fd9d1056-d5d8d8df7e6a1e50.js  53.3 kB
  └ other shared chunks                  2 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)

Build completed in 11.2s`,
    config: {
      framework: "nextjs",
      nodeVersion: "18.x",
      buildCommand: "npm run build",
      installCommand: "npm install",
      outputDirectory: ".next",
      rootDirectory: "",
    },
    artifacts: [
      { name: "build-output.zip", size: "15.6 MB", url: "#" },
      { name: "build-logs.txt", size: "25.2 KB", url: "#" },
    ],
  },
]
