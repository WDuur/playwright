import { expect } from '@playwright/test';
import { When, Then } from './fixtures';

import {
  BULLET_SELECTOR,
  SLIDE_SELECTOR,
  SEGMENT_SELECTORS,
  HERO_SECTION_SELECTOR,
  GLOBAL_PAGE_SELECTOR,
  EXPERTISE_BLOCK_SELECTOR,
} from './util/selectors';

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

Then('I see the {string} segment on the homepage', async ({ page }, segmentKey: string) => {
  const selector = SEGMENT_SELECTORS[segmentKey.toLowerCase()];
  if (!selector) throw new Error(`No selector found for segment: ${segmentKey}`);

  const segment = page.locator(selector);
  await expect(segment).toBeVisible();
});

Then(
  'The {string} segment has {string} as title',
  async ({ page }, segmentKey: string, segmentTitle: string) => {
    const selector = SEGMENT_SELECTORS[segmentKey.toLowerCase()];
    const title = page.locator(`${selector} h2`);
    expect(title).toHaveText(segmentTitle);
  },
);

Then(
  'The {string} segment has {string} as label',
  async ({ page }, segmentKey: string, segmentLabel: string) => {
    const selector = SEGMENT_SELECTORS[segmentKey.toLowerCase()];
    const label = page.locator(`${selector} aside div`);
    expect(label).toHaveText(segmentLabel);
  },
);

Then('there is one expertise block for {string}', async ({ page }, expertise: string) => {
  const expertiseBlock = page.locator(
    `${SEGMENT_SELECTORS['expertise']} ul li a[title="${expertise}"]`,
  );
  await expect(expertiseBlock).toBeVisible();
  const expertiseUrl = expertise.replace(/\s+/g, '-').toLowerCase();
  const href = await expertiseBlock.getAttribute('href');
  expect(href).toBe(`/wat-we-doen/${expertiseUrl}`);
});
