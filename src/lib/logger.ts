/**
 * @file logger.ts
 * @description Production-safe Logger module for ProjectForge AI.
 * Prevents raw console output leakage in production while preserving diagnostic logs in development.
 * @module Logger
 */

const isProd = process.env.NODE_ENV === "production";

/**
 * Log informational message.
 * @param {...unknown[]} args - Arguments to log.
 */
export function logInfo(...args: unknown[]): void {
  if (!isProd) {
    console.log("ℹ️ [ProjectForge Info]:", ...args);
  }
}

/**
 * Log warning message.
 * @param {...unknown[]} args - Arguments to log.
 */
export function logWarn(...args: unknown[]): void {
  if (!isProd) {
    console.warn("⚠️ [ProjectForge Warning]:", ...args);
  }
}

/**
 * Log error message safely.
 * @param {...unknown[]} args - Arguments to log.
 */
export function logError(...args: unknown[]): void {
  const sanitizedArgs = args.map((arg) => (arg instanceof Error ? arg.message : String(arg)));
  console.error("❌ [ProjectForge Error]:", ...sanitizedArgs);
}
