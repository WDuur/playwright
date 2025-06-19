import { test, expect } from '@playwright/test';

test('cookies worden geaccepteerd en juiste cookie is gezet', async ({ page, context }) => {

  await context.clearCookies();
  await page.goto('/');

  const cookieBanner = page.locator('.cookie-banner');
  await expect(cookieBanner).toBeVisible();

  const accepteerButton = cookieBanner.getByRole('button', { name: /accepteren/i });
  await accepteerButton.click();
  await expect(cookieBanner).toBeHidden();

  const cookies = await context.cookies();
  console.log('Cookies:', cookies);

  const consentCookie = cookies.find(cookie => cookie.name === 'cookieConsent');
  expect(consentCookie).toBeDefined();
  expect(consentCookie?.value).toBe('true');
});

test('cookies worden geweigerd', async ({ page, context }) => {
  await context.clearCookies();
  await page.goto('/');

  const cookieBanner = page.locator('.cookie-banner');
  await expect(cookieBanner).toBeVisible();

  const weigerenButton = cookieBanner.getByRole('button', { name: /weigeren/i });
  await weigerenButton.click();

  await expect(cookieBanner).toBeHidden();

  const cookies = await context.cookies();
  const trackingCookies = cookies.filter((c) =>
    ['ga', '_ga', '_gid', 'tracking'].some(name => c.name.includes(name))
  );
  console.log('Tracking cookies:', trackingCookies);
  expect(trackingCookies.length).toBe(0); 
});