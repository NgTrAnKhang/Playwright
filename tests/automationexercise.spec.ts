import { test, expect } from "@playwright/test";
import * as functionAE from "./function/automationexercise";
import * as locatorAE from "../selector/automationexercise";

const baseURL = "https://www.automationexercise.com/";
const userData = {
  name: "Khang Nguyen",
  email: "ntakhang@gmail.com",
  password: "123456",
  firstName: "Khang",
  lastName: "Nguyen",
  address1: "12/3,HM",
  country: "United States",
  state: "Washington",
  city: "NY",
  zipCode: "1232456",
  phoneNumber: "1234567890",
};

test("Test Case 1: Register User", async ({ page }) => {
  await functionAE.accessPage(page, baseURL);
  functionAE.verifyPage(page, "Automation Exercise");
  functionAE.verifyActiveMenu(page, "Home");
  page.locator(locatorAE.menuBar).getByText("Signup / Login").click();
  await page.waitForTimeout(3000);
  await functionAE.verifyPage(page, "Automation Exercise - Signup / Login");
  functionAE.verifyActiveMenu(page, "Signup / Login");
  await expect(page.getByText("New User Signup!")).toBeVisible();
  await page.locator(locatorAE.signupName).fill(userData.name);
  await page.locator(locatorAE.signupEmail).fill(userData.email);
  await page.locator(locatorAE.signupBtn).click();

  await functionAE.verifyPage(page, "Automation Exercise - Signup");
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

  functionAE.verifyPage(page, "Automation Exercise - Account Created");
  await expect(page.getByText("Account Created!")).toBeVisible();
  await expect(page.locator(locatorAE.continueBtn)).toBeVisible();
  await page.locator(locatorAE.continueBtn).click();

  functionAE.verifyLogged(page, ["Logout", "Delete Account"]);
  page.locator(locatorAE.menuBar).getByText("Delete Account").click();

  functionAE.verifyPage(page, "Automation Exercise - Account Created");
  await expect(page.getByText("Account Deleted!")).toBeVisible();
  await expect(page.locator(locatorAE.continueBtn)).toBeVisible();
});
test.only("Test Case 2: Login User with correct email and password", async ({
  page,
}) => {
  await functionAE.accessPage(page, baseURL);
  functionAE.verifyPage(page, "Automation Exercise");
  functionAE.verifyActiveMenu(page, "Home");

  await functionAE.createAccount(page, userData);
  await functionAE.verifyLogged(page, ["Logout", "Delete Account"]);
  await page.locator(locatorAE.menuBar).getByText("Logout").click();

  await page.locator(locatorAE.loginEmail).fill(userData.email);
  await page.locator(locatorAE.loginPassword).fill(userData.password);

  await page.locator(locatorAE.loginBtn).click();
  await functionAE.verifyLogged(page, ["Logout", "Delete Account"]);
  await page.locator(locatorAE.menuBar).getByText("Logout").click();
});
