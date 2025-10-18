const { test, expect } = require("@playwright/test");
import * as Test_1 from '../selector/Test_1';
import * as Test_2 from '../selector/Test_2';
import * as Test_3 from '../selector/Test_3';
test("My first test", async ({ page }:any) => {
  await page.goto("https://www.google.com/");
  await expect(page).toHaveTitle("Google");
});

test("Demo login Test 1",async({page}:any)=>{
    //Open page
    await page.goto("https://demo.applitools.com/");

    //Enter username and password
    await page.locator(Test_1.inputUsername).fill('ntakhang');
    await page.locator(Test_1.inputPassword).fill('12345678');

    //Click Sign In
    await page.locator(Test_1.btnSignIn).click();

    //Verify URL re-direct
    await expect(page).toHaveURL('https://demo.applitools.com/app.html');
    await expect(page).toHaveTitle('ACME demo app');
});

test("Demo login Test 2",async({page}:any)=>{
    //Open page
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    //Fill
    await page.locator(Test_2.inputUsername).fill('Admin');
    await page.locator(Test_2.inputPassword).fill('admin123');

    //Click Sign In
    await page.locator(Test_2.btnLogin).click();

    //Verify URL re-direct
    await expect(page.getByRole('heading',{name:'Dashboard'})).toBeVisible();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    await expect(page).toHaveTitle('OrangeHRM');
});

test.only('Demo Login Test 3', async ({ page }:any) => {
  //Open page
  await page.goto('https://admin-demo.nopcommerce.com/login?ReturnUrl=%2Fadmin%2F');

  // Fill Username
  await page.locator('#Email').clear();
  await page.locator('#Email').fill('admin@yourstore.com');

  // Fill password
  await page.locator('#Password').clear();
  await page.locator('#Password').fill('admin');

  // Click Login button
  await page.getByRole('button', { name: 'Log in' }).click();

  // Verify login successful
  await page.waitForURL('https://admin-demo.nopcommerce.com/admin/');
});


