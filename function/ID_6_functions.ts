import { Page, expect } from "@playwright/test";
import { ID6Selectors } from "../selector/ID_6_selectors";

export async function gotoBooks(page: Page) {
  await page.goto("https://demoqa.com/books");
}

export async function login(page: Page, username: string, password: string) {
  await page.goto("https://demoqa.com/login");
  await page.fill(ID6Selectors.usernameInput, username);
  await page.fill(ID6Selectors.passwordInput, password);
  await page.click(ID6Selectors.loginButton);
}

export async function verifyLogin(page: Page, username: string) {
  await expect(page.locator(ID6Selectors.usernameInput)).toBeVisible();
  await expect(page.locator(ID6Selectors.usernameInput)).toHaveValue(username);
}

export async function logout(page: Page) {
  await page.click(ID6Selectors.logoutButton);
}

export async function sortTitle(page: Page, type: string) {
  await gotoBooks(page);
  await page.click(ID6Selectors.titleHeader);
  await page.waitForTimeout(300);

  if (type === "des") {
    await page.click(ID6Selectors.titleHeader);
    await page.waitForTimeout(300);
  }
}

export async function getTitles(page: Page) {
  const rows = await page.$$(ID6Selectors.rows);
  const titles: string[] = [];

  for (const row of rows) {
    const anchor = await row.$(ID6Selectors.titleAnchor);
    const text = await anchor?.textContent();
    if (text) titles.push(text.trim());
  }

  return titles;
}

export async function verifySorted(page: Page, type: string) {
  const titles = await getTitles(page);

  const sortedAsc = [...titles].sort((a, b) => a.localeCompare(b));
  const sortedDes = [...sortedAsc].reverse();

  if (type === "asc") {
    expect(titles).toEqual(sortedAsc);
  } else {
    expect(titles).toEqual(sortedDes);
  }
}

export async function selectPagination(page: Page, rows: string) {
  await gotoBooks(page);
  const dropdown = page.locator(ID6Selectors.paginationSelect);
  await dropdown.selectOption(rows);
  await page.waitForTimeout(300);
}

export async function verifyPagination(page: Page, rows: string, expectedPages: string) {
  const info = await page.locator(ID6Selectors.paginationInfo).textContent();
  expect(info?.includes(expectedPages)).toBeTruthy();
}

export async function search(page: Page, text: string) {
  await page.fill(ID6Selectors.searchBox, text);
  await page.waitForTimeout(300);
}

export async function verifySearch(page: Page, expected: string) {
  const titles = await getTitles(page);
  expect(titles.some((t) => t.includes(expected))).toBeTruthy();
}
