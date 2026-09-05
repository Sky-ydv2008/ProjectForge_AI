/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.[jt]s"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
  ],
};

module.exports = config;
