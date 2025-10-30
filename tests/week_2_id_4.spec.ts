import { test, expect } from '@playwright/test';
import { login, verifyLogin, fillForm, verifyFormSubmission, basicAuth } from '../function/week_2_id_4';


test('TC_1:Smoke', async ({ page, browserName }) => {
  test.skip(browserName === 'firefox', 'Skip test on Firefox');
  await login(page, 'standard_user', 'secret_sauce');
  await verifyLogin(page);
});


test('TC_2:Regression', async ({ page }) => {
  await fillForm(page, 'Playwright automation test');
  await verifyFormSubmission(page);
});


test('TC_3:Trace Viewer', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.locator('p')).toContainText('Congratulations!');
});

test('TC_4:Slow motion + Video recording', async ({ page }) => {
  await login(page, 'standard_user', 'secret_sauce');
  await verifyLogin(page);
});

test('TC_5:HTTP Basic Authentication test', async ({ browser }) => {
  await basicAuth(browser);
});

const users = [
  { username: 'standard_user', password: 'secret_sauce' },
  { username: 'problem_user', password: 'secret_sauce' },
  { username: 'performance_glitch_user', password: 'secret_sauce' }
];

for (const user of users) {
  test(`TC_6:Data-driven login for ${user.username}`, async ({ page }) => {
    await login(page, user.username, user.password);
    await verifyLogin(page);
  });
}
