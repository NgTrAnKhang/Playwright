import { test, expect } from '@playwright/test';
import { login } from '../function/week_3_id_5';
import { LoginPage } from '../selector/week_3_id_5';

test.describe('Login Suite - Week 3 ID 5', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test.only('TC_1:Login', async ({ page }) => {
    await login(page, 'practice', 'SuperSecretPassword!');
    await expect(page.locator(loginPage.welcomeText)).toBeVisible();
  });
});
