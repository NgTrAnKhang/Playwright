import { test, expect, Page } from "@playwright/test";
import { menuBar } from "../../selector/automationexercise";

export async function accessPage(page: Page, baseURL: string): Promise<Page> {
  await page.goto(baseURL);
  console.log(`Opened ${baseURL} successfully`);

  await page.waitForTimeout(3000);
  return page;
}
export async function verifyPage(
  page: Page,
  expectedTitle: string
): Promise<boolean> {
  try {
    await expect(page).toHaveTitle(expectedTitle);
    console.log(`Verified title: ${expectedTitle}`);
    return true;
  } catch (error) {
    console.error(`Title verification failed. Expected: "${expectedTitle}"`);
    console.log("Page title:", await page.title());
    return false;
  }
}
export async function verifyActiveMenu(
  page: Page,
  activeMenu: string
): Promise<boolean> {
  const activeLink = page.locator(`${menuBar} li a[style*="color: orange"]`);

  const count = await activeLink.count();
  if (count === 0) {
    console.log("Cannot find");
    return false;
  }

  const text = await activeLink.textContent();
  console.log(`Active menu is: ${text?.trim()}`);
  try {
    expect(text).toEqual(activeMenu);
    return true;
  } catch (error) {
    return false;
  }
}

export async function verifyLogged(
  page: Page,
  activeMenu: string[]
): Promise<boolean> {
  const activeLink = page.locator(`${menuBar} li a[style*="color: brown"]`);

  const count = await activeLink.count();
  if (count === 0) {
    console.log("Cannot find");
    return false;
  }

  const text = await activeLink.textContent();
  console.log(`Active menu is: ${text?.trim()}`);
  try {
    expect(text).toEqual(activeMenu);
    return true;
  } catch (error) {
    return false;
  }
}
