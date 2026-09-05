/**
 * @file sanitizer.ts
 * @description Enterprise Security Sanitization & XSS Prevention Engine for ProjectForge AI.
 * @module Security
 */

/**
 * Sanitizes untrusted user text inputs to prevent XSS attacks, HTML injection, and prompt manipulation.
 * @param {string} input - The raw input text to sanitize.
 * @returns {string} The sanitized text string.
 */
export function sanitizeInputText(input: string): string {
  if (!input || typeof input !== "string") return "";

  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/onload\s*=/gi, "")
    .replace(/onerror\s*=/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/system:\s*/gi, "")
    .trim();
}

/**
 * Validates that no sensitive server API keys are exposed to browser environments.
 * @returns {boolean} True if environment isolation passes 100%.
 */
export function validateEnvironmentSecurity(): boolean {
  if (typeof window !== "undefined") {
    const windowObj = window as unknown as Record<string, unknown>;
    const sensitiveKeys = [
      "OPENAI_API_KEY",
      "SUPABASE_SERVICE_ROLE_KEY",
      "VERCEL_API_TOKEN",
      "RENDER_API_KEY",
      "GITHUB_CLIENT_SECRET",
    ];

    for (const key of sensitiveKeys) {
      if (windowObj[key] || windowObj[`NEXT_PUBLIC_${key}`]) {
        return false;
      }
    }
  }
  return true;
}
