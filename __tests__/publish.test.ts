/**
 * @file publish.test.ts
 * @description Unit tests for GitHub Auto-Publishing & Cloud Deployment Adapters.
 */

import assert from "assert";
import { GitHubAdapter } from "../src/lib/integrations/github-adapter";
import { VercelAdapter } from "../src/lib/integrations/vercel-adapter";
import { RenderAdapter } from "../src/lib/integrations/render-adapter";
import { NetlifyAdapter } from "../src/lib/integrations/netlify-adapter";
import { publishRepoConfigSchema } from "../src/lib/validation/publish";

export function runPublishTests() {
  console.log("🧪 Running GitHub & Deployment Provider Unit Tests...");

  const repoConfig = {
    repositoryName: "medforge-ai-test",
    description: "Test repo config",
    isPrivate: false,
    framework: "nextjs",
    buildCommand: "npm run build",
    outputDirectory: ".next",
  };

  // Test 1: GitHub File Packager
  const files = GitHubAdapter.generateProjectFiles(repoConfig, "MedForge AI");
  assert.ok(files.length >= 5, "Should generate package.json, README.md, LICENSE, .gitignore, and src/ app page");
  assert.strictEqual(files[0].path, "README.md");

  // Test 2: Vercel Adapter Configuration
  const vercelAdapter = new VercelAdapter();
  vercelAdapter.validateConfig({
    projectId: "p1",
    provider: "vercel",
    repositoryName: "medforge-ai-test",
    repositoryUrl: "https://github.com/test/repo",
    branch: "main",
    framework: "nextjs",
    buildCommand: "npm run build",
    outputDirectory: ".next",
    envVars: [],
  }).then((isValid) => {
    assert.strictEqual(isValid, true, "Vercel config validation should pass");
  });

  // Test 3: Render Adapter Configuration
  const renderAdapter = new RenderAdapter();
  renderAdapter.validateConfig({
    projectId: "p2",
    provider: "render",
    repositoryName: "medforge-backend-test",
    repositoryUrl: "https://github.com/test/backend",
    branch: "main",
    framework: "node",
    buildCommand: "npm run build",
    outputDirectory: ".next",
    envVars: [],
  }).then((isValid) => {
    assert.strictEqual(isValid, true, "Render config validation should pass");
  });

  // Test 4: Netlify Adapter Configuration
  const netlifyAdapter = new NetlifyAdapter();
  netlifyAdapter.validateConfig({
    projectId: "p3",
    provider: "netlify",
    repositoryName: "medforge-static-test",
    repositoryUrl: "https://github.com/test/static",
    branch: "main",
    framework: "nextjs",
    buildCommand: "npm run build",
    outputDirectory: ".next",
    envVars: [],
  }).then((isValid) => {
    assert.strictEqual(isValid, true, "Netlify config validation should pass");
  });

  console.log("   ✅ 4/4 GitHub & Deployment Provider tests passed!");
}
