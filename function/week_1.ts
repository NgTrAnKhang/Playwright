import { Page, expect } from '@playwright/test';
import { selector } from '../selector/week_1';
import fs from 'fs';
import path from 'path';

export async function login(page: Page, username: string, password: string) {
  await page.goto('https://demoqa.com/login');
  await page.fill(selector.login.username, username);
  await page.fill(selector.login.password, password);
  await page.click(selector.login.loginBtn);
  await expect(page.locator(selector.login.welcomeText)).toBeVisible();
}

export async function fillTextBox(page: Page, name: string, email: string, current: string, permanent: string) {
  await page.goto('https://demoqa.com/text-box');
  await page.fill(selector.textBox.fullName, name);
  await page.fill(selector.textBox.email, email);
  await page.fill(selector.textBox.currentAddress, current);
  await page.fill(selector.textBox.permanentAddress, permanent);
  await page.click(selector.textBox.submitBtn);
  await expect(page.locator(selector.textBox.outputBox)).toContainText(name);
}

export async function dragAndDrop(page: Page) {
  await page.goto('https://demoqa.com/droppable');
  const drag = page.locator(selector.dragDrop.dragMe);
  const drop = page.locator(selector.dragDrop.dropHere);
  await drag.dragTo(drop);
  await expect(drop).toContainText('Dropped!');
}

export async function selectMenu(page: Page) {
  await page.goto('https://demoqa.com/select-menu');
  await page.selectOption(selector.selectMenu.oldSelectMenu, { value: '2' });
  const selected = await page.$eval(selector.selectMenu.oldSelectMenu, e => (e as HTMLSelectElement).value);
  expect(selected).toBe('2');

  await page.selectOption(selector.selectMenu.multiSelect, ['volvo', 'saab']);
  const selectedMulti = await page.$eval(selector.selectMenu.multiSelect, e => Array.from((e as HTMLSelectElement).selectedOptions).map(o => o.value));
  expect(selectedMulti).toContain('volvo');
  expect(selectedMulti).toContain('saab');
}

export async function handleAlertsAndFrames(page: Page) {
  await page.goto('https://demoqa.com/alerts');
  page.on('dialog', async (dialog) => await dialog.accept());
  await page.click(selector.alerts.alertButton);

  await page.goto('https://demoqa.com/frames');
  const frame = await page.frame({ url: /sample/ });
  const textInside = await frame?.locator('#sampleHeading').textContent();
  expect(textInside).toContain('This is a sample page');
}

export async function checkboxAndRadio(page: Page) {
  await page.goto('https://demoqa.com/checkbox');
  await page.click(selector.checkbox.expandAll);
  const checkboxes = await page.$$(selector.checkbox.checkboxItems);
  for (const cb of checkboxes.slice(0, 2)) await cb.click(); // select first 2

  await page.goto('https://demoqa.com/radio-button');
  await page.click(selector.radio.yesRadio);
  await expect(page.locator(selector.radio.output)).toContainText('Yes');
}

export async function uploadAndDownload(page: Page) {
  await page.goto('https://demoqa.com/upload-download');
  const filePath = path.resolve(__dirname, 'test.txt');
  fs.writeFileSync(filePath, 'Test upload file');

  await page.setInputFiles(selector.uploadDownload.uploadFile, filePath);
  await expect(page.locator(selector.uploadDownload.uploadedPath)).toContainText('test.txt');

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click(selector.uploadDownload.downloadBtn)
  ]);
  const downloadPath = await download.path();
  expect(fs.existsSync(downloadPath || '')).toBeTruthy();
}
