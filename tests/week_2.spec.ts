import { test } from '@playwright/test';
import {
  GooglePage,
  BrowserWindowsPage,
  TextBoxPage,
  ContextMenuPage,
  HoverPage,
  DatePickerPage
} from '../function/week_2';

test('Auto Suggest', async ({ page }) => {
  const google = new GooglePage(page);
  await google.goto();
  await google.searchSuggestion();
});

test('Handle Multiple Pages', async ({ page }) => {
  const browserWindows = new BrowserWindowsPage(page);
  await browserWindows.goto();
  await browserWindows.handleNewTab();
});

test('Keyboard Actions', async ({ page }) => {
  const textBox = new TextBoxPage(page);
  await textBox.goto();
  await textBox.keyboardActions();
});

test('Mouse Right Click', async ({ page }) => {
  const contextMenu = new ContextMenuPage(page);
  await contextMenu.goto();
  await contextMenu.rightClick();
});

test('Mouse Hover', async ({ page }) => {
  const hoverPage = new HoverPage(page);
  await hoverPage.goto();
  await hoverPage.hoverImages();
});

test('Date Picker', async ({ page }) => {
  const datePicker = new DatePickerPage(page);
  await datePicker.goto();
  await datePicker.selectToday();
});
