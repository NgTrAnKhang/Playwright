import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://practice.expandtesting.com/login');

  await page.fill('#username', 'practice');
  await page.fill('#password', 'SuperSecretPassword!');
  await page.click('#submit-login');

  await page.waitForSelector('text=Welcome');

  await context.storageState({ path: 'state.json' });
  await browser.close();
}

export default globalSetup;
