import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage.js";
import { AdminPage } from "../pages/adminPage.js";

test.describe("User Management CRUD", () => {
  let loginPage;
  let adminPage;
  const adminUsername = "Admin";
  const adminPassword = "admin123";
  const newUser = "testuser" + Date.now();
  const employee = "James Butler";

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    adminPage = new AdminPage(page);
    await loginPage.goto();
    await loginPage.login(adminUsername, adminPassword);
    await adminPage.openAdminModule();
  });

  test("Add New User", async () => {
    await adminPage.addUser(newUser, employee);
    await adminPage.searchUser(newUser);
    await expect(
      adminPage.page.locator(`div[role="row"]:has-text("${newUser}")`)
    ).toBeVisible();
  });

  test("Search Existing User", async () => {
    await adminPage.searchUser("Admin");
    const userCell = adminPage.page
      .locator(`div[role="row"] div.oxd-table-cell:has-text("Admin")`)
      .first();
    await expect(userCell).toBeVisible();
  });

  test("Edit User Status", async () => {
    await adminPage.editUser(newUser);
    await adminPage.searchUser(newUser);
    await expect(
      adminPage.page.locator(`div[role="row"]:has-text("${newUser}")`)
    ).toBeVisible();
  });

  test("Delete User", async () => {
    await adminPage.deleteUser(newUser);
    await expect(
      adminPage.page.locator('span:has-text("No Records Found")')
    ).toBeVisible();
  });
});
