// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

module.exports = defineConfig({
  testDir: './tests',
  // Run all tests in parallel
  fullyParallel: true,
  // Fail CI builds on accidental test.only usage
  forbidOnly: !!process.env.CI,
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  // Reporter
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    // Navigate to the local index.html file for all tests
    baseURL: `file://${path.resolve(__dirname, 'index.html')}`,
    // Collect trace only when a test retries
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
