import { Given, When, Then } from './fixtures';
import { expect } from '@playwright/test';

const COOKIE_BANNER_SELECTOR = '.cookie-banner';

Given('the user visits the homepage', async ({ page }) => {
  await page.goto('http://sharevalue.nl');
});

When('all cookies are cleared', async ({ page }) => {
  await page.context().clearCookies();
});

Then('the cookie banner should be {string}', async ({ page }, visibility) => {
  const banner = page.locator(COOKIE_BANNER_SELECTOR);
  if (visibility === 'visible') {
    await expect(banner).toBeVisible();
  } else if (visibility === 'not visible') {
    await expect(banner).not.toBeVisible();
  } else {
    throw new Error(`Unknown visibility state: ${visibility}`);
  }
});

When('the user clicks the {string} button', async ({ page }, buttonLabel: string) => {
  const button = page.getByRole('button', { name: buttonLabel });
  await button.click();
});

Then('the cookie banner should disappear', async ({ page }) => {
  const banner = page.locator(COOKIE_BANNER_SELECTOR);
  await expect(banner).toBeHidden();
});

Then('the {string} cookie should be set to {string}', async ({ page }, cookieName: string, value: string) => {
  const cookies = await page.context().cookies();
  const cookie = cookies.find(c => c.name === cookieName);
  expect(cookie?.value).toBe(value);
});

When('the user clicks the {string} link', async ({ page }, linkText: string) => {
  const link = page.locator(`${COOKIE_BANNER_SELECTOR} p:nth-of-type(3)`);
  await expect(link).toHaveText(linkText);
  await link.click();
});

Then('the cookie settings should be shown', async ({ page }) => {
  const title = page.locator(`${COOKIE_BANNER_SELECTOR} p:nth-of-type(1)`, { hasText: 'Cookies beheren' });
  await expect(title).toHaveText('Cookies beheren');
});

When('the user clicks the checkbox to accept the cookies', async ({ page }) => {
  const checkbox = page.locator(`${COOKIE_BANNER_SELECTOR} input[type="checkbox"]`);
  await expect(checkbox).toHaveCount(1);
  await checkbox.check();
});