const { test, expect } = require("@playwright/test");
const { hello, helloworld } = require("../function/function");
import { beforeEach, snapshot } from "node:test";
import * as myFunction from "../function/function";
import path from "path";
let context;
let page;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  await context.tracing.start({ snapshot: true, screenshots: true });
  page = context.newPage();
});
test.afterEach(async ()=>{
    await context.tracing.stop({path:'test_tracing.zip'})
})
test("My first test", async ({ page }) => {
  await page.goto("https://www.google.com/");
  await expect(page).toHaveTitle("Google");
});
