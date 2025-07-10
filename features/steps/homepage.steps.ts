import { expect } from '@playwright/test';
import { When, Then } from './fixtures';

When('@fast I am on website home page', async ({ page }) => {
  await page.goto('https://www.sharevalue.nl');
});

Then('I see see a slider on the page as heroImage', async ({ page }) => {
  const heroSection = page.locator('section[__component="hero.primary-slider"]');
  await expect(heroSection).toBeVisible();
});

Then(
  'the swiper container should have exactly {int} slides',
  async ({ page }, expectedCount: number) => {
    const heroSection = page.locator('section[__component="hero.primary-slider"]');
    console.log(`Hero section found: ${heroSection}`);
    const swiper = heroSection.locator('swiper-container');
    await expect(swiper).toBeVisible();
    const slides = heroSection.locator('swiper-slide');
    console.log(`Number of slides found in hero section: ${await slides.count()}`);
    console.log(slides);
    await expect(slides).toHaveCount(expectedCount);
  },
);

// Then('I see see a slider on the page as heroImage', async ({ page }) => {
//   const swiperContainer = await page.locator('swiper-container').first();
//   console.log(`Swiper container found: ${(await swiperContainer.count()) > 0}`);
//   await expect(swiperContainer).toBeVisible();
// });

// Then('the swiper container should have exactly 2 slides', async ({ page }) => {
//   const firstSwiper = page.locator('swiper-container').first();
//   const slides = firstSwiper.locator('swiper-slide');
//   await expect(slides).toHaveCount(2);
// });

Then('one slide should have the {string} class', async ({ page }, expectedClass: string) => {
  const firstSwiper = page.locator('swiper-container').first();
  const slides = firstSwiper.locator('swiper-slide');
  const count = await slides.count();

  console.log(`Number of slides found in first swiper-container: ${count}`);
  console.log(slides);

  let found = false;
  for (let i = 0; i < count; i++) {
    const slide = slides.nth(i);
    console.log(`Checking slide ${i + 1} for class "${expectedClass}"`);
    const className = await slide.getAttribute('class');
    if (className && className.includes(expectedClass)) {
      found = true;
      break;
    }
  }

  expect(found).toBeTruthy();
});

Then('I see a hero slider on the page', async ({ page }) => {
  const heroSection = page.locator('section[__component="hero.primary-slider"]');
  await expect(heroSection).toBeVisible();
});

When(
  'I click on the hero slide button number {int} that slide should be {string}',
  async ({ page }, slideIndex: number, expectedClass: string) => {
    const heroSection = page.locator('section[__component="hero.primary-slider"]');

    const nextButton = page
      .locator(`.swiper-pagination-bullet[aria-label="Go to slide ${slideIndex}"]`)
      .first();

    await expect(nextButton).toBeVisible();
    await nextButton.click();

    const firstSwiper = heroSection.locator('swiper-container');

    const activeSlide = firstSwiper.locator('swiper-slide').nth(slideIndex - 1);

    const className = await activeSlide.getAttribute('class');
    expect(className).toContain(expectedClass);
  },
);
