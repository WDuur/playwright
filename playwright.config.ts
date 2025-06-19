import { defineConfig } from '@playwright/test';

require('dotenv').config();

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL ,   // ✅ Hier stel je je basis-URL in
    headless: true,                      // Zet op false voor visuele browser
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',       // of 'on', 'off'
    video: 'retain-on-failure',          // of 'on', 'off'
  },
  timeout: 30 * 1000,                    // 30 seconden per test
  retries: 1,                            // Herprobeer bij falen
  testDir: './tests',                    // Map waar je tests staan
});