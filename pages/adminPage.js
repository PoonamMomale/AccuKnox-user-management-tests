import { expect } from "@playwright/test";

export class AdminPage {
  constructor(page) {
    this.page = page;
    this.adminTab = 'a:has-text("Admin")';
    this.addButton = 'button:has-text("Add")';
    this.saveButton = 'button:has-text("Save")';
    this.searchButton = 'button:has-text("Search")';
    this.confirmButton = 'button:has-text("Yes, Delete")';
  }

  async openAdminModule() {
    await this.page.click(this.adminTab);
    await this.page.waitForURL(/admin\/viewSystemUsers/);
    await this.page.waitForSelector(this.addButton, { state: "visible" });
  }

  async addUser(username, empName) {
    await this.page.click(this.addButton);
    await this.page.waitForSelector('h6:has-text("Add User")', {
      state: "visible",
    });

    await this.page
      .locator('//label[text()="User Role"]/../following-sibling::div')
      .click();
    await this.page.click('div[role="option"]:has-text("ESS")');

    await this.page
      .locator('//label[text()="Status"]/../following-sibling::div')
      .click();
    await this.page.click('div[role="option"]:has-text("Enabled")');

    await this.page.fill('input[placeholder="Type for hints..."]', empName);
    await this.page
      .locator(`div[role="option"]:has-text("${empName}")`)
      .first()
      .click();

    const usernameField = this.page.locator(
      '//label[text()="Username"]/../following-sibling::div/input'
    );
    await usernameField.fill(username);

    const pwFields = this.page.locator('input[type="password"]');
    await pwFields.nth(0).fill("Password123!");
    await pwFields.nth(1).fill("Password123!");

    await Promise.all([
      this.page.waitForURL(/viewSystemUsers/, { timeout: 20000 }),
      this.page.click(this.saveButton),
    ]);

    await this.page.waitForSelector('button:has-text("Add")', {
      state: "visible",
      timeout: 10000,
    });
  }

  async searchUser(username) {
    const usernameInput = this.page.locator(
      '//label[text()="Username"]/../following-sibling::div/input'
    );
    await usernameInput.fill(username);
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(
      `div[role="row"] div.oxd-table-cell:has-text("${username}")`,
      {
        timeout: 15000,
      }
    );
  }

  async editUser(username) {
    await this.searchUser(username);
    const row = this.page.locator(`div[role="row"]:has-text("${username}")`);
    await row.locator("button:has(i.bi-pencil-fill)").click();

    await this.page.waitForSelector('h6:has-text("Edit User")', {
      state: "visible",
    });

    await this.page
      .locator('//label[text()="Status"]/../following-sibling::div')
      .click();
    await this.page.click('div[role="option"]:has-text("Disabled")');

    await Promise.all([
      this.page.waitForURL(/viewSystemUsers/, { timeout: 15000 }),
      this.page.click(this.saveButton),
    ]);
  }

  async deleteUser(username) {
    await this.searchUser(username);

    const row = this.page.locator(`div[role="row"]:has-text("${username}")`);
    await row.waitFor({ state: "visible", timeout: 10000 });

    const deleteButton = row.locator('button:has([class*="trash"])');
    await expect(deleteButton).toBeVisible({ timeout: 10000 });
    await deleteButton.click({ force: true });

    await this.page.waitForSelector(this.confirmButton, {
      state: "visible",
      timeout: 10000,
    });

    await Promise.all([
      this.page.waitForURL(/viewSystemUsers/, { timeout: 15000 }),
      this.page.click(this.confirmButton),
    ]);

    await this.page.waitForSelector('span:has-text("No Records Found")', {
      timeout: 10000,
    });
  }
}
