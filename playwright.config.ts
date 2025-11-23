// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  globalSetup: require.resolve("./global-setup"),
  fullyParallel: true,

  use: {
    baseURL: "https://example.com",
    storageState: "state.json",
    headless: true,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
  ],

  reporter: [["list"]],
});
