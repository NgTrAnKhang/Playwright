import { test, expect } from '@playwright/test';
import path from 'path';

test('File upload test', async ({ page }) => {
  await page.goto('https://example.com/upload');
  const filePath = path.resolve(__dirname, '../files/sample.txt');
  await page.setInputFiles('#file-upload', filePath);
  await page.click('#upload');
  await expect(page.locator('text=Upload successful')).toBeVisible();
});
