import { Given, When, Then } from './fixtures';
import { expect } from '@playwright/test';

Given('the user visits the homepage', async ({page}) => {
  await page.goto('http://sharevalue.nl'); 
});

When('all cookies are cleared', async  ({page}) =>{
    await page.context().clearCookies();
  });

Then('the cookie banner should be visible', async ({page}) => {
  const banner = page.locator('.cookie-banner');
  await expect(banner).toBeVisible();
});

When('the user clicks the {string} button', async ({page}, buttonLabel: string) => {
  const banner = page.locator('.cookie-banner');
  const acceptButton = page.getByRole('button', { name: buttonLabel });
  console.log('Selected button to click: ',  acceptButton);
  await acceptButton.click();
});

Then('the cookie banner should disappear', async ({page}) =>{
  const banner = page.locator('.cookie-banner');
  await expect(banner).toBeHidden();
});

Then('the {string} cookie should be set to {string}', async ({page}, cookieName: string, value: string) => {
  const cookies = await page.context().cookies();
  const cookie = cookies.find(c => c.name === cookieName);
  console.log('Cookie: ', cookie);
  expect(cookie?.value).toBe(value);
});
