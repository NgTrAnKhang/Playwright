import { LoginPage } from '../selector/week_3_id_5';

export async function login(page, username: string, password: string) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await page.fill(loginPage.usernameInput, username);
  await page.fill(loginPage.passwordInput, password);
  await page.click(loginPage.loginButton);
}
