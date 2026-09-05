# ProjectForge AI — REST API Contract Reference

> **Official PromptWars V2 RESTful API Specification**

## API Endpoints Reference

### 1. AI Project Generation
* **Route:** `POST /api/projects/generate`
* **Access Level:** Authenticated User
* **Request Payload:** `StudentProfileInput` (Zod validated)
* **Response:** `{ success: true, projects: AIProjectCandidate[] }`

### 2. Scope Explosion Rescue
* **Route:** `POST /api/projects/rescue`
* **Access Level:** Authenticated User
* **Request Payload:** `{ profile: StudentProfileInput, candidate?: AIProjectCandidate }`
* **Response:** `{ success: true, rescueResult: RescueResult }`

### 3. Technical Blueprint Generator
* **Route:** `POST /api/projects/blueprint`
* **Access Level:** Authenticated User
* **Request Payload:** `{ profile: StudentProfileInput, customProblemStatement?: string }`
* **Response:** `{ success: true, blueprint: ProjectBlueprint }`

### 4. Task Roadmap Generator
* **Route:** `POST /api/projects/roadmap`
* **Access Level:** Authenticated User
* **Request Payload:** `{ profile: StudentProfileInput, projectTitle?: string }`
* **Response:** `{ success: true, roadmap: ProjectRoadmap }`

### 5. Project-Aware AI Mentor
* **Route:** `POST /api/projects/mentor`
* **Access Level:** Authenticated User
* **Request Payload:** `{ message: string, profile?: StudentProfileInput }`
* **Response:** `{ success: true, message: MentorMessage }`

### 6. GitHub Integration Status & Connect
* **Route:** `GET /api/integrations/github/status` | `POST /api/integrations/github/connect`
* **Access Level:** Authenticated User
* **Response:** `{ success: true, status: { oauthConfigured: boolean } }`

### 7. Programmatic GitHub Repository Publisher
* **Route:** `POST /api/projects/publish/github`
* **Access Level:** Authenticated User
* **Request Payload:** `{ repoConfig: PublishRepoConfig, token: string }`
* **Response:** `{ success: true, repositoryUrl: string, commitSha: string }`

### 8. Cloud Deployment Trigger
* **Route:** `POST /api/projects/deploy`
* **Access Level:** Authenticated User
* **Request Payload:** `{ provider: "vercel" | "render" | "netlify", repositoryName: string }`
* **Response:** `{ success: true, deploymentResult: DeploymentStatusResult }`

### 9. Deployment Retry Engine
* **Route:** `POST /api/deployments/:id/retry`
* **Access Level:** Authenticated User
* **Response:** `{ success: true, deploymentResult: DeploymentStatusResult }`
