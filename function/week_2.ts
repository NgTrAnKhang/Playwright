import { Page, expect } from '@playwright/test';
import { selector } from '../selector/week_2';
const baseURL="https://demoqa.com/";
const baseURL_2="https://practice.expandtesting.com/"
export class GooglePage {
  constructor(private page: Page) {}
  async goto() {
    await this.page.goto('https://www.google.com/');
  }
  async searchSuggestion() {
    await this.page.locator(selector.google.searchBox).fill('Playwright');
    await this.page.waitForSelector(selector.google.suggestion, { timeout: 10000 });
    await this.page.locator(selector.google.suggestion).first().click();
    await expect(this.page).toHaveURL(/Playwright\+testing/);
  }
}

export class BrowserWindowsPage {
  constructor(private page: Page) {}
  async goto() {
    await this.page.goto(baseURL+'browser-windows');
  }
  async handleNewTab() {
    const [newPage] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.page.click(selector.browserWindows.newTabButton)
    ]);
    await newPage.waitForLoadState();
    const text = await newPage.locator(selector.browserWindows.newTabText).textContent();
    expect(text).toContain('This is a sample page');
  }
}

export class TextBoxPage {
  constructor(private page: Page) {}
  async goto() {
    await this.page.goto(baseURL+'text-box');
  }
  async keyboardActions() {
    const input = this.page.locator(selector.textBox.input);
    await input.click();
    await this.page.keyboard.type('Hello World');
    await this.page.keyboard.press('Control+A');
    await this.page.keyboard.press('Backspace');
    await expect(input).toHaveValue('');
  }
}

export class ContextMenuPage {
  constructor(private page: Page) {}
  async goto() {
    await this.page.goto(baseURL_2+'context-menu');
  }
  async rightClick() {
    this.page.on('dialog', async dialog => await dialog.dismiss());
    await this.page.click(selector.contextMenu.box, { button: 'right' });
  }
}

export class HoverPage {
  constructor(private page: Page) {}
  async goto() {
    await this.page.goto(baseURL_2+'hovers');
  }
  async hoverImages() {
    const images = this.page.locator(selector.hover.images);
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const image = images.nth(i);
      await image.hover();
      const caption = image.locator(selector.hover.caption);
      await expect(caption).toBeVisible();
    }
  }
}

export class DatePickerPage {
  constructor(private page: Page) {}
  async goto() {
    await this.page.goto(baseURL+'date-picker');
  }
  async selectToday() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    await this.page.fill(selector.datePicker.input, formattedDate);
    await expect(this.page.locator(selector.datePicker.input)).toHaveValue(formattedDate);
  }
}
