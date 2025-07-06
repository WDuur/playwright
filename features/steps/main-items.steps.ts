import {  When, Then } from './fixtures';
import { expect } from '@playwright/test';


Then('the menu item {string} should be visible', async  ({page},dataTable) => {
    const expectedItems = dataTable.raw().flat();   
    const submenuLinks = page.locator('nav .menu-item a');
    const count = await submenuLinks.count();
    
    const actualItems = [];
    for (let i = 0; i < count; i++) {
        actualItems.push(await submenuLinks.nth(i).innerText());
    }
});

Then('in the menu there is a ShareValue logo', async function ({page}) {
    const logo = page.locator('a[title="ShareValue B.V."] svg').nth(1);
    await expect(logo).toBeVisible();
});

When('I hover over the {string} menu item', async  ({page}, menuItem: string) => {
    const menuLocator = page.locator(`nav .menu-item a[title="${menuItem}"]`);
    await menuLocator.hover();
});

Then('I should see the following submenu items:', async  ({page},dataTable) => {
    const expectedItems = dataTable.raw().flat();
    const submenuLinks = page.locator('nav .child-menu .menu-item a');
    const count = await submenuLinks.count();

    const actualItems = [];
    for (let i = 0; i < count; i++) {
        actualItems.push(await submenuLinks.nth(i).innerText());
    }
});

Then('I should see the following submenu items under {string}:', async ({ page }, menuTitle, dataTable) => {
    const rows = dataTable.hashes();

    const mainMenu = page.locator(`nav .menu-item a[title="${menuTitle}"]`);
    await mainMenu.hover();

    for (const { text, url } of rows) {
    const submenuLink = page.locator('nav .child-menu .menu-item a', { hasText: text });

    await expect(submenuLink, `Link with text "${text}" should be visible`).toBeVisible();

    const href = await submenuLink.getAttribute('href');
    expect(href).toBe(url);

    const [response] = await Promise.all([
        page.waitForNavigation({ url: `**${url}` }),
        submenuLink.click(),
    ]);

    expect(page.url()).toContain(url);

    await page.goBack();
    await page.waitForLoadState('domcontentloaded');
    await mainMenu.hover();
    }
});

When('the user clicks on the desktop menu button', async  ({page}) => {
    const buttons = page.locator('button:has(svg.nuxt-icon)');
    await buttons.nth(1).click(); 
});


Then('the desktop menu content should be visible', async ({page}) => {
    const menuContent = page.locator('.desktop-menu-content');
    await expect(menuContent).toBeVisible();
});

When('the user clicks on the close button in the desktop menu', async  ({page}) => {
    const buttons = page.locator('button:has(svg.nuxt-icon)');
    await buttons.first().click(); 
    await page.locator('.desktop-menu-wrapper').waitFor({ state: 'hidden' });
});

Then('the desktop menu content should not be visible', async ({page}) => {
    const menu = page.locator('.desktop-menu-wrapper');
    const display = await menu.evaluate((el) => el.style.display);
    expect(display).toBe('none');
});
