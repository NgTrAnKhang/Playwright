import * as finalSelector from "../selector/final_selector";
import { Page, expect,APIRequestContext, APIResponse  } from "@playwright/test";
const baseURL = "https://demoqa.com/";

//TC1
export async function login(page: Page, username: string, password: string) {
  await page.goto(baseURL + "login");
  await page.fill(finalSelector.LoginSelectors.usernameInput, username);
  await page.fill(finalSelector.LoginSelectors.passwordInput, password);
  await page.click(finalSelector.LoginSelectors.loginButton);
}
export async function verifyLogin(page: Page, username: string) {
  const userLabel = page.locator(finalSelector.LoginSelectors.usernameValue);

  if (!(await userLabel.isVisible())) return false;

  const text = await userLabel.textContent();
  if (!text) return false;

  return text.trim() === username;
}

//TC2
export async function sortTable(page: Page, type: string) {
  await page.goto(baseURL + "books");
  await page.click(finalSelector.BooksSelectors.titleHeader);
  await page.waitForTimeout(300);
  if ((type = "des")) {
    await page.click(finalSelector.BooksSelectors.titleHeader);
    await page.waitForTimeout(300);
  }
}

export async function verifySortedTable(page: Page, type: string) {
  const rows = await page.$$(finalSelector.BooksSelectors.rows);
  const titles: string[] = [];

  for (const row of rows) {
    const anchor = await row.$(finalSelector.BooksSelectors.titleAnchor);
    const text = await anchor?.textContent();
    if (text) titles.push(text.trim());
  }

  const sorted = [...titles].sort((a, b) => a.localeCompare(b));

  if (type === "asc") {
    expect(titles).toEqual(sorted);
  } else if (type === "des") {
    const sortedDesc = [...sorted].reverse();
    expect(titles).toEqual(sortedDesc);
  } else {
    throw new Error("Invalid sort type. Use 'asc' or 'des'");
  }
}

//TC3
export async function selectPagination(page: Page, numberRow: string) {
  await page.goto(baseURL + "books");
  const dropdown = page.locator(finalSelector.BooksSelectors.rowsPerPageSelect);
  await dropdown.selectOption(numberRow);
  await page.waitForTimeout(300);
}
export async function verifyPagination(
  page: Page,
  numberRow: string,
  numberPages: string
) {
  const rows = await page.$$(finalSelector.BooksSelectors.rows);
  const actualCount = rows.length;
  const expectedCount = Number(numberRow);
  expect(actualCount).toBeLessThanOrEqual(expectedCount);
  await expect(
    page.locator(finalSelector.BooksSelectors.numberPages)
  ).toContainText("of " + numberPages);
  await page.click(finalSelector.BooksSelectors.nextButton);
  await page.waitForTimeout(400);
}

//TC4
export async function searchBook(page: Page, book: string) {
  await page.goto(baseURL + "books");
  await page.fill(finalSelector.BooksSelectors.searchBox, book);
  await page.waitForTimeout(300);
}
export async function verifyBook(page: Page, book: string) {
  const rows = await page.$$(finalSelector.BooksSelectors.rows);
  const titles: string[] = [];

  for (const row of rows) {
    const anchor = await row.$(finalSelector.BooksSelectors.titleAnchor);
    const text = await anchor?.textContent();
    if (text) titles.push(text.trim());
  }

  console.log("Titles found:", titles);

  expect(titles.length).toBe(1);

  expect(titles[0].toLowerCase()).toContain(book.toLowerCase());
}

//TC5
export async function createAndVerifyCreateUser(request: APIRequestContext, userName: string, password: string) {;

  const body = {
    userName,
    password
  };

  const firstResponse = await request.post(baseURL+'Account/v1/User', {
    data: body,
    headers: { "Content-Type": "application/json" }
  });

  const firstStatus = firstResponse.status();
  const firstBody = await firstResponse.json();

  expect(firstStatus).toBe(201);
  expect(firstBody).toHaveProperty("userID");
  expect(firstBody).toHaveProperty("username", userName);
  expect(firstBody).toHaveProperty("books");

  const secondResponse = await request.post(baseURL+'Account/v1/User', {
    data: body,
    headers: { "Content-Type": "application/json" }
  });

  const secondStatus = secondResponse.status();
  const secondBody = await secondResponse.json();

  expect(secondStatus).toBe(406);
  expect(secondBody).toHaveProperty("code", "1204");
  expect(secondBody).toHaveProperty("message", "User exists!");

  return {
    first: { status: firstStatus, body: firstBody },
    duplicate: { status: secondStatus, body: secondBody }
  };
}

//
export async function logout(page: Page) {
  const usernameLocator = page.locator(finalSelector.HeaderSelectors.usernameLabel);

  if (await usernameLocator.isVisible()) {
    await usernameLocator.click();

    const logoutBtn = page.locator(finalSelector.HeaderSelectors.logoutButton);
    const logoutTextBtn = page.locator(finalSelector.HeaderSelectors.logoutTextButton);

    if (await logoutBtn.isVisible()) {
      await logoutBtn.click();
    } else if (await logoutTextBtn.isVisible()) {
      await logoutTextBtn.click();
    }
  }
}


