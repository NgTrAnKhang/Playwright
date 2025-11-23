import { test, request, APIRequestContext, BrowserContext, Page } from "@playwright/test";
import * as finalFunction from "../function/final_function";

test.describe("Final", () => {
  const username = "ntakhang";
  const password = "123456789l@L";

  const new_username = "new_ntakhang";
  const new_password = "123456789k@K";

  const baseURL = "https://demoqa.com/";

  let apiRequest: APIRequestContext;
  let context: BrowserContext;
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    apiRequest = await request.newContext();
    context = await browser.newContext();
    page = await context.newPage();

    await page.goto(baseURL + "login");

    const isLoggedIn = await finalFunction.verifyLogin(page, username);

    if (isLoggedIn) {
      await finalFunction.logout(page);
    }
  });

  test.afterAll(async () => {
    await finalFunction.logout(page);
    await context.close();

    if (apiRequest) {
      await apiRequest.dispose();
    }
  });

  test("TC_1:Login Test", async () => {
    await finalFunction.login(page, username, password);
    await finalFunction.verifyLogin(page, username);
  });

  test("TC_2:Sort Title Column", async () => {
    await finalFunction.sortTable(page, "des");
    await finalFunction.verifySortedTable(page, "des");
  });

  test("TC_3:Select Pagination", async () => {
    await finalFunction.selectPagination(page, "5");
    await finalFunction.verifyPagination(page, "5", "2");
  });

  test("TC_4:Search and Validate Table", async () => {
    await finalFunction.searchBook(page, "You Don't Know JS");
    await finalFunction.verifyBook(page, "You Don't Know JS");
  });

  test("TC_5:Create User via API", async () => {
    await finalFunction.createAndVerifyCreateUser(
      apiRequest,
      new_username,
      new_password
    );
  });
});
