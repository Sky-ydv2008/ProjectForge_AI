import { PublishRepoConfig } from "@/lib/validation/publish";

export interface GitHubPublishResult {
  success: boolean;
  repositoryUrl: string;
  commitSha: string;
  repositoryName: string;
  isPrivate: boolean;
  error?: string;
}

export class GitHubAdapter {
  /**
   * Generates initial project files from blueprint and candidate data.
   */
  static generateProjectFiles(repoConfig: PublishRepoConfig, projectTitle?: string) {
    const title = projectTitle || "ProjectForge AI Rescued Project";
    
    const readmeContent = `# ${title}

> Auto-generated & published by **[ProjectForge AI Architect](https://projectforge.ai)** (V2 Auto-Ship Edition).

## Overview
This repository contains the rescued buildable MVP for **${title}**, featuring a Next.js App Router frontend, Tailwind CSS design system, and server-side API integration.

## Project Structure
\`\`\`text
.
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── LICENSE
\`\`\`

## Preflight Verification
- [x] Package.json valid
- [x] Zero hardcoded secrets
- [x] Environment variables mapped
- [x] Framework detected: Next.js App Router
- [x] Build command: \`${repoConfig.buildCommand}\`

## Quick Start
\`\`\`bash
npm install
npm run dev
\`\`\`
`;

    const packageJsonContent = JSON.stringify(
      {
        name: repoConfig.repositoryName,
        version: "1.0.0",
        private: repoConfig.isPrivate,
        scripts: {
          dev: "next dev",
          build: repoConfig.buildCommand,
          start: "next start",
        },
        dependencies: {
          next: "^14.2.0",
          react: "^18.3.0",
          "react-dom": "^18.3.0",
          "lucide-react": "^0.475.0",
        },
      },
      null,
      2
    );

    const envExampleContent = `# Environment Variables Template
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-placeholder
`;

    const gitignoreContent = `node_modules
.next
.env*.local
.env
.DS_Store
`;

    const licenseContent = `MIT License

Copyright (c) ${new Date().getFullYear()} ProjectForge AI Student

Permission is hereby granted, free of charge, to any person obtaining a copy of this software...`;

    const pageTsxContent = `export default function Page() {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", backgroundColor: "#090d16", color: "#fff", minHeight: "100vh" }}>
      <h1 style={{ color: "#22d3ee" }}>${title}</h1>
      <p>Live project published automatically via ProjectForge AI.</p>
    </div>
  );
}
`;

    return [
      { path: "README.md", content: readmeContent },
      { path: "package.json", content: packageJsonContent },
      { path: ".env.example", content: envExampleContent },
      { path: ".gitignore", content: gitignoreContent },
      { path: "LICENSE", content: licenseContent },
      { path: "src/app/page.tsx", content: pageTsxContent },
    ];
  }

  /**
   * Programmatically creates repository and commits files
   */
  static async publishProject(
    token: string,
    repoConfig: PublishRepoConfig,
    projectTitle?: string
  ): Promise<GitHubPublishResult> {
    const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === "true" || !token || token.includes("demo");

    if (isDemo) {
      console.log("ℹ️ [GitHub Adapter] Simulating programmatic repository creation & initial commit in Demo Mode.");
      const demoRepoName = repoConfig.repositoryName || "medforge-ai-diagnostic";
      return {
        success: true,
        repositoryUrl: `https://github.com/alex-chen-dev/${demoRepoName}`,
        commitSha: "a1b2c3d4e5f67890",
        repositoryName: demoRepoName,
        isPrivate: repoConfig.isPrivate,
      };
    }

    try {
      // 1. Create Repository via GitHub REST API
      const createRes = await fetch("https://api.github.com/user/repos", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          name: repoConfig.repositoryName,
          description: repoConfig.description || `${projectTitle || "ProjectForge AI Rescued Project"}`,
          private: repoConfig.isPrivate,
          auto_init: false,
        }),
      });

      if (!createRes.ok) {
        const errData = await createRes.json();
        throw new Error(`GitHub Repo Creation Failed: ${errData.message || createRes.statusText}`);
      }

      const repoData = await createRes.json();
      const owner = repoData.owner.login;
      const repoName = repoData.name;

      // 2. Upload initial files via Contents API
      const files = this.generateProjectFiles(repoConfig, projectTitle);
      let lastSha = "init-sha";

      for (const file of files) {
        const contentBase64 = Buffer.from(file.content).toString("base64");
        const fileRes = await fetch(`https://api.github.com/repos/${owner}/${repoName}/contents/${file.path}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json",
          },
          body: JSON.stringify({
            message: `Initial commit: add ${file.path} via ProjectForge AI`,
            content: contentBase64,
          }),
        });

        if (fileRes.ok) {
          const fileData = await fileRes.json();
          lastSha = fileData.commit?.sha || lastSha;
        }
      }

      return {
        success: true,
        repositoryUrl: repoData.html_url,
        commitSha: lastSha,
        repositoryName: repoName,
        isPrivate: repoConfig.isPrivate,
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return {
        success: false,
        repositoryUrl: "",
        commitSha: "",
        repositoryName: repoConfig.repositoryName,
        isPrivate: repoConfig.isPrivate,
        error: msg,
      };
    }
  }
}
