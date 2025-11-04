import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput = '#username';
  readonly passwordInput = '#password';
  readonly loginButton = '#login';
  readonly welcomeText = 'text=Welcome';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://practice.expandtesting.com/login');
  }
}
