// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // ❌ Disable full parallelism (important for Firefox stability)
  fullyParallel: false,

  // ✅ Control workers explicitly
  workers: 3,

  forbidOnly: !!process.env.CI,

  // Retry once to handle flaky network responses
  retries: 1,

  reporter: 'html',

  use: {
    headless: false,           // matches your --headed runs
    actionTimeout: 20000,
    navigationTimeout: 30000,
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
