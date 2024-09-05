/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node",
  ],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  testEnvironment: "jsdom",

  // Transformar archivos usando babel-jest para pruebas
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },

  transformIgnorePatterns: ["/node_modules/", "\\.pnp\\.[^\\/]+$"],

  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/context/(.*)$": "<rootDir>/src/context/$1",
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
  },
};

module.exports = config;
