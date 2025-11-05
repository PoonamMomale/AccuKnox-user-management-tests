export class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = 'input[name="username"]';
    this.password = 'input[name="password"]';
    this.loginButton = 'button[type="submit"]';
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await this.page.waitForSelector(this.username, { state: 'visible' });
  }

  async login(username, password) {
    await this.page.fill(this.username, username);
    await this.page.fill(this.password, password);
    await Promise.all([
      this.page.waitForNavigation({ url: /dashboard/ }),
      this.page.click(this.loginButton),
    ]);
  }
}
