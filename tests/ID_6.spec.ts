import { test, expect } from "@playwright/test";
import * as fn from "../function/ID_6_functions";

const username = "testuser";
const password = "Test@123";

test.describe("ID_6 Demo Test Suite", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://demoqa.com/login");

    try {
      await fn.verifyLogin(page, username);
      await fn.logout(page);
    } catch {
    }
  });

  test.afterEach(async ({ page }) => {
    try {
      await fn.logout(page);
    } catch {}
  });

  test("ID_6-1 Login Test", async ({ page }) => {
    await fn.login(page, username, password);
    await fn.verifyLogin(page, username);
    await page.pause();
  });

  test("ID_6-2 Sort Title Column", async ({ page }) => {
    await fn.sortTitle(page, "des");
    await fn.verifySorted(page, "des");
  });

  test("ID_6-3 Pagination Test", async ({ page }) => {
    await fn.selectPagination(page, "5");
    await fn.verifyPagination(page, "5", "2");
  });

  test("ID_6-4 Search Test", async ({ page }) => {
    await fn.search(page, "JavaScript");
    await fn.verifySearch(page, "JavaScript");
  });
});
