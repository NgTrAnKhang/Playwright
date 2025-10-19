import { test, expect, Page } from "@playwright/test";
import * as locatorAE from "../../selector/automationexercise";

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
  const activeLink = page.locator(`${locatorAE.menuBar} li a[style*="color: orange"]`);

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
  const activeLink = page.locator(`${locatorAE.menuBar} li a[style*="color: brown"]`);

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

export async function createAccount(
  page: Page,
  userData:any
): Promise<void> {
  page.locator(locatorAE.menuBar).getByText("Signup / Login").click();
    await verifyPage(page, "Automation Exercise - Signup / Login");
    verifyActiveMenu(page, "Signup / Login");
    await expect(page.getByText("New User Signup!")).toBeVisible();
    await page.locator(locatorAE.signupName).fill(userData.name);
    await page.locator(locatorAE.signupEmail).fill(userData.email);
    await page.locator(locatorAE.signupBtn).click();
  
    await verifyPage(page, "Automation Exercise - Signup");
    await expect(page.getByText("Enter Account Information")).toBeVisible();
  
    await page.locator(locatorAE.signupPassword).fill(userData.password);
    await page.locator(locatorAE.signupFirstName).fill(userData.firstName);
    await page.locator(locatorAE.signupLastName).fill(userData.lastName);
    await page.locator(locatorAE.signupAddress1).fill(userData.address1);
    await page.selectOption(locatorAE.signupCountry, userData.country);
    await page.locator(locatorAE.signupState).fill(userData.state);
    await page.locator(locatorAE.signupCity).fill(userData.city);
    await page.locator(locatorAE.signupZipCode).fill(userData.zipCode);
    await page.locator(locatorAE.signupPhoneNumber).fill(userData.phoneNumber);
  
    await page.locator(locatorAE.createAccountBtn).click();
  
    verifyPage(page, "Automation Exercise - Account Created");
    await expect(page.getByText("Account Created!")).toBeVisible();
    await expect(page.locator(locatorAE.continueBtn)).toBeVisible();
    await page.locator(locatorAE.continueBtn).click();
}
