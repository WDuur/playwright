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
    Then('I should see the following submenu items with correct URLs:', async ({ page }, dataTable) => {
        const rows = dataTable.hashes(); 
      
        for (const row of rows) {
          const { text, url } = row;
          const link = page.locator(`nav .child-menu .menu-item a`, { hasText: text });
      
          await expect(link).toBeVisible();
          const href = await link.getAttribute('href');
          expect(href).toBe(url);

          const [response] = await Promise.all([
            page.waitForNavigation({ url: `**${url}` }),
            link.click(),
          ]);
      
          expect(page.url()).toContain(url);
      
          await page.goBack();
          await page.waitForLoadState('domcontentloaded');
          await page.locator('nav .menu-item a[title="Wat we doen"]').hover();
        }
      });
      