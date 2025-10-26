import { test } from '@playwright/test';
import {
  login,
  fillTextBox,
  dragAndDrop,
  selectMenu,
  handleAlertsAndFrames,
  checkboxAndRadio,
  uploadAndDownload
} from '../function/week_1';

test.describe('DemoQA UI Tests', () => {
  test('Login Test', async ({ page }) => {
    await login(page, 'testuser', 'Test@123');
  });

  test('Form Input Test', async ({ page }) => {
    await fillTextBox(page, 'John Doe', 'john@example.com', '123 Main St', '456 Second St');
  });

  test('Drag and Drop Test', async ({ page }) => {
    await dragAndDrop(page);
  });

  test('Dropdown & Multi-select Test', async ({ page }) => {
    await selectMenu(page);
  });

  test('Handle Alerts & Frames', async ({ page }) => {
    await handleAlertsAndFrames(page);
  });

  test('Checkbox & Radio Button Test', async ({ page }) => {
    await checkboxAndRadio(page);
  });

  test('File Upload & Download Test', async ({ page }) => {
    await uploadAndDownload(page);
  });
});
