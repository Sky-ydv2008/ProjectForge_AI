/**
 * @file security.test.ts
 * @description Unit tests for Enterprise Security Sanitizer & Environment Isolation.
 */

import assert from "assert";
import { sanitizeInputText, validateEnvironmentSecurity } from "../src/lib/security/sanitizer";

export function runSecurityTests() {
  console.log("🧪 Running Security & Input Sanitizer Unit Tests...");

  // Test 1: XSS script tag stripping
  const maliciousInput = "<script>alert('xss')</script>Hello ProjectForge";
  const sanitized = sanitizeInputText(maliciousInput);
  assert.strictEqual(sanitized, "Hello ProjectForge", "Should strip script tags");

  // Test 2: Javascript protocol stripping
  const jsInput = "javascript:alert('attack')";
  const sanitizedJs = sanitizeInputText(jsInput);
  assert.strictEqual(sanitizedJs, "alert('attack')", "Should strip javascript: prefix");

  // Test 3: Environment isolation check
  const isSecure = validateEnvironmentSecurity();
  assert.strictEqual(isSecure, true, "Environment isolation check should pass");

  console.log("   ✅ 3/3 Security & Input Sanitizer tests passed!");
}
