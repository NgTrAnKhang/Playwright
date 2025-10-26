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

test.describe('Week_1', () => {
  test('TC_1:Login Test', async ({ page }) => {
    await login(page, 'testuser', 'Test@123');
  });

  test('TC_2:Form Input Test', async ({ page }) => {
    await fillTextBox(page, 'John Doe', 'john@example.com', '123 Main St', '456 Second St');
  });

  test('TC_3:Drag and Drop Test', async ({ page }) => {
    await dragAndDrop(page);
  });

  test('TC_4:Dropdown & Multi-select Test', async ({ page }) => {
    await selectMenu(page);
  });

  test('TC_5:Handle Alerts & Frames', async ({ page }) => {
    await handleAlertsAndFrames(page);
  });

  test('TC_6:Checkbox & Radio Button Test', async ({ page }) => {
    await checkboxAndRadio(page);
  });

  test('TC_7:File Upload & Download Test', async ({ page }) => {
    await uploadAndDownload(page);
  });
});
