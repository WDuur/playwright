import { expect } from '@playwright/test';
import { When, Then } from './fixtures';

import {
  BULLET_SELECTOR,
  SLIDE_SELECTOR,
  SEGMENT_SELECTORS,
  HERO_SECTION_SELECTOR,
  GLOBAL_PAGE_SELECTOR,
  QUOTES_SELECTOR,
} from './util/selectors';

import { CUSTOMERS_SELECTOR } from './util/customer-cases';

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

Then(
  'I should see a paragraph containing the description about the {string} segment',
  async ({ page }, segmentKey: string) => {
    const paragraph = page.locator(`${SEGMENT_SELECTORS[segmentKey.toLowerCase()]} p`);
    await expect(paragraph).toBeVisible();
    const text = await paragraph.textContent();
    expect(text && text.trim().length).toBeGreaterThan(0);
  },
);

Then(
  'This {string} segment has {string} partner logos',
  async ({ page }, segmentKey: string, count: string) => {
    const partnerLogos = page.locator(`${SEGMENT_SELECTORS[segmentKey.toLowerCase()]} img`);
    await expect(partnerLogos).toHaveCount(parseInt(count));
  },
);

Then(
  'On the {string} is a cta with a link to {string}',
  async ({ page }, segmentKey: string, link: string) => {
    const cta = page.locator(`${SEGMENT_SELECTORS[segmentKey.toLowerCase()]} a`);
    await expect(cta).toHaveAttribute('href', link);
  },
);

Then(
  'there are {string} blocks to explain how we {string} with a image, title and paragraph',
  async ({ page }, count: string, segmentKey: string) => {
    const selector = SEGMENT_SELECTORS[segmentKey.toLowerCase()];
    const blocks = page.locator(`${selector} li`);
    const expectedCount = parseInt(count);

    await expect(blocks).toHaveCount(expectedCount);

    for (let i = 0; i < expectedCount; i++) {
      const block = blocks.nth(i);
      const img = block.locator('img');
      const title = block.locator('h3');
      const paragraph = block.locator('p');

      await expect(img, `Missing <img> in block ${i + 1}`).toHaveAttribute('src', /.+/);
      await expect(title, `Missing <h3> in block ${i + 1}`).toHaveText(/.+/);
      await expect(paragraph, `Missing <p> in block ${i + 1}`).toHaveText(/.+/);
    }
  },
);

Then(
  'there are {string} blocks to show {string} with a image',
  async ({ page }, count: string, segmentKey: string) => {
    const selector = SEGMENT_SELECTORS[segmentKey.toLowerCase()];
    const blocks = page.locator(`${selector} li`);
    const expectedCount = parseInt(count);

    await expect(blocks).toHaveCount(expectedCount);

    for (let i = 0; i < expectedCount; i++) {
      const block = blocks.nth(i);
      const img = block.locator('.customer-image');

      await expect(img, `Missing <img> in block ${i + 1}`).toHaveAttribute('src', /.+/);
    }
  },
);

Then(
  'there is a block for {string} with a url to the customerscase page',
  async ({ page }, customerKey: string) => {
    const link = page.locator(`a[title*="Bezoek de website van ${customerKey}"]`);
    await expect(link).toHaveCount(1);
    const normalized = customerKey.toLowerCase().replace(/\s+/g, '');
    await expect(link).toHaveAttribute('href', CUSTOMERS_SELECTOR[normalized]);
  },
);

Then(
  'the {string} should have exactly {string} slides with quotes',
  async ({ page }, segmentKey: string, count: string) => {
    const expectedCount = parseInt(count);
    console.log(expectedCount);
    const slides = page.locator(`${SEGMENT_SELECTORS[segmentKey.toLowerCase()]} ${SLIDE_SELECTOR}`);
    await expect(slides).toHaveCount(expectedCount);
  },
);

When(
  'I click on every bullet at the {string} slider',
  async function ({ page }, segmentKey: string) {
    const segment = page.locator(SEGMENT_SELECTORS[segmentKey.toLowerCase()]);
    console.log('segment html', segment);
    this.selectedSegment = segment;

    const bullets = segment.locator(BULLET_SELECTOR);
    this.bulletCount = await bullets.count();
    this.clickedBulletIndexes = [];

    for (let i = 0; i < this.bulletCount; i++) {
      const bullet = bullets.nth(i);
      console.log('>>>> ', bullets);
      const slide = bullets.nth(i);

      const title = slide.locator('h2');
      const paragraph = slide.locator('h4');
      await expect(title, `Missing <h2> in block ${i + 1}`).toHaveText(/.+/);
      await expect(paragraph, `Missing <h2> in block ${i + 1}`).toHaveText(/.+/);
      await bullet.click();
      await page.waitForTimeout(500);
      this.clickedBulletIndexes.push(i);
    }
  },
);

Then('the corresponding {string} slide is active', async function ({ page }) {
  const swiperSlides = this.heroSection.locator(SLIDE_SELECTOR);
  for (const index of this.clickedBulletIndexes) {
    const activeSlide = swiperSlides.nth(index);
    await expect(activeSlide).toHaveClass(/swiper-slide-active/);
  }
});
