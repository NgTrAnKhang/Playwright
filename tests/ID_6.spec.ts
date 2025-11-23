import { test } from "@playwright/test";
import { ID_6_Functions } from "../function/ID_6_functions";
import { ID_6_Selectors } from "../selector/ID_6_selectors";

test("ID_6 assertions test", async ({ page }) => {
  const baseURL = "https://demoqa.com/";
  const username = "ntakhang";
  const password = "123456789l@L";
  const fn = new ID_6_Functions(page);

  await page.goto(baseURL + "login");

  await page.locator("#username").fill("testuser");

  await fn.assertUsernameValue("testuser");

  await page.goto(baseURL + "dashboard/");
  await fn.assertOnDashboard();

  await page.goto(baseURL + "login");
  await page.fill(ID_6_Selectors.usernameInput, username);
  await page.fill(ID_6_Selectors.passwordInput, password);
  await page.click(ID_6_Selectors.loginButton);
  await fn.assertLogoutVisible();
});
