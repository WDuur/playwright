import { expect } from '@playwright/test';
import { Given, When, Then } from './fixtures';

Given('I am on website home page', async ({ page }) => {
  await page.goto('https://www.sharevalue.nl' );
});

When('I click link {string}', async ({ page }, name: string) => {
  await page.getByRole('link', { name }).click();
});

Then('I see in title {string}', async ({ page }, text: string) => {
  const title = await page.title(); // Await the promise to get the title
  console.log(`Title on the page is: ${title}`);
  await expect(page).toHaveTitle(new RegExp(text));
});

