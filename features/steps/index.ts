import { expect } from '@playwright/test';
import { Given, When, Then } from './fixtures';

import { BASE_DOMAIN } from './selectors';

Given('I am on website homepage', async ({ page }) => {
  await page.goto(BASE_DOMAIN);
});

When('I click link {string}', async ({ page }, name: string) => {
  await page.getByRole('link', { name }).click();
});

Then('I see in title {string}', async ({ page }, text: string) => {
  const title = await page.title();
  console.log(`Title on the page is: ${title}`);
  await expect(page).toHaveTitle(new RegExp(text));
});
