// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  timeout: 100 * 1000,

  expect: {
    timeout: 100 * 1000,
  },

  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],

  use: {
    browserName: 'chromium',
    headless: true,             // MUST be true for Jenkins
    screenshot: 'only-on-failure', 
    trace: 'retain-on-failure',
  },
});
