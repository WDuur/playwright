import { expect } from '@playwright/test';
import { When, Then } from './fixtures';

import { BASE_DOMAIN, HERO_SECTION_SELECTOR, BULLET_SELECTOR, SLIDE_SELECTOR } from './selectors';

When('I am on website homepage', async ({ page }) => {
  await page.goto(BASE_DOMAIN);
});

Then('I see see a slider on the page as heroImage', async ({ page }) => {
  const heroSection = page.locator(HERO_SECTION_SELECTOR);
  await expect(heroSection).toBeVisible();
});

Then(
  'the swiper should have exactly {int} slides',
  async ({ page }, expectedCount: number) => {
    const heroSection = page.locator(HERO_SECTION_SELECTOR);
    const slides = heroSection.locator(SLIDE_SELECTOR);
    await expect(slides).toHaveCount(expectedCount);
  },
);

When('I click on every bullet at the hero slider', async function ({ page }) {
  const heroSection = page.locator(HERO_SECTION_SELECTOR);
  this.heroSection = heroSection;

  const bullets = heroSection.locator(BULLET_SELECTOR);
  this.bulletCount = await bullets.count();
  this.clickedBulletIndexes = [];

  for (let i = 0; i < this.bulletCount; i++) {
    const bullet = bullets.nth(i);
    await bullet.click();
    await page.waitForTimeout(500); // Reduced timeout for faster tests
    this.clickedBulletIndexes.push(i);
  }
});


Then('the corresponding slide is active', async function ({ page }) {
  const swiperSlides = this.heroSection.locator(SLIDE_SELECTOR);

  for (const index of this.clickedBulletIndexes) {
    const activeSlide = swiperSlides.nth(index);
    // Hier check je of deze slide nu echt actief was
    await expect(activeSlide).toHaveClass(/swiper-slide-active/);
  }
});