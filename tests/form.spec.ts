import { test, expect } from '@playwright/test';

test('Form input test', async ({ page }) => {
  await page.goto('https://example.com/form');
  await page.fill('#name', 'John Doe');
  await page.fill('#email', 'john@example.com');
  await page.click('#submit');
  await expect(page.locator('text=Form submitted successfully')).toBeVisible();
});
