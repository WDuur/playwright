import { test, expect } from '@playwright/test';

test('should open hamburger menu', async ({ page }) => {

  await page.goto('/');

  await page.click('button.flex.flex-col.justify-end');

  // Expect the menu to appear (wait for visibility)
  const menu = page.locator('.desktop-menu-content');
  await expect(menu).toBeVisible();
});
