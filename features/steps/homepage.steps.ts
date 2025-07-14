import { expect } from '@playwright/test';
import { When, Then } from './fixtures';

import {
  HERO_SECTION_SELECTOR,
  BULLET_SELECTOR,
  SLIDE_SELECTOR,
  GLOBAL_PAGE_SELECTOR,
} from './selectors';
import { stringify } from 'querystring';

Then('I see a slider on the page as heroImage', async ({ page }) => {
  const heroSection = page.locator(HERO_SECTION_SELECTOR);
  await expect(heroSection).toBeVisible();
});

Then('the swiper should have exactly {int} slides', async ({ page }, expectedCount: number) => {
  const slides = page.locator(`${HERO_SECTION_SELECTOR} ${SLIDE_SELECTOR}`);
  await expect(slides).toHaveCount(expectedCount);
});

When('I click on every bullet at the hero slider', async function ({ page }) {
  const heroSection = page.locator(HERO_SECTION_SELECTOR);
  this.heroSection = heroSection;

  const bullets = heroSection.locator(BULLET_SELECTOR);
  this.bulletCount = await bullets.count();
  this.clickedBulletIndexes = [];

  for (let i = 0; i < this.bulletCount; i++) {
    const bullet = bullets.nth(i);
    await bullet.click();
    await page.waitForTimeout(500);
    this.clickedBulletIndexes.push(i);
  }
});

Then('the corresponding slide is active', async function ({ page }) {
  const swiperSlides = this.heroSection.locator(SLIDE_SELECTOR);
  for (const index of this.clickedBulletIndexes) {
    const activeSlide = swiperSlides.nth(index);
    await expect(activeSlide).toHaveClass(/swiper-slide-active/);
  }
});

Then('I should see a header with the text {string}', async ({ page }, headerText: string) => {
  await expect(page.locator(`${GLOBAL_PAGE_SELECTOR} h2`)).toHaveText(headerText);
});

Then('I should see a paragraph containing the description about the header', async ({ page }) => {
  const paragraph = page.locator(`${GLOBAL_PAGE_SELECTOR} .content p`);
  await expect(paragraph).toBeVisible();
  const text = await paragraph.textContent();
  expect(text && text.trim().length).toBeGreaterThan(0);
});
