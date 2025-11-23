import { Page, expect } from '@playwright/test';
import { ID_6_Selectors } from '../selector/ID_6_selectors';

export class ID_6_Functions {
  constructor(private page: Page) {}

  async assertUsernameValue(expected: string) {
    await expect(this.page.locator(ID_6_Selectors.usernameInput)).toHaveValue(expected);
  }

  async assertOnDashboard() {
    await expect(this.page).toHaveURL(/dashboard/);
  }

  async assertLogoutVisible() {
    await expect(this.page.locator(ID_6_Selectors.logoutButton)).toBeVisible();
  }
}