import { expect, Page } from '@playwright/test';
import { selector } from '../selector/week_2_id_4';

const BASE_URL = 'https://www.saucedemo.com/';
const AUTH_URL = 'https://the-internet.herokuapp.com/basic_auth';

export async function login(page: Page, username: string, password: string) {
  await page.goto(BASE_URL);
  await page.fill(selector.login.username, username);
  await page.fill(selector.login.password, password);
  await page.click(selector.login.loginButton);
}

export async function verifyLogin(page: Page) {
  await expect(page.locator(selector.login.title)).toHaveText('Products');
}

export async function fillForm(page: Page, text: string) {
  await page.goto('https://www.selenium.dev/selenium/web/web-form.html');
  await page.fill(selector.form.textInput, text);
  await page.click(selector.form.submitButton);
}

export async function verifyFormSubmission(page: Page) {
  await expect(page.locator(selector.form.message)).toContainText('Received!');
}

export async function basicAuth(browser: Browser) {
  const context = await browser.newContext({
    httpCredentials: { username: 'admin', password: 'admin' },
  });
  const page = await context.newPage();
  await page.goto(AUTH_URL);
  await expect(page.locator('p')).toContainText('Congratulations!');
  await context.close();
}
