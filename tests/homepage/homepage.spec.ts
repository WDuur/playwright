import { test, expect, defineConfig } from '@playwright/test';

test('homepage laadt correct', async ({ page, baseURL }) => {
  console.log(baseURL, page);
  await page.goto('/');  
  expect: {timeout: 5000}
  await expect(page).toHaveURL('https://www.sharevalue.nl/'); 
  await expect(page).toHaveTitle(/ShareValue, de standaard voorbij/);
});

